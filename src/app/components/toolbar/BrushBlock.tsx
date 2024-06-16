"use client";
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {SubMode, updateCursorSize, updateSubMode} from "@/lib/features/cursorSlice";
import { useState } from "react";

interface Brush {
    icon: string;
    size: number;
}

interface SizeMap {
    [key: string]: Brush;
}

const brushTypes: SizeMap = {
    'Brush': { 'icon': 'bi-brush-fill', 'size': 3 },
    'Calligraphy brush': { 'icon': 'bi-brush-calligraphy', 'size': 5 },
    'Calligraphy pen': { 'icon': 'bi-pen-calligraphy', 'size': 5 },
    'Airbrush': { 'icon': 'bi-airbrush-fill', 'size': 1 },
    'Oil brush': { 'icon': 'bi-brush-oil', 'size': 30 },
    'Crayon': { 'icon': 'bi-crayon-fill', 'size': 1 },
    'Marker': { 'icon': 'bi-marker-fill', 'size': 1 },
    'Natural pencil': { 'icon': 'bi-pencil-fill', 'size': 1 },
    'Watercolor brush': { 'icon': 'bi-brush-watercolor', 'size': 1 }
};

const BrushBlock = () => {
    const dispatch = useAppDispatch();
    const cursorData = useAppSelector(state => state.cursorData);
    const [isActive, setActive] = useState<string>('');

    const changeBrush = (brush: SubMode, size: number) => {
        dispatch(updateSubMode(brush));
        dispatch(updateCursorSize(size));
        setActive(brush);
    };

    return (
        <div className="size_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle m-auto" type="button" id="dropdownMenuButton"
                            disabled={false}
                            aria-expanded="false"
                            data-bs-toggle="dropdown">
                        {
                            ['bi-brush-fill', 'bi-brush-calligraphy'].includes(cursorData.submode) ?
                                <Image width={26} height={36} alt="icon" src="/marker.svg" /> :
                                ['bi-pen-calligraphy'].includes(cursorData.submode) ?
                                    <Image width={26} height={36} alt="icon" src="/pen.svg" /> :
                                    <Image width={26} height={36} alt="icon" src="/marker.svg" />
                        }
                    </button>
                    <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="dropdownMenuButton">
                        {Object.keys(brushTypes).map((brush) => (
                            <li key={brush} className={`${cursorData.submode.includes(brushTypes[brush].icon) ? 'active' : ''}`}>
                                <button
                                    className="dropdown-item d-flex align-items-center justify-content-between"
                                    type="button"
                                    onClick={() => changeBrush(brushTypes[brush].icon as SubMode, brushTypes[brush].size)}
                                >
                                    <span className="me-3">{brush}</span>
                                    <Image width={80} height={25} alt="icon" src={`/${brushTypes[brush].icon}.svg`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text-center mt-auto mb-0">Brushes</p>
        </div>
    );
};

export default BrushBlock;