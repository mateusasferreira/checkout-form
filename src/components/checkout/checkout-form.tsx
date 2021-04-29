import { Stepper, Step, StepLabel } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import { steps } from "../../steps-array/steps";
import { ValidationContextProvider } from "../../contexts/validationContext";
export function CheckoutForm() {
  const { currentStep } = useForm();

  return (
    <ValidationContextProvider>
      <Stepper activeStep={currentStep}>
        <Step>
          <StepLabel>Signup</StepLabel>
        </Step>
        <Step>
          <StepLabel>Personal</StepLabel>
        </Step>
        <Step>
          <StepLabel>Address</StepLabel>
        </Step>
      </Stepper>
      {steps[currentStep]}
    </ValidationContextProvider>
  );
}

export default CheckoutForm;
