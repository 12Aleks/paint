'use client'
import React, { useState,  MouseEventHandler } from 'react';

import { setPath } from "@/lib/features/paintSlice";
import Canvas from "@/app/components/Canvas";
import Modal from "@/app/components/Modal";
import DragDropInput from "@/app/components/DragDropInput";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

interface ImagePainterProps {}

const ImagePainter: React.FC<ImagePainterProps> = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);
    const cursorData = useAppSelector(state => state.cursorData);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [inputPosition, setInputPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const setImagePath = (imagePath: string) => {
        dispatch(setPath(imagePath));
    };

    const handleTextInputDragStart: MouseEventHandler<HTMLInputElement> = (event) => {
        setIsDragging(true);
        setDragOffset({
            x: event.clientX - event.currentTarget.getBoundingClientRect().left,
            y: event.clientY - event.currentTarget.getBoundingClientRect().top
        });
    };

    const handleTextInputDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <>
            <Modal show={cursorData.mode.includes('bi-fonts')}/>
            <div className='position-relative overflow-hidden'>
                <Canvas dragOffset={dragOffset}/>
                <DragDropInput
                    isDragging={isDragging}
                    dragOffset={dragOffset}
                    position={inputPosition}
                    setPosition={setInputPosition}
                />
                {data.imageData && <img
                    src={data.imageData}
                    width={data.sizeWidth}
                    height={data.sizeHeight}
                    onLoad={() => data.imageData && setImagePath(data.imageData)}
                    alt="Painted Image"/>}
            </div>
        </>
    );
};

export default ImagePainter;