import React, { useEffect, useRef, useState } from 'react'
import StatusBar from './components/statusbar/StatusBar'
import Desktop from './components/Desktop/Desktop'
import { WindowProvider } from "./context/WindowContext";
import bootAnimation from './assets/boot_animation.gif'
import LogonScreen from './components/logon/LogonScreen'
import WelcomeScreen from './components/welcome/WelcomeScreen'
import primaryAvatar from './assets/icons/ball.jpg'




const App = () => {
  const [minDelayDone, setMinDelayDone] = useState(false)
  const [windowLoaded, setWindowLoaded] = useState(
    typeof document !== 'undefined' && document.readyState === 'complete'
  )
  const [showBootScreen, setShowBootScreen] = useState(true)
  const [fadeBootScreen, setFadeBootScreen] = useState(false)
  const [showLogonScreen, setShowLogonScreen] = useState(true)
  const [fadeLogonScreen, setFadeLogonScreen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false)
  const [fadeWelcomeScreen, setFadeWelcomeScreen] = useState(false)
  const [desktopBgReady, setDesktopBgReady] = useState(false)
  const [selectedUsername, setSelectedUsername] = useState('')
  const [selectedUserAvatar, setSelectedUserAvatar] = useState(null)
  const loginTimerRef = useRef(null)

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

  useEffect(() => {
    return () => {
      if (loginTimerRef.current) {
        clearTimeout(loginTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const image = new Image()
    image.onload = () => setDesktopBgReady(true)
    image.src = '/Background.jpg'

    if (image.complete) {
      setDesktopBgReady(true)
    }
  }, [])

  useEffect(() => {
    if (!showWelcomeScreen || showLogonScreen) {
      return
    }

    if (!desktopBgReady) {
      return
    }

    const welcomeTimer = setTimeout(() => {
      setFadeWelcomeScreen(true)
    }, 2000)

    return () => clearTimeout(welcomeTimer)
  }, [showWelcomeScreen, showLogonScreen, desktopBgReady])

  const handleLogin = (userId) => {
    if (loginTimerRef.current) {
      clearTimeout(loginTimerRef.current)
    }

    setSelectedUsername(userId === 'arhya' ? "Arhya's XP" : userId)
    setSelectedUserAvatar(primaryAvatar)
    setFadeWelcomeScreen(false)
    setShowWelcomeScreen(true)
    setFadeLogonScreen(true)

    loginTimerRef.current = setTimeout(() => {
      setShowLogonScreen(false)
      setFadeLogonScreen(false)
      loginTimerRef.current = null
    }, 900)
  }

  const handleWelcomeComplete = () => {
    setShowWelcomeScreen(false)
    setIsLoggedIn(true)
  }

  const showDesktopBackground = showWelcomeScreen || isLoggedIn

  return (
    <WindowProvider>
      <div
        className={`flex flex-col h-screen z-0 cursor-default ${
          showDesktopBackground ? "bg-[url('/Background.jpg')] bg-cover bg-center" : 'bg-black'
        }`}
      >
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

        {showLogonScreen && <LogonScreen onLogin={handleLogin} isExiting={fadeLogonScreen} />}

        {showWelcomeScreen && (
          <WelcomeScreen
            username={selectedUsername}
            userAvatar={selectedUserAvatar}
            isExiting={fadeWelcomeScreen}
            onComplete={handleWelcomeComplete}
          />
        )}

        {isLoggedIn && <Desktop />}

        {isLoggedIn && <StatusBar />}
      </div>
    </WindowProvider>
  )
}

export default App