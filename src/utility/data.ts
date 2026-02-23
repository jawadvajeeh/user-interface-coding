import type { FileSystemItemType } from "@/types";

export const checkboxesData = [
  {
    id: 1,
    name: "Electronics",
    checked: false,
    children: [
      {
        id: 2,
        name: "Mobile phones",
        checked: false,
        children: [
          {
            id: 3,
            name: "iPhone",
            checked: false,
          },
          {
            id: 4,
            name: "Android",
            checked: false,
          },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        checked: false,
        children: [
          {
            id: 6,
            name: "MacBook",
            checked: false,
          },
          {
            id: 7,
            name: "Surface Pro",
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    checked: false,
    children: [
      {
        id: 9,
        name: "Fiction",
        checked: false,
      },
      {
        id: 10,
        name: "Non-fiction",
        checked: false,
      },
    ],
  },
  {
    id: 11,
    name: "Toys",
    checked: false,
  },
];

export const filesystem: FileSystemItemType[] = [
  {
    type: "folder",
    name: "src",
    isExpanded: true,
    files: [
      {
        type: "folder",
        name: "components",
        isExpanded: true,
        files: [
          { type: "file", name: "Header.tsx" },
          { type: "file", name: "Footer.tsx" },
          { type: "file", name: "Sidebar.tsx" },
        ],
      },
      {
        type: "folder",
        name: "pages",
        isExpanded: false,
        files: [
          { type: "file", name: "Home.tsx" },
          { type: "file", name: "About.tsx" },
          { type: "file", name: "Contact.tsx" },
        ],
      },
      {
        type: "file",
        name: "index.tsx",
      },
      {
        type: "file",
        name: "App.tsx",
      },
    ],
  },
  {
    type: "folder",
    name: "public",
    isExpanded: false,
    files: [
      { type: "file", name: "index.html" },
      { type: "file", name: "favicon.ico" },
    ],
  },
  {
    type: "folder",
    name: "config",
    isExpanded: false,
    files: [
      { type: "file", name: "tsconfig.json" },
      { type: "file", name: "webpack.config.js" },
    ],
  },
  {
    type: "file",
    name: "package.json",
  },
  {
    type: "file",
    name: "README.md",
  },
];
