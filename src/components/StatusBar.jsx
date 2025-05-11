import React from 'react'

const StatusBar = () => {
    return (
        <>
            <div className="flex flex-col fixed bottom-0 left-0 w-full h-9 bg-blue-500 ">
                {/* <div className='h-[0.15rem]' style={{ backgroundColor: '#3082E4' }}></div> */}
                <div className='h-full flex items-center overflow-visible relative' style={{
                    // background: 'linear-gradient(180deg, rgba(5,71,201,1) 20%, rgba(31,94,221,1) 100%)',
                    background: 'linear-gradient(180deg,rgba(58, 137, 233, 1) 0%, rgba(34, 88, 215, 1) 10%, rgba(34, 87, 213, 1) 29%, rgba(36, 93, 219, 1) 50%, rgba(38, 99, 224, 1) 75%, rgba(28, 75, 187, 1) 100%)',
                }}>
                    {/* START */}
                    <div className='w-26 bg-green-700 h-full rounded-r-xl font-bold text-white pl-4' style={{
                        background: 'radial-gradient(circle,rgba(28, 145, 28, 1) 0%, rgba(28, 145, 28, 1) 74%, rgba(26, 95, 27, 1) 100%)',
                    }}>start</div>

                    {/* Tasks */}
                    <div className='flex gap-x-0.5'>

                        <div className='flex rounded-xs z-10 h-8 shadow-[inset_0px_0px_0px_1px_#5590FC] w-36' style={{
                            background: 'linear-gradient(90deg, rgba(88, 148, 255, 1) 0%, rgba(60, 129, 237, 1) 2%, rgba(58, 128, 243, 1) 98%, rgba(58, 128, 243, 1) 100%) ',
                        }}>
                            Hello
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