"use client";
import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import Image from 'next/image';



const Row = ({
    row,
    index,
    id,
    moveCard
}) => {
    
  return (
    <tr className="h-[13rem] cursor-move">
        <td className="px-8 border-r-2 border-[#E4E4E4]">
          <div className="relative">
            <div className="absolute top-[-57%] right-[18%] cursor-pointer">
              <RiDeleteBinLine color="crimson" size={23}/>
            </div>
            <div className="flex justify-center items-end">
              <div className="text-3xl font-bold">{index+1}</div>
    
              <CgMenuGridO size={25} className="mb-1"/>
            </div>
          </div>
        </td>

        <td className="px-8 border-r-2 border-[#E4E4E4]">
            <div className="flex justify-center items-center gap-2 bg-white h-[9rem] w-[20rem] border border-[#E4E4E4] rounded-md">
            {row.tags.map((tag, index)=>(
                <div key={index} className={`border px-2 py-1 text-xs rounded-sm font-semibold ${tag.status==="active" ? 
                    "text-green-600 bg-green-100 border-green-200" : "text-slate-500 bg-white border-[#E4E4E4]"}`}>
                    {tag.name}
                  </div>
            ))}
            </div>
        </td>

        {row.variants.map((variant, index)=>(
            <td key={index} className="px-8 border-r-2 border-[#E4E4E4]">
                <div className="relative bg-white border border-[#E4E4E4] h-[9rem] w-[9rem] rounded-md flex flex-col justify-center items-center">
                    <Image src={variant.url} alt="image" height={100}/>
                    <i className="text-xs">{variant.name}</i>
                    <div className="absolute top-[32%] left-[40%] bg-white p-2 rounded-md cursor-pointer">
                        <FiEdit/>
                    </div>
                </div>
            </td>
        ))}
    </tr>
  )
}

export default Row