const validation = {
    password: (input) => {
     const regexValid = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)   
     if (!regexValid.test(input)){
       return {unvalid:true, message: 'your password must have at least 8 characters, one uppercase letter and one number'}
     } else {
       return {unvalid:false, message: ''}
     }
    }
   }

export default validation;