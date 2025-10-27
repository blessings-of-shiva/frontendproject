import React, { useState } from 'react'
import "./form.css"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
const SignupForm = () => {

    const navigate=useNavigate();
    const connect=()=>{
        navigate("/details");
    }

    //all states
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [phonenumber,setPhonenumber]=useState("");
    const [email,setEmail]=useState("");
    //all reset fields
    const resetform=()=>{
        setName("");
        setUsername("");
        setPassword("");
        setPhonenumber("");
        setEmail("");
    }
    //signup
    const sign=async(e)=>{
        e.preventDefault();
        try{
        const user={name,username,password,phonenumber,email};
        await axios.post("https://project-plhb.vercel.app/api/user/signup",user)
        alert("Signup successful");
        resetform();
        navigate("/login");
        }catch(err){console.error("error",err)};
    }


    return <>
        <div id='signup1'>
            <div id='signup2'>
                <form  onSubmit={sign}>
                    <h1>Sign-Up</h1>
                    <label>Name</label>
                    <input type='text' placeholder='enter name' required value={name} onChange={(e)=>setName(e.target.value)} />
                    <label>Username</label>
                    <input type='text' placeholder='enter username' required value={username} onChange={(e)=>setUsername(e.target.value)} />
                    <label>Password</label>
                    <input type='password' placeholder='enter password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <label>Phonenumber</label>
                    <input type='number' placeholder='enter phonenumber' required value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}/>
                    <label>Email</label>
                    <input type='email' placeholder='enter email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <button type='submit'>Sign-Up</button>
                </form>
                <p>Already have account?<Link to='/login'>Login</Link></p>
            </div>
            <button id='detail' onClick={connect}>Details</button>
        </div>
    </>
}

export default SignupForm
