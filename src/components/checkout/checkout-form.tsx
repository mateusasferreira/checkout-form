import { Stepper, Step, StepLabel, Box } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import { steps } from "../../steps-array/steps";
import { ValidationContextProvider } from "../../contexts/validationContext";

export function CheckoutForm() {
  const { currentStep, stepperDisplay  } = useForm();

  

  return (
    <ValidationContextProvider>
      <Box display={stepperDisplay}>
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
          <Step>
            <StepLabel>Confirmation</StepLabel>
          </Step>
        </Stepper>
      </Box>

      {steps[currentStep]}

    </ValidationContextProvider>
  );
}



export default CheckoutForm;
