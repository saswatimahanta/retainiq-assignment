"use client";
import React, {useRef} from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd'

const Row = ({
    row,
    index,
    id,
    moveCard,
    handleAddColumns,
    handleDeleteRows,
    setDesignModal,
    parentIndex,
    setParentIndex,
    setVariantIndex,
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

    const handleDesignModal = (index) => {
      setDesignModal(true);
      setVariantIndex(index);
    }

  return (
    <tr ref={ref} className="h-[13rem] cursor-move group" onClick={() => setParentIndex(index)}>
      <td className="sticky top-0 left-0 z-20 px-8 border-r-2 border-[#E4E4E4] bg-[#F0F0F2]">
        <div className='flex items-center gap-10'>
          <div className="relative">
            {/* Delete button controlled by row hover */}
            <div
              className="absolute top-[-57%] right-[18%] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => handleDeleteRows(index)}
            >
              <RiDeleteBinLine color="crimson" size={23} />
            </div>
            <div className="flex justify-center items-end">
              <div className="text-3xl font-bold">{index + 1}</div>
              <CgMenuGridO size={25} className="mb-1" />
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 bg-white min-h-[9rem] w-[20rem] p-[2rem] border border-[#E4E4E4] rounded-md relative flex-wrap">
            {row.tags ? row.tags.map((tag, index) => (
              <div
                key={index}
                className={`border px-2 py-1 text-xs rounded-sm font-semibold ${
                  tag.status === "active"
                    ? "text-green-600 bg-green-100 border-green-200"
                    : "text-slate-500 bg-white border-[#E4E4E4]"
                }`}
              >
                {tag.name}
              </div>
            )) : (
              <div className="flex items-center border border-[#E4E4E4] p-2 rounded-md cursor-pointer">
                <IoMdAdd size={23} />
                <p className="text-xs font-bold">Add Product filters</p>
              </div>
            )}
            {row.tags && (
              <div
                className="absolute left-[-0.5rem] justify-center items-center gap-2 bg-white h-[6rem] min-w-[21rem] p-[2rem] border border-[#E4E4E4] 
                rounded-md opacity-0 hover:opacity-100 transition-opacity flex shadow-md"
              >
                {row.tags.map((tag, index) => (
                  <div
                    key={index}
                    className={`border px-2 py-1 text-xs rounded-sm font-semibold ${
                      tag.status === "active"
                        ? "text-green-600 bg-green-100 border-green-200"
                        : "text-slate-500 bg-white border-[#E4E4E4]"
                    }`}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </td>

      {row.variants.map((variant, index) => (
        <td key={index} className="px-8 border-r-2 border-[#E4E4E4]">
          {variant.design ? (
            <div className="bg-white border border-[#E4E4E4] h-[9rem] w-[9rem] rounded-md flex justify-center items-center cursor-pointer">
              <div className="flex items-center border border-[#E4E4E4] p-2 rounded-md" onClick={() => handleDesignModal(index)}>
                <IoMdAdd size={23} />
                <p className="text-xs font-bold">{variant.design}</p>
              </div>
            </div>
          ) : (
            <div className="group relative z-2 bg-white border border-[#E4E4E4] h-[9rem] w-[9rem] rounded-md flex flex-col justify-center items-center">
              <Image src={variant.url} alt="image" height={100} />
              <i className="text-xs">{variant.name}</i>
              <div className="absolute z-3 top-[32%] left-[40%] bg-white p-2 rounded-md cursor-pointer hidden group-hover:block"
                onClick={() => handleDesignModal(index)}
              >
                <FiEdit />
              </div>
            </div>
          )}
        </td>
      ))}

      <td className="px-8">
        <div className="h-[58px] w-[58px] border border-[#E4E4E4] rounded-md bg-white cursor-pointer flex justify-center items-center" onClick={handleAddColumns}>
          <IoMdAdd size={23} />
        </div>
      </td>
    </tr>

  )
}

export default Row