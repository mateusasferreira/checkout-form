import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";

function PersonalData() {
  const { onFormSubmit, userData } = useForm();
  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<number | null>(userData.id);

  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit({ name, id });
      }}
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
      <TextField
        value={id}
        onChange={(e) => {
          const idNumber = parseInt(e.target.value);
          setId(idNumber);
        }}
        variant="outlined"
        type="number"
        label="ID Number"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <Button type="submit" color="primary" variant="contained">
        Next
      </Button>
    </form>
  );
}

export default PersonalData;
