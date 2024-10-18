import React, {useRef} from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd'

const Rowx = ({
    row,
    index,
    id,
    moveCard,
    handleAddRows,
}) => {
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
      accept: 'card',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })
    const [{ isDragging }, drag] = useDrag({
      type: 'card',
      item: () => {
        return { id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
  return (
    <tr ref={ref} className='h-[13rem] cursor-move'>
        <td className='border-r-2 border-[#E4E4E4]'>
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

        <td className=''>
            <div className='flex bg-white h-[9rem] w-[20rem]'>
            {row.tags.map((tag)=>(
                <div key={index} className={`border px-2 py-1 text-xs rounded-sm font-semibold ${tag.status==="active" ? 
                    "text-green-600 bg-green-100 border-green-200" : "text-slate-500 bg-white border-[#E4E4E4]"}`}>
                    {tag.name}
                </div>
            ))}
            </div>
        </td>
    </tr>
  )
}

export default Rowx