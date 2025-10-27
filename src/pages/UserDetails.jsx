import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Table} from "react-bootstrap"
import {FaPencilAlt, FaTimesCircle, FaTrashAlt} from "react-icons/fa"
import "./user.css"
const UserDetails = () => {


    //all states
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [phonenumber,setPhonenumber]=useState("");
    const [email,setEmail]=useState("");
    const [updateid,setUpdateid]=useState(null);
    const [edi,setEdi]=useState(false);
    //reset feild
    const reset=()=>{
        setName("");
        setUsername("");
        setPassword("");
        setPhonenumber("");
        setEmail("");
        setUpdateid(null);
    }

    //upadte details
    const handelupdate=async(e)=>{
        e.preventDefault();
        if(!updateid) return;
        try{
        await axios.put(`https://project-plhb.vercel.app/api/user/update/${updateid}`,{name,username,phonenumber,email})
        alert("Data updated successfully");
        reset();
        fetchdetails();
        setEdi(false);
        }catch(err){
            console.error("error",err);
        }
    }

    //prefilled data in update form
    const prefilled=(ed)=>{
        setUpdateid(ed._id);
        setName(ed.name);
        setUsername(ed.username);
        setPhonenumber(ed.phonenumber);
        setEmail(ed.email);
        setEdi(true);
    }


    const [user,setUser]=useState([])
    const fetchdetails=async()=>{
        try{
        const res=await axios.get("https://project-plhb.vercel.app/api/user/finddata")
        setUser(res.data);
        }catch(err){
            console.error("error",err);
        }

    }
    useEffect(()=>{
        fetchdetails();
    },[]);


    const handeldelete=async(id)=>{
        try{
        if(!window.confirm("Are you sure to delete this data?")) return;
        await axios.delete(`https://project-plhb.vercel.app/api/user/delete/${id}`)
        alert("Data deleted successfully");
        fetchdetails();
    }catch(err){
        console.error("error",err);
    }
    }

  return <>
    <div id='table'>

        {edi && (
            <div id="pop">
                <i onClick={()=>setEdi(false)}><FaTimesCircle/></i>
                <form onSubmit={handelupdate}>
                    <label>Name</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <label>Username</label>
                    <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label>Phonenumber</label>
                    <input type='number' value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}/>
                    <label>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <button type='submit'>Update</button>
                </form>
            </div>
        )}

        <Table className='m-4 p-4' bordered striped hover responsive>
            <thead>
                <th>ID</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Password</th>
                <th>Phonenumber</th>
                <th>Email</th>
                <th>Date</th>
                <th colSpan={2}></th>
            </thead>
            {user.map((z)=>(
            <tbody key={z._id}>
                <td>{z.ID}</td>
                <td>{z.name}</td>
                <td>{z.username}</td>
                <td>{z.password}</td>
                <td>{z.phonenumber}</td>
                <td>{z.email}</td>
                <td>{new Date(z.date).toLocaleDateString()}</td>
                <td><button onClick={()=>prefilled(z)}><i><FaPencilAlt/></i>Edit</button></td>
                <td><button onClick={()=>handeldelete(z._id)} ><i><FaTrashAlt/></i>Delete</button></td>
            </tbody>
         ))}
        </Table>
    </div>
  </>
}

export default UserDetails
