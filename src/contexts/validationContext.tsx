import {createContext, ReactNode, useContext} from 'react'

type Validation = {
    passwordValidation: (input: string) => {unvalid: boolean, message: string},
    emailValidation: (input: string) => {unvalid: boolean, message: string},
    zipValidation: (input: string) => Promise<{
        validity: {unvalid: boolean, message: string},
        locationData: {
            city: string
            street: string
            district: string
        } | null
    }>
}


type ValidationContextProviderProps = {
    children: ReactNode;
}

const ValidationContext = createContext({} as Validation)

export function ValidationContextProvider({children}: ValidationContextProviderProps) {
    
   
    function emailValidation (input: string) {
        const regexValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        return !regexValid.test(input) ? (
            {unvalid:true, message: 'Please, provide a valid email account'}
        ) : ({unvalid:false, message: ''}) 
    }
    
    function passwordValidation(input: string) {
         const regexValid = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)   
         return !regexValid.test(input) ? (
             {unvalid:true, message: 'your password must have at least 8 characters, one uppercase letter and one number'}
             ) : ({unvalid:false, message: ''})          
        }
    
    async function zipValidation(input: string) {
        try {
            const zip = input.replace(/\D/g, '')
            const options: RequestInit = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'                
                  },
            }
            const response = await fetch(`https://viacep.com.br/ws/${zip}/json`, options)
            const data:any = await response.json()
            if(data.erro) {
                return {
                    validity: {unvalid: true, message: 'Inexisting ZIP Code (for testing, try: 01001-001)'},
                    locationData: null
                }
            } 
            return {
                validity: {unvalid: false, message: ''},
                locationData: {
                    city: data.localidade,
                    street: data.logradouro,
                    district: data.bairro
                }
            }

        } catch (err) {
            console.log(err)
            return {
                validity: {unvalid: true, message: 'Invalid ZIP code format (for testing, try: 01001-001)'},
                locationData: null
            }
        }           
    }
           

    return (
        <ValidationContext.Provider value={{
            passwordValidation,
            emailValidation,
            zipValidation
        }}>
            {children}
        </ValidationContext.Provider>
    )
}

export const useValidation = () => {
    return useContext(ValidationContext)
}