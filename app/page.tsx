import React from 'react'
import dbconnection from '../app/utils/config/db';
import {auth} from './auth';
import { redirect } from 'next/navigation';
import Navbar from './components/Navbar';
import AdminPage from '../app/admin/page';
import ProductCollections from './components/ProductCollections'
const HomePage =async() => {
  const session =await auth();
  if(!session){
    redirect('/login');
  }
  const username=session.user.name;
  return (
    <div>
      {session.user.role==='user'&&(
      <>
        <Navbar username={username} userId={session.user.id}/>
        <ProductCollections/>
      </>
      )}
      {session.user.role==='admin'&&<AdminPage/>}
    </div>
  )
}

export default HomePage
