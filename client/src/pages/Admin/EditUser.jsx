import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'


const EditUser = () => {

const navigate=useNavigate()
const [userName,setUserName]=useState()
const [email,setEmail]=useState('')
const [err,setErr]=useState('')
const [changePassword,setChangePassword]=useState(false)
const [password,setPassword]=useState('')
const {id} = useParams()



const handleSubmit=async(e)=>{
  e.preventDefault()
  if(userName.trim()===''){
    return setErr('Username cannot be empty')
  }
  if(email.trim()===''){
    return setErr('Email cannot be empty')
  }
  if(changePassword && password.trim()===''){
    return setErr('Password cannot be empty')
  }
  const res=await fetch('/api/admin/edituser',{
    method:'POST',
    headers :{
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({id,userName,email,password})
  });
  const data =res.json()
  if(data.success===false){
    setErr(data.message)
  }
  navigate('/admin/dashboard')
 
}

const handleClick=(e)=>{
  e.preventDefault()
  navigate('/admin/dashboard')
}


    return (
        <div className="h-screen overflow-hidden bg-gradient-to-r from-blue-100 to-pink-100 bg-cover bg-no-repeat">
          <div className="p-3 max-w-lg mx-auto ">
            <h1 className=" text-3xl font-semibold text-center my-7">EDIT USER</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                defaultValue={userName}
                type="text"
                id="userName"
                placeholder="UserName"
                className="rounded-lg p-3"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                defaultValue={email}
                type="email"
                id="email"
                placeholder="Email"
                className=" rounded-lg p-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              {changePassword && <input
                defaultValue={password}
                type="password"
                id="password"
                placeholder="Password"
                className="rounded-lg p-3"
                onChange= {(e) => setPassword(e.target.value)}
              />}
              <button type='button' onClick={()=> setChangePassword(!changePassword)} className="bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                {changePassword? "DONT CHANGE" : "CHANGE PASSWORD" }
              </button>
    
              <button className="bg-slate-700 text-white p-3 font-bold rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                UPDATE
              </button>
              <button onClick={handleClick}>Back</button>
            </form>
            {err && <p className='text-red-700'>{err}</p>}
          </div>
        </div>
      )
}

export default EditUser
