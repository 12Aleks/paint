"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import {useAppDispatch} from "@/lib/hooks";
import {updateCursorSize} from "@/lib/features/cursorSlice";

const SizeBlock = () => {
    let size = [1, 3, 5, 8];
    const dispatch = useAppDispatch();


    const changeSize = (size: number) => {
        dispatch(updateCursorSize(size))
    };

    return (
        <div className="size_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <Image width={30} height={30} alt="icon" src="/line-weight.svg" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {size.map((el) => (
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