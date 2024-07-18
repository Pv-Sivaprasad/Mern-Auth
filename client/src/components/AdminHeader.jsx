import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



const AdminHeader = () => {

    const dispatch=useDispatch()
    const admin= useSelector((state)=> state.admin.adminName)


    return (
    <div className=''>

      
      
    </div>
  )
}

export default AdminHeader
