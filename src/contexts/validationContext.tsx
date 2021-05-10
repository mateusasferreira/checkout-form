import {createContext, ReactNode, useContext} from 'react'
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

type Validation = {
    passwordValidation: (password: string) => {invalid: boolean, message: string},
    passwordConfirmValidation: (password: string, passwordConfirm: string) => {invalid: boolean, message: string}
    emailValidation: (email: string) => {invalid: boolean, message: string},
    idNumberValidation: (idNumber: string) => {invalid: boolean, message: string},
    phoneValidation: (phone: string, country: any) => {invalid: boolean, message: string},
    zipValidation: (input: string) => Promise<{
        validity: {invalid: boolean, message: string},
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
        if (email.length == 0) return {invalid:false, message: ''}
        const regexValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        return !regexValid.test(email) ? (
            {invalid:true, message: 'Please, provide a valid email account'}
        ) : ({invalid:false, message: ''}) 
    }
    
    function passwordValidation(password: string) {
        if (password.length == 0) return {invalid:false, message: ''}
        const regexValid = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)   
         return !regexValid.test(password) ? (
             {invalid:true, message: 'your password must have at least 8 characters, one uppercase letter and one number'}
             ) : ({invalid:false, message: ''})          
    }

    function passwordConfirmValidation(password:string, passwordConfirm: string) {
        if (password.length !== 0 && passwordConfirm.length == 0) return {invalid: true, message: 'please, confirm your password'}
        return (password !== passwordConfirm) ? ({invalid: true, message: 'passwords don\'t match'}) : ({invalid: false, message: ''})
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
    
        return (itsValid == true) ? ({invalid:false, message: ''}) : ({invalid: true, message: 'Invalid ID Number. Only brazilian ID numbers (CPFs) are accepted. Get a CPF for testing at https://www.4devs.com.br/gerador_de_cpf'})
    }

    function phoneValidation(phone: string, country:any) {
        
        return (isPossiblePhoneNumber(phone, country) && isValidPhoneNumber(phone, country)) ? ({invalid: false, message: ''}) : ({invalid: true, message: 'invalid'})
        
         
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
                    validity: {invalid: true, message: 'Inexisting ZIP Code (for testing, try: 01001-001)'},
                    locationData: null
                }
            } 
            return {
                validity: {invalid: false, message: ''},
                locationData: {
                    city: data.localidade,
                    street: data.logradouro,
                    district: data.bairro
                }
            }

        } catch (err) {
            console.log(err)
            if(err instanceof TypeError) {
                return {
                    validity: {invalid: true, message: 'Invalid ZIP Code format (for testing, try: 01001-001)'},
                    locationData: null
                }          
            }            
            return {
                validity: {invalid: true, message: 'Failed to validate ZIP Code, try again later'},
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
            phoneValidation,
            zipValidation, 
        }}>
            {children}
        </ValidationContext.Provider>
    )
}

export const useValidation = () => {
    return useContext(ValidationContext)
}