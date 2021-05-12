import "./style.css"


function SucessWarning(){
     return(
         <div className="sucess">
             <img src={process.env.PUBLIC_URL + '/success.svg'} alt=""/>        
             <h1>Thank you!</h1>
             <h3>Your registration is complete</h3>
         </div>
     )
}

export default SucessWarning