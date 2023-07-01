import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import Image from "next/image";
import Nature from "../../public/nature4.jpg";
const getTopics=async()=>{
    try {
       const res= await fetch('http://localhost:3000/api/topics',{
        cache:'no-store'
       })
       if(!res.ok){
        throw new Error("failed to fetch data")
       }
       return res.json()
    } catch (error) {
        console.log("error loading topics",error)
    }
}
const TopicList = async() => {
    const {topics}=await getTopics();
  return (
    <>
    {topics.map((t,index)=>(

   
      <div className="mt-3 border rounded p-2" key={index}>
      <div className="flex justify-end gap-4 p-3">
        <RemoveBtn id={t._id}/>
        <Link href={`/editTopic/${t._id}`}>
          <HiPencilAlt size={24} />
        </Link>
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <h2 className="font-bold text-2xl">{t.title}</h2>
          <h4 className="font-bold mt-3 text-xl" >{t.content}</h4>
          <p className="mt-3">
            {t.paragraph}
          </p>
        </div>
        <div >
          <Image src={t.imageUrl} width={300} height={500} alt="photo" />
        </div>
      </div>
      </div>
       ))}
    </>
  );
};

export default TopicList;
