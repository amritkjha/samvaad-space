import axios from 'axios';
import React from 'react'

const SignupPage = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    axios
    .post('http://127.0.0.1:5000/api/auth/sign-up', {name: e.target.name.value, username: e.target.username.value, email: e.target.email.value, password: e.target.password.value})
    .then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className='h-full py-[18%]'>
      <h2 className='text-3xl mx-auto w-fit mb-3 text-white'>Signup</h2>
      <form className='mx-auto w-fit my-auto h-[91%]' onSubmit={handleSignup}>
        <div className='my-2'>
            <h1>Name</h1>
            <input type='text' name='name' className='bg-slate-200/25 border rounded px-2' placeholder='Mohan Kumar' />
        </div>
        <div className='my-2'>
            <h1>Username</h1>
            <input type='text' name='username' className='bg-slate-200/25 border rounded px-2' placeholder='mohan_123' />
        </div>
        <div className='my-2'>
            <h1>Email</h1>
            <input type='text' name='email' className='bg-slate-200/25 border rounded px-2' placeholder='abc@email.com' />
        </div>
        <div className='my-2'>
            <h1>Password</h1>
            <input type='password' name='password' className='bg-slate-200/25 border rounded px-2' placeholder='pass@123' />
        </div>
        <div className='flex'><button type='submit' className='bg-amber-300 rounded text-white p-1 ml-auto'>Sign Up</button></div>
      </form>
    </div>
  )
}

export default SignupPage
