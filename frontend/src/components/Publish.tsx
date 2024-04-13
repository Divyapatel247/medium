import { ChangeEvent, useState } from "react"
import { Appbar } from "./Appbar"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate()
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [published,setPublished] = useState(false)
  const handlePublish = async ()=>{
     setPublished(true)
   const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
      title,content,published
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    });
    navigate(`/blog/${response.data.id}`)
  }
  return (
    <>
    <Appbar/>
    <div className="flex justify-center w-full ">
      
      <div className="lg:w-6/12">
      <textarea rows={2} onChange={(e)=>{setTitle(e.target.value)}} className=" font-serif bg-white-50 outline-none  text-gray-900 text-4xl rounded-lg  block w-full p-5 mt-5" placeholder="Title"/>
      <TextEditor onChange={(e)=>{setContent(e.target.value)}}/>
      <div className="">
      <button type="button" onClick={handlePublish} className=" text-white bg-slate-400 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center  m-2 me-2 mb-2">
        Publish post
      </button>
      </div>
      </div>

    </div>
    </>
  )
}

const TextEditor = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) =>{
  return(
    <div className="" >
         <textarea id="message"  onChange={onChange} rows={8}  className="font-serif outline-none block p-5 mt-5 w-full text-2xl text-gray-900 bg-white-50 rounded-lg" placeholder="Write your thoughts here..."></textarea>
    </div>
  )
}