import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

function PersonalData(props) {
  const [name, setName] = useState("");

  return (
    <form action="submit"
    onSubmit={(e) => {
        e.preventDefault()
        props.onSubmit({name})}}
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
      <Button onClick={props.handleBack} color="primary" variant="contained">
        Back
      </Button>
       <Button type="submit" color="primary" variant="contained">
        Next
      </Button>

    </form>
  );
}

export default PersonalData;
