import React, { useContext, useState } from 'react'
import WindowsStart from '../../assets/icons/windowsstart.png';
import Volume from '../../assets/icons/volume.png';
import Warning from '../../assets/icons/warning.png';
import TaskDiv from '../../common/TaskDiv';
import startButton from '../../assets/icons/start.png';
import StartModal from './StartModal';
import { WindowContext } from "../../context/WindowContext";



const StatusBar = () => {
    const [start, setStart] = useState(false)
    const { windows, setWindows } = useContext(WindowContext);
    return (
        <>
            <div className="flex flex-col bottom-0 left-0 w-full h-9 bg-blue-500 ">
                {/* <div className='h-[0.15rem]' style={{ backgroundColor: '#3082E4' }}></div> */}
                <div className='h-full flex items-center overflow-visible relative' style={{
                    // background: 'linear-gradient(180deg, rgba(5,71,201,1) 20%, rgba(31,94,221,1) 100%)',
                    background: 'linear-gradient(180deg,rgba(58, 137, 233, 1) 0%, rgba(34, 88, 215, 1) 15%, rgba(34, 87, 213, 1) 29%, rgba(36, 93, 219, 1) 50%, rgba(38, 99, 224, 1) 75%, rgba(28, 75, 187, 1) 100%)',
                }}>
                    {/* START */}
                    {/* <div className='w-26 flex cursor-pointer items-center gap-x-2 border border-[#084408] bg-[#1F991F] h-full rounded-r-xl text-white pl-4 shadow-[inset_0px_0px_7px_2px_#084408]' onClick={() => { setStart(!start) }} style={{
                        background: 'linear-gradient(180deg,rgba(21, 78, 21, 1) 0%, rgba(28, 138, 28, 1) 22%, rgba(28, 138, 28, 1) 49%, rgba(31, 155, 31, 1) 84%, rgba(26, 95, 27, 1) 100%)',
                    }} >
                        <img src={WindowsStart} alt="Home Icon" className="w-5 h-5" />
                        <p className='text-2xl italic font-bold'>start</p>
                    </div> */}
                    <div className='flex items-baseline cursor-pointer' onClick={() => { setStart(!start) }}>
                        <img src={startButton} alt="Start" className='w-[6.9rem] ' />
                    </div>

                    {/* Tasks */}
                    <div className='ml-2 flex items-end gap-x-0.5'>
                        {windows.map((window, index) =>
                            window.isOpened && (
                                <TaskDiv
                                    key={index}
                                    img={window.Icon}
                                    alt={window.Name}
                                    classes="ml-2 mr-1 w-4 h-4"
                                    onClick={() => setWindows(prevWindows =>
                                        prevWindows.map((window, i) =>
                                            i === index
                                                ? { ...window, isMinimized: !window.isMinimized } // Toggle or set true/false
                                                : window
                                        )
                                    )}
                                />
                            )
                        )}
                    </div>

                    {/* Control Section */}
                    <div className='flex items-center pl-2 gap-x-1 absolute right-0 bottom-0 w-30 bg-amber-600 h-full  border-l-[2px] border-t-[2px] border-[#19B7F2] ' style={{
                        background: 'linear-gradient(180deg,rgba(13, 141, 234, 1) 50%, rgba(14, 159, 239, 1) 70%, rgba(17, 116, 214, 1) 100%)',
                    }} >
                        <img src={Volume} alt="" className='w-4 h-4' />
                        <img src={Warning} alt="" className='w-4 h-4' />
                        <p className='text-white justify-end text-lg'>7:30 pm</p>
                    </div>
                </div>
            </div>
            {start &&
                <StartModal isOpen={true}></StartModal>
            }
        </>
    )
}

export default StatusBar