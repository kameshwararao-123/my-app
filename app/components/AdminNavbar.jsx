import React from 'react'
import Link from 'next/link'
const AdminNavbar = () => {
  return (
    <div className='navcontainer'>
      <h3>Holiday Resort</h3>
      <div className='arrange'>
        <p>Welcome :</p>
        <p>Admin</p>
      </div>
      <Link href={'/api/auth/signout'}><p>Logout</p></Link>
    </div>
  )
}

export default AdminNavbar
