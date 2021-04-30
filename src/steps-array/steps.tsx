import SignUpForm from "../components/signup/signup";
import AddressRegistration from "../components/address/address";
import PersonalData from "../components/personal-data/personal-data";
import ConfirmationStep from '../components/confirmation/confirmationStep'
import SucessWarning from '../components/sucess/sucessPage'


export const steps = [
    <SignUpForm/>,
    <PersonalData />,
    <AddressRegistration />,
    <ConfirmationStep/>,
    <SucessWarning/>
  ];