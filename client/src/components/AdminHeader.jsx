import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { adminLogout } from '../redux/admin/adminSlice'



const AdminHeader = () => {

    const dispatch=useDispatch()
    const admin= useSelector((state)=> state.admin.adminName)


    const handleSignOut=async()=>{
      try {
        await fetch ('/api/admin/signout');
        dispatch(adminLogout())
        
      } catch (error) {
        console.log(error);
      }
    }

    return (
    <div className='bg-slate-500'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold' >Medi -Care Admin Side</h1>
        <ul className='flex gap-4' >
          <li>  {admin ? `welcome ${admin.username}` : 'welcome to the dev side of medi-care' } </li>
          { admin && <li onClick={handleSignOut}  className='cursor-pointer' > Sign-Out </li> }
        </ul>
      </div>
    </div>
  )
}

export default AdminHeader
