import axios from 'axios'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const ChatWindow = ({room}) => {
  // const chatSocket = new WebSocket('ws://localhost:8000/ws/chat/new_room/')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  // const messages = [
  //   {
  //     sender: 'Self',
  //     message: 'Namaste'
  //   },
  //   {
  //     sender: 'Contact',
  //     message: 'Ram Ram'
  //   },
  // ]

  const socket = io('127.0.0.1:5000');

  useEffect(() => {
    setMessages([]);
    socket.emit('joinRoom', room);

    socket.on('chatMessage',  (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      })
    return () => {
      socket.emit('leaveRoom', room);
      socket.disconnect()
    }
  }, [room])

  const handleMessageSend = (e) => {
    e.preventDefault();
    const message = e?.target?.message?.value;
    console.log('sent message', message);
    socket.emit('chatMessage', message);
    setMessage('');
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const handleExitCommunity = () => {
    const community_id = room;
    const member_id = localStorage.getItem('userName');
    axios
        .post('http://127.0.0.1:5000/api/community/leave-community', {community_id, member_id})
        .then((res) => {
          console.log('community left', res);
          alert(res.data.message);
        })
        .catch((error) => {
          if(error.response.status === 400)alert(error.response.data.message);
          console.log('error', error);
        })
  }

  return (
    <div className='h-full p-5'>
      <div className='h-[93%]'>
        <div className={`${room && 'border-b'} flex`}>
          <h3 className='text-2xl'>{room}</h3>
          {room && <button className='ms-auto rounded px-3 my-auto bg-[red]' onClick={handleExitCommunity}>Exit</button>}
        </div>
        {messages?.map((msg)=>{return (<div className={`${msg?.sender=='Self'?`bg-[red] ml-auto rounded-l-lg`:`bg-[green] mr-auto rounded-r-lg`} w-fit px-2 py-1`}>{msg}</div>)})}
      </div>
      {room &&<form className='flex h-[7%]' onSubmit={handleMessageSend}>
        <input type='text' name='message' className='sticky w-[91%] rounded mx-auto px-2 text-black' placeholder='Enter a message to send' value={message} onChange={handleMessageChange} />
        <button type='submit' className='bg-green-500 w-[7%] mx-auto rounded-full text-white p-1 text-3xl'>&gt;</button>
      </form>}
    </div>
  )
}

export default ChatWindow
