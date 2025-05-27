import React, { useEffect, useRef, useState } from 'react'

const DesktopIcon = ({
    icon, name, position, selected, onMouseDown, isDragging, onContextMenu, onDoubleClick
}) => {
    return (
        <div
            // ref={iconRef}
            onMouseDown={onMouseDown}
            onContextMenu={onContextMenu}
            className={`absolute flex flex-col justify-center cursor-pointer items-center w-16 h-16 py-3 hover:bg-blue-300/30 rounded select-none `}
            style={{
                left: position.x,
                top: position.y,
                zIndex: isDragging ? 10 : 1,
                userSelect: 'none'
            }}
            onDoubleClick={onDoubleClick}
        >
            <img src={icon} alt={name} className='w-8 h-8 pointer-events-none mb-1' draggable={false} />
            <p className={`text-white w-18 py-0.5 rounded-none pointer-events-none px-1 text-center leading-4 ${selected ? 'bg-[#1A57A4] text-white rounded' : ''}`}>{name}</p>
        </div>
    )
}

export default DesktopIcon