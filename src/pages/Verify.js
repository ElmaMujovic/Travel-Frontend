import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {

    const[code, setCode] = useState("");
    const history = useNavigate();
    const [error, setError] = useState(false);
    const handlerSubmit = async(e) =>
    {

        try {
        await axios.put(`http://edinak1-001-site1.ftempurl.com/api/Identity/verify`,
        {
            codeConfirmation : code
        })
        history('/');}
        catch(e)
        {
            setError(true);
            
        }
        
    };

    if (error)
    return (
      <div className="verify-page" style={{height:"740px"}} >
        <h3 style={{marginTop:"7rem"}}>
          Something went wrong.
        </h3>
      </div>
    );

    return ( 

        <div className="verify-page" style={{height:"740px"}}>
            <div className="verify-page page">
            <p> Molim Vas unesite kod ovde:</p>
            <div className="verify-page inputs">
            <input type="text" onChange={(e)=> setCode(e.target.value)} /> 
            <input type="submit" value="Send" onClick={handlerSubmit}  />
            </div>
            </div>
           </div>
     );
}
 
export default Verify;