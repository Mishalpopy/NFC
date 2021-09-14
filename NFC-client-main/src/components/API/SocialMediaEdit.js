import '../API/socialMedia.css'
import '../Login/Login.css'
import { useState,useCallback} from 'react';
import { Button } from '../Button/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export const SocialmediaEdit = ({setEdit,setUpdate,Updatevalue})=> {

    const {userName} = useParams();
    const [status,setStatus]=useState(undefined)

    const [saveSocialData,setSaveSocialData]= useState(false);
    const [inputData, setInputData] = useState(undefined)
    const [inputData2, setInputData2] = useState(undefined)
    const [socialFeild, setSocialFeild] = useState("instagram")

    const handleSelecter = (event)=>{
            setSocialFeild(event.target.value)
    }

    const handleSave = useCallback((FieldData,dbAdress,dbAdress2) => {
            const saveToDatabase = async ()=>{
                const socialId =dbAdress?{[`${FieldData}_id`]:`${dbAdress}`}:undefined;
                const socialName=dbAdress2?{[`${FieldData}_name`]:`${dbAdress2}`}:undefined;
                const inputBoxData={
                    [`social_media.${FieldData}`]:{...socialId,...socialName}
                } 
                const datas ={   
                    "user":{"profile_link":userName},
                    "newData":inputBoxData
                }
                await axios.post(`https://beep-tag.herokuapp.com/update`,datas)
                .then((res) => {
                    console.log(res.data)
                    try{
                        if(res.data.modifiedCount===1){
                            setStatus("Updated.")
                        }
                    }
                    catch{
                        setStatus("An Error Occurred !.")
                    }
                })
                .catch(err=>console.log(err))
            }
            saveToDatabase();
        },[userName]);

    return (
    <div className ='social-popup'>
        <div className = 'social-popup_inner' > 
            <div className="social-inputfeilds">
            <select className="social-selector" value={socialFeild} onChange={handleSelecter}>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="snapchat">Snapchat</option>
                <option value="twitter">Twitter</option>
            </select>
                <div className="group">   
                    <input type="text" onChange={event =>{
                        setInputData(event.target.value)}} required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>{socialFeild} id </label>
                </div>
                <div className="group">   
                    <input type="text" onChange={event =>{
                        setInputData2(event.target.value)}} required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>{socialFeild} name </label>
                </div>
                <div>{status}</div>
            </div>
            <div className="social-btns-popup">
                <div onClick={()=>{setEdit(false)}}>
                    <Button
                        text="Close"
                    />
                </div>
                <div onClick={()=>{
                    if(inputData&&inputData2){
                        setSaveSocialData(true);
                        handleSave(socialFeild,inputData,inputData2)
                        setEdit(false);
                    }
                    else{
                        setStatus("field cannot be empty");
                    }
                    }}>
                    <Button 
                        text="Save"
                        bgColor="#002840"
                        textColor="#FFF"
                    />
                </div>
            </div>
        </div>
    </div>
    );
}