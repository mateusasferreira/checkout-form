import SignUpForm from "../components/signup/signup";
import AddressRegistration from "../components/address/address";
import PersonalData from "../components/personal-data/personal-data";
import ConfirmationStep from '../components/confirmation/confirmationStep'

export const steps = [
    <SignUpForm/>,
    <PersonalData />,
    <AddressRegistration />,
    <ConfirmationStep/>
  ];