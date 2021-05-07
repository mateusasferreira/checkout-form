import {createContext, ReactNode, useContext} from 'react'

type Validation = {
    passwordValidation: (password: string) => {unvalid: boolean, message: string},
    passwordConfirmValidation: (password: string, passwordConfirm: string) => {unvalid: boolean, message: string}
    emailValidation: (email: string) => {unvalid: boolean, message: string},
    idNumberValidation: (idNumber: string) => {unvalid: boolean, message: string},
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
    
   
    function emailValidation (email: string) {
        if (email.length == 0) return {unvalid:false, message: ''}
        const regexValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        return !regexValid.test(email) ? (
            {unvalid:true, message: 'Please, provide a valid email account'}
        ) : ({unvalid:false, message: ''}) 
    }
    
    function passwordValidation(password: string) {
        if (password.length == 0) return {unvalid:false, message: ''}
        const regexValid = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)   
         return !regexValid.test(password) ? (
             {unvalid:true, message: 'your password must have at least 8 characters, one uppercase letter and one number'}
             ) : ({unvalid:false, message: ''})          
        }

    function passwordConfirmValidation(password:string, passwordConfirm: string) {
        if (password.length !== 0 && passwordConfirm.length == 0) return {unvalid: true, message: 'please, confirm your password'}
        return (password !== passwordConfirm) ? ({unvalid: true, message: 'passwords don\'t match'}) : ({unvalid: false, message: ''})
    }

    function idNumberValidation(idNumber: string) {

        var cpf = idNumber.replace(/\D/g,'')
    
        const repeatedCPFs = [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999'
        ]
    
        let itsValid = true
    
        repeatedCPFs.forEach(repeatedCpf => {if (repeatedCpf == cpf) itsValid = false})
    
        var sum:number = 0
    
        for (let i:number = 0; i < 9; i++) sum = sum + parseInt(cpf.substring(i, i+1)) * (10 - i)
          
        var checkDigit1 = (sum * 10) % 11
    
        if((checkDigit1 == 10) || (checkDigit1 == 10)) checkDigit1 = 0
    
        if (checkDigit1 !== parseInt(cpf.substring(9, 10))) itsValid = false
    
        sum = 0 
    
        for (let i:number = 0; i < 10; i++) sum = sum + parseInt(cpf.substring(i, i+1)) * (11 - i)
    
        var checkDigit2 = (sum * 10) % 11
    
        if((checkDigit2 == 10) || (checkDigit2 == 11)) checkDigit2 = 0
    
        if(checkDigit2 !== parseInt(cpf.substring(10, 11))) itsValid = false
    
        return (itsValid == true) ? ({unvalid:false, message: ''}) : ({unvalid: true, message: 'Invalid ID Number. Only brazilian ID numbers (CPFs) are accepted. Get a CPF for testing at https://www.4devs.com.br/gerador_de_cpf'})
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
            emailValidation,
            passwordValidation,
            passwordConfirmValidation,
            idNumberValidation,
            zipValidation, 
        }}>
            {children}
        </ValidationContext.Provider>
    )
}

export const useValidation = () => {
    return useContext(ValidationContext)
}