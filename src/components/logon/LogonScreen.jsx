import React, { useEffect, useMemo, useState } from 'react'
import xpLogo from '../../assets/icons/xplogo_for_logon_screen.png'
import powerIcon from '../../assets/icons/poweroff.png'
import primaryAvatar from '../../assets/icons/ball.jpg'
import guestAvatar from '../../assets/icons/myPictures.png'

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

const LogonScreen = ({ onLogin, isExiting }) => {
  const [backgroundImage, setBackgroundImage] = useState(() =>
    pickBestBackground(window.innerWidth, window.innerHeight)
  )

  const accounts = [
    { id: 'arhya', name: "Arhya's XP", avatar: primaryAvatar },
  ]

  useEffect(() => {
    const updateBackground = () => {
      setBackgroundImage(pickBestBackground(window.innerWidth, window.innerHeight))
    }

    window.addEventListener('resize', updateBackground)

    return () => {
      window.removeEventListener('resize', updateBackground)
    }
  }, [])

  const style = useMemo(
    () => ({
      backgroundImage: `url(${backgroundImage})`,
    }),
    [backgroundImage]
  )

  return (
    <div className={`xp-logon ${isExiting ? 'xp-logon--fadeout' : ''}`} style={style}>
      <div className="xp-logon__topbar" aria-hidden="true" />

      <div className="xp-logon__main">
        <div className="xp-logon__content">
          <section className="xp-logon__left">
            <img className="xp-logon__logo" src={xpLogo} alt="Microsoft Windows XP" />
            <p className="xp-logon__title">To begin, click your user name</p>
          </section>

          <div className="xp-logon__divider" aria-hidden="true" />

          <section className="xp-logon__right" role="list" aria-label="Available accounts">
            {accounts.map((account) => (
              <button
                key={account.id}
                type="button"
                className="xp-logon__accountRow"
                role="listitem"
                onClick={() => onLogin(account.id)}
              >
                <img className="xp-logon__accountAvatar" src={account.avatar} alt={`${account.name} account avatar`} />
                <span className="xp-logon__accountName">{account.name}</span>
              </button>
            ))}
          </section>
        </div>
      </div>

      <div className="xp-logon__bottombar">
        <button type="button" className="xp-logon__powerButton">
          <img src={powerIcon} alt="" aria-hidden="true" />
          <span>Turn off computer</span>
        </button>

        <p className="xp-logon__footerNote">
          After you log on, you can add or change accounts.<br />
          Just go to Control Panel and click User Accounts.
        </p>
      </div>
    </div>
  )
}

export default LogonScreen
