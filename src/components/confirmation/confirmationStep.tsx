import { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import { useForm } from "../../contexts/formContext";

function ConfirmationStep() {
  const [readMode, setReadMode] = useState<boolean>(true);
  const [variant, setVariant] = useState("standard");
  
  const { userData, onFormSubmit } = useForm();

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<number | null>(userData.id);
  const [street, setStreet] = useState<string>(userData.street);
  const [city, setCity] = useState<string>(userData.number);
  const [district, setDistrict] = useState<string>(userData.district);
  const [number, setNumber] = useState<string>(userData.number);
  const [zip, setZip] = useState<string>(userData.zip);

  function toggleReadMode() {
    setReadMode(!readMode);
    setVariant("outlined");
  }

  return (
    <form action="submit">
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
        focused={!readMode}
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
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
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
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="zip"
        value={zip}
        onChange={(e) => {
          setZip(e.target.value);
        }}
        label="Zip Code"
        focused={!readMode}
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      
      <Button 
      variant="contained"
      color="primary" 
      onClick={(e)=> {
        e.preventDefault();
        onFormSubmit({name, id, street, number, city, district, zip})
      }}
      >
        Confirm and Submit
      </Button>
    </form>
  );
}

export default ConfirmationStep;
