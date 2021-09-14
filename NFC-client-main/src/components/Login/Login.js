import React,{useState,useCallback} from 'react';
import "./Login.css"
import '../Style/style.css'
import { Button } from '../Button/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Profile} from '../Profile/Profile';
import axios from "axios";
import { useHistory } from "react-router-dom";

var CryptoJS = require("crypto-js");


export const Login = ({colors,setToken,userAuth}) => {
  const navigate = useHistory();
  const [usernameAuth, setUsernameAuth] = useState("");
  const [phoneNumerAuth, setphoneNumerAuth] = useState("");
  const [bupe, setBupe] = useState("");


  const user = { 
    "beep_name":`${usernameAuth}`,
    "profile_description":"BIO",
    "profile_link":`${usernameAuth}`,
    "profile_phoneNumber":`${phoneNumerAuth}`,
    "social_media":{"instagram":{"instagram_id":null,"instagram_name":null},
                    "snapchat":{"snapchat_id":null,"snapchat_name":null},
                    "twitter":{"twitter_id":null,"twitter_name":undefined},  
                    "facebook":{"facebook_id":null,"facebook_name":null}},
    "bupe":bupe,
    "profile_pic":[[""]]
  }
  const handleSubmit =useCallback(async e => {
    e.preventDefault();


    const response = await axios.post(
      "https://beep-tag.herokuapp.com/log-in",
      user
    );
    setToken(response.data.token)

    localStorage.setItem('userNameLocal', usernameAuth)
    navigate.push(`/${usernameAuth}`);
  },[user]);
  if (userAuth) {
    return (
      <Profile colors={colors} setToken userAuth/>
    )
  }
    return (
        <div className='login-page'>
        <form onSubmit={handleSubmit} method="post">
          <div className="Login-page-container">
            <div className="Login-inputs">
              <div className="group">   

                <input 
                  type="text"
                  id="username" 
                  name="username"
                  onChange={({ target }) => setUsernameAuth(target.value)}
                required/>

                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="username"> Name *</label>
              </div>
              <div className="group">      
                <input 
                type="tel" 
                id="phone"
                 name="phone" 
                 onChange={({ target }) => setphoneNumerAuth(target.value)}
                 required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Phone Number *</label>
              </div>
              <div className="group">      
                <input className="pswd_input"
                  autoComplete="new-password"
                  type="password"
                  id="pass"
                  name="password"
                  
                  onChange={({ target }) => setBupe(CryptoJS.AES.encrypt(JSON.stringify(target.value), 'my-secret-key@123').toString())}
                  required
                  />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="pass">Password *</label>
              </div>
            </div>
            <div className="log-btn">
            <Button
              icon ={<ArrowBackIcon/>}
              text="Back"
              bgColor={colors.grey}
              textColor={colors.colorDark}
              cssName="log-btn-bak"
              />
              <Button
                icon ={<AddCircleOutlineIcon/>}
                text="Creat Account"
                bgColor={colors.colorDark}
                textColor={colors.white}
                cssName="log-btn-crt"
                type="submit"
              />
            </div>
          </div>
        </form>
        </div>
    )
}