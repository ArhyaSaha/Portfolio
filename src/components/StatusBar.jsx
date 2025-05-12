import React from 'react'
import WindowsStart from '../assets/icons/windowsstart.png';
import TaskDiv from '../common/TaskDiv';


const StatusBar = () => {
    return (
        <>
            <div className="flex flex-col fixed bottom-0 left-0 w-full h-9 bg-blue-500 ">
                {/* <div className='h-[0.15rem]' style={{ backgroundColor: '#3082E4' }}></div> */}
                <div className='h-full flex items-center overflow-visible relative' style={{
                    // background: 'linear-gradient(180deg, rgba(5,71,201,1) 20%, rgba(31,94,221,1) 100%)',
                    background: 'linear-gradient(180deg,rgba(58, 137, 233, 1) 0%, rgba(34, 88, 215, 1) 15%, rgba(34, 87, 213, 1) 29%, rgba(36, 93, 219, 1) 50%, rgba(38, 99, 224, 1) 75%, rgba(28, 75, 187, 1) 100%)',
                }}>
                    {/* START */}
                    <div className='w-26 flex items-center gap-x-2 border border-[#084408] bg-[#1F991F] h-full rounded-r-xl text-white pl-4 shadow-[inset_0px_0px_7px_2px_#084408]' style={{
                        background: 'linear-gradient(180deg,rgba(21, 78, 21, 1) 0%, rgba(28, 138, 28, 1) 22%, rgba(28, 138, 28, 1) 49%, rgba(31, 155, 31, 1) 84%, rgba(26, 95, 27, 1) 100%)',
                    }} >
                        <img src={WindowsStart} alt="Home Icon" className="w-5 h-5" />
                        <p className='text-2xl italic font-bold'>Start</p>
                    </div>

                    {/* Tasks */}
                    <div className='ml-2 flex items-end gap-x-0.5'>
                        <TaskDiv
                            img={WindowsStart}
                            alt="taskIcon"
                            classes="ml-2 mr-1 w-4 h-4"
                        />

                        <div className='flex items-center justify-start rounded-xs z-10 h-[1.87rem] shadow-[inset_0px_0px_0px_1px_#5590FC] w-36' style={{
                            background: 'linear-gradient(90deg, rgba(88, 148, 255, 1) 0%, rgba(60, 129, 237, 1) 2%, rgba(58, 128, 243, 1) 98%, rgba(58, 128, 243, 1) 100%) ',
                        }}>
                            <img src={WindowsStart} alt="Home Icon" className="ml-2 mr-1 w-4 h-4" />
                            <p className='text-white text-md'>C:\</p>
                        </div>
                        <div className='flex rounded-xs z-10 h-8 shadow-[inset_0px_1px_43px_-13px_#78ACFF] w-36' style={{
                            background: 'linear-gradient(90deg, rgba(88, 148, 255, 1) 0%, rgba(60, 129, 237, 1) 2%, rgba(58, 128, 243, 1) 98%, rgba(28, 90, 198, 1) 100%) ',
                        }}>
                            Hello
                        </div>
                    </div>

                    {/* Control Section */}
                    <div className='absolute right-0 bottom-0 w-30 bg-amber-600 h-full  border-l-[2px] border-t-[2px] border-[#19B7F2] ' style={{
                        background: 'linear-gradient(180deg,rgba(13, 141, 234, 1) 50%, rgba(14, 159, 239, 1) 70%, rgba(17, 116, 214, 1) 100%)',
                    }} > blah</div>
                </div>
            </div>
        </>
    )
}

export default StatusBar