import React, { useEffect, useState } from "react";
import SignUpForm from "../signup/signup";
import validation from "../../validation";
import AddressRegistration from "../address/address";
import PersonalData from '../personal-data/personal-data'
import {Stepper, Step, StepLabel} from '@material-ui/core'

function CheckoutForm(props) {
  const [userData, setUserData] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [<SignUpForm onSubmit={onFormSubmit} validation={validation} />, <PersonalData onSubmit={onFormSubmit} handleBack={previousStep} />, <AddressRegistration onSubmit={onFormSubmit} handleBack={previousStep}/>]
  
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
  
  return (
    <>
    <Stepper activeStep={currentStep}>
      <Step><StepLabel>Signup</StepLabel></Step>
      <Step><StepLabel>Personal</StepLabel></Step>
      <Step><StepLabel>Address</StepLabel></Step>
    </Stepper>
    {steps[currentStep]}     
      
    </>
  );

 
}

export default CheckoutForm;
