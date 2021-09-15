import Mongodb from "mongodb"
import dotenv from "dotenv";
import fs from 'fs'

dotenv.config()

const dbUir =process.env.BEEP_DB_URI
const  dbName = process.env.BEEP_NS
const colletionName =process.env.BEEP_COLLECTION

const binary = Mongodb.Binary;
const client = new Mongodb.MongoClient(dbUir,{maxPoolSize:100,wtimeoutMS:2500,useNewUrlParser:true });


export const checkProfile = async(username)=>{
    const query = {"profile_link" :`${username}`};
    try {
        await client.connect();
        const database = client.db(dbName);
        const dbCollection = database.collection(colletionName)
        const result = await dbCollection.findOne(query);
        if(result){
          return result;
        }
        else
        {
          return {"UserFound":"Not_Found"};
        }
    }
    catch(err){
      console.log(err)
    }
     finally {

      await client.close();

    }
  }
  export const Singin = async(username,res)=>{
    const query = {"profile_link" :`${username}`};
    try {
        await client.connect();
        const database = client.db(dbName);
        const dbCollection = database.collection(colletionName)
        const result = await dbCollection.findOne(query);
        return result;

    } finally {

      await client.close();

    }
  }
  export const addProfile = async(Profile)=>{
    try {

        await client.connect();
        const database = client.db(dbName);
        const dbCollection = database.collection(colletionName);
        const result = await dbCollection.insertOne(Profile);
        return result;

    } finally {

      await client.close();

    }
  }
  export const updateProfile = async(Profile)=>{

    try {
      await client.connect();
      const database = client.db(dbName);
      const dbCollection = database.collection(colletionName);
      const options = {upsert: false};
      const updateDoc = {
        $set:Profile.newData,
      };
      const result = await dbCollection.updateOne(Profile.user ,updateDoc,options);
      console.log(result);
      if (result.modifiedCount === 0 && result.upsertedCount === 0) {
        console.log("No changes made to the collection.");
        return {result};
      } else {
        if (result.matchedCount === 0) {
          console.log("Not Matched " + result.matchedCount + " documents.");
          return {result};
        }
        if (result.modifiedCount === 1) {
          console.log("Updated one document.");
          return {result};
        }
      }
    }
    catch(err)
    {
      console.log(err)
      console.log("..........")
    }
     finally {
      await client.close();
    }
  }
  
  export const deleteProfile = async(filter,dataDelete)=>{
    try {
      await client.connect();
      const database = client.db(dbName);
      const dbCollection = database.collection(colletionName);
      const result = await dbCollection.updateOne(filter, {$unset:dataDelete},{multi: false});
      return result;
    } finally {
      await client.close();
    }
  }
  export const ImageEdit = async(req, res)=>{
    console.log("1")
    try {
      console.log(req)
      let file ={"profile_pic":binary(req.Files.data)}
      console.log("2------------------------")
      await client.connect();
      const database = client.db(dbName);
      const dbCollection = database.collection(colletionName);
      console.log("3------------------------")
      const result = await dbCollection.updateOne({"profile_link":"Mahath-M-U"},{ $set:file},{ upsert: true })
      console.log("4----------------------")
      console.log(result);
    }
    catch(err)
    {
      console.log(err)
      console.log("..........")
    }
     finally {
      await client.close();
    }
  }
