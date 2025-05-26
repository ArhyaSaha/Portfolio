import React, { useRef, useState } from 'react';
import { FaFolder, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import go from '../assets/icons/go.ico'
import back from '../assets/icons/back1.png'
import front from '../assets/icons/front1.png'
import search from '../assets/icons/search.png'
import emptyFolder from '../assets/icons/emptyFolder.png'

const MIN_WIDTH = 300, MIN_HEIGHT = 200;

export default function MyFilesModal() {
    const [pos, setPos] = useState({ x: 200, y: 150 });
    const [size, setSize] = useState({ w: 400, h: 300 });
    const start = useRef({});

    const onDrag = (e) => {
        start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        const move = e => setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
        const up = () => window.removeEventListener('mousemove', move);
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up, { once: true });
    };

    const onResize = (e, dir) => {
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
        { dir: 'top-left', class: 'top-0 left-0 cursor-nwse-resize' },
        { dir: 'top-right', class: 'top-0 right-0 cursor-nesw-resize' },
        { dir: 'bottom-left', class: 'bottom-0 left-0 cursor-nesw-resize' },
        { dir: 'bottom-right', class: 'bottom-0 right-0 cursor-nwse-resize' },
    ];

    const edges = [
        { dir: 'top', class: 'top-0 left-3 right-3 h-[6px] cursor-ns-resize' },
        { dir: 'bottom', class: 'bottom-0 left-3 right-3 h-[6px] cursor-ns-resize' },
        { dir: 'left', class: 'left-0 top-3 bottom-3 w-[6px] cursor-ew-resize' },
        { dir: 'right', class: 'right-0 top-3 bottom-3 w-[6px] cursor-ew-resize' },
    ];

    return (
        <div
            className="absolute pt-7 overflow-hidden rounded-t-lg bg-blue-600 px-0.5 shadow-lg z-50"
            style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
        >
            {/* Title bar */}
            <div
                className="header__bg w-full h-10 text-white px-3 py-1 text-sm font-bold cursor-move select-none"
                onMouseDown={onDrag}
            >
                My Files
            </div>

            {/* Content */}
            <div className="h-full overflow-auto text-sm">
                <div className='w-full bg-[#eae8d5]'>
                    <div className='px-2 h-6 w-full flex gap-x-4 border-b-2 border-[#d1d1c8]'>
                        <p><u>F</u>ile</p>
                        <p><u>E</u>dit</p>
                        <p><u>V</u>iew</p>
                        <p><u>H</u>elp</p>
                    </div>

                    <div className='h-10 w-full flex items-center'>
                        <div className='h-8 flex items-center ml-2 pr-2 border-r-2 border-[#d1d1c8]'>
                            <img src={back} alt="back" className='w-8 h-8' />
                            <p>Back</p>
                            <img src={front} alt="front" className='w-8 h-8' />
                        </div>
                        <div className='flex items-center gap-x-2 mx-3'>
                            <div className='flex tracking-wide gap-x-1'>
                                <img src={search} alt="Search" className='w-6 h-6' />
                                <p>Search</p>
                            </div>

                            <div className='flex tracking-wide gap-x-1'>
                                <img src={emptyFolder} alt="Folders" className='w-6 h-6' />
                                <p>Folders</p>
                            </div>
                        </div>
                    </div>

                    <div className='h-8 w-full flex border-y-2 border-[#d1d1c8]'>
                        <p className='px-2 tracking-wide flex items-center text-center'>A<u>d</u>dress</p>

                        <div className="flex items-center border border-gray-400 shadow-inner bg-gray-100 px-1 py-1 w-full text-sm font-sans max-w-xl rounded-sm">
                            {/* Address Input Area */}
                            <div className="flex items-center flex-1 border border-gray-400 bg-white px-2 py-[2px] shadow-inner">
                                <span className="text-gray-800 truncate">C:\Documents and Settings\Admin\Desktop</span>
                                <FaChevronDown className="ml-2 text-xs text-gray-600" />
                            </div>
                        </div>

                        <div className='ml-2 w-fit pr-2 flex items-center justify-center gap-x-1  text-lg tracking-wide'>
                            <img src={go} alt="Go" className='w-5 h-5' />
                            <p>Go</p>
                        </div>

                    </div>
                </div>
                This is a draggable and resizable modal.
            </div>

            {/* Corners */}
            {corners.map(({ dir, class: posClass }) => (
                <div
                    key={dir}
                    onMouseDown={(e) => onResize(e, dir)}
                    className={`absolute w-3 h-3 bg-transparent z-50 ${posClass}`}
                />
            ))}

            {/* Edges */}
            {edges.map(({ dir, class: posClass }) => (
                <div
                    key={dir}
                    onMouseDown={(e) => onResize(e, dir)}
                    className={`absolute bg-transparent z-40 ${posClass}`}
                />
            ))}
        </div>
    );
}
