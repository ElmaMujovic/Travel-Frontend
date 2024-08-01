import axios from "axios";
import React, {  useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMainContext } from '../context/main-context';
import { regexName, regexSurname,regexPassword, regexPhone, regexLocation } from '../Validation/Regex';

const UpdateProfile = () => {
    const{user, onSetUserHandler} = useMainContext();
    const navigate  = useNavigate();
    const [firstName, setFirstName] = useState({value:"", isValid: true});
    const [lastName, setLastName] = useState({value:"", isValid:true});
    const [city, setCity] = useState({value:"", isValid: true});
    const [phoneNumber,setPhoneNumber] = useState({value:"", isValid:true});
    const [image, setImage] = useState({value:null, isValid:true});
    const [currentPassword, setCurrentPassword] = useState({value:"old", isValid:true});
    const [newPassword, setNewPassword] = useState({value:"new", isValid:true});
    const [hasError, setHasError] = useState(null);
    const [message, setMessage] = useState("");
    const [passwordCorrect, setPasswordCorrect] = useState("");

    const validate = (value, type, regex = null) => {
        let valid = false;
    
        if (type === "text") {
          valid = value.trim() !== "";
        } else if (type === "email") {
          valid = value.includes("@");
        } else if (type === "number") {
          valid = value > 0 && value !== "";
        } 
        if(type === "password")
        {
            valid = true
        }
        if (regex === null) {
          return valid;
        }
        return valid && regex.test(value);
      };

    useEffect(() =>
    {
        if(user)
        {
            setFirstName((oldstate) => ({...oldstate, value: user.user.firstName}));
            setLastName((oldstate=> ({...oldstate, value:user.user.lastName})));
            setCity((oldstate) => ({...oldstate, value:user.user.city}));
            setPhoneNumber((oldstate) => ({...oldstate, value:user.user.phoneNumber}));
            setImage((oldstate) => ({...oldstate, value:user.user.image}))
            setPasswordCorrect("");
            console.log(currentPassword.value)

        }
    }, [user])

   const submitHandler = async(e) =>
   {
        e.preventDefault();

        setFirstName({...firstName, isValid:true});
        setLastName({...lastName, isValid:true});
        setCurrentPassword({...currentPassword, isValid:true});
        setNewPassword({...newPassword, isValid:true});
        setCity({...city, isValid:true});
        setPhoneNumber({...phoneNumber, isValid:true});
        setImage({...image, isValid:true});

        if (!validate(firstName.value, "text", regexName)) {
            setHasError("Please enter valid first name");
            setFirstName({ ...firstName, isValid: false });
            return;
          }
        if (!validate(lastName.value, "text", regexSurname)) {
        setHasError("Please enter valid last name");
        setLastName({ ...lastName, isValid: false });
        return;
        }

        if(newPassword.value !== "new"){
        if (!validate(newPassword.value, "password", regexPassword)) {
            setHasError("Please enter valid password");
            setNewPassword({ ...newPassword, isValid: false });
            return;
            
            }}

        if (!validate(phoneNumber.value, "number", regexPhone)) {
            setHasError("Please enter valid phone number");
            setPhoneNumber({ ...phoneNumber, isValid: false });
            return;
            }
        if (!validate(city.value, "text", regexLocation)) {
            setHasError("Please enter valid city");
            setCity({ ...city, isValid: false });
            return;
            }

        
        const formData = new FormData();

        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('email', user.user.email)
        formData.append('path', image.value);
        formData.append('id', user.user.id);
        formData.append('phoneNumber', phoneNumber.value);
        formData.append('city', city.value);
        formData.append('currentPassword', currentPassword.value);
        formData.append('newPassword', newPassword.value);
        
        
       
        try{
            
        //console.log("USER PRE", user);
        const response = await axios.patch('http://edinak1-001-site1.ftempurl.com/api/User', formData)
        console.log(response.data.message); 
        user.user = response.data.userResponse;
        onSetUserHandler(user);
        setPasswordCorrect(response.data.message)
        localStorage.setItem("user", JSON.stringify(user))
            //console.log(user.token)
            //console.log(user);
            axios.defaults.headers.common[  
                "Authorization"
            ] = `Bearer ${user.token}`;
        if(response.data.message === "")
        {
            navigate('/profile');
        }
       
       
    }
        catch(e)
        {
            console.log(e);
        }

        
   }
   

  
    return ( 

       <div className="page profile-page">
        <div className="user-info">
            <div className="user-image">
               {user &&<img src={`http://edinak1-001-site1.ftempurl.com/images/` + user.user.image} alt="" />}
               {user &&  <input type="file" onChange={(e) => setImage({...image, value:e.target.files[0]})} name="image" id="image" style={{marginTop:"2rem"}} />}
               
            </div>
            <div className="user-details">
                <form action="" onSubmit={submitHandler}>
            <label htmlFor="">First Name:</label> <br />
            {user && <input type="text"  onChange={(e) => setFirstName({...firstName, value:e.target.value})} value={firstName.value}/> }<br /> 
            {!firstName.isValid && hasError && <div className='val'>Your first name is invalid</div>}

            <label htmlFor="">Last Name:</label> <br />
            {user &&  <input type="text" onChange={(e) => setLastName({...lastName, value:e.target.value})} value={lastName.value} />} <br />
            {!lastName.isValid && hasError && <div className='val'>Your last name is invalid</div>}

            <label htmlFor="">Current Password:</label> <br />
            {user && <input type="text" onChange={(e) => setCurrentPassword({...currentPassword, value:e.target.value})} placeholder="..."  />} <br /> 
            {passwordCorrect !== ""? <div className='val'>Your password is incorrect</div> : ""}

            <label htmlFor="">New Password:</label> <br />
            {user && <input type="text" onChange={(e) => setNewPassword({...newPassword, value:e.target.value})} placeholder="..."  onFocus={() => { setMessage("Password must be 8 characters, contain 1 uppercase, lowercase, number, special character") }} onBlur={() => { setMessage("") }} />} <br /> 
            {!newPassword.isValid && hasError && <div className='val'>Your password is invalid</div>}
            {<div className='val'>{message}</div>}

            <label htmlFor="">City:</label> <br />
            {user && <input type="text" onChange={(e) => setCity({...city, value:e.target.value})} value={city.value} />} <br /> 
            {!city.isValid && hasError && <div className='val'>City is invalid</div>}

            <label htmlFor="">Phone Number:</label> <br />
            {user && <input type="text" onChange={(e) => setPhoneNumber({...phoneNumber, value:e.target.value})}  value={phoneNumber.value}/>} <br /> 
            {!phoneNumber.isValid && hasError && <div className='val'>Phone Number is invalid</div>} <br />

            <input type="submit" value="Save changes"/>

            </form>
           
            </div>
        </div>
       </div>
     );
}
 
export default UpdateProfile;