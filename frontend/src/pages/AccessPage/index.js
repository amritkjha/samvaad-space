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
    <div className='flex md:divide-x h-full py-5 overflow-x-scroll'>
      <div className='w-full px-[15%] md:px-3 md:w-1/2'><LoginPage /></div>
      <div className='w-full px-[15%] md:px-3 md:w-1/2'><SignupPage /></div>
    </div>
  )
}

export default AccessPage
