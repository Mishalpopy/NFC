import '../API/PopupApi.css'
import '../Login/Login.css'
import { useState,useCallback} from 'react';
import { Button } from '../Button/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Popup = ({setEdit,setName,setDisc})=> {

    const {userName} = useParams();
    const [status,setStatus]=useState(undefined)

    const [saveData,setSaveData]= useState(false);
    const [inputData, setInputData] = useState(undefined)
    const [profileFeild, setProfileFeild] = useState("name")
    
    const handleSelecter = (event)=>{
            setProfileFeild(event.target.value)
    }

    const handleSave = useCallback((dbAdress,FieldData) => {
            const saveToDatabase = async ()=>{
                const datas ={   
                    "user":{"profile_link":userName},
                    "newData":((dbAdress==="name")?({'beep_name':FieldData}):((dbAdress==="discription")?
                        {'profile_description':FieldData}:""))
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
    <div className = 'popup'>
        <div className = 'popup_inner' > 
            <div className="inputfeilds">
            <select className="selector" value={profileFeild} onChange={handleSelecter}>
                <option value="name">Name</option>
                <option value="discription">Discription</option>
            </select>
                <div className="group">   
                    <input type="text" onChange={event =>{
                        setInputData(event.target.value)}} required/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>{profileFeild} </label>
                </div>
                <div>{status}</div>
            </div>
            <div className="btns-popup">
                <div onClick={()=>{setEdit(false)}}>
                    <Button
                        text="Close"
                    />
                </div>
                <div onClick={()=>{
                    if(inputData){
                        setSaveData(true)
                        handleSave(profileFeild,inputData)
                        if(profileFeild==="name"){
                            setName(inputData)
                        }
                        else if (profileFeild==="discription") {
                            setDisc(inputData)
                        }
                    }
                    else{
                        setStatus("field cannot be empty");
                    }
                    }}>
                    {!saveData&&<Button 
                        text="Save"
                        bgColor="#002840"
                        textColor="#FFF"
                    />}
                </div>
            </div>
        </div>
    </div>
    );
}