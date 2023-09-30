import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess  } from '../redux/user/userslice'
import { useNavigate } from 'react-router-dom'


const OAuth = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async()=>{
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        const res = await signInWithPopup(auth,provider);
        console.log(res);
        

        const result = await fetch("/api/auth/google",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify({
                name:res.user.displayName,
                email:res.user.email,
                avatar:res.user.photoURL
            })
        })

        const data = await result.json();
        dispatch(signInSuccess(data.user))
        navigate('/');
    } catch (error) {
        console.log('Cannot sing in with google',error)
    }
  }

  return (
    <button onClick={handleGoogleClick} className='bg-red-700 w-full mt-4 text-white p-3 rounded-lg uppercase
    hover:opacity-95'>
        continue with google
    </button>
  )
}

export default OAuth