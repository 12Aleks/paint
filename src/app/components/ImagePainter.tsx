'use client'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {MouseEvent} from 'react';
import {setPath} from "@/lib/features/paintSlice";
import {setPosition} from "@/lib/features/cursorSlice";

const ImagePainter = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);

    const setImagePath = (imagePath: string) => {
        dispatch(setPath(imagePath));
    };
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        dispatch(setPosition([x, y]))
    }

    const handleMouseLeave = () => {
        dispatch(setPosition([0,  0 ]));
    };

    return (
        <div>
            {data.imageData && <img
                src={data.imageData}
                width={data.sizeWidth}
                height={data.sizeHeight}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onLoad={() => data.imageData && setImagePath(data.imageData)}
                alt="Painted Image" />}
        </div>
    );
};

export default ImagePainter;