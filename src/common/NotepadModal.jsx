import React, { useRef, useState, useContext, useEffect } from 'react';
import close from '../assets/icons/close.png'
import minimize from '../assets/icons/minimize.png'
import maximize from '../assets/icons/maximize.png'
import notepadIcon from '../assets/icons/notepad.png'
import { WindowContext } from "../context/WindowContext";

const MIN_WIDTH = 400, MIN_HEIGHT = 300;

export default function NotepadModal() {
    const { windows, setWindows, bringToFront } = useContext(WindowContext);

    const [pos, setPos] = useState(windows[2].pos || { x: 200, y: 150 });
    const [size, setSize] = useState(windows[2].size || { w: 700, h: 500 });
    const [textContent, setTextContent] = useState('');
    const start = useRef({});
    const textareaRef = useRef(null);

    useEffect(() => {
        // Auto-focus the textarea when the component mounts
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setWindows(prevWindows =>
            prevWindows.map((window, index) =>
                index === 2
                    ? {
                        ...window,
                        size: { ...size },
                        pos: { ...pos }
                    }
                    : window
            )
        )
    }, [size, pos])

    const onDrag = (e) => {
        bringToFront(2);
        start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        const move = e => setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
        const up = () => window.removeEventListener('mousemove', move);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up, { once: true });
    };

    const onResize = (e, dir) => {
        bringToFront(2);
        e.stopPropagation();
        const sx = e.clientX, sy = e.clientY, sw = size.w, sh = size.h, px = pos.x, py = pos.y;
        const move = e => {
            let dx = e.clientX - sx, dy = e.clientY - sy;
            let w = sw, h = sh, x = px, y = py;
            if (dir.includes('right')) w = Math.max(MIN_WIDTH, sw + dx);
            if (dir.includes('bottom')) h = Math.max(MIN_HEIGHT, sh + dy);
            if (dir.includes('left')) { w = Math.max(MIN_WIDTH, sw - dx); x = px + dx; }
            if (dir.includes('top')) { h = Math.max(MIN_HEIGHT, sh - dy); y = py + dy; }
            setSize({ w, h }); setPos({ x, y });
        };
        const up = () => window.removeEventListener('mousemove', move);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up, { once: true });
    };

    const corners = [
        { dir: 'top-left', class: 'top-0 left-0 cursor-resize-nwse' },
        { dir: 'top-right', class: 'top-0 right-0 cursor-resize-nesw' },
        { dir: 'bottom-left', class: 'bottom-0 left-0 cursor-resize-nesw' },
        { dir: 'bottom-right', class: 'bottom-0 right-0 cursor-resize-nwse' },
    ];

    const edges = [
        { dir: 'top', class: 'top-0 left-3 right-3 h-[6px] cursor-resize-ns' },
        { dir: 'bottom', class: 'bottom-0 left-3 right-3 h-[6px] cursor-resize-ns' },
        { dir: 'left', class: 'left-0 top-3 bottom-3 w-[6px] cursor-resize-ew' },
        { dir: 'right', class: 'right-0 top-3 bottom-3 w-[6px] cursor-resize-ew' },
    ];

    const maximizeWindow = () => {
        if (windows[2].isMaximized) {
            setSize({ w: 700, h: 500 })
            setPos({ x: 200, y: 150 })
        } else {
            setSize({ w: window.innerWidth, h: window.innerHeight - 32 })
            setPos({ x: 0, y: 0 })
        }

        setWindows(prevWindows =>
            prevWindows.map((window, index) =>
                index === 2
                    ? {
                        ...window,
                        isMaximized: !window.isMaximized,
                    }
                    : window
            )
        )
    }

    return (
        <div
            className={`absolute pt-7 overflow-hidden bg-blue-600 px-0.5 shadow-lg ${windows[2].isMaximized ? '' : 'rounded-t-lg'}`}
            style={{ left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: windows[2].zIndex ?? 50 }}
            onMouseDown={() => bringToFront(2)}
        >
            {/* Title bar */}
            <div
                className="header__bg w-full h-7 text-white pl-2 pr-1 py-1 flex items-center justify-between font-bold select-none"
                onMouseDown={onDrag}
            >
                <div className='flex items-center gap-x-1'>
                    <img src={notepadIcon} alt="Notepad" className='w-4 h-4' />
                    <p className='tracking-wide text-sm'>Untitled - Notepad</p>
                </div>
                <div className='flex'>
                    <img src={minimize} alt="" className='w-5 h-5 mr-1 z-10 cursor-pointer'
                        onClick={() => setWindows(prevWindows =>
                            prevWindows.map((window, index) =>
                                index === 2
                                    ? { ...window, isMinimized: !window.isMinimized }
                                    : window
                            )
                        )}
                    />
                    <img src={maximize} alt="" className='w-5 h-5 mr-1 z-10 cursor-pointer' onClick={maximizeWindow} />
                    <img src={close} alt="" className='w-5 h-5 z-10 cursor-pointer'
                        onClick={() => setWindows(prevWindows =>
                            prevWindows.map((window, index) =>
                                index === 2
                                    ? { ...window, isOpened: !window.isOpened }
                                    : window
                            )
                        )} />
                </div>
            </div>

            {/* Content */}
            <div className="h-full flex flex-col bg-white">
                {/* Menu bar */}
                <div className='w-full bg-[#ECE9D8] border-b border-gray-300'>
                    <div className='tracking-wide px-3 py-1 h-5 flex items-center gap-x-4 text-sm border-b-2 border-r-2 border-[#d1d1c8]'>
                        <p className='hover:bg-[#d4d0c8] '><u>F</u>ile</p>
                        <p className='hover:bg-[#d4d0c8] '><u>E</u>dit</p>
                        <p className='hover:bg-[#d4d0c8] '><u>V</u>iew</p>
                        <p className='hover:bg-[#d4d0c8] '><u>H</u>elp</p>
                    </div>
                </div>
                
                    
                {/* Text Area */}
                <textarea
                    ref={textareaRef}
                    className='flex-1 w-full px-1 font-mono text-sm resize-none outline-none'
                    placeholder=''
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                />
            </div>

            {/* Resize Corners */}
            {corners.map(({ dir, class: className }) => (
                <div
                    key={dir}
                    className={`absolute w-3 h-3 ${className}`}
                    onMouseDown={e => onResize(e, dir)}
                />
            ))}

            {/* Resize Edges */}
            {edges.map(({ dir, class: className }) => (
                <div
                    key={dir}
                    className={`absolute ${className}`}
                    onMouseDown={e => onResize(e, dir)}
                />
            ))}
        </div>
    );
}
