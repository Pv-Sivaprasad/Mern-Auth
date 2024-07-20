

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogin, adminLoginFailure, clearAdminError } from '../../redux/admin/adminSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const error = useSelector(state => state.admin.error)

  useEffect(() => {
    // Clear any previous errors when the component mounts
    dispatch(clearAdminError())
  }, [dispatch])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(adminLoginFailure({ message: 'Invalid credentials' }))
        return
      }
      dispatch(adminLogin(data))
      navigate('/admin/dashboard')
    } catch (error) {
      dispatch(adminLoginFailure({ message: 'Something went wrong' }))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-dark font-semibold text-center pt-28 pb-10'>Welcome Admin</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='Enter Your Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='Enter Your Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          type='submit'
          className='bg-slate-700 p-3 text-white rounded-lg uppercase'
        >
          Sign In
        </button>
      </form>
      {error && <div>
        <p className=' mt-3  text-center text-red-800'>{error.message}</p>
      </div>}
    </div>
  )
}

export default Login
