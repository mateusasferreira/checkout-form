import {useContext, useState, useEffect, createContext} from 'react';
import {steps} from '../steps-array/steps'

export const FormContext = createContext()

export function FormContextProvider({children}) {
    const [userData, setUserData] = useState('')
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(()=> {
        if(currentStep === steps.length){
          console.log(userData)
        }
      })    
      
    function onFormSubmit(newdata) {
    setUserData({...userData, ...newdata})
    nextStep()
    }

    function nextStep(){
    if(currentStep === steps.length) return
    setCurrentStep(currentStep + 1)
    }
    
    function previousStep(){
    setCurrentStep(currentStep - 1)
    }

    return(
        <FormContext.Provider value={
            {userData,
            currentStep,
            onFormSubmit,
            nextStep,
            previousStep}
        }>
            {children}
        </FormContext.Provider>
    )

}


export const useForm = () => {
    return useContext(FormContext)
}