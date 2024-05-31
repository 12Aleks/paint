"use client";
import Image from 'next/image';
import { useAppDispatch } from "@/lib/hooks";
import {SubMode, updateSubMode} from "@/lib/features/cursorSlice";
import {useState} from "react";

interface SizeMap {
    [key: string]: string; // Index signature
}

const brushTypes: SizeMap = {
    'Brush': 'bi-brush-fill',
    'Calligraphy brush': 'bi-brush-calligraphy',
    'Calligraphy pen': 'bi-pen-calligraphy',
    'Airbrush': 'bi-airbrush-fill',
    'Oil brush': 'bi-brush-oil',
    'Crayon': 'bi-crayon-fill',
    'Marker': 'bi-marker-fill',
    'Natural pencil': 'bi-pencil-fill',
    'Watercolor brush': 'bi-brush-watercolor'
};

const BrushBlock = () => {
    const dispatch = useAppDispatch();
    const [isActive, setActive] = useState<string>('');

    const changeBrush = (brush: SubMode, size?: number) => {
        dispatch(updateSubMode(brush));
        // size && dispatch(updateFontSize(size))
        setActive(brush)
    };

    return (
        <div className="size_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            disabled={false}
                            aria-expanded="false"
                            data-bs-toggle="dropdown">
                        <Image width={30} height={40} alt="icon" src="/marker.svg" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {Object.keys(brushTypes).map((brush) => (
                            <li key={brush} className={`${brushTypes[brush].includes(isActive) ? 'active': ''}`}>
                                <button
                                    className="dropdown-item d-flex align-items-center justify-content-between"
                                    type="button"
                                    onClick={() => changeBrush(brushTypes[brush] as SubMode )}
                                >
                                    <span className="me-3">{brush}</span>
                                    <Image width={80} height={25} alt="icon" src={`/${brushTypes[brush]}.svg`} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text-center mt-auto mb-0">Brush</p>
        </div>
    );
};

export default BrushBlock;