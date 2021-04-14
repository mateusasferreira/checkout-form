import React from "react";
import SignUpForm from "../signup/signup";
import validation from "../../validation";
import AddressRegistration from "../address/address";

function CheckoutForm(props) {
  return (
    <>
      <SignUpForm onSubmit={onFormSubmit} validation={validation} />
      <AddressRegistration />
    </>
  );

  function onFormSubmit(dados) {
    console.log(dados);
  }
}

export default CheckoutForm;
