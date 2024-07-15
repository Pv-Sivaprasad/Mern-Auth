import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

function SignUp() {

  const [formdata, setFormData] = useState({})
  const [error,setError]= useState(false)
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value })
  }
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res=await fetch('/api/auth/sign-up',{
        method : 'POST',
        headers :{
          'Content-Type':'application/json'
        },
        body : JSON.stringify(formdata)
       })
       const data=await res.json();
       setLoading(false)
       if(data.success===false) {
        setError(true)
       }
        navigate('/sign-in')
    } catch (error) {
      console.log('error',error.message)
      setLoading(false)
      setError(true)
    }
    
     
  };


  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7 '  >Sign up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >

        <input type="text" placeholder='username'
          id='username' className='bg-slate-300 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input type="email" placeholder='email'
          id='email' className='bg-slate-300 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input type="password" placeholder='password'
          id='password' className='bg-slate-300 p-3 rounded-lg'
          onChange={handleChange}
        />

        <button disabled={loading} className='bg-slate-700 p-3  text-white font-normal rounded-lg uppercase hover:opacity-95 diabled:opacity-80' >
          {loading ? 'Loading...':'Sign Up'}
          </button>
      <OAuth/>
      </form>

      <div className='flex gap-3 mt-5' >
        <p>Have an Account ?</p>
        <Link to='/sign-in' > <span className='text-blue-600' >Sign In</span></Link>
      </div>

      <p className='text-red-800' > {error && 'something went wrong'} </p>
    </div>
  )
}

export default SignUp
