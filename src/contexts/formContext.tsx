import {useContext, useState, useEffect, createContext, ReactNode} from 'react';
import {steps} from '../steps-array/steps'

type User = {
    email: string;
    password: string;
    features: boolean;
    discounts: boolean;
    name: string;
    id: number;
    street: string;
    number: string;
    type: unknown;
    city: string;
    district: string;
    zip: string 
}

type FormContextData = {
    userData: User;
    currentStep: number;
    onFormSubmit: (newData: Partial<User> ) => void;
    nextStep: () => void;
    previousStep: () => void;
}

type FormContextProviderProps = {
    children: ReactNode
}

export const FormContext = createContext({} as FormContextData)


export function FormContextProvider({children}: FormContextProviderProps) {
    const [userData, setUserData] = useState<User>({} as User)
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(()=> {
        if(currentStep === steps.length){
          console.log(userData)
        }
      })    
      
    function onFormSubmit(newdata: Partial<User>) {
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