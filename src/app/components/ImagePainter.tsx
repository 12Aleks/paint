'use client'

import { FC, useState } from 'react';
import { setPath } from "@/lib/features/paintSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Canvas from "@/app/components/Canvas";
import TextArea from "@/app/components/TextArea";
import SizeModal from "@/app/components/modal/SizeModal";
import TextModal from "@/app/components/modal/TextModal";

interface ImagePainterProps {}

const ImagePainter: FC<ImagePainterProps> = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);
    const cursorData = useAppSelector(state => state.cursorData);
    const [isDragging, setIsDragging] = useState(false);
    const [inputPosition, setInputPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const setImagePath = (imagePath: string) => {
        dispatch(setPath(imagePath));
    };


    return (
        <>
            <TextModal show={cursorData.mode.includes('bi-fonts')}/>
            <SizeModal show={cursorData.mode.includes('bi-pencil-fill') || cursorData.mode.includes('bi-eraser')}/>
            <div className='position-relative overflow-hidden'>
                <Canvas position={inputPosition}
                        changeTextPosition={setInputPosition}
                />
                <TextArea isDragging={isDragging}
                    position={inputPosition}
                    setPosition={setInputPosition}
                    show={cursorData.textArea}
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