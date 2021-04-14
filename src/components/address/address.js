import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";

function AddressRegistration() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  return (
    <form action="">
      <TextField
        value={street}
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
      <Button type="submit" color="primary" variant="contained">
        Register
      </Button>
    </form>
  );
}

export default AddressRegistration;
