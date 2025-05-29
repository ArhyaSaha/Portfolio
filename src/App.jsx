
import React from 'react'
import StatusBar from './components/statusbar/StatusBar'
import Desktop from './components/Desktop/Desktop'
import { WindowProvider } from "./context/WindowContext";




const App = () => {
  return (
    <WindowProvider>
      <div className="bg-[url('/Background.jpg')] bg-cover bg-center flex flex-col h-screen z-0" style={{ cursor: 'url("/cursor/default_arrow.cur"), auto' }}>
        <Desktop />

        <StatusBar />
      </div>
    </WindowProvider>
  )
}

export default App