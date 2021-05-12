import {TextField, Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'

import { useState } from "react";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'
 
const useStyle = makeStyles({
  shortLeftInput: {
    marginRight: '.5rem',
    marginBottom: '1rem',
    width: 'calc(50% - 1rem)',
  },
  shortRightInput: {
    marginBottom: '1rem',
    width: '50%'
  },
  longLeftInput: {
    marginRight: '.5rem',
    marginBottom: '1rem',
    width: 'calc(75% - .5rem)',
  },
  extraShortRightInput: {
    marginBottom: '1rem',
    width: '25%'
  },
  previousButton: {
   float: 'left' 
  },
  nextButton: {
    float: 'right'
  }
})

function AddressRegistration() {
  const {onFormSubmit, previousStep} = useForm()
  const {zipValidation} = useValidation()
    
  const classes = useStyle()

  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const [errors, setErrors] = useState({
    zip: {
      invalid: false, 
      message: ''
    } 
  })

  return (
    <>
      <form 
        className="registrationForm"
        action="submit" 
        onSubmit={(e) => {
        e.preventDefault()
        if (errors.zip.invalid) return
        onFormSubmit({street, number, city, district, zip})}}>
        <TextField
          value={zip}
          error={errors.zip.invalid}
          helperText={errors.zip.message}
          type="text"
          onChange={(e) => {
            setZip(e.target.value);
          }}
          onBlur={async () => {
            const response = await zipValidation(zip)
            setErrors({zip:response.validity}) 
            if(response.locationData) {
              setCity(response.locationData.city)
              setStreet(response.locationData.street)
              setDistrict(response.locationData.district)
            }
          }}
          variant="filled"
          size="small"
          label="Zip Code" 
          className={classes.shortLeftInput}   
          required
        ></TextField>
        
        <TextField
          value={street}
          type="text"
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          variant="filled"
          size="small"
          label="Street"
          className={classes.longLeftInput}
          required
        ></TextField>
        <TextField
          value={number}
          type="text"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          variant="filled"
          size="small"
          label="Number"
          className={classes.extraShortRightInput}
          required
        ></TextField>
        
        <TextField
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          variant="filled"
          size="small"
          label="City"
          className={classes.shortLeftInput}
          required
        ></TextField>
        <TextField
          type="text"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
          variant="filled"
          size="small"
          label="District"
          required
          className={classes.shortRightInput}
        ></TextField>
        <Button onClick={previousStep} className={classes.previousButton} color="primary" variant="contained">
          Back
        </Button>
        <Button type="submit" className={classes.nextButton} color="primary" variant="contained">
          Next
        </Button>
        
      </form>

        
    </>
  );
}



export default AddressRegistration;
