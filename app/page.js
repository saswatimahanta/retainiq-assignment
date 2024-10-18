"use client";
import Image from "next/image";
import pink from "./assets/image1.png";
import Row from "./components/Row";
import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import update from 'immutability-helper';
import { HTML5Backend } from "react-dnd-html5-backend";
import Rowx from "./components/Rowx";

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

  const handleAddRows= (e) => {
    e.stopPropagation();
    setRows((prevRows) =>
    prevRows.map((row) => ({
      ...row,
      variants: [
        ...row.variants,
        {
          id: row.variants.length + 1,
          design: "Add Design",
        },
      ],
    }))
  );
  }

  useEffect(()=>{
    const newData = {
      rowHeaders: rowHeaders,
      rowData: rows,
    }
    console.log(newData);
    window.localStorage.setItem("data", JSON.stringify(newData));
  }, [rows, rowHeaders])

  const renderCard = useCallback((row, index)=>{
    return(
      <Row
        key={row.id}
        row={row}
        index={index}
        id={row.id}
        moveCard={moveCard}
        handleAddRows={handleAddRows}
      />
    )
  }, [])

  return (
    <div className="relative mt-12 flex w-[80vw] max-w-[80vw] overflow-x-auto no-scrollbar min-h-[60vh] border border-[#E4E4E4]-500 p-10 bg-[#F0F0F2] rounded-md">
      <DndProvider backend={HTML5Backend}>
        <table>
          <thead>
            <tr className="">
              {rowHeaders.map((header, index)=>(
                <th className={index<2 && 'sticky top-[0] left-[122px] z-2 bg-[#F0F0F2]'} key={index}>{header}</th>
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
                handleAddRows={handleAddRows}
              />
            ))}
          </tbody>
        </table>
      </DndProvider>
    </div>
  );
}
