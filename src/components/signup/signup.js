import React, { useState } from "react";
import { TextField, Button, Switch, FormControlLabel } from "@material-ui/core";
import "./style.css";

function SignUpForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [discounts, setDiscounts] = useState(true);
  const [features, setFeatures] = useState(true);
  const [errors, setErrors] = useState(
    {password:{
      unvalid: false, 
      message:""
      }
    }
  )

  return (
    <form
      onSubmit={(e)=>{
        e.preventDefault();
        props.onSubmit({name, email, password, discounts, features})
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
      pattern='/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/'
        error={errors.password.unvalid}
        helperText={errors.password.message}
        onBlur={()=>{
          const validation = props.validation.password(password)
          setErrors({password:validation})
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
