import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'


function PersonalData() {
  const { onFormSubmit, userData } = useForm();

  const {idNumberValidation} = useValidation()

  const [name, setName] = useState<string>(userData.name);
  const [id, setId] = useState<string>(userData.id);

  const [errors, setErrors] = useState({
    idNumber: {
      unvalid: false,
      message: ''
    }
  })


  return (
    <form
    className="signInForm"
      action="submit"
      onSubmit={(e) => {
        e.preventDefault();
        if (errors.idNumber.unvalid) return
        onFormSubmit({ name, id });
      }}
    >
      <TextField
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder='Name Surname'
        variant="outlined"
        label="Full Name"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        error={errors.idNumber.unvalid}
        helperText={errors.idNumber.message}
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
        onBlur={()=>{
          setErrors(errors => ({...errors, idNumber: idNumberValidation(id)}))
        }}
        variant="outlined"
        type="text"
        label="ID Number (CPF)"
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
