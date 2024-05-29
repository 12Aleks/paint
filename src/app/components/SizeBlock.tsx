"use client";
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCursorSize } from "@/lib/features/cursorSlice";

interface SizeMap {
    [key: string]: string; // Index signature
}

const SizeBlock = () => {
    const brushTypes: SizeMap = {
        'Brush': 'bi-brush-fill',
        'Calligraphy brush': 'bi-brush-calligraphy',
        'Calligraphy pen': 'bi-pen-fill',
        'Airbrush': 'bi-airbrush-fill',
        'Oil brush': 'bi-brush-oil',
        'Crayon': 'bi-crayon-fill',
        'Marker': 'bi-marker-fill',
        'Natural pencil': 'bi-pencil-fill',
        'Watercolor brush': 'bi-brush-watercolor'
    };

    const dispatch = useAppDispatch();
    const cursorData = useAppSelector(state => state.cursorData);

    const changeBrush = (brush: string) => {
        // dispatch(updateCursorSize(brush));
    };

    return (
        <div className="size_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            disabled={false}
                            aria-expanded="false"
                            data-bs-toggle="dropdown">
                        <Image width={30} height={30} alt="icon" src="/line-weight.svg" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {Object.keys(brushTypes).map((brush) => (
                            <li key={brush}>
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    type="button"
                                    onClick={() => changeBrush(brush)}
                                >
                                    <Image width={120} height={30} alt="icon" src={`/${brushTypes[brush]}.svg`} />
                                    <span className="ms-2">{brush}</span>
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

export default SizeBlock;