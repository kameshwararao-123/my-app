import React from 'react'
import {auth} from '../auth';
import { redirect } from 'next/navigation';
import AdminNavbar from '../components/AdminNavbar';
import Products from '../components/Products';
const AdminPage = async() => {
  const session=await auth();
  if(!session){
    redirect('/login')
  }
  return (
    <div>
      {session?(
        <>
        <AdminNavbar/>
        <Products/>
        </>
      ):<h1>Not authorized</h1>}
    </div>
  )
}

export default AdminPage
