"use client";
import Image from "next/image";
import pink from "./assets/image1.png";
import Row from "./components/Row";
import { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import update from 'immutability-helper';
import { HTML5Backend } from "react-dnd-html5-backend";

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

if(!window.localStorage.getItem("rows")){
  window.localStorage.setItem("rows", JSON.stringify(initialRowData));
}

if(!window.localStorage.getItem("rowHeaders")){
  window.localStorage.setItem("rowHeaders", JSON.stringify(initialHeaderRows));
}

export default function Home() {
  const [rows, setRows] = useState(JSON.parse(window.localStorage.getItem("rows")) || []);
  const [headerRows, setHeaderRows] = useState(JSON.parse(window.localStorage.getItem("rowHeaders")) || [])
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

  const renderCard = useCallback((row, index)=>{
    return(
      <Row
        key={row.id}
        row={row}
        index={index}
        id={row.id}
        moveCard={moveCard}
      />
    )
  }, [])

  return (
    <div className="mt-12 flex w-[80vw] min-h-[60vh] border border-[#E4E4E4]-500 p-10 bg-[#F0F0F2] overflow-hidden rounded-md">
      <DndProvider backend={HTML5Backend}>
        <table>
          <thead>
            <tr>
              {headerRows.map((header)=>(
                <th>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index)=>(
              renderCard(row,index)
            ))}
          </tbody>
        </table>
      </DndProvider>
    </div>
  );
}
