import React from 'react'
import dbconnection from '../app/utils/config/db';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import Navbar from './components/Navbar';
import AdminPage from '../app/admin/page';
import ProductCollections from './components/ProductCollections'
const HomePage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div>
      {user.role === "user" && (
        <>
          <Navbar username={user.name} userId={user.id} />
          <ProductCollections />
        </>
      )}

      {user.role === "admin" && <AdminPage />}
    </div>
  );


};


export default HomePage
