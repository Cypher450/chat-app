import React from 'react'
import { MdAttachFile } from 'react-icons/md';

const ChatPage = () => {
  return <div className=''>
    <header className="dark:border-grey-700 h-20 dark:bg-grey-900 fixed w-full py-5 flex justify-between items-center">
        <div>
            <h1 className='text-3xl font-semibold'>Room : <span>Family room</span></h1>
        </div>
        <div>
        <h1 className='text-3xl font-semibold'>User : <span>Seshadev Sahoo</span></h1>
        </div>
        <div>
            <button className='dark:br-red-500'>Leave Room</button>
        </div>
    </header>

    <div className='fixed bottom-2 w-full h-16'>
        <div className='h-full flex mx-auto w-2/3 dark:bg-grey-900 items-center gap-4 justify-between px-10'>
        <input type="text" placeholder="Type a message..." className="w-full h-full p dark:border-grey-800 rounded-full dark:bg-grey-900 px-3 py-2"/>
        <div>
        <button className="dark:bg-green-500 px-3 py-2 rounded-full flex justify-center items-center w-10 h-10"><MdAttachFile size={20} /></button>
        <button className="dark:bg-green-500 px-3 py-2 rounded-full flex justify-center items-center w-10 h-10"><MdSend size={20} /></button>

        </div>
        </div>

    </div>
  </div>;
};

export default ChatPage