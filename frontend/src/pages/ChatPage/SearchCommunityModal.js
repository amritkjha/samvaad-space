import axios from 'axios'
import React, { useState } from 'react'

const SearchCommunityModal = ({ setSearchCommunityModal }) => {
    const [ data, setData ] = useState([])
    const handleCommunitySearch = (e) => {
        e.target.value.length > 0 ? axios
        .post('http://127.0.0.1:5000/api/community/community-list', {searchQuery: e.target.value})
        .then((res) => {
          console.log('community list', res);
          setData(res.data.community_list);
        })
        .catch((error) => {
          console.log('error', error);
        }) : setData([])
    }
    const handleCommunityJoin = (e) => {
      const member_id = localStorage.getItem('userName');
      const community_id = e.target.id;
      axios
        .post('http://127.0.0.1:5000/api/community/join-community', {community_id, member_id})
        .then((res) => {
          console.log('community joined', res);
          alert(res.data.message);
        })
        .catch((error) => {
          if(error.response.status === 400)alert(error.response.data.message);
          console.log('error', error);
        })
    }
  return (
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class="backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center h-full w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full mx-auto h-full">
        <div class="relative h-[50%] bg-[#005f3f]/[0.73] rounded-lg shadow dark:bg-[#005f3f]-700 my-auto">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold dark:text-white">
              Join a Community
            </h3>
            <button
              type="button"
              class="end-2.5 bg-transparent hover:bg-gray-200 hover rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setSearchCommunityModal(false)}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-4 md:p-5 h-full">
            <form class="space-y-4 h-full" action="#">
              <div className='h-full'>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium dark:text-white"
                >
                  Name / CommunityID
                </label>
                <div className='bg-gray-50 h-[60%] border border-gray-300 rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    class="text-sm text-black focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-b"
                    placeholder="Big Bull"
                    onChange={handleCommunitySearch}
                    required
                    />
                    <div className={`overflow-y-scroll max-h-[60%] ${data.length>0?'visible':'invisible'}`}>{data?.map((community)=>{return (<div className='text-sm text-black w-full p-2.5 flex'>
                        <p>{community?.name} - @{community?.community_id}</p>
                        <p className='ms-auto' role='button' id={community?.community_id} onClick={handleCommunityJoin}>+Join</p>
                    </div>)})}</div>
                </div>
              </div>
              {/* <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium dark:text-white"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="password"
                  placeholder="Group for share market tips"
                  class="bg-gray-50 border border-gray-300 text-sm rounded-lg text-black focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div> */}
              {/* <div class="flex justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label for="remember" class="ms-2 text-sm font-medium dark">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  class="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div> */}
              {/* <button
                type="submit"
                class="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Create community
              </button> */}
              {/* <div class="text-sm font-medium dark">
                Not registered?{" "}
                <a
                  href="#"
                  class="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchCommunityModal
