
import React,{useCallback,useState} from 'react'
import './PopupApi.css'
import LOGO from '../Assets/propic.svg'
import axios from 'axios';

export const ImageEdit = () => {

    
    const saveBtnHandler=useCallback(()=>{
        console.log("updating.....")
        const saveToDB = async ()=>{
            try {
                 console.log("Send form data with axios")
            } catch (error) {
                console.log("Error to upload image : ",error)
            }

        }
        saveToDB();
    },[])
    function onImageChange(event) {
        const imageFile = URL.createObjectURL(event.target.files[0]);
        createImage(imageFile, convertImage);
        console.log(createImage)
    }
    
    function createImage(imageFile, callback) {
      const image = document.createElement('img');
      image.onload = () => callback(image);
      image.setAttribute('src', imageFile);
    }
    
    function convertImage(image) {
      const canvas = drawImageToCanvas(image);
      const ctx = canvas.getContext('2d');
      
      let result = [];
      for (let y = 0; y < canvas.height; y++) {
        result.push([]);
        for (let x = 0; x < canvas.width; x++) {
          let data = ctx.getImageData(x, y, 1, 1).data;
          result[y].push(data[0]);
          result[y].push(data[1]);
          result[y].push(data[2]);
        }
      }
      
      const arrayCode = `
        #define IMAGE_WIDTH ${canvas.width}
        #define IMAGE_HEIGHT ${canvas.height}
        #define BYTES_PER_PIXEL 3
        uint8_t imageData[IMAGE_HEIGHT][IMAGE_WIDTH * BYTES_PER_PIXEL] = ${convertArray(result)};
      `;
      document.getElementById('result').innerHTML = arrayCode;
    }
    
    function drawImageToCanvas(image) {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
      return canvas;
    }
    
    function convertArray(array) {
      return JSON.stringify(array).replace(/\[/g, '{').replace(/\]/g, '}');
    }
    return (
        <div className="image_edit popup">
            <div className="image-edit-window popup_inner">
                <div className="content-box">
                    <form action="/imageUpdate" method='POST' encType='multipart/form-data'>
                    <label htmlFor="avatar">Pleas select IMAGE</label>
                    <input 
                        type="file"
                        id="avatar" 
                        name="avatar"
                        accept="image/png, image/jpeg"/>
<pre id="result"></pre>
                </form>
                <input type="submit" onClick={saveBtnHandler}/>
                </div>
            </div>

        </div>
    )
}