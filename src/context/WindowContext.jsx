import React, { createContext, useState } from "react";
import paint from '../assets/icons/msPaint.png';

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
      Icon: paint,
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      size: { w: 900, h: 700 },
      pos: { x: 200, y: 150 },
    },
    {
      Name: "Notepad",
      Icon: paint,
      isOpened: false,
      isMinimized: false,
      isMaximized: false,
      isClosed: true,
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
