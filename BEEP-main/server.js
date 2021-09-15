import express from 'express';
import Profile from './route/Profile.route.js'
import cors from 'cors';
import {checkProfile} from './route/profileController.js'
import fileUpload from 'express-fileupload';

const app =express();
app.use(cors());
app.use(express.json())
app.use(fileUpload())
app.get('/:username',async function (req, res) {
    try{
    await checkProfile(req.params.username)
    .then(async result=>{
        if (result.UserFound==="Not_Found") {
            res.status(201).json({"UserFound":"Not_Found"});  
        }
        else{
            res.status(201).json({...result,"UserFound":"Found"}) 
            return true;
        }
        console.log("Profile checked ...")
    })    
    .catch((err,res)=>{
        console.log(err)
        res.status(400).json({"acknowledged":false})
    })
}
catch(err)
{
    console.log("Time Out ERROR :",err)
}
});
app.use('/',Profile);


export default app;