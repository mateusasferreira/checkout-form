import React, { useState } from "react";
import { TextField, Button, Switch, FormControlLabel } from "@material-ui/core";
import "./style.css";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'

function SignUpForm() {
  const {passwordValidation} = useValidation()
  
  const {onFormSubmit} = useForm()
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discounts, setDiscounts] = useState(true);
  const [features, setFeatures] = useState(true);
  const [errors, setErrors] = useState({
    password: {
      unvalid: false,
      message: "",
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit({ email, password, discounts, features });
      }}
    >
      
      <TextField
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        variant="outlined"
        label="Email"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        error={errors.password.unvalid}
        helperText={errors.password.message}
        onBlur={() => {          
          setErrors({ password: passwordValidation(password) });
        }}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        variant="outlined"
        label="Password"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <FormControlLabel
        label="Discounts"
        control={
          <Switch
            checked={discounts}
            onChange={(e) => {
              setDiscounts(e.target.checked);
            }}
            name="promoções"
            color="primary"
          />
        }
      />
      <FormControlLabel
        label="New Features"
        control={
          <Switch
            checked={features}
            onChange={(e) => {
              setFeatures(e.target.checked);
            }}
            name="promoções"
            color="primary"
          />
        }
      />

      <Button type="submit" color="primary" variant="contained">
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
