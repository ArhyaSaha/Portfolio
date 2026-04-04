import React, { createContext, useRef, useState } from "react";
import paint from '../assets/icons/msPaint.png';
import myComputer from '../assets/icons/myComputer.png';
import notepad from '../assets/icons/notepad.png';

// 1. Create the context
export const WindowContext = createContext();

// 2. Create the provider component
export const WindowProvider = ({ children }) => {
  const zCounterRef = useRef(100);

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
      zIndex: 101,
    },
    {
      Name: "My Computer",
      Icon: myComputer,
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      size: { w: 700, h: 500 },
      pos: { x: 150, y: 150 },
      zIndex: 102,
    },
    {
      Name: "Notepad",
      Icon: notepad,
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
      size: { w: 700, h: 500 },
      pos: { x: 650, y: 30 },
      zIndex: 103,
    }
  ]);

  const bringToFront = (windowIndex) => {
    zCounterRef.current += 1;
    const nextZ = zCounterRef.current;

    setWindows((prevWindows) =>
      prevWindows.map((window, index) =>
        index === windowIndex
          ? {
              ...window,
              zIndex: nextZ,
            }
          : window
      )
    );
  };

  return (
    <WindowContext.Provider value={{ windows, setWindows, bringToFront }}>
      {children}
    </WindowContext.Provider>
  );
};
