import React, { useRef, useState, useContext, useEffect } from 'react';
import { FaFolder, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import go from '../assets/icons/go.ico'
import back from '../assets/icons/back1.png'
import front from '../assets/icons/front1.png'
import search from '../assets/icons/search.png'
import view from '../assets/icons/view.png'
import downArrow from '../assets/icons/downArrow1.png'
import searchbarDropdown from '../assets/icons/searchbarDropdown.png'
import dropdownArrow from '../assets/icons/dropdownArrow.png'
import emptyFolder from '../assets/icons/emptyFolder.png'
import folder from '../assets/icons/folder.png'
import discC from '../assets/icons/discC.png'
import dvd from '../assets/icons/dvd.png'
import close from '../assets/icons/close.png'
import minimize from '../assets/icons/minimize.png'
import maximize from '../assets/icons/maximize.png'
import msLogo from '../assets/icons/msLogo.png'
import { WindowContext } from "../context/WindowContext";

const MIN_WIDTH = 600, MIN_HEIGHT = 400;

export default function MyFilesModal() {
    const { windows, setWindows } = useContext(WindowContext);

    const [pos, setPos] = useState(windows[1].pos || { x: 200, y: 150 });
    const [size, setSize] = useState(windows[1].size || { w: 700, h: 500 });
    const start = useRef({});

    useEffect(() => {
        setWindows(prevWindows =>
            prevWindows.map((window, index) =>
                index === 1
                    ? {
                        ...window,
                        size: { ...size },
                        pos: { ...pos }
                    } // Toggle or set true/false
                    : window
            )
        )
        console.log(size, pos)
    }, [size, pos])


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
        if (windows[1].isMaximized) {
            setSize({ w: 860, h: 585 })
            setPos({ x: 488, y: 53 })
        } else {
            setSize({ w: window.innerWidth, h: window.innerHeight - 32 })
            setPos({ x: 0, y: 0 })
        }

        setWindows(prevWindows =>
            prevWindows.map((window, index) =>
                index === 1
                    ? {
                        ...window,
                        isMaximized: !window.isMaximized,
                    } // Toggle or set true/false
                    : window
            )
        )
    }

    return (
        <div
            className={`absolute pt-7 overflow-hidden bg-blue-600 px-0.5 shadow-lg z-50 ${windows[1].isMaximized ? '' : 'rounded-t-lg'}`}
            style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
        >
            {/* Title bar */}
            <div
                className="header__bg w-full h-10 text-white pl-3 pr-1 py-1 flex items-center justify-between font-bold select-none"
                onMouseDown={onDrag}
            >
                <p className='tracking-wide '>My Computer</p>
                <div className='flex'>
                    <img src={minimize} alt="" className='w-5 h-5 mr-1 z-10 cursor-pointer'
                        onClick={() => setWindows(prevWindows =>
                            prevWindows.map((window, index) =>
                                index === 1
                                    ? { ...window, isMinimized: !window.isMinimized } // Toggle or set true/false
                                    : window
                            )
                        )}
                    />
                    <img src={maximize} alt="" className='w-5 h-5 mr-1 z-10' onClick={maximizeWindow} />
                    <img src={close} alt="" className='w-5 h-5 z-10 cursor-pointer'
                        onClick={() => setWindows(prevWindows =>
                            prevWindows.map((window, index) =>
                                index === 1
                                    ? { ...window, isOpened: !window.isOpened } // Toggle or set true/false
                                    : window
                            )
                        )} />
                </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-auto text-sm">
                <div className='w-full bg-[#eae8d5]'>
                    <div className='tracking-wide pl-1 h-5 w-full flex items-center'>
                        <div className='tracking-wide px-2 h-full w-full flex items-center gap-x-4 border-b-2 border-r-2 border-[#d1d1c8]'>
                            <p><u>F</u>ile</p>
                            <p><u>E</u>dit</p>
                            <p><u>V</u>iew</p>
                            <p><u>H</u>elp</p>
                        </div>
                        <img src={msLogo} alt="" className='w-7 h-full' />
                    </div>

                    <div className='h-10 w-full flex items-center border-t-[1px] border-[#ffffff]'>
                        <div className='h-8 flex items-center ml-1 pr-2 border-r-2 border-[#d1d1c8]'>
                            <img src={back} alt="back" className='w-8 h-8' />
                            <p>Back</p>
                            <img src={downArrow} alt="" className='ml-0.5 w-2 h-2 mr-2' />

                            <img src={front} alt="front" className='w-8 h-8' />
                            <img src={downArrow} alt="" className=' w-2 h-2' />
                        </div>

                        <div className='h-8 flex items-center gap-x-2 mx-3 border-r-2 pr-2 border-[#d1d1c8]'>
                            <div className='flex tracking-wide gap-x-1'>
                                <img src={search} alt="Search" className='w-6 h-6' />
                                <p>Search</p>
                            </div>

                            <div className='flex tracking-wide gap-x-1'>
                                <img src={emptyFolder} alt="Folders" className='w-6 h-6' />
                                <p>Folders</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-x-1'>
                            <img src={view} alt="Change View" className='w-6 h-6' />
                            <img src={downArrow} alt="" className='w-2 h-2' />
                        </div>

                    </div>

                    <div className='h-6 w-full flex items-center border-y-2 border-[#d1d1c8]'>
                        <div className='h-full w-full flex border-t-[1px] border-[#ffffff]'>
                            <p className='px-1 tracking-wide flex items-center text-center text-[#9d9c97]'>A<u>d</u>dress</p>

                            <div className="flex items-center max-w-lg w-full ">
                                {/* Address Input Area */}
                                <div className="flex items-center justify-between h-5 flex-1 border border-gray-400 bg-white pl-2 py-[2px] shadow-inner">
                                    <span className="text-gray-800 truncate">C:\Documents and Settings\Admin\Desktop</span>
                                    <img src={searchbarDropdown} alt="" className='w-4 h-4' />
                                </div>
                            </div>

                            <div className='ml-2 w-fit pr-2 flex items-center justify-center gap-x-1  text-lg tracking-wide'>
                                <img src={go} alt="Go" className='w-4 h-4' />
                                <p>Go</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='bg-white w-full flex' style={{ height: 'calc(100% - 5.4rem)' }}>
                    <div className='bg-blue-500 min-w-40 h-full flex flex-col items-center ml-[0.05rem] py-3 gap-y-5' style={{ background: 'linear-gradient(to bottom, #748aff 0%, #4057d3 100%)' }}>
                        <div className='w-36 h-24 bg-white rounded-t-sm overflow-hidden' style={{
                            background: 'linear-gradient(to right, rgb(180, 200, 251) 0%, rgb(164, 185, 251) 50%, rgb(180, 200, 251) 100%)'
                        }}>
                            <div className='flex items-center justify-between pl-3 pr-2 w-full h-7 bg-blue-300 font-bold text-[#214489] text-[1rem] tracking-wide' style={{
                                background: 'linear-gradient(to right, rgb(240, 240, 255) 0%, rgb(240, 240, 255) 30%, rgb(168, 188, 255) 100%)'
                            }}>
                                <p>System Tasks</p>
                                <img src={dropdownArrow} alt="" className='w-4 h-4' />
                            </div>
                        </div>

                        <div className='w-36 h-24 bg-white rounded-t-sm overflow-hidden' style={{
                            background: 'linear-gradient(to right, rgb(180, 200, 251) 0%, rgb(164, 185, 251) 50%, rgb(180, 200, 251) 100%)'
                        }}>
                            <div className='flex items-center justify-between pl-3 pr-2 w-full h-7 bg-blue-300 font-bold text-[#214489] text-[1rem] tracking-wide' style={{
                                background: 'linear-gradient(to right, rgb(240, 240, 255) 0%, rgb(240, 240, 255) 30%, rgb(168, 188, 255) 100%)'
                            }}>
                                <p>Other Actions</p>
                                <img src={dropdownArrow} alt="" className='w-4 h-4' />
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-full bg-white pt-0.5'>
                        <p className='font-bold tracking-wide text-[1rem] ml-5 leading-5'>Files Stored on This Computer</p>
                        <div className='w-74 h-0.5' style={{ background: 'linear-gradient(to right, #70bfff 0%, #fff 100%)' }}></div>
                        <div className='ml-5 mt-2 flex items-center'>
                            <img src={folder} alt="" className='w-11 h-11' />
                            <p className='text-[1rem] tracking-wide pl-2'>Shared Documents</p>

                            <img src={folder} alt="" className='ml-10 w-11 h-11' />
                            <p className='text-[1rem] tracking-wide pl-2'>Administrator's Documents</p>
                        </div>

                        <p className='font-bold tracking-wide text-[1rem] mt-5 ml-5 leading-5'>Hard Disk Drives</p>
                        <div className='w-74 h-0.5' style={{ background: 'linear-gradient(to right, #70bfff 0%, #fff 100%)' }}></div>
                        <div className='ml-5 mt-2 flex items-center'>
                            <img src={discC} alt="" className='w-11 h-11' />
                            <p className='text-[1rem] tracking-wide pl-2'>Local Disk (C:)</p>
                        </div>

                        <p className='font-bold tracking-wide text-[1rem] mt-5 ml-5 leading-5'>Devices with Removable Storage</p>
                        <div className='w-74 h-0.5' style={{ background: 'linear-gradient(to right, #70bfff 0%, #fff 100%)' }}></div>
                        <div className='ml-5 mt-2 flex items-center'>
                            <img src={dvd} alt="" className='pt-1 w-11 h-11' />
                            <p className='text-[1rem] tracking-wide pl-2'>CD Drive (E:)</p>
                        </div>
                    </div>
                </div>
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
