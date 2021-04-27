import {TextField, Button, InputLabel, Select, MenuItem} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "../../contexts/formContext";

function AddressRegistration() {
  const {onFormSubmit, handleBack} = useForm()
  
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [zip, setZip] = useState("");

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
        type="number"
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
      <Button onClick={handleBack} color="primary" variant="contained">
        Back
      </Button>
      <Button type="submit" color="primary" variant="contained">
        Register
      </Button>
    </form>
  );
}

export default AddressRegistration;
