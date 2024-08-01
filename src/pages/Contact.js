import React from 'react';
import img from './images/pismo.png';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';


const Contact = () => {
    const form = useRef();
     const  sendEmail = (e) =>
     {
         e.preventDefault();

        emailjs.sendForm("service_syhnuyn", "template_qkotygu", form.current, "yqJjHl9yEAsw2SdII").then(
            res => {
                console.log(res);
                alert("You have successfully sent the email");

            }).catch(err => console.log(err));
      
        
    }
    return (
        <div className="page contact-page">
        <div className="contactform" >
            <div className='contactimg' >
                
                <img src={img} alt="" />
                <p>If you have a question or just want to get in touch, use the form below. </p>
                </div>
            
                <div className='formC'>
                <h1 className='h1' style={{marginLeft:"20rem"}}>Contact Us</h1><br /><br />
                    <form action="" onSubmit={sendEmail} ref={form}>
                            
                            <input type="text" name="user_name" id="" placeholder='Name' required /> <br /> <br />
                            <input type="text" name="user_email" id="" placeholder='E-mail' required/> <br /> <br />
                            <textarea name="message" id="" cols="30" rows="10" placeholder='Message' required></textarea> <br /> <br />
                            <input type='submit' value='Send' style={{margin:"auto", color:"white", backgroundColor:"rgb(199, 209, 245)", marginBottom: "5px", marginLeft:"7px"}} />
                         
                    </form>
                  
                </div>
        </div>
        </div>
      );

}
 
export default Contact;