import React, { createContext, useState } from "react";

// 1. Create the context
export const WindowContext = createContext();

// 2. Create the provider component
export const WindowProvider = ({ children }) => {
  const [windows, setWindows] = useState([
    {
      Name: "Window 1",
      Icon: "📁",
      isOpened: true,
      isMinimized: false,
      isMaximized: false,
      isClosed: false,
    },
    {
      Name: "Window 2",
      Icon: "📝",
      isOpened: true,
      isMinimized: true,
      isMaximized: false,
      isClosed: false,
    },
    {
      Name: "Window 3",
      Icon: "🌐",
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
