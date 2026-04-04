import React, { useEffect, useMemo, useState } from 'react'
import powerIcon from '../../assets/icons/poweroff.png'

const backgroundFiles = Object.entries(
  import.meta.glob('../../assets/XPLogonBackgroundAllSizes/*.jpg', {
    eager: true,
    import: 'default',
  })
)
  .map(([path, src]) => {
    const match = path.match(/xp_(\d+)x(\d+)\.jpg$/)

    return {
      src,
      width: match ? Number(match[1]) : 0,
      height: match ? Number(match[2]) : 0,
    }
  })
  .filter((entry) => entry.width > 0 && entry.height > 0)

const pickBestBackground = (viewportWidth, viewportHeight) => {
  const viewportRatio = viewportWidth / viewportHeight
  const viewportArea = viewportWidth * viewportHeight

  return backgroundFiles.reduce((best, candidate) => {
    const candidateRatio = candidate.width / candidate.height
    const candidateArea = candidate.width * candidate.height

    const ratioScore = Math.abs(candidateRatio - viewportRatio)
    const areaScore = Math.abs(Math.log(candidateArea / viewportArea))
    const score = ratioScore * 3 + areaScore

    if (score < best.score) {
      return { score, src: candidate.src }
    }

    return best
  }, { score: Number.POSITIVE_INFINITY, src: backgroundFiles[0]?.src ?? '' }).src
}

const WelcomeScreen = ({ username, userAvatar, isExiting, onComplete }) => {
  const [backgroundImage, setBackgroundImage] = useState(() =>
    pickBestBackground(window.innerWidth, window.innerHeight)
  )

  useEffect(() => {
    const updateBackground = () => {
      setBackgroundImage(pickBestBackground(window.innerWidth, window.innerHeight))
    }

    window.addEventListener('resize', updateBackground)

    return () => {
      window.removeEventListener('resize', updateBackground)
    }
  }, [])

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onComplete()
      }, 2400)

      return () => clearTimeout(timer)
    }
  }, [isExiting, onComplete])

  const style = useMemo(
    () => ({
      backgroundImage: `url(${backgroundImage})`,
    }),
    [backgroundImage]
  )

  return (
    <div className={`xp-welcome ${isExiting ? 'xp-welcome--fadeout' : ''}`} style={style}>
      <div className="xp-welcome__topbar" aria-hidden="true" />

      <div className="xp-welcome__main">
        <div className="xp-welcome__content">
          <section className="xp-welcome__left">
            <p className="xp-welcome__text">welcome</p>
          </section>

          <div className="xp-welcome__divider" aria-hidden="true" />

          <section className="xp-welcome__right">
            <div className="xp-welcome__accountRow">
              {userAvatar && <img className="xp-welcome__avatar" src={userAvatar} alt="Account avatar" />}
              <div className="xp-welcome__accountInfo">
                <p className="xp-welcome__username">{username}</p>
                <p className="xp-welcome__status">Loading your personal settings</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="xp-welcome__bottombar">
        <button type="button" className="xp-welcome__powerButton">
          <img src={powerIcon} alt="" aria-hidden="true" />
          <span>Turn off computer</span>
        </button>

        <p className="xp-welcome__footerNote">
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </p>
      </div>
    </div>
  )
}

export default WelcomeScreen
