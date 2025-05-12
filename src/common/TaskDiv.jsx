import React from 'react'

const TaskDiv = ({ img, alt, classes }) => {
    return (
        <div className='flex items-center justify-start rounded-xs z-10 h-[1.87rem] shadow-[inset_0px_0px_0px_1px_#5590FC] w-36' style={{
            background: 'linear-gradient(90deg, rgba(88, 148, 255, 1) 0%, rgba(60, 129, 237, 1) 2%, rgba(58, 128, 243, 1) 98%, rgba(58, 128, 243, 1) 100%) ',
        }}>
            <img src={img} alt={alt} className="ml-2 mr-1 w-4 h-4" />
            <p className='text-white text-md'>C:\</p>
        </div>
    )
}

export default TaskDiv