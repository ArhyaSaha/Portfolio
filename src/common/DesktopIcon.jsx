import React, { useEffect, useRef, useState } from 'react'

const DesktopIcon = ({
    icon, name, position, selected, onMouseDown, isDragging
}) => {
    // const [pos, setPos] = useState({ x: position.x, y: position.y });
    // const [isDragging, setIsDragging] = useState(false);
    // const iconRef = useRef(null);
    // const offset = useRef({ x: 0, y: 0 });
    // const GRID_SIZE = 80;
    // const PADDING_OFFSET = 16;
    // const ICON_SIZE = 64;

    // // Handle mouse down
    // const handleMouseDown = (e) => {
    //     setIsDragging(true);
    //     const rect = iconRef.current.getBoundingClientRect();
    //     offset.current = {
    //         x: e.clientX - rect.left,
    //         y: e.clientY - rect.top,
    //     };
    // };

    // // Handle mouse move
    // useEffect(() => {
    //     const handleMouseMove = (e) => {
    //         if (!isDragging) return;
    //         const newX = e.clientX - offset.current.x;
    //         const newY = e.clientY - offset.current.y;
    //         setPos({ x: newX, y: newY });
    //     };

    //     const handleMouseUp = () => {
    //         if (!isDragging) return;

    //         // Snap to nearest grid point
    //         let snappedX = Math.round((pos.x - PADDING_OFFSET) / GRID_SIZE) * GRID_SIZE + PADDING_OFFSET;
    //         let snappedY = Math.round((pos.y - (PADDING_OFFSET / 2)) / GRID_SIZE) * GRID_SIZE + (PADDING_OFFSET / 2);

    //         // Get desktop bounds
    //         const desktop = iconRef.current?.parentElement;
    //         if (desktop) {
    //             const rect = desktop.getBoundingClientRect();
    //             const maxX = rect.width - ICON_SIZE - PADDING_OFFSET;
    //             const maxY = rect.height - ICON_SIZE - (PADDING_OFFSET / 2);

    //             // Clamp to within bounds
    //             snappedX = Math.max(PADDING_OFFSET, Math.min(snappedX, maxX));
    //             snappedY = Math.max(PADDING_OFFSET, Math.min(snappedY, maxY));
    //         }

    //         setPos({ x: snappedX, y: snappedY });
    //         setIsDragging(false);
    //     };

    //     document.addEventListener('mousemove', handleMouseMove);
    //     document.addEventListener('mouseup', handleMouseUp);

    //     return () => {
    //         document.removeEventListener('mousemove', handleMouseMove);
    //         document.removeEventListener('mouseup', handleMouseUp);
    //     };
    // }, [isDragging, pos]);
    return (
        <div
            // ref={iconRef}
            onMouseDown={onMouseDown}
            className={`absolute flex flex-col justify-center cursor-pointer items-center w-16 h-16 py-3 hover:bg-blue-500 rounded select-none ${selected ? 'bg-blue-600 text-white rounded' : ''}`}
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