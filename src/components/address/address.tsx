import {TextField, Button, InputLabel, Select, MenuItem} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'

 


function AddressRegistration() {
  const {onFormSubmit, previousStep} = useForm()
    
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [type, setType] = useState<unknown>("");
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  const [errors, setErrors] = useState({
    zip: {
      unvalid: false, 
      message: ''
    }
  })

  return (
    <form action="submit" onSubmit={(e) => {
      e.preventDefault()
      onFormSubmit({street, number, type, city, district, zip})}}>
      <TextField
        value={street}
        type="text"
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        variant="outlined"
        label="Street"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        value={number}
        type="text"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        variant="outlined"
        label="Number"
        margin="normal"
        required
      ></TextField>
      <InputLabel id="type-of-place">Type</InputLabel>
      <Select
        labelId="type-of-place"
        id="type"
        
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <MenuItem value="residential">Residential</MenuItem>
        <MenuItem value="comercial">Comercial</MenuItem>
      </Select>
      <TextField
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        variant="outlined"
        label="City"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        type="text"
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
        }}
        variant="outlined"
        label="District"
        margin="normal"
        required
      ></TextField>
      <TextField
        value={zip}
        error={errors.zip.unvalid}
        helperText={errors.zip.message}
        type="number"
        onChange={(e) => {
          setZip(e.target.value);
        }}
        variant="outlined"
        label="Zip Code"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <Button onClick={previousStep} color="primary" variant="contained">
        Back
      </Button>
      <Button type="submit" color="primary" variant="contained">
        Register
      </Button>
    </form>
  );
}

export default AddressRegistration;
