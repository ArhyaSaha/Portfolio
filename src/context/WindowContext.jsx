import React, { createContext, useState } from "react";
import paint from '../assets/icons/msPaint.png';
import myComputer from '../assets/icons/myComputer.png';
import notepad from '../assets/icons/notepad.png';

// 1. Create the context
export const WindowContext = createContext();

// 2. Create the provider component
export const WindowProvider = ({ children }) => {

  const [windows, setWindows] = useState([
    {
      Name: "MS Paint",
      Icon: paint,
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      size: { w: 700, h: 500 },
      pos: { x: 200, y: 150 },
    },
    {
      Name: "My Computer",
      Icon: myComputer,
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      size: { w: 700, h: 500 },
      pos: { x: 200, y: 150 },
    },
    {
      Name: "Notepad",
      Icon: notepad,
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      size: { w: 700, h: 500 },
      pos: { x: 200, y: 150 },
    }
  ]);

  return (
    <WindowContext.Provider value={{ windows, setWindows }}>
      {children}
    </WindowContext.Provider>
  );
};
