import "./App.css";
import {CheckoutForm} from "./components/checkout/checkout-form";
import { Container} from "@material-ui/core";

import {makeStyles} from '@material-ui/core/styles'
import "fontsource-roboto";
import {FormContextProvider} from './contexts/formContext'

const useStyles =  makeStyles({
  container: {
    backgroundColor: 'white',
    padding: '2rem 2rem 4rem 2rem',
    borderRadius: '15px',
    boxShadow: '1px 2px 5px #7C7C7C',    
  }
})


function App() {

  const classes = useStyles()

  return (
    <div className="App">
      
      <Container className={classes.container} maxWidth="xs">
        <FormContextProvider>
          <CheckoutForm/>
        </FormContextProvider>        
      </Container>
    </div>
  );
}



export default App;


