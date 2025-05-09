import React from 'react'

const StatusBar = () => {
    return (
        <>
            <div className="flex flex-col fixed bottom-0 left-0 w-full h-9 bg-blue-500 ">
                <div className='h-[0.15rem]' style={{ backgroundColor: '#3082E4' }}></div>
                <div className='h-8 overflow-visible relative' style={{
                    // background: 'linear-gradient(180deg, rgba(5,71,201,1) 20%, rgba(31,94,221,1) 100%)',
                    background: 'linear-gradient(180deg, rgba(16,73,199,1) 30%, rgba(31,94,221,1) 70%)',
                }}>
                    <div className='w-26 bg-green-700 h-full rounded-r-xl font-bold text-white pl-4'>start</div>
                    <div className='absolute right-0 bottom-0 w-20 bg-amber-600 h-full  border-l-[1px] border-t-[1px] border-[#17B4E8] ' style={{ backgroundColor: '#078FEA' }} > blah</div>
                </div>
            </div>
        </>
    )
}

export default StatusBar