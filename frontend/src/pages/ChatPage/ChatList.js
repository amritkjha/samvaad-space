import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NewCommunityModal from './NewCommunityModal';
import SearchCommunityModal from './SearchCommunityModal';

const ChatList = ({setRoom}) => {
  let navigate = useNavigate();
  const [ communityModal, setCommunityModal ] = useState(false);
  const [ searchCommunityModal, setSearchCommunityModal ] = useState(false);
  // const data = [
  //   {
  //     initials: "AJ",
  //     name: "Amrit Jha",
  //     lastMessage: "Radhe Radhe"
  //   },
  //   {
  //     initials: "AK",
  //     name: "Arvind Kejriwal",
  //     lastMessage: "Vibhav pakda gaya"
  //   },
  //   {
  //     initials: "NM",
  //     name: "Narendra Modi",
  //     lastMessage: "Meloni ne block kar diya"
  //   },
  //   {
  //     initials: "RG",
  //     name: "Rahul Gandhi",
  //     lastMessage: "Italy jana h yrr"
  //   },
  //   {
  //     initials: "AY",
  //     name: "Adityanath Yogi",
  //     lastMessage: "POK lena h is baar"
  //   },
  //   {
  //     initials: "EM",
  //     name: "Elon Musk",
  //     lastMessage: "Namaste bhaiya"
  //   },
  // ]
  const [ data, setData ] = useState([])
  useEffect(() => {
    axios
      .post('http://127.0.0.1:5000/api/community/communities-joined', {username: localStorage.getItem('userName')})
      .then((res) => {
        console.log('community list', res.data.community_list);
        setData(res.data.community_list);
      })
      .catch((error) => {
        console.log('error', error);
      })
  }, [])
  return (
    <div className='p-5 h-full'>
      <div className='h-[70%] overflow-y-scroll'><ul className=''>
        {data?.map((person)=>{return (<li className='flex'>
          <div className='bg-[orange] rounded-full p-3 my-2'><span className='text-sm'>{person?.initials || 'NC'}</span></div>
          <div className='mx-3 cursor-pointer' onClick={()=>setRoom(person?.community_id)}>
            <p className='text-sm font-bold'>{person?.name?.substring(0, 12)}</p>
            <p className='text-xs'>{`${person?.description?.substring(0, 12)}...`}</p>
          </div>
        </li>)})}
      </ul></div>
      <div className='h-[35%]'><ul>
        <div className='border rounded text-center mb-3 mt-2' role='button' onClick={()=>setCommunityModal(true)}>+ Create Community</div>
        <div className='border rounded text-center mb-3 mt-2' role='button' onClick={()=>setSearchCommunityModal(true)}>+ Join Community</div>
        {communityModal && <NewCommunityModal setCommunityModal={setCommunityModal} />}
        {searchCommunityModal && <SearchCommunityModal setSearchCommunityModal={setSearchCommunityModal} />}
        <div>
          <button className='rounded p-3 bg-[red]' onClick={()=>{localStorage.removeItem('accessToken');navigate('/get-started')}}>Logout</button>
        </div>
      </ul></div>
    </div>
  )
}

export default ChatList
