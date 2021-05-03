import {TextField, Button, InputLabel, Select, MenuItem} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'

 


function AddressRegistration() {
  const {onFormSubmit, previousStep, userData} = useForm()
  const {zipValidation} = useValidation()
    
  const [street, setStreet] = useState<string>(userData.street);
  const [number, setNumber] = useState<string>(userData.number);
  const [type, setType] = useState<unknown>(userData.type);
  const [city, setCity] = useState<string>(userData.city);
  const [district, setDistrict] = useState<string>(userData.district);
  const [zip, setZip] = useState<string>(userData.zip);

  const [errors, setErrors] = useState({
    zip: {
      unvalid: false, 
      message: ''
    }
  })

  return (
    <form action="submit" onSubmit={(e) => {
      e.preventDefault()
      if (errors.zip.unvalid) return
      onFormSubmit({street, number, type, city, district, zip})}}>
      <TextField
        value={zip}
        error={errors.zip.unvalid}
        helperText={errors.zip.message}
        type="text"
        onChange={(e) => {
          setZip(e.target.value);
        }}
        onBlur={async () => {
          const response = await zipValidation(zip)
          setErrors({zip:response.validity}) 
          if(response.locationData) {
            setCity(response.locationData.city)
            setStreet(response.locationData.street)
            setDistrict(response.locationData.district)
          }
        }}
        variant="outlined"
        label="Zip Code"
        margin="normal"
        required
      ></TextField>
      <TextField
        value={street}
        type="text"
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        variant="outlined"
        label="Street"
        margin="normal"        
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
        <MenuItem value="residential" selected>Residential</MenuItem>
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
