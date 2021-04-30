import "./App.css";
import {CheckoutForm} from "./components/checkout/checkout-form";
import { Container, Typography } from "@material-ui/core";
import "fontsource-roboto";
import {FormContextProvider} from './contexts/formContext'

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <FormContextProvider>
          <CheckoutForm/>
        </FormContextProvider>        
      </Container>
    </div>
  );
}



export default App;


