import React from 'react'
import logOff from '../../assets/icons/logoff.png'
import powerOff from '../../assets/icons/poweroff.png'
import IE from '../../assets/icons/internetExplorer.png'
import email from '../../assets/icons/email.png'
import myDocs from '../../assets/icons/myDocs.png'
import myPics from '../../assets/icons/myPictures.png'
import myMusic from '../../assets/icons/myMusic.ico'
import myComputer from '../../assets/icons/myComputer.png'
import controlPanel from '../../assets/icons/controlPanel.png'
import printer from '../../assets/icons/printer.png'
import search from '../../assets/icons/search.png'
import run from '../../assets/icons/run.png'
import help from '../../assets/icons/help.png'
import userImage from '../../assets/icons/ball.jpg'
import greenTriangle from '../../assets/icons/greenTriangle.png'
import paint from '../../assets/icons/msPaint.png'


const StartModal = ({ isOpen }) => {
    return (
        <div className='fixed flex flex-col items-center justify-between bottom-9 w-[30rem] h-[35rem] bg-[#3C89E7] overflow-hidden z-50'>
            {/* Username Div */}
            <div className='h-20 w-full flex items-center bg-blue-400' style={{ background: 'linear-gradient(180deg,rgba(95, 155, 228, 1) 0%, rgba(15, 97, 204, 1) 15%, rgba(60, 137, 231, 1) 100%)' }}>
                <div className='flex justify-center items-center ml-5 w-15 h-15 rounded-sm bg-white p-0'>
                    <img src={userImage} alt="User Image" className='w-14 h-14' />
                </div>
                <p className='ml-5 text-white text-2xl tracking-wider font-extralight' style={{ fontFamily: 'ArialNarrow' }}>Jim Midnite</p>
            </div>
            {/* Contents */}
            <div className='h-[27rem] flex w-[29.75rem] items-center bg-amber-400'>
                <div className='h-full w-full bg-white p-4'>
                    <div className=' leading-0 items-center '>
                        <div className='flex items-center'>
                            <img src={IE} alt="Internet Explorer" className='w-10 h-10' />
                            <div className='pl-3'>
                                <p className='leading-4 text-xl tracking-wide font-bold'>Internet</p>
                                <p className='leading-4 tracking-wide text-lg text-[#939393]'>Internet Explorer</p>
                            </div>
                        </div>
                        <div className='flex items-center py-3'>
                            <img src={email} alt="Internet Explorer" className='w-10 h-10' />
                            <div className='pl-3'>
                                <p className='leading-4 text-xl tracking-wide font-bold'>E-mail</p>
                                <p className='leading-4 tracking-wide text-lg text-[#939393]'>Outlook Express</p>
                            </div>
                        </div>
                        <div className='h-[0.148rem] w-full' style={{
                            background: 'linear-gradient(90deg,rgba(255, 255, 255, 1) 0%, rgba(225, 225, 217, 1) 20%, rgba(225, 225, 217, 1) 80%, rgba(255, 255, 255, 1) 100%)'
                        }}></div>
                        <div className='flex items-center pt-3'>
                            <img src={email} alt="Internet Explorer" className='w-10 h-10' />
                            <div className='pl-3 '>
                                <p className='leading-4 tracking-wide text-lg '>Outlook Express</p>
                            </div>
                        </div>
                        <div className='flex items-center pt-3'>
                            <img src={email} alt="Internet Explorer" className='w-10 h-10' />
                            <div className='pl-3'>
                                <p className='leading-4 tracking-wide text-lg '>Outlook Express</p>
                            </div>
                        </div>
                        <div className='flex items-center pt-3'>
                            <img src={email} alt="Internet Explorer" className='w-10 h-10' />
                            <div className='pl-3'>
                                <p className='leading-4 tracking-wide text-lg '>Outlook Express</p>
                            </div>
                        </div>
                        <div className='flex items-center pt-3'>
                            <img src={email} alt="Internet Explorer" className='w-10 h-10' />
                            <div className='pl-3'>
                                <p className='leading-4 tracking-wide text-lg '>Outlook Express</p>
                            </div>
                        </div>
                        <div className='flex items-center pt-3 pb-2 '>
                            <img src={paint} alt="Microsoft Paint" className='w-10 h-10' />
                            <div className='pl-3'>
                                <p className='leading-4 tracking-wide text-lg '>Paint</p>
                            </div>
                        </div>

                        <div className='h-[0.148rem] w-full' style={{
                            background: 'linear-gradient(90deg,rgba(255, 255, 255, 1) 0%, rgba(225, 225, 217, 1) 20%, rgba(225, 225, 217, 1) 80%, rgba(255, 255, 255, 1) 100%)'
                        }}></div>

                        <div className='h-8 w-full justify-center items-center flex'>
                            <p className='text-xl tracking-wide font-bold'>All <u>P</u>rograms</p>
                            <img src={greenTriangle} alt="open all programs" className='pl-1 pt-1 w-6 h-6' />
                            {/* <img src={''} alt="Internet Explorer" className='w-10 h-10' /> */}
                        </div>
                    </div>
                </div>
                <div className='h-full w-full px-2 border-l-2 border-[#afcdf2] bg-[#D3E5FA]'>
                    <div className='flex items-center pt-3'>
                        <img src={myDocs} alt="My Documents" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-xl font-bold text-[#0a1f56] '>My Documents</p>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <img src={myPics} alt="My Pictures" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-xl font-bold text-[#0a1f56] '>My Pictures</p>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <img src={myMusic} alt="My Music" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-xl font-bold text-[#0a1f56] '>My Music</p>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <img src={myComputer} alt="My Computer" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-xl font-bold text-[#0a1f56] '>My Computer</p>
                        </div>
                    </div>

                    <div className='h-[0.10rem] my-3 w-full' style={{
                        background: 'linear-gradient(90deg,rgba(211, 229, 250, 1) 0%, rgba(163, 198, 246, 1) 30%, rgba(163, 198, 246, 1) 70%, rgba(211, 229, 250, 1) 100%)'
                    }}></div>

                    <div className='flex items-center'>
                        <img src={controlPanel} alt="Control Panel" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-lg text-[#0a1f56] '>Control Panel</p>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <img src={printer} alt="Printer and faxes" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-lg text-[#0a1f56] '>Printer and Faxes</p>
                        </div>
                    </div>

                    <div className='h-[0.10rem] my-3 w-full' style={{
                        background: 'linear-gradient(90deg,rgba(211, 229, 250, 1) 0%, rgba(163, 198, 246, 1) 30%, rgba(163, 198, 246, 1) 70%, rgba(211, 229, 250, 1) 100%)'
                    }}></div>

                    <div className='flex items-center'>
                        <img src={help} alt="help" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-lg text-[#0a1f56] '><u>H</u>elp and Support</p>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <img src={search} alt="Search" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-lg text-[#0a1f56] '><u>S</u>earch</p>
                        </div>
                    </div>

                    <div className='flex items-center pt-2'>
                        <img src={run} alt="run" className='w-8 h-8' />
                        <div className='pl-2'>
                            <p className='leading-4 tracking-wide text-lg text-[#0a1f56] '><u>R</u>un .  .  .</p>
                        </div>
                    </div>



                </div>
            </div>

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
        </div >
    )
}

export default StartModal