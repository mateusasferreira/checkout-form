import { useState, useRef } from "react";
import { TextField, Button, MenuItem } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'
import { AsYouType, getCountries } from 'libphonenumber-js'


function PersonalData() {
  const { onFormSubmit, userData } = useForm();


  const {idNumberValidation, phoneValidation} = useValidation()

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<string>(userData.id);
  const [phone, setPhone] = useState<string>(userData.phone)

  const [country, setCountry] = useState<any>('BR')
  const countryList = getCountries()

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
        if (errors.idNumber.invalid || errors.idNumber.invalid) return
        onFormSubmit({ name, id });
      }}
      noValidate
      
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
        id="standard-select-currency"
        select
        variant="outlined"
        margin="normal"
        value={country}
        onChange={(e)=>{
          setCountry(e.target.value)
        }}
        style={styles.countrySelect}
      >
        {countryList.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        error={errors.phoneNumber.invalid}
        helperText={errors.phoneNumber.message}
        value={phone}
        onChange={(e) => {
          let phone = new AsYouType(country).input(e.target.value)
          setPhone(phone);
        }}
        onBlur={()=>{
          setErrors(errors => ({...errors, phoneNumber: phoneValidation(phone, country)}))
        }}
        label="Phone Number"
        placeholder=""
        type="tel"
        variant="outlined"
        margin="normal"
        fullWidth
        required
        style={styles.phoneSelect}
      ></TextField>  
      
      <Button type="submit" color="primary" variant="contained">
        Next
      </Button>
    </form>
  );
}

const styles = { 
  countrySelect: {
    marginRight: '.25rem',
    width: 'calc(15% - 1rem)'
  },
  phoneSelect: {
    width: '85%'
  }
}

export default PersonalData;
