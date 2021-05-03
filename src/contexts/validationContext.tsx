import React,{createContext, ReactNode, useContext, useState} from 'react'

type Validation = {
    passwordValidation: (input: string) => {unvalid: boolean, message: string},
    emailValidation: (input: string) => {unvalid: boolean, message: string},
    zipValidation: (input: string) => Promise<{unvalid: boolean, message: string}>
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
            const options: RequestInit = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'                
                  },
            }
            const response = await fetch(`https://viacep.com.br/ws/${input}/json`, options)
            const data:any = await response.json()
            console.log(response)
            console.log(data)
            if(data.erro) {
                return {unvalid: true, message: 'wrong zip code'}
            } 
            return {unvalid: false, message: ''}

        } catch (err) {
            console.log(err)
            return {unvalid: true, message: 'invalid zip code format'}
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