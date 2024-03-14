"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const SizeBlock = () => {
    let size = [1, 3, 5, 8];
    const [selectedSize, setSelectedSize] = useState(0);

    const sizeChangeInPercent = (per: number) => {
        console.log(per);
        setSelectedSize(per);
    };

    return (
        <div className="size_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <Image width={30} height={30} alt="icon" src="/line-weight.svg" />
                </button>
                <ul
                    className="dropdown-menu" aria-labelledby="dropdownMenuButton"
                >
                    {size.map((percent) => (
                        <li key={percent}>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => sizeChangeInPercent(percent)}
                            >
                                {percent}%
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