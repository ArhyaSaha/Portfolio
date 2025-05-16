import React from 'react'
import logOff from '../../assets/icons/logoff.png'
import powerOff from '../../assets/icons/poweroff.png'

const StartModal = ({ isOpen }) => {
    return (
        <div className='fixed flex flex-col items-center justify-between bottom-9 w-[30rem] h-[35rem] bg-green-500 overflow-hidden'>
            {/* Username Div */}
            <div className='h-20 w-full flex items-center bg-blue-400' style={{ background: 'linear-gradient(180deg,rgba(95, 155, 228, 1) 0%, rgba(15, 97, 204, 1) 15%, rgba(60, 137, 231, 1) 100%)' }}>
                <div className='ml-5 w-15 h-15 rounded-sm bg-white'></div>
                <p className='ml-5 text-white text-2xl tracking-wider font-extralight' style={{ fontFamily: 'ArialNarrow' }}>Jim Midnite</p>
            </div>
            {/* Contents */}
            <div className='h-[27rem] w-[29.75rem] bg-amber-400'></div>
            {/* Power Control */}
            <div className='h-14 flex w-full justify-end bg-blue-400' style={{ background: 'linear-gradient(180deg,rgba(66, 139, 228, 1) 0%, rgba(46, 126, 226, 1) 38%, rgba(16, 97, 206, 1) 97%)' }}>
                <div className='flex items-center text-xl gap-2 mr-5'>
                    <div className='flex items-center text-white'>
                        <img src={logOff} alt="log off" className='w-8 h-8' />
                        <p className='font-extralight pl-2'><u>L</u>og Off</p>
                    </div>
                    <div className='flex items-center text-white'>
                        <img src={powerOff} alt="power off" className='w-11 h-11' />
                        <p className='font-extralight'>T<u>u</u>rn Off Computer</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartModal