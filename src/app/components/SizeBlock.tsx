"use client"
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateCursorSize} from "@/lib/features/cursorSlice";

interface SizeMap {
    [key: string]: number[]; // Index signature
}
const SizeBlock = () => {
    let size: SizeMap = {
        'bi-pencil-fill': [1, 3, 5, 8],
        'bi-eraser': [4, 6, 8, 10],
    };

    const dispatch = useAppDispatch();
    const cursorData = useAppSelector(state => state.cursorData);


    const changeSize = (size: number) => {
        dispatch(updateCursorSize(size))
    };

    return (
        <div className="size_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            disabled={!Object.keys(size).includes(cursorData.mode)}
                            aria-expanded='false'
                            data-bs-toggle="dropdown" >
                        <Image width={30} height={30} alt="icon" src="/line-weight.svg"/>
                    </button>
                    <ul className={`dropdown-menu ${!Object.keys(size).includes(cursorData.mode) ? '' : '_show'}`} aria-labelledby="dropdownMenuButton">
                        {size[cursorData.mode]?.map((el) => (
                            <li key={el}>
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    type="button"
                                    onClick={() => changeSize(el)}
                                >
                                    {el}px <div className="bg-light w-100 ms-2" style={{height: el}}></div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text-center mt-auto mb-0">Size</p>
        </div>
    );
};

export default SizeBlock;