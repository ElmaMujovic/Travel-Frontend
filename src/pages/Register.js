import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { regexName, regexSurname, regexEmail, regexPassword, regexLocation } from '../Validation/Regex';
import addNotification, { Notifications } from 'react-push-notification';
import showPwdImg from './images/show-password.svg';
import hidePwdImg from './images/hide-password.svg';

const Register = () => {
    const [email, setEmail] = useState({value:"", isValid:true});
    const [password, setPassword] = useState({value:"", isValid:true});
    const [firstName, setFirstname] = useState({value:"", isValid:true});
    const [lastName, setLastname] = useState({value:"", isValid:true});
    const [year, setYear] = useState({value:"", isValid:true});
    const [city, setCity] = useState({value:"", isValid:true});
    const [confirmPass, setConfirmPass] = useState({value:"", isValid:true});
    const [message, setMessage] = useState("");
    const [hasError, setHasError] = useState(null);
    const   [isRevealPwd, setIsRevealPwd] = useState(false);
    const [error, setError] = useState("");
    const[path, setPath] = useState(null);
    const navigate = useNavigate();
    const sleep = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    function successNotification() {
        addNotification({
            title: 'Success',
            subtitle: 'You have successfully registered',
            message: 'Welcome to Car2Go',
            theme: 'light',
            closeButton: "X",
            backgroundTop: "violet",
            backgroundBottom: "lightviolet"
        })
    };

    const validate = (value, type, regex = null) => {
        let valid = false;
    
        if (type === "text") {
          valid = value.trim() !== "";
        } else if (type === "email") {
          valid = value.includes("@");
        } else if (type === "number") {
          valid = value > 0 && value !== "";
        } else if (type === "password"){
            valid = value !== ""
        }
        if (regex === null) {
          return valid;
        }
        return valid && regex.test(value);
      };
    //const [ime, setIme] = useState({ value: '', isValid: true })

    const onSubmitHandler =  (e) => {
        e.preventDefault();

     

        setHasError(null);
        setFirstname({...firstName, isValid: true});
        setLastname({...lastName, isValid:true});
        setEmail({...email, isValid:true});
        setPassword({...password, isValid:true});
        setConfirmPass({...confirmPass, isValid:true});
        setYear({...year, isValid:true});
        setCity({...city, isValid:true});

        console.log(password);
        console.log(confirmPass);
        if (!validate(firstName.value, "text", regexName)) {
            setHasError("Please enter valid first name");
            setFirstname({ ...firstName, isValid: false });
            return;
          }
        if (!validate(lastName.value, "text", regexSurname)) {
        setHasError("Please enter valid last name");
        setLastname({ ...lastName, isValid: false });
        return;
        }

        if (!validate(email.value, "email", regexEmail)) {
            setHasError("Please enter valid email");
            setEmail({ ...email, isValid: false });
            return;
          }
        if (!validate(password.value, "password", regexPassword)) {
        setHasError("Please enter valid password");
        setPassword({ ...password, isValid: false });
        return;
        
        }
        if(confirmPass.value !== password.value)
        {
            
            setHasError("Passwords don't match");
            setConfirmPass({...confirmPass, isValid:false});
            return;
            
        }

        if (!validate(city.value, "text", regexLocation)) {
            setHasError("Please enter valid city");
            setCity({ ...city, isValid: false });
            return;
          }
       
        
        

        
        RegisterAsync();

        setFirstname({ value: "", isValid: false });
        setLastname({ value: "", isValid: false });
        setEmail({ value: "", isValid: false });
        setPassword({ value: "", isValid: false });
        setConfirmPass({ value: "", isValid: false });
        setCity({ value: "", isValid: false });
        setYear({ value: "", isValid: false });
        
       
    
    }


    const RegisterAsync = async (e) =>
    {
        const formData = new FormData();
        formData.append("userRegister.Ime", firstName.value);
        formData.append("userRegister.Prezime", lastName.value);
        formData.append("userRegister.Email", email.value);
        formData.append("userRegister.Username", email.value);
        formData.append("userRegister.Password", password.value);
        formData.append("userRegister.Godina", year.value);
        formData.append("userRegister.Grad", city.value);
        formData.append("role", "user");
        formData.append("path", path)
        try {
            await axios.post('https://localhost:7016/api/Identity/register', formData)
            successNotification();
            await sleep(2000);
            navigate('/');

        } catch (error) {
            if (error.response.data.error === `User with ${email} email are registered`) {
                setError(error.response.data.error)
            }

            console.log(error)

        }
    }
    return (
        <div className='page login-page'>
            <Notifications />
            <div className='login-card' style={{ height: "600px", marginTop: "8rem", marginBottom: "5rem" }}>

                <form onSubmit={onSubmitHandler}>
                    <h1>Create your account</h1>
                    <div className='form-control-two'>
                        <div className='form-control'>
                            <label>First name</label>
                            <input type='text' onChange={(e) => setFirstname({ ...firstName, value: e.target.value })} value={firstName.value}/>
                            {!firstName.isValid && hasError && <div className='val'>Your first name is invalid</div>}
                        </div>
                        <div className='form-control'>
                            <label>Last name</label>
                            <input type='text' onChange={(e) => setLastname({ ...lastName, value: e.target.value })} value={lastName.value}/>
                            {!lastName.isValid && hasError && <div className='val'>Your last name is invalid</div>}
                        </div>
                    </div>
                    <div className='form-control'>
                        <label>Email</label>
                        <input type='email' onChange={(e) => { setEmail({ ...email, value: e.target.value }); }} value={email.value}/>
                        {!email.isValid && hasError && <div className='val'>Your email is invalid</div>}
                    </div>

                    <div className='form-control-two'>
                        <div className='form-control'>
                            <label>Password</label>
                            <div className='pwd-container'>
                            <input type={isRevealPwd? "text" : "password"} onChange={(e) => setPassword({ ...setPassword, value: e.target.value })} onFocus={() => { setMessage("Password must be 8 characters, contain 1 uppercase, lowercase, number, special character") }} onBlur={() => { setMessage("") }} value={password.value}  />
                            <img
                                alt=''
                                title={isRevealPwd ? "Hide password" : "Show password"}
                                src={isRevealPwd ? hidePwdImg : showPwdImg}
                                onClick={() => setIsRevealPwd(prevState => !prevState)}
                               
                                />
                            </div>
                            {!password.isValid && hasError && <div className='val'>Your password is invalid</div>}
                            {<div className='val'>{message}</div>}
                        </div>

                        <div className='form-control'>
                            <label>Confirm your password</label>
                                <input type={isRevealPwd? "text" : "password"} onChange={(e) => setConfirmPass({ ...confirmPass, value: e.target.value })} value={confirmPass.value} />
                            {!confirmPass.isValid && hasError && <div className='val'>Passwords do not match</div>}
                        </div>
                    </div>

                    <div className='form-control'>
                        <label>Image</label>
                        <input type='file' onChange={(e) => setPath(e.target.files[0])} onFocus={() => { }} />
                        {!year.isValid && hasError && <div className='val'>Phone Number is invalid</div>}

                    </div>

                    <div className='form-control'>
                        <label>Year</label>
                        <input type='text' onChange={(e) => setYear({...year, value:e.target.value})} value={year.value} onFocus={() => { }} />
                    </div>

                    <div className='form-control'>
                        <label>City</label>
                        <input type='text' onChange={(e) => setCity({ ...city, value: e.target.value })}  value={city.value}/>
                        {!city.isValid && hasError && <div className='val'>City is invalid</div>}
                    </div>

                    {error && <div style={{ fontWeight: "bold", textAlign: "center" }}>{error}</div>}
                    <div className='form-control'>
                        <input type='submit' value='Sign up' />
                        <div></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register