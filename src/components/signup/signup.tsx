import { useState } from "react";
import { TextField, Button, Switch, FormControlLabel } from "@material-ui/core";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'


function SignUpForm() {
  const {passwordValidation, emailValidation, passwordConfirmValidation} = useValidation()
  
  const {onFormSubmit} = useForm()
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [discounts, setDiscounts] = useState<boolean>(true);
  const [features, setFeatures] = useState<boolean>(true);
  const [errors, setErrors] = useState({
    password: {
      unvalid: false,
      message: '',
    },
    passwordConfirm:{
      unvalid: false,
      message: '',
    },
    email: {
      unvalid: false,
      message: "",
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (errors.password.unvalid || errors.email.unvalid || errors.passwordConfirm.unvalid) return 
        onFormSubmit({ email, password, discounts, features });
      }}
    >
      
      <TextField
        value={email}
        error={errors.email.unvalid}
        helperText={errors.email.message}
        placeholder='user@email.com'
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        onBlur={()=> {
          setErrors(errors => ({...errors, email: emailValidation(email)}));
        }}
        variant="outlined"
        label="Email"
        margin="normal"
        fullWidth
        required
      ></TextField>
      <TextField
        error={errors.password.unvalid}
        type="password"
        helperText={errors.password.message}
        placeholder='e.g. Testing123'
        onBlur={() => {          
          setErrors(errors => ({...errors, password: passwordValidation(password)}));
        }}
        onFocus={()=>{
          setErrors(errors => ({...errors, password:{unvalid:false, message: 'Disclaimer: this is just a prototype for testing, do not provide real passwords. Try something like \'Testing123\'.'}}))
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
      <TextField
        error={errors.passwordConfirm.unvalid}
        type="password"
        helperText={errors.passwordConfirm.message}
        placeholder='e.g. Testing123'
        onBlur={() => {          
          setErrors(errors => ({...errors, passwordConfirm: passwordConfirmValidation(password, passwordConfirm)}));
        }}
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        
        variant="outlined"
        label="Confirm Password"
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
