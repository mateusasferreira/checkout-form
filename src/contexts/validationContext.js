import React,{createContext, useContext} from 'react'

const ValidationContext = createContext()


export function ValidationContextProvider({children}) {

   
    function passwordValidation(input) {
         const regexValid = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)   
         return !regexValid.test(input) ? (
             {unvalid:true, message: 'your password must have at least 8 characters, one uppercase letter and one number'}
             ) : ({unvalid:false, message: ''})          
        }
    

    return (
        <ValidationContext.Provider value={{
            passwordValidation,
        }}>
            {children}
        </ValidationContext.Provider>
    )
}

export const useValidation = () => {
    return useContext(ValidationContext)
}