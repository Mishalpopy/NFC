import axios from 'axios';
import  InstaIcon from '../Assets/card_img/instagram.svg'
import  SnapChatIcon from '../Assets/card_img/snapchat.svg'
import  TwitterIcon from '../Assets/card_img/twitter.svg'
import  FbIcon from '../Assets/card_img/facebook.svg'

import {useEffect,useState} from 'react'
import { useParams,useHistory} from 'react-router-dom';

export const GetDetails = ({userAuth})=>{
  const nav = useHistory();
  const {userName} = useParams();
  const [UserDetails,setUserDetails]=useState()


  useEffect(()=>{
    const axiosGET = async ()=>{
      try {
        await axios.get(`https://beep-tag.herokuapp.com/${userName}`)
        .then((res) => {
          setUserDetails(res.data)
          if(!userAuth&&res.data.UserFound==="Not_Found")
          {
            nav.push('/log-in')
            return true;
          }
        })
        
      } catch (err) {
        console.log(err);
      }
  }
  axiosGET();
})
    return UserDetails?
    [
      UserDetails.beep_name,
      UserDetails.profile_link,
      UserDetails.profile_description,
      UserDetails.social_media,
      UserDetails.profile_pic
    ]:
    [undefined,undefined,undefined,undefined,undefined];
}

export const UserDetails = ({userAuth})=>{

  const [UserName,profileLink,profileDescription,social] = GetDetails({userAuth});

const Instagram ={
  "id":"instagram",
  "account":`https://www.instagram.com/${social?social.instagram.instagram_id:undefined}`,
  "UserName":(social?social.instagram.instagram_name:undefined),
  "color":"linear-gradient(45deg, #ffd832 0%, #ea4178 35%, #7429bf 100%)",
  "textcolor":"#fff",
  "img":InstaIcon
}
const SnapChat ={
  
  "id":"SnapChat",
  "account":`https://www.snapchat.com/${social?social.snapchat.snapchat_id:undefined}`,
  "UserName":(social?social.snapchat.snapchat_name:undefined),
  "color":"#f4dc00",
  "textcolor":"#fff",
  "img":SnapChatIcon
}
const Twitter ={

  "id":"Twitter",
  "account":`https://www.twitter.com/${social?social.twitter.twitter_id:undefined}`,
  "UserName":(social?social.twitter.twitter_name:undefined),
  "color":"#52cbff",
  "textcolor":"#fff",
  "img":TwitterIcon
}
const Facebook ={
  "id":"Facebook",
  "account":`https://www.facebook.com/${social?social.facebook.facebook_id:undefined}`,
  "UserName":(social?social.facebook.facebook_name:undefined),
  "color":"#4867aa",
  "textcolor":"#fff",
  "img":FbIcon
}
const SocialMedia = {
  "details":[(Instagram.UserName&&Instagram),
              (SnapChat.UserName&&SnapChat),
              (Twitter.UserName&&Twitter),
              (Facebook.UserName&&Facebook)]
};
  return [UserName,profileLink,profileDescription,SocialMedia];
}