import React from 'react';
import {IoImageOutline} from "react-icons/io5";
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';

const DesignModal = ({
    designs,
    setDesignModal,
}) => {
  return (
    <div className="fixed h-[100vh] w-[100vw] top-[0] right-[0] z-30 bg-[#00000099] flex justify-center items-center"
    onClick={()=>setDesignModal(false)}
    >
      <div className="h-[45rem] w-[58rem] bg-white opacity-100 rounded-md "
        
      >
        <div className="w-[100%] h-[12rem] border-b-2 flex flex-col p-8 justify-between">
          <div><IoImageOutline color="green" size={50}/></div>
          <div className="w-[100%]  flex justify-between">
            <div className="text-2xl font-bold">Select a design to link</div>
            <div className="flex justify-start items-center gap-2 border p-2 rounded-md"><FiSearch/><input className="border-0" type="text" placeholder="Search"/></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-y-4 p-10 h-[calc(100%-12rem)] overflow-y-scroll ">
          {designs.map((design, index)=>(
            <div className="relative" key={index}>
              <Image className="rounded-md" src={design.url} height={200} alt="design"/>
              <div className="text-sm font-semibold">{design.name}</div>
              <div className="absolute top-[36%] left-[34%] bg-white px-4 py-2 rounded-md cursor-pointer font-semibold"
                
              >
                Insert
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DesignModal