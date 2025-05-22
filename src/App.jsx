
import React from 'react'
import StatusBar from './components/statusbar/StatusBar'
import Desktop from './components/Desktop/Desktop'




const App = () => {
  return (
    <>
      <div className="bg-[url('/Background.jpg')] bg-cover bg-center flex flex-col h-screen z-0">
        <Desktop />

        <StatusBar />
      </div>
    </>
  )
}

export default App