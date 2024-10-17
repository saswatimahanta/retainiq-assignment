"use client";
import Image from "next/image";
import pink from "./assets/image1.png";
import Row from "./components/Row";
import { useState } from "react";

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

export default function Home() {
  const [rows, setRows] = useState(JSON.parse(window.localStorage.getItem("rows")) || []);
  return (
    <div className="">
      <table>
        <thead>
        </thead>
        <tbody>
          {rows.map((row, index)=>(
            <Row
              key={row.id}
              row={row}
              index={index}
              id={row.id}
              moveCard={moveCard}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
