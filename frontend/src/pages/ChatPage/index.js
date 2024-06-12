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
    <div className='flex divide-x h-full'>
      <div className='w-1/4 h-full'><ChatList setRoom={setRoom} /></div>
      <div className='w-3/4 h-full'><ChatWindow room={room} /></div>
    </div>
  )
}

export default ChatPage
