import React, { useEffect, useRef, useState } from 'react'
import emptyFolder from '../../assets/icons/emptyFolder.png'
import myComputer from '../../assets/icons/myComputer.png'
import DesktopIcon from '../../common/DesktopIcon'
const iconsInitial = [
    { id: 1, name: 'My Computer', icon: myComputer, position: { x: 16, y: 16 } },
    { id: 2, name: 'My Folder', icon: emptyFolder, position: { x: 16, y: 96 } },
];
const GRID_SIZE = 80;
const PADDING_OFFSET = 16;
const ICON_SIZE = 64;

const Desktop = () => {
    const containerRef = useRef(null);
    const [icons, setIcons] = useState(iconsInitial);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectBox, setSelectBox] = useState(null);
    const startPos = useRef(null);

    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        type: null,
        iconId: null,
    });

    useEffect(() => {
        const handleClickOutside = () => {
            setContextMenu({ visible: false, x: 0, y: 0, type: null });
        };

        if (contextMenu.visible) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu.visible]);

    const onDesktopRightClick = (e) => {
        e.preventDefault();
        if (e.target !== containerRef.current) return;

        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            type: 'desktop',
            iconId: null,
        });
    };

    useEffect(() => {
        console.log(selectedIds)
    }, [selectedIds])

    const onMouseDown = (e) => {
        if (e.currentTarget !== e.target) return;

        startPos.current = { x: e.clientX, y: e.clientY };
        setSelectBox({
            x: e.clientX,
            y: e.clientY,
            w: 0,
            h: 0,
        });

        const handleMouseMove = (e) => {
            const x1 = Math.min(startPos.current.x, e.clientX);
            const y1 = Math.min(startPos.current.y, e.clientY);
            const x2 = Math.max(startPos.current.x, e.clientX);
            const y2 = Math.max(startPos.current.y, e.clientY);
            setSelectBox({
                x: x1,
                y: y1,
                w: x2 - x1,
                h: y2 - y1,
            });
        };

        const handleMouseUp = (e) => {
            const box = {
                left: Math.min(startPos.current.x, e.clientX),
                right: Math.max(startPos.current.x, e.clientX),
                top: Math.min(startPos.current.y, e.clientY),
                bottom: Math.max(startPos.current.y, e.clientY),
            };

            const containerRect = containerRef.current.getBoundingClientRect();

            const selected = icons
                .filter((icon) => {
                    const iconX = icon.position.x + containerRect.left;
                    const iconY = icon.position.y + containerRect.top;

                    const iconRect = {
                        left: iconX,
                        right: iconX + ICON_SIZE,
                        top: iconY,
                        bottom: iconY + ICON_SIZE,
                    };

                    return (
                        iconRect.left < box.right &&
                        iconRect.right > box.left &&
                        iconRect.top < box.bottom &&
                        iconRect.bottom > box.top
                    );
                })
                .map((icon) => icon.id);

            setSelectedIds((prev) => [...selected]);
            setSelectBox(null);
            startPos.current = null;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleIconMouseDown = (iconId, e) => {
        e.stopPropagation();
        if (e.type === 'contextmenu') {
            e.preventDefault();
            setContextMenu({
                visible: true,
                x: e.clientX,
                y: e.clientY,
                type: 'icon',
                iconId,
            });
            return;
        }

        const isSelected = selectedIds.includes(iconId);
        const multiSelect = e.ctrlKey || e.metaKey || e.shiftKey;

        if (!isSelected && !multiSelect) {
            setSelectedIds([iconId]);
        } else if (multiSelect && isSelected) {
            setSelectedIds(selectedIds.filter(id => id !== iconId));
            return;
        } else if (multiSelect) {
            setSelectedIds((prev) => [...prev, iconId]);;
            return;
        }

        requestAnimationFrame(() => {
            const startX = e.clientX;
            const startY = e.clientY;

            const moveIds = isSelected ? selectedIds : [iconId];

            const startPositions = icons
                .filter((icon) => moveIds.includes(icon.id))
                .map((icon) => ({
                    id: icon.id,
                    x: icon.position.x,
                    y: icon.position.y,
                }));

            const handleMouseMove = (e) => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                setIcons((prev) =>
                    prev.map((icon) => {
                        const match = startPositions.find((p) => p.id === icon.id);
                        if (!match) return icon;
                        return {
                            ...icon,
                            position: {
                                x: match.x + dx,
                                y: match.y + dy,
                            },
                        };
                    })
                );
            };

            const handleMouseUp = () => {
                setIcons((prev) => {
                    const stationaryIcons = prev.filter((icon) => !moveIds.includes(icon.id));
                    const movingIcons = prev.filter((icon) => moveIds.includes(icon.id));
                    const occupied = new Set();
                    stationaryIcons.forEach((icon) => {
                        const gx = Math.round((icon.position.x - PADDING_OFFSET) / GRID_SIZE);
                        const gy = Math.round((icon.position.y - PADDING_OFFSET) / GRID_SIZE);
                        occupied.add(`${gx},${gy}`);
                    });

                    const updatedMovingIcons = movingIcons.map((icon) => {
                        let gridX = Math.round((icon.position.x - PADDING_OFFSET) / GRID_SIZE);
                        let gridY = Math.round((icon.position.y - PADDING_OFFSET) / GRID_SIZE);

                        let found = false;
                        const spiralLimit = 10;

                        for (let radius = 0; radius < spiralLimit && !found; radius++) {
                            for (let dx = -radius; dx <= radius && !found; dx++) {
                                for (let dy = -radius; dy <= radius && !found; dy++) {
                                    const tx = gridX + dx;
                                    const ty = gridY + dy;
                                    const key = `${tx},${ty}`;
                                    if (!occupied.has(key)) {
                                        gridX = tx;
                                        gridY = ty;
                                        occupied.add(key);
                                        found = true;
                                    }
                                }
                            }
                        }


                        let x = gridX * GRID_SIZE + PADDING_OFFSET;
                        let y = gridY * GRID_SIZE + PADDING_OFFSET;

                        const maxX = window.innerWidth - ICON_SIZE - PADDING_OFFSET;
                        const maxY = window.innerHeight - ICON_SIZE - PADDING_OFFSET;
                        x = Math.max(PADDING_OFFSET, Math.min(x, maxX));
                        y = Math.max(PADDING_OFFSET, Math.min(y, maxY));

                        return {
                            ...icon,
                            position: { x, y },
                        };
                    });

                    return [...stationaryIcons, ...updatedMovingIcons];
                });

                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };


            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseDown={onMouseDown}
            onContextMenu={onDesktopRightClick}
            className='relative bg-transparent w-full h-full gap-y-4 px-4 py-2 overflow-hidden'
        >
            {icons.map((icon) => (
                <DesktopIcon
                    key={icon.id}
                    icon={icon.icon}
                    name={icon.name}
                    position={icon.position}
                    selected={selectedIds.includes(icon.id)}
                    onMouseDown={(e) => handleIconMouseDown(icon.id, e)}
                    onContextMenu={(e) => handleIconMouseDown(icon.id, e)}
                    isDragging={selectedIds.includes(icon.id)}
                />
            ))}

            {selectBox && (
                <div
                    className="absolute border-2 border-blue-400 bg-blue-400/20 pointer-events-none"
                    style={{
                        left: selectBox.x,
                        top: selectBox.y,
                        width: selectBox.w,
                        height: selectBox.h,
                    }}
                />
            )}

            {contextMenu.visible && (
                <ul
                    className="absolute bg-gray-800 text-white p-2 rounded shadow-md z-50 w-48"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    {contextMenu.type === 'desktop' ? (
                        <>
                            <li className="hover:bg-gray-700 px-2 py-1 cursor-pointer">New Folder</li>
                            <li className="hover:bg-gray-700 px-2 py-1 cursor-pointer">Sort by</li>
                            <li className="hover:bg-gray-700 px-2 py-1 cursor-pointer">Refresh</li>
                        </>
                    ) : (
                        <>
                            <li className="hover:bg-gray-700 px-2 py-1 cursor-pointer">Open</li>
                            <li className="hover:bg-gray-700 px-2 py-1 cursor-pointer">Rename</li>
                            <li className="hover:bg-gray-700 px-2 py-1 cursor-pointer">Delete</li>
                        </>
                    )}
                </ul>
            )}
        </div>
    )
}

export default Desktop