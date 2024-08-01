
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { regexPassword} from '../Validation/Regex';


const ResetPassword = () => {

    const[password, setPassword] = useState("");
    const history = useNavigate();
    const {token} = useParams();
    const [message, setMessage] = useState("");
    const [hasError, setHasError] = useState(null);

    const userObject = jwt_decode(token)
    console.log(userObject.id);

    const validate = (value, type, regex = null) => {
        let valid = false;
    
        if (type === "password"){
            valid = value !== ""
        }
        if (regex === null) {
          return valid;
        }
        return valid && regex.test(value);
      };
    const handlerSubmit = async(e) =>
    {

        if (!validate(password, "password", regexPassword)) {
            setHasError("Please enter valid password");
            setPassword(password);
            return;}
        else {
        await axios.post(`http://edinak1-001-site1.ftempurl.com/api/Identity/reset-password`,
        {
            id : userObject.id,
            password : password
        })
        history('/');
    }
        
    }
    
    return ( 

        <div className="verify-page" style={{height:"737px"}}>
            <div className="verify-page page" style={{marginTop:"0rem"}}>
            <p> Please enter new password:</p>
            <input type="text" onChange={(e)=> setPassword(e.target.value)}  onFocus={() => { setMessage("Password must be 8 characters, contain 1 uppercase, lowercase, number, special character") }} onBlur={() => { setMessage("") }}  /> 
            {!password.isValid && hasError && <div className='val'>Your password is invalid</div>}
                            {<div className='val'>{message}</div>}
                            <br />
            <input type="submit" onClick={handlerSubmit}  />
            </div>
           </div>
     );
}
 
export default ResetPassword;