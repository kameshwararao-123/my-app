"use client"
import React from 'react'
import { useState } from 'react';
import { loginAction } from '../ServerActions/loginAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const LoginForm = () => {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [error,seterror]=useState('');
    const route=useRouter();
    const loginhandler=async(e)=>{
        e.preventDefault();
        const logindata={email,password};
        console.log("login details",logindata);
        try {
            const response=await loginAction(logindata);
            if(response.success){
                route.push("/");
            }
            else{
                seterror(response.message||" login failed");
            }
        } catch (error) {
            seterror(error);
        }
    }
  return (
    <div className='formcontainer'>
      <h1>Login Form</h1>
      <form onSubmit={loginhandler} className='formsection'>
        {error &&<h3 style={{color:'red'}}>{error}</h3>}
        <h3>Email</h3>
        <input type='email' name='email'onChange={(e)=>setemail(e.target.value)}/>
        <h3>Password</h3>
        <input type='password' name='password'onChange={(e)=>setpassword(e.target.value)}/><br /><br />
        <button type='submit'>Login</button>
        <Link href={'/register'} className='redire'>
          Create an account?Register
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
