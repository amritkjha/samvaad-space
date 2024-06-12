import React, { useEffect } from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import { useNavigate } from 'react-router-dom';

const AccessPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('accessToken'))console.log('Status: Already Logged In')
    else navigate('/');
  }, [])
  return (
    <div className='flex divide-x h-full py-5'>
      <div className='w-1/2'><LoginPage /></div>
      <div className='w-1/2'><SignupPage /></div>
    </div>
  )
}

export default AccessPage
