import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";

function PersonalData() {
  const {onFormSubmit, handleBack} = useForm()
  const [name, setName] = useState("")

  return (
    <form action="submit"
    onSubmit={(e) => {
        e.preventDefault()
        onFormSubmit({name})}}
    >
      <TextField
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        variant="outlined"
        label="Full Name"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <Button onClick={handleBack} color="primary" variant="contained">
        Back
      </Button>
       <Button type="submit" color="primary" variant="contained">
        Next
      </Button>

    </form>
  );
}

export default PersonalData;
