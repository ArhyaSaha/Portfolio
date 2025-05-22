import React, { useEffect, useRef, useState } from 'react'

const DesktopIcon = ({
    icon, name, position, selected, onMouseDown, isDragging, onContextMenu
}) => {
    return (
        <div
            // ref={iconRef}
            onMouseDown={onMouseDown}
            onContextMenu={onContextMenu}
            className={`absolute flex flex-col justify-center cursor-pointer items-center w-16 h-16 py-3 hover:bg-blue-300/30 rounded select-none ${selected ? 'bg-blue-600 text-white rounded' : ''}`}
            style={{
                left: position.x,
                top: position.y,
                zIndex: isDragging ? 10 : 1,
                userSelect: 'none'
            }}
        >
            <img src={icon} alt={name} className='w-8 h-8 pointer-events-none' draggable={false} />
            <p className='text-white pointer-events-none'>{name}</p>
        </div>
    )
}

export default DesktopIcon