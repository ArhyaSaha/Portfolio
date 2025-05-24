import React, { useRef, useState } from 'react';

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
            className="absolute rounded-t-sm bg-white border-2 border-blue-800 shadow-lg z-50"
            style={{ left: pos.x, top: pos.y, width: size.w, height: size.h }}
        >
            {/* Title bar */}
            <div
                className="bg-blue-800 text-white px-3 py-1 text-sm font-bold cursor-move select-none"
                onMouseDown={onDrag}
            >
                My Files
            </div>

            {/* Content */}
            <div className="p-4 h-full overflow-auto text-sm">
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
