import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(e.target.password.value);
    axios
    .post('http://127.0.0.1:5000/api/auth/sign-in', {email: e.target.email.value, password: e.target.password.value})
    .then((res) => {
      console.log('res', res);
      localStorage.setItem('accessToken', res?.data?.authToken)
      localStorage.setItem('userName', res?.data?.username)
      navigate('/')
    })
    .catch((err) => {
      console.log('err', err.message);
    })
  }
  return (
    <div className='h-full py-[25%]'>
      <h2 className='text-3xl mx-auto w-fit mb-3 text-white'>Login</h2>
      <form className='mx-auto w-fit my-auto h-[91%]' onSubmit={handleLogin}>
        <div className='my-2'>
            <h1>Email</h1>
            <input type='text' name='email' className='bg-slate-200/25 border rounded px-2' placeholder='abc@email.com' />
        </div>
        <div className='my-2'>
            <h1>Password</h1>
            <input type='password' name='password' className='bg-slate-200/25 border rounded px-2' placeholder='pass@123' />
        </div>
        <div className='flex'><button type='submit' className='bg-amber-300 rounded text-white p-1 ml-auto'>Log In</button></div>
      </form>
    </div>
  )
}

export default LoginPage
