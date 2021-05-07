import {TextField, Button} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "../../contexts/formContext";
import {useValidation} from '../../contexts/validationContext'
 


function AddressRegistration() {
  const {onFormSubmit, previousStep} = useForm()
  const {zipValidation} = useValidation()
    
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [zip, setZip] = useState<string>('');

  const [errors, setErrors] = useState({
    zip: {
      unvalid: false, 
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
        if (errors.zip.unvalid) return
        onFormSubmit({street, number, city, district, zip})}}>
        <TextField
          value={zip}
          error={errors.zip.unvalid}
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
          variant="outlined"
          label="Zip Code" 
          style={styles.shortLeftInput}   
          required
        ></TextField>
        
        <TextField
          value={street}
          type="text"
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          variant="outlined"
          label="Street"
          style={styles.longLeftInput}
          required
        ></TextField>
        <TextField
          value={number}
          type="text"
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          variant="outlined"
          label="Number"
          style={styles.extraShortRightInput}
          required
        ></TextField>
        
        <TextField
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          variant="outlined"
          label="City"
          style={styles.shortLeftInput}
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
          required
          style={styles.shortRightInput}
        ></TextField>
        <Button onClick={previousStep} style={styles.button} color="primary" variant="contained">
          Back
        </Button>
        <Button type="submit" color="primary" variant="contained">
          Next
        </Button>
        
      </form>

        
    </>
  );
}

const styles = {
  shortLeftInput: {
    marginRight: '1rem',
    marginBottom: '1rem',
    width: 'calc(50% - 1rem)',
  },
  shortRightInput: {
    marginBottom: '1rem',
    width: '50%'
  },
  longLeftInput: {
    marginRight: '1rem',
    marginBottom: '1rem',
    width: 'calc(75% - 1rem)',
  },
  extraShortRightInput: {
    marginBottom: '1rem',
    width: '25%'
  },
  button: {
   marginRight: '1rem' 
  }
}

export default AddressRegistration;
