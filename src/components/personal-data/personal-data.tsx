import { useState } from "react";
import {makeStyles} from '@material-ui/core/styles'

import { TextField, Button, MenuItem } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'
import { AsYouType, getCountries } from 'libphonenumber-js'

const useStyles = makeStyles({ 
  countrySelect: {
    marginRight: '.25rem',
    width: 'calc(20% - .25rem)'
  },
  phoneSelect: {
    width: '80%'
  },
  button: {
    float: 'right'
  }
})

function PersonalData() {
  const { onFormSubmit, userData } = useForm();

  const {nameValidation, idNumberValidation, phoneValidation} = useValidation()

  const classes = useStyles()

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<string>(userData.id);
  const [phone, setPhone] = useState<string>(userData.phone)

  const [country, setCountry] = useState<any>(userData.country || 'BR')
  const countryList = getCountries()

  const [errors, setErrors] = useState({
    name:{
      invalid: false,
      message: ''
    },
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
        if (errors.idNumber.invalid || errors.idNumber.invalid || errors.name.invalid) return
        onFormSubmit({ name, id, phone, country });
      }}
      noValidate
      
    >
      <TextField
        value={name}
        error={errors.name.invalid}
        helperText={errors.name.message}
        onBlur={(e)=>{
          setErrors(errors => ({...errors, name: nameValidation(name || e.target.value)}))
        }}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder='Name Surname'
        variant="filled"
        size="small"
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
        onBlur={(e)=>{
          if(e.target.value.length === 0) return
          setErrors(errors => ({...errors, idNumber: idNumberValidation(id)}))
        }}
        variant="filled"
        size="small"
        type="text"
        label="ID Number (CPF)"
        margin="normal"
        fullWidth
        required
      ></TextField>

      <TextField
        id="standard-select-currency"
        select
        variant="filled"
        size="small"
        margin="normal"
        value={country}
        onChange={(e)=>{
          setCountry(e.target.value)
        }}
        className={classes.countrySelect}
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
          const phone = new AsYouType(country).input(e.target.value)
          setPhone(phone);
        }}
        onBlur={(e)=>{
          if(e.target.value.length === 0) return
          setErrors(errors => ({...errors, phoneNumber: phoneValidation(phone, country)}))
        }}
        label="Phone Number"
        placeholder=""
        type="tel"
        variant="filled"
        size="small"
        margin="normal"
        fullWidth
        required
        className={classes.phoneSelect}
      ></TextField>  
      
      <Button className={classes.button} type="submit" color="primary" variant="contained">
        Next
      </Button>
    </form>
  );
}



export default PersonalData;
