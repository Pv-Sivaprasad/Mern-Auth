import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import googleLogo from '../assets/googleLogo.jpeg'
import {app} from '../firebase.js'
import  {useDispatch} from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js'



export default function OAuth() {

    const dispatch=useDispatch()

    const handleGoogleClick= async ()=>{
        try {
        
            const provider=new GoogleAuthProvider()
            const auth=getAuth(app)
            console.log('auth',auth);

            const result=await signInWithPopup(auth,provider)
            const res=await fetch('/auth/google',{
                method : 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                })
            })
               const data=await res.json()  
               dispatch(signInSuccess(data))

        } catch (error) {
            console.log('could not login with google',error);
        }
    }

  return (
    <div>
     
      <button   type='button' onClick={handleGoogleClick}  className="  max-w-lg mx-auto  text-dark rounded-lg p-3 uppercase hover:opacity-95" style={buttonStyle}>
        <img src={googleLogo} alt="Google logo" className="w-6 h-6 mr-2" /> 
        Login with Google
      </button>
    </div>
  )
}
const buttonStyle = {
    backgroundColor: 'transparent', // Set background to transparent
    border: '1px solid #000', // Add a solid border
    borderRadius: '20px', // Adjust border-radius for rounded corners
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    color: '#000', // Change text color to black
  };