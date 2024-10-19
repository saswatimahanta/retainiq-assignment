import pink from "./assets/image1.png";
import image11 from "./assets/image1.png"
import image12 from "./assets/image2.png"
import image21 from "./assets/image3.png"
import image22 from "./assets/image4.png"
import image31 from "./assets/image5.png"

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
      },
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

export const initialData = {
  rowHeaders: initialHeaderRows,
  rowData: initialRowData,
}

export const designs = [
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

