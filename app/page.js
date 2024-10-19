"use client";
import Image from "next/image";
import pink from "./assets/image1.png";
import image11 from "./assets/image1.png"
import image12 from "./assets/image2.png"
import image21 from "./assets/image3.png"
import image22 from "./assets/image4.png"
import image31 from "./assets/image5.png"
import Row from "./components/Row";
import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import update from 'immutability-helper';
import { HTML5Backend } from "react-dnd-html5-backend";
import { IoMdAdd } from "react-icons/io";
import DesignModal from "./components/DesignModal";

const initialHeaderRows = ["", "Product Filter", "Primary Variant", "Variant 1"];

const initialRowData = [
  {
    id: 1,
    tags: [
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "inactive",
      },
      {
        name: "tag1",
        status: "active",
      }
    ],
    variants: [
      {
        name: "pink",
        url: pink,
      },
      {
        name: "pink",
        url: pink,
      },
    ]
  },
  {
    id: 2,
    tags: [
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "active",
      }
    ],
    variants: [
      {
        name: "pink",
        url: pink,
      },
      {
        name: "pink",
        url: pink,
      },
    ]
  },
  {
    id: 3,
    tags: [
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "active",
      }
    ],
    variants: [
      {
        name: "pink",
        url: pink,
      },
      {
        name: "pink",
        url: pink,
      },
    ]
  },
  {
    id: 4,
    tags: [
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "active",
      },
      {
        name: "tag1",
        status: "active",
      }
    ],
    variants: [
      {
        name: "pink",
        url: pink,
      },
      {
        name: "pink",
        url: pink,
      },
    ]
  },
]

const designs = [
  {
    name: "maroon kurti",
    url: image11,
  },
  {
    name: "pink kurti",
    url: image12,
  },
  {
    name: "dark yellow kurti",
    url: image21,
  },
  {
    name: "light yellow kurti",
    url: image22,
  },
  {
    name: "white-pink kurti",
    url: image31,
  },
  {
    name: "maroon kurti",
    url: image11,
  },
  {
    name: "pink kurti",
    url: image12,
  },
  {
    name: "dark yellow kurti",
    url: image21,
  },
  {
    name: "light yellow kurti",
    url: image22,
  },
  {
    name: "white-pink kurti",
    url: image31,
  },
  {
    name: "maroon kurti",
    url: image11,
  },
  {
    name: "pink kurti",
    url: image12,
  },
  {
    name: "dark yellow kurti",
    url: image21,
  },
  {
    name: "light yellow kurti",
    url: image22,
  },
  {
    name: "white-pink kurti",
    url: image31,
  }
]

const initialData = {
  rowHeaders: initialHeaderRows,
  rowData: initialRowData,
}

if(!window.localStorage.getItem("data")){
  window.localStorage.setItem("data", JSON.stringify(initialData));
}

export default function Home() {
  const initialRowData = JSON.parse(window.localStorage.getItem("data")).rowData;
  const initialRowHeaders = JSON.parse(window.localStorage.getItem("data")).rowHeaders;
  const [rows, setRows] = useState(initialRowData || []);
  const [rowHeaders, setRowHeaders] = useState(initialRowHeaders || [])
  const [designModal, setDesignModal] = useState(false);
  const [parentIndex, setParentIndex] = useState(null);
  const [design, setDesign] = useState({});
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
  console.log(rowHeaders);
  }

  const handleAddRows = () => {
    setRows(prevRows => [
      ...prevRows,
      {
        id: prevRows.length+1,
        //new product filters can be added here for new rows
        variants: prevRows[0].variants.map((variant)=>({
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
    <>
    <div className="relative mt-12 w-[80vw] max-w-[80vw] overflow-x-auto no-scrollbar min-h-[60vh] border border-[#E4E4E4]-500 p-10 bg-[#F0F0F2] rounded-md">
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
      designs={designs}
      setDesignModal={setDesignModal}
      setDesign={setDesign}
    />}

    <div className="m-[10rem]">Use different SKUs</div>
    </>
  );
}
