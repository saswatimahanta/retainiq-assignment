"use client";
import Image from "next/image";

import Row from "./components/Row";
import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import update from 'immutability-helper';
import { HTML5Backend } from "react-dnd-html5-backend";
import { IoMdAdd } from "react-icons/io";
import DesignModal from "./components/DesignModal";
import { initialData } from "./constants";
import { FaArrowLeft } from "react-icons/fa6";


export default function Home() {
  if(!window.localStorage.getItem("data")){
    window.localStorage.setItem("data", JSON.stringify(initialData));
  }
  const initialRowData = JSON.parse(window.localStorage.getItem("data")).rowData;
  const initialRowHeaders = JSON.parse(window.localStorage.getItem("data")).rowHeaders;
  const [rows, setRows] = useState(initialRowData || []);
  const [rowHeaders, setRowHeaders] = useState(initialRowHeaders || [])

  //toggles the modal for design insertion
  const [designModal, setDesignModal] = useState(false);

  //holds the row in which insertion is needed
  const [parentIndex, setParentIndex] = useState(null);

  //holds the selected design
  const [design, setDesign] = useState({});

  //holds the cell where insertion is needed
  const [variantIndex, setVariantIndex] = useState(null);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setRows((prevRows) =>
      update(prevRows, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevRows[dragIndex]],
        ],
      }),
    )
  }, [])

  const handleAddColumns= (e) => {
    e.stopPropagation();
    setRows((prevRows) =>
    prevRows.map((row) => ({
      ...row,
      variants: [
        ...row.variants,
        {
          design: "Add Design",
        },
      ],
    }))
  );

  setRowHeaders((prevRowHeaders) => [
    ...prevRowHeaders,
    `Variant ${prevRowHeaders.length - 2}`,
  ])
  }

  const handleAddRows = () => {
    setRows(prevRows => [
      ...prevRows,
      {
        id: prevRows.length+1,
        //new product filters can be added here for new rows
        variants: rowHeaders.slice(2).map((variant)=>({
          design: "Add Design",
        }))
      }

    ])
  }

  const handleDeleteRows= (index) => {
    setRows(prevRows=>prevRows.filter((row, i)=> index != i));
  }

  useEffect(()=>{
    const newData = {
      rowHeaders: rowHeaders,
      rowData: rows,
    }
    console.log(newData);
    window.localStorage.setItem("data", JSON.stringify(newData));
  }, [rows, rowHeaders])

  useEffect(()=>{
    if(Object.keys(design).length>0 && parentIndex!=null && variantIndex!=null){
      console.log(parentIndex);
      console.log(design);
      console.log(variantIndex);

      setRows((prevRows)=> prevRows.map((row, index)=>{
        if(index == parentIndex){
          return {
            ...row,
            variants: row.variants.map((variant, index)=>{
              if(index == variantIndex){
                return design;
              }else return variant;
            })
          }
        }else return row;
      }));

      //if you do not empty design then when changing any design for the second time will update the previous selected design on just click and you cannot choose
      setDesign({});

    }
  }, [parentIndex, design, variantIndex])

  const renderCard = useCallback((row, index)=>{
    return(
      <Row
        key={row.id}
        row={row}
        index={index}
        id={row.id}
        moveCard={moveCard}
        handleAddColumns={handleAddColumns}
      />
    )
  }, [])

  return (
    <div>
    <div className="flex justify-between m-11">
      <div className="flex text-3xl font-semibold justify-center items-center gap-6">
        <FaArrowLeft size={25}/>
        <div className="border-b-2 pl-[0.5rem] w-[19rem]">Rules Creation</div>
      </div>
      <button className="p-3 bg-green-700 text-white rounded-md">Publish Feed</button>
    </div>
    <div className="relative m-11 w-[90vw] overflow-x-auto no-scrollbar min-h-[60vh] border border-[#E4E4E4]-500 p-10 bg-[#F0F0F2] rounded-md">
      <DndProvider backend={HTML5Backend}>
        <table>
          <thead>
            <tr className="">
              {rowHeaders.map((header, index)=>(
                <th className={index<2 ? 'sticky top-[0] left-[122px] z-2 bg-[#F0F0F2]': ''} key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index)=>(
              // renderCard(row,index)
              <Row
                key={row.id}
                row={row}
                index={index}
                id={row.id}
                moveCard={moveCard}
                handleAddColumns={handleAddColumns}
                handleDeleteRows={handleDeleteRows}
                setDesignModal={setDesignModal}
                parentIndex={index}
                setParentIndex={setParentIndex}
                setVariantIndex={setVariantIndex}
              />
            ))}
          </tbody>
        </table>
      </DndProvider>
      <div className="bg-white w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-md border-[#E4E4E4] cursor-pointer translate-x-[2rem] 
      translate-y-[3rem] mb-[4rem] sticky top-0 left-0" 
      onClick={handleAddRows}>
        <IoMdAdd size={25}/>
      </div>
    </div>

    {designModal && <DesignModal
      setDesignModal={setDesignModal}
      setDesign={setDesign}
    />}
    </div>
  );
}
