import React,{useState,useCallback} from 'react';
import { Button } from '../Button/Button';
import Welcome1Img from '../Assets/welcome-1.png';

import logo from '../Assets/beeplogo.svg';
import './Getstart.css';
import { useHistory } from "react-router-dom";

const Getstart = ({colors}) => {
    const nav = useHistory();
    const discHead = "Modern Marketing";
    const disccontent=" Share stunning customized profile with a tap.";
    const logStyle = {color:colors.DarkBlue}

    const getStartHandle= useCallback(()=>{
        nav.push("/log-in")
    })

    return(
        <div className="welcome-page">
        <div className="logo pad" style={logStyle}><img src={logo} alt="logo" /></div>
        <div className="banner">
                <img src={Welcome1Img} alt="GetStartImg" className="welcome-img"/>
            </div>
        <div className="content">
            <div className="disc">
                <div className="disc-head">
                    {discHead}
                </div>
                <div className="disc-content">
                    {disccontent}
                </div>
            </div>
            <div className="H-btns">
                <div onClick={getStartHandle}>
                    <Button
                        text="Get Start"
                        bgColor={colors.colorDark}
                        textColor={colors.white}
                        fontSize="1rem"
                        width ="15rem"
                        height='4rem'
                        cssName="log-btn-crt"
                    />
                </div>
            </div>
        </div>
    </div>
    )
}
export default Getstart;