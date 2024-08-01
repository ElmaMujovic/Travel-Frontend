
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const[email, setEmail] = useState("");
    const history = useNavigate();
    const [error, setError] = useState("");
    const handlerSubmit = async(e) =>
    {

        try{
        await axios.post(`http://edinak1-001-site1.ftempurl.com/api/Identity/reseting-pass`, 
        {
            codeConfirmation : email
        })
        history('/');}
        catch(e)
        {
            setError(e.response.data.error);
        }
        
    }
    if (error === "User does not exist.")
    return (
      <div className="verify-page">
        <h3 className="verify-page page">
          {error}
        </h3>
      </div>
    );
    return ( 

        <div className="verify-page">
            <div className="verify-page page">
            <p> Please enter email address associated with your account <br /> and we'll send you a link to reset your password:</p>
            <div className="verify-page inputs" style={{boxShadow:"1px solid black"}}>
            <input type="text" onChange={(e)=> setEmail(e.target.value)} /> 
            <input type="submit" onClick={handlerSubmit}  value="Send"/> 
            </div>
            </div>
           </div>
     );
}
 
export default ForgotPassword; 