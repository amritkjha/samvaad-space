import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
  let navigate = useNavigate();
  const [room, setRoom] = useState('');
  useEffect(() => {
    if(localStorage.getItem('accessToken'))console.log('Status: Logged In')
    else navigate('/get-started');
  }, [])
  return (
    <div className='flex md:divide-x h-full'>
      <div className={`h-full ${room?'hidden w-0':'w-full'} md:w-1/4 md:block`}><ChatList setRoom={setRoom} /></div>
      <div className={`h-full ${room?'w-full':'hidden w-0'} md:w-3/4 md:block`}><ChatWindow room={room} setRoom={setRoom} /></div>
    </div>
  )
}

export default ChatPage
