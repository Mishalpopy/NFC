import express from 'express';
import {addProfile,ImageEdit,updateProfile} from './profileController.js';

const Profile =express.Router();
Profile.route("/log-in").post(async (req, res) => {
  try{
    await addProfile(req.body).then( async (status)=>{
        status.insertedId ? res.status(201).send({token: 'test123'}):res.status(400).json({"acknowledged":false});
        console.log("logined")
    })
    }
    catch(err){console.log(err)}
    
  });

  Profile.route("/imageUpdate").post(async (req, res) => {
    console.log("1---")
    try{
      await ImageEdit(req, res).then( async (status)=>{
        console.log(status)
      status ? res.status(201).json({"acknowledged":true}):res.status(400).json({"acknowledged":false})});
    }
    catch(err){console.log(err)}
  });

  Profile.route("/update").post(async (req, res) => {
    try{
      await updateProfile(req.body).then( async (status)=>{
      status ? res.status(201).json({"acknowledged":true}):res.status(400).json({"acknowledged":false})});
      console.log("updated ...")
    }
    catch(err){console.log(err)}
    
  });
export default Profile;