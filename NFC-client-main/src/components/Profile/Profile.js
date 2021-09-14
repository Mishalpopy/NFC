import React,{useState,useEffect,useCallback} from 'react';
import { useHistory } from "react-router-dom";
import './profile.css';
import '../Style/style.css';
import { Button } from '../Button/Button';
import {SocialCard} from '../SocialCard/SocialCard';
import {UserDetails} from '../API/FetchApi';

import {Popup} from '../API/PopupApi';
import {SocialmediaEdit} from '../API/SocialMediaEdit';
import {ImageEdit} from '../API/ImageEdit';

import ProPic from '../Assets/propic.svg';
import  AddIcon from '../Assets/card_img/Add.svg';

import CreateIcon from '@material-ui/icons/Create';
import LinkIcon from '@material-ui/icons/Link';
import MemoryIcon from '@material-ui/icons/Memory';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';

const shareButton =false;

export const Profile = ({colors,auth,userAuth}) => {

    const [token, setToken] = useState(auth);
    localStorage.setItem('userNameLocal','log-in')
    const nav = useHistory();
    const user = localStorage.getItem('userNameLocal')
    
    const [profileName,profileLink,profileDescription,SocialMedia] =UserDetails({userAuth})
    const profileContainerStyle ={ background:colors.background, color:colors.colorDark };
    const proPictureBoxStyle= { background:colors.colorlight,color:colors.colorDark };
    const proPictureStyle= {fill:colors.colorDark};

    const [socialMediaData,setSocialMediaData]=useState(SocialMedia);
    const [editProfileName,setEditProfileName] =useState();
    const [editProfileDiscription,setEditProfileDiscription] =useState();
    const [editProfile,setEditProfile] =useState(false);
    const [editSocial,setEditSocial] =useState(false);
    const [thirdviewer,setThirdviewer] =useState(false);
    const [editImage,setEditImage]=useState(false);

    const editImageHadler = ()=>{
        setEditImage(!editImage)
        console.log(editSocial)
    }

    const logOutHandler = useCallback(()=>{ 
        nav.push("/log-in");
        localStorage.clear();
    })
    return (
        <>
        <div className="profile-container aCenter" style={profileContainerStyle}>
                <div className="profile-card ">
                    <div className="name-txt">{editProfileName?editProfileName:profileName}</div>
                    <div className="profile-contents">
                    <div className="profile">
                        <div className="pro-picture-box" style={proPictureBoxStyle}>
                            <img src={ProPic} alt="Profile" className="pro-picture"
                                style={proPictureStyle}/><div className="pro-pic-edit">
                                {shareButton&&<div className="edit-Image-icon" onClick={editImageHadler}>
                                <Button
                                    icon ={<CreateIcon/>}
                                    bgColor ={colors.colorlight}
                                    textColor ={colors.colorDark}
                                    width="2.5em"
                                    height="2.5em"
                                /></div>}
                            </div>
                        </div>
                    </div>
                    <div className="profile-Share">
                        <div className="wCenter">
                            <div className="viewBtn">
                            {thirdviewer&&<div onClick={()=>{
                            setThirdviewer(!thirdviewer)
                            }}>
                                <Button
                                        icon ={<VisibilityIcon/>}
                                        bgColor ={colors.colorlight}
                                        textColor ={colors.colorDark}
                                        width="3em"
                                        height="3em"
                                        link ={""}
                                /></div>}
                            </div>
                            <div className="option-btn" onClick={logOutHandler}>
                                {token&&<Button
                                            text ="Log out"
                                            icon ={!<MoreVertIcon/>}
                                            bgColor ={colors.colorlight}
                                            textColor ={colors.colorDark}
                                            width="7rem"
                                            height="3rem"
                                            fontSize="1em"
                                />}
                            </div>
                        </div>
                        <div className="profilelink hCenter">
                            {<LinkIcon/>}beep.com/{profileLink}
                            </div>
                            <div className="profile-discription">
                                {<MemoryIcon/>}{editProfileDiscription?editProfileDiscription:profileDescription}
                                {token&&<div onClick={()=>{setEditProfile(!editProfile)}}>
                                    <Button
                                    icon ={<CreateIcon/>}
                                    bgColor ={colors.colorlight}
                                    textColor ={colors.colorDark}
                                    width="2em"
                                    height="2em"/>
                                    </div>}
                            </div>
                    </div>
                 </div>
                 <div className="share-btn">
                                {shareButton&&<Button
                                    icon ={<ShareIcon/>}
                                    text="Share"
                                    cssName = "sBtn"
                                    bgColor ={colors.colorlight}
                                    textColor ={colors.colorDark}
                                    fontSize = "1rem"
                                    width="15rem"
                                    height="4rem"
                                />}
                            </div>
                </div>
                <div className="social-card">
                    {(socialMediaData.details[0]?socialMediaData:SocialMedia).details.map((details)=>{
                    return(details&&<SocialCard
                                        key={details.id}
                                        userName={details.UserName}
                                        Icon ={details.img}
                                        bgColor={details.color}
                                        color={details.textcolor}
                                        link={details.account}
                                    />
                        )
                    })}
                    {token&&
                    <div className="social-edit" onClick={()=>{setEditSocial(true)}}>
                        <SocialCard
                        userName="Edit"
                        bgColor ={colors.colorlight}
                        color ={colors.colorDark}
                        Icon = {AddIcon}
                        />
                    </div>
                    }
                </div>
            </div> 
            {editProfile&&
                <Popup 
                    className="pop-up"
                    setEdit={setEditProfile}
                    setName={setEditProfileName}
                    setDisc={setEditProfileDiscription}
                />
            }
            {editSocial&&<SocialmediaEdit
            setEdit ={setEditSocial}
            />}
            {/*editImage&&<ImageEdit/>*/}
        </>
    )
}