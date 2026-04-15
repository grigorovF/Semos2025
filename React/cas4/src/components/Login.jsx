import React,{useState,useEffect} from 'react';
import {Input} from './Input';



export const Login = () =>{

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [inputType,setInputType] = useState("password");

    useEffect(()=>{
        console.log("Username: ",username);
        console.log("Password: ",password);
    },[username,password])

    return(
        <div id='login'>
            <form>
                <Input 
                    type={'text'}
                    placeholder={'Enter Username'}
                    value={username}
                    onChange={(event)=>{
                      console.log(event)
                        setUsername(event.target.value)
                    }}

                />
                <Input 
                    type={inputType}
                    placeholder={'Enter Password'}
                    value={password}
                    name='togglePass'
                    onChange={(e)=>{
                        console.log(e)
                        setPassword(e.target.value)
                    }}
                />
                <button className='action-button'>Sign In</button>
            </form>
        </div>
    )
}