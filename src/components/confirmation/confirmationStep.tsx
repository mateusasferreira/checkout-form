import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import {AsYouType} from 'libphonenumber-js'
import {makeStyles} from '@material-ui/core/styles'

import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'

const useStyles = makeStyles({
  nameInput: {
    marginBottom: '1rem',
    marginTop: '1rem',
    width: '75%',
    display: 'block'
  },
  normalInput: {
    marginBottom: '1rem',
    width: '50%'
  },
  button: {
    display: 'block'
  }
})


function ConfirmationStep() {
  const { userData, onFormSubmit } = useForm();

  const {nameValidation, zipValidation, idNumberValidation, phoneValidation} = useValidation()

  const classes = useStyles()

  const [readMode, setReadMode] = useState<boolean>(true);

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<string>(userData.id);
  const [street, setStreet] = useState<string>(userData.street);
  const [city, setCity] = useState<string>(userData.city);
  const [district, setDistrict] = useState<string>(userData.district);
  const [number, setNumber] = useState<string>(userData.number);
  const [zip, setZip] = useState<string>(userData.zip);
  const [phone, setPhone] = useState(userData.phone)

  const [errors, setErrors] = useState({
    name:{
      invalid: false,
      message: ''
    },
    zip: {
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


  function toggleReadMode() {
    setReadMode(!readMode);
  }

  return (
    <form action="submit"
    onSubmit={(e)=> {
      e.preventDefault();
      if (errors.zip.invalid || errors.idNumber.invalid || errors.phoneNumber.invalid || errors.name.invalid) return
      onFormSubmit({name, id, street, number, city, district, zip})
    }}
    >
      <Button 
      variant="outlined" 
      color="primary" 
      className={classes.button}
      onClick={toggleReadMode}
      >
        {readMode ? 'Edit Data' : 'Done' }
      </Button>
      
      <TextField
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        error={errors.name.invalid}
        helperText={errors.name.message}
        onBlur={()=>{
          setErrors(errors => ({...errors, name: nameValidation(name)}))
        }}
        label="Name"
        focused={!readMode}
        defaultValue={name}
        className={classes.nameInput}
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
        required
      />
      <TextField
        error={errors.idNumber.invalid}
        helperText={errors.idNumber.message}
        id="id"
        value={id}
        onChange={(e) => {
            setId(e.target.value);
        }}
        onBlur={(e)=> {
          setErrors(errors => ({...errors, idNumber: idNumberValidation(id)}))
        }}
        label="ID Number"
        type="text"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        className={classes.normalInput}
        fullWidth
        required
      />
      <TextField
        error={errors.phoneNumber.invalid}
        helperText={errors.phoneNumber.message}
        value={phone}
        onChange={(e) => {
          const phone = new AsYouType(userData.country).input(e.target.value)
          setPhone(phone);
        }}
        onBlur={()=>{
          setErrors(errors => ({...errors, phoneNumber: phoneValidation(phone, userData.country)}))
        }}
        label="Phone Number"
        type="tel"
        focused={!readMode}
        className={classes.normalInput}
        fullWidth
        required
      ></TextField> 
      <TextField
        id="zip"
        error={errors.zip.invalid}
        helperText={errors.zip.message}
        value={zip}
        type="text"
        onChange={(e) => {
          setZip(e.target.value);
        }}
        onBlur={async () => {
          const response = await zipValidation(zip)
          setErrors(errors => ({...errors, zip:response.validity})) 
          if(response.locationData) {
            setCity(response.locationData.city)
            setStreet(response.locationData.street)
            setDistrict(response.locationData.district)
          }
        }}
        label="Zip Code"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        className={classes.normalInput}
        fullWidth
        required
      />
      <TextField
        id="street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        label="Street"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        className={classes.normalInput}
        fullWidth
        required
      />
      <TextField
        id="number"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        label="Number"
        focused={!readMode}
        className={classes.normalInput}
        InputProps={{
          readOnly: readMode,
        }}
        required
      />
      <TextField
        id="city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        label="City"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        className={classes.normalInput}

        fullWidth
        required
      />
      <TextField
        id="district"
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
        }}
        label="District"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        className={classes.normalInput}
        fullWidth
        required
      />      
      
      <Button 
      variant="contained"
      type="submit"
      color="primary" 
      className={classes.button}
      >
        Confirm and Submit
      </Button>
    </form>
  );
}



export default ConfirmationStep;
