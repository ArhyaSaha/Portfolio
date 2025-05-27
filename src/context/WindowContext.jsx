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
    },
    {
      Name: "My Computer",
      Icon: paint,
      isOpened: true,
      isMinimized: true,
      isMaximized: false,
      isClosed: false,
    },
    {
      Name: "Notepad",
      Icon: paint,
      isOpened: false,
      isMinimized: false,
      isMaximized: false,
      isClosed: true,
    }
  ]);

  return (
    <WindowContext.Provider value={{ windows, setWindows }}>
      {children}
    </WindowContext.Provider>
  );
};
