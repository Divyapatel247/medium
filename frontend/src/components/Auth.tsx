import { ChangeEvent, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType } from "@divya247/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInput,setPostInput] = useState<SignupType>({
       name:"",
       email:"",
       password:""
    });

    async function sendReqest(){
        try{
           const response =  await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"?"signup":"signin"}`,postInput);
           const jwt = response.data;
           localStorage.setItem("token",jwt);
           navigate("/blogs");
        }
        catch(e){
             console.log(e)
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col items-center">
            {JSON.stringify(postInput)}
            <div className="text-3xl font-bold">
                Create an account
            </div>
            <div className="text-slate-500">
               {type === "signin" ? "Don't have an account?" : "Already have an account?"}
               <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
                </Link>
            </div>
            <div className="mt-2 w-3/6 gap-2">
           {type === "signup" ? <LabelledInput label={'Username'} placeholder={'Enter your username'} onChange={(e)=>{setPostInput(c =>({...c,name:e.target.value}))}} /> : null }  
            <LabelledInput label={'Email'} type={'email'} placeholder={'example@email.com'} onChange={(e)=>{setPostInput(c=>({...c,email:e.target.value}))}} />
            <LabelledInput label={'Password'} type={'password'} placeholder={''} onChange={(e)=>{setPostInput(c=>({...c,password:e.target.value}))}} />
            <button onClick={sendReqest} type="button" className="text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  rounded-lg text-sm py-3 mt-7 w-full px-5  me-2 mb-2 ">{type === 'signup' ? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    );
};

interface LabelledInputType{
    label: string;
    placeholder: string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    type?:string
}

function LabelledInput({ label, placeholder, onChange, type}: LabelledInputType ){
    return(
        <div className="pt-4">
          <label  className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
          <input placeholder={placeholder} onChange={onChange} type={type || 'text'} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"/>
        </div>
    )
}
