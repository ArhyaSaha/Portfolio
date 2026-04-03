import React, { useEffect, useState } from 'react'
import StatusBar from './components/statusbar/StatusBar'
import Desktop from './components/Desktop/Desktop'
import { WindowProvider } from "./context/WindowContext";
import bootAnimation from './assets/boot_animation.gif'




const App = () => {
  const [minDelayDone, setMinDelayDone] = useState(false)
  const [windowLoaded, setWindowLoaded] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete'
  )
  const [showBootScreen, setShowBootScreen] = useState(true)
  const [fadeBootScreen, setFadeBootScreen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayDone(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (windowLoaded) {
      return
    }

    const onLoad = () => setWindowLoaded(true)
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [windowLoaded])

  useEffect(() => {
    if (!minDelayDone || !windowLoaded) {
      return
    }

    setFadeBootScreen(true)
    const hideTimer = setTimeout(() => {
      setShowBootScreen(false)
    }, 1400)

    return () => clearTimeout(hideTimer)
  }, [minDelayDone, windowLoaded])

  return (
    <WindowProvider>
      <div className="bg-[url('/Background.jpg')] bg-cover bg-center flex flex-col h-screen z-0 cursor-default">
        {showBootScreen && (
          <div
            className={`boot-overlay ${fadeBootScreen ? 'boot-overlay--fadeout' : ''}`}
            role="status"
            aria-live="polite"
            aria-label="Loading desktop"
          >
            <img className="boot-animation" src={bootAnimation} alt="Boot animation" />
          </div>
        )}

        <Desktop />

        <StatusBar />
      </div>
    </WindowProvider>
  )
}

export default App