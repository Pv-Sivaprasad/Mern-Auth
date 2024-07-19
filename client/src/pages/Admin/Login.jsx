import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin, adminLoginFailure } from '../../redux/admin/adminSlice'


function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})

  const handleChange= (e)=>{
    setFormData({...formData,[e.target.id] : e.target.value});
    console.log(formData);
  }
 


  const handleSubmit= async(e)=>{
    e.preventDefault()
    try {
      const res=await fetch('/api/admin/signin',{
          method : "POST",
          headers :{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(formData)
      });
      const data=await res.json()
      console.log(data)
      if(data.success===false){
        dispatch(adminLoginFailure(data))
        return
      }
      dispatch(adminLogin(data))
      navigate('/admin/dashboard')
    } catch (error) {
      dispatch(adminLoginFailure(error))
    }
  }

 
  return (


    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-dark font-semibold text-center pt-28 pb-10' >Welcome Admin</h1>
      <form className='flex flex-col gap-4' >
        <input type="email" placeholder='Enter Your Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
        <input type="password" placeholder='Enter Your Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
        <button  onClick={handleSubmit} className='bg-slate-700 p-3 text-white rounded-lg uppercase '  >Sign In</button>
      </form>
    </div>
  )
}

export default Login
