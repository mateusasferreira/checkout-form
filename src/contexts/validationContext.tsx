import React,{createContext, ReactNode, useContext, useState} from 'react'

type Validation = {
    passwordValidation: (input: string) => {unvalid: boolean, message: string},
    emailValidation: (input: string) => {unvalid: boolean, message: string},
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
    
        
           

    return (
        <ValidationContext.Provider value={{
            passwordValidation,
            emailValidation,
        }}>
            {children}
        </ValidationContext.Provider>
    )
}

export const useValidation = () => {
    return useContext(ValidationContext)
}