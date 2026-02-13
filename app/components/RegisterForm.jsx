"use client"

import React, { useState } from 'react'
import { registerAction } from '../ServerActions/registerAction';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const [name,setname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const router=useRouter();
    const registerhandler=async(e)=>{
        e.preventDefault();
        const userdetails={name,email,password};
        console.log(userdetails);
        try {
          const response=await registerAction(userdetails);
          if(response.success){
            alert("registration success");
            router.push("/login");
          }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='formcontainer'>
      <h1>User Registration Form</h1>
      <form onSubmit={registerhandler} className='formsection'>
        <h3>Name</h3>
        <input type='text' name='name' onChange={(e)=>setname(e.target.value)}/>
        <h3>Email</h3>
        <input type='email' name='email'onChange={(e)=>setemail(e.target.value)}/>
        <h3>Password</h3>
        <input type='password' name='password'onChange={(e)=>setpassword(e.target.value)}/><br /><br />
        <button type='submit'>Register</button>
        <Link href={'/login'} className='redire'>
          Already registerd?Login
        </Link>
      </form>
    </div>
  )
}

export default RegisterForm
