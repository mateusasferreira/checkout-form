import { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'

function ConfirmationStep() {
  const { userData, onFormSubmit } = useForm();

  const {zipValidation} = useValidation()

  const [readMode, setReadMode] = useState<boolean>(true);

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<number | null>(userData.id);
  const [street, setStreet] = useState<string>(userData.street);
  const [city, setCity] = useState<string>(userData.city);
  const [district, setDistrict] = useState<string>(userData.district);
  const [number, setNumber] = useState<string>(userData.number);
  const [zip, setZip] = useState<string>(userData.zip);

  const [errors, setErrors] = useState({
    zip: {
      unvalid: false, 
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
      if (errors.zip.unvalid) return
      onFormSubmit({name, id, street, number, city, district, zip})
    }}
    >
      <Button 
      variant="outlined" 
      color="primary" 
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
        label="Name"
        margin="normal"
        focused={!readMode}
        defaultValue={name}
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="id"
        value={id}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            const idNumber = parseInt(e.target.value);
            setId(idNumber);
          } else setId(null);
        }}
        label="ID Number"
        type="number"
        margin="normal"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="zip"
        error={errors.zip.unvalid}
        helperText={errors.zip.message}
        value={zip}
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
        label="Zip Code"
        focused={!readMode}
        margin="normal"
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="street"
        value={street}
        onChange={(e) => {
          setStreet(e.target.value);
        }}
        label="Street"
        focused={!readMode}
        margin="normal"
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="number"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
        label="Number"
        margin="normal"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
      />
      <TextField
        id="city"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        label="City"
        margin="normal"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="district"
        value={district}
        onChange={(e) => {
          setDistrict(e.target.value);
        }}
        label="District"
        focused={!readMode}
        margin="normal"
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />      
      
      <Button 
      variant="contained"
      type="submit"
      color="primary" 
      
      >
        Confirm and Submit
      </Button>
    </form>
  );
}

export default ConfirmationStep;
