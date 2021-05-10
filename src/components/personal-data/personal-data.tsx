import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'
import { AsYouType } from 'libphonenumber-js'

function PersonalData() {
  const { onFormSubmit, userData } = useForm();

  const {idNumberValidation, phoneValidation} = useValidation()

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<string>(userData.id);
  const [phone, setPhone] = useState<string>(userData.phone)

  const [errors, setErrors] = useState({
    idNumber: {
      invalid: false,
      message: ''
    },
    phoneNumber: {
      invalid: false,
      message: ''
    }
  })


  return (
    <form
    className="signInForm"
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        if (errors.idNumber.invalid) return
        onFormSubmit({ name, id });
      }}
    >
      <TextField
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder='Name Surname'
        variant="outlined"
        label="Full Name"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        error={errors.idNumber.invalid}
        helperText={errors.idNumber.message}
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        onBlur={()=>{
          setErrors(errors => ({...errors, idNumber: idNumberValidation(id)}))
        }}
        variant="outlined"
        type="text"
        label="ID Number (CPF)"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        error={errors.phoneNumber.invalid}
        helperText={errors.phoneNumber.message}
        value={phone}
        onChange={(e) => {
          let phone = new AsYouType().input(e.target.value)
          setPhone(phone);
        }}
        onBlur={()=>{
          setErrors(errors => ({...errors, phoneNumber: phoneValidation(phone)}))
        }}
        label="Phone Number"
        placeholder="format: +00 00 00000000"
        type="tel"
        variant="outlined"
        margin="normal"
        fullWidth
        required
      ></TextField>  
      
      <Button type="submit" color="primary" variant="contained">
        Next
      </Button>
    </form>
  );
}

export default PersonalData;
