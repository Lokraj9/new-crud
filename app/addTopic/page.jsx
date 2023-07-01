"use client"
import Image from "next/image";
import React, { useState } from "react";
import {AiOutlineFileImage } from "react-icons/ai"
import { useRouter } from "next/navigation";
const AddTopic = () => {
    const CLOUD_NAME='dnwum1cbx';
    const router=useRouter()
    const UPLOAD_PRESET="upload_image"
    const [photo,setPhoto]=useState('');
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [paragraph,setParagraph]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!title || !content || !paragraph || !photo){
            alert("all field are required");
            return
        }
        try {
            const imageUrl=await uploadImage();
            const res=await fetch(`http://localhost:3000/api/topics`,{
                method:'POST',
                body:JSON.stringify({title,content,paragraph,imageUrl}),
                headers:{
                'Content-Type':'application/json',
                
            }
             
        })
        if(res.ok){
            router.push('/')
        }
        else{
            throw new Error("failed to create topic")
        }
    }
         catch (error) {
            console.log("Error")
        }

    }
    const uploadImage=async()=>{
            if(!photo) return
            const formData=new FormData();
            formData.append("file",photo);
            formData.append("upload_preset",UPLOAD_PRESET)
            try {
                const res=await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,{
                    method:'POST',
                    body:formData
                })
                const data=await res.json()
                const imageUrl=data['secure_url'];
                return imageUrl
            } catch (error) {
                
            }
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
      onChange={(e)=>setTitle(e.target.value)} value={title}
        className="border border-slate-500 px-8 py-2 "
        type="text"
        placeholder="Enter title"
      />
      <input
      onChange={(e)=>setContent(e.target.value)} value={content}
        className="border border-slate-500 px-8 py-2 "
        type="text"
        placeholder="Enter content"
      />
      <textarea
      onChange={(e)=>setParagraph(e.target.value)} value={paragraph}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Enter paragraph"
      />
      <label htmlFor="image" className='border border-slate-500 px-8 py-2'>
        Upload Image <AiOutlineFileImage className="text-red-800" />
      </label>
      <input 
        id="image"
        type="file"
        style={{ display: "none" }}
        onChange={(e)=>setPhoto(e.target.files[0])}
      />
    <button className="bg-green-700 w-fit text-white p-2 rounded">Add Post</button>
    </form>
  );
};

export default AddTopic;
