import React from 'react'
import "./Signin.css"
import '../Style/style.css'
import { Button } from '../Button/Button'
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';

export const Signin = ({colors}) => {
    return (
        <div className='Signin-page'>
        <form>
          <div class="Signin-page-container">
            <div className="Signin-inputs">
              <div className="group">      
                <input type="tel" required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Phone Number *</label>
              </div>
              <div className="group">      
                <input type="text" required/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>OTP *</label>
              </div>
              <div className="resend-otp hCenter">
                Resend OTP <ReplayIcon/>
              </div>
            </div>
            <div className="Signin-btn">
            <Link to="/">
            <Button
              icon ={<ArrowBackIcon/>}
              text="Back"
              bgColor={colors.grey}
              textColor={colors.colorDark}
              cssName="Signin-btn-bak"
              />
              </Link>
              <Link to="/:userName">
              <Button
              text="Sign in"
              bgColor={colors.colorDark}
              textColor={colors.white}
              cssName="Signin-btn-crt"
              />
              </Link>
            </div>
          </div>
        </form>
        </div>
    )
}