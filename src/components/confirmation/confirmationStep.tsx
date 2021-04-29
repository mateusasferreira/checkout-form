import { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import { useForm } from "../../contexts/formContext";

function ConfirmationStep() {
  const [readMode, setReadMode] = useState<boolean>(true);
    const [variant, setVariant] = useState('standard')
  const { userData } = useForm();

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<number | null>(userData.id);
  const [street, setStreet] = useState<string>(userData.street);
  const [city, setCity] = useState<string>(userData.number);
  const [district, setDistrict] = useState<string>(userData.district);
  const [number, setNumber] = useState<string>(userData.number);
  const [zip, setZip] = useState<string>(userData.zip);

  function toogleReadMode() {
    setReadMode(false);
    setVariant('outlined')
  }

  return (
    <form action="submit">
      
      <TextField
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        label="Name"
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
                const idNumber = parseInt(e.target.value)
                setId(idNumber)
            } else setId(null)    
        }}
        label="ID Number"
        type="number"
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
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <TextField
        id="number"
        value={number}
        onChange={(e) => {
            setNumber(e.target.value)
        }}
        label="Number"
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
        InputProps={{
          readOnly: readMode,
        }}
        fullWidth
      />
      <Button variant="outlined" color="primary" onClick={toogleReadMode}>
        Primary
      </Button>
    </form>
  );
}

export default ConfirmationStep;
