import React from 'react'
import '../Style/style.css'

export const Button = ({icon,text,link,cssName,bgColor,textColor,width,height,fontSize}) => {
    const btnStyle={
        backgroundColor:bgColor,
        color:textColor,
        width: width,
        height: height,
        border: "none",
        borderRadius: "8px",
        fontSize: fontSize,
        margin: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer"
    };
    const btnIconStyle = {padding:"10px"}
    return (
        <>
            <a  href={link}>
                <button className={cssName} style={btnStyle}>
                    {icon&&<div className="btn-icon" style={btnIconStyle}>{icon}</div>}
                    {text&&<div className="btn-text" style={btnIconStyle}>{text}</div>}
                </button> 
            </a>
        </>
    )
}