import React from 'react'
import './SocialCard.css'

export const SocialCard = ({userName,Icon,bgColor,color,link}) => {
    const sCardStyle = {background:bgColor}
    const userNameStyle = {color:color}
    return (
        <>  <a className="s-card-container" href={link}>
                <div className="s-card" style={sCardStyle}>
                    <img  className="s-cardImg" src={Icon} alt="faceBook Icon" />
                    <div className="user-name" style={userNameStyle}>{userName}</div>
                </div>
            </a>
        </>
    )
}