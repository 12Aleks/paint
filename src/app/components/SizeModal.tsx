import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {updateCursorSize} from "@/lib/features/cursorSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {IShow} from "@/app/components/Modal";
import Image from "next/image";


const SizeModal: FC<IShow> = ({show}) => {
    const cursorData = useAppSelector(state => state.cursorData);
    const dispatch = useAppDispatch();
    const [viewportHeight, setViewportHeight] = useState<number>(0);
    const [pixels, setPixels] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setViewportHeight(window.innerHeight);

            const handleResize = () => {
                setViewportHeight(window.innerHeight);
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    useEffect(() => {
        if (viewportHeight > 0) {
            let pixels = ((viewportHeight * 25) / 100) / 100 * cursorData.cursorSize;
            setPixels(pixels);
        }
    }, [viewportHeight, cursorData.cursorSize]);

    const changeSize = (event: ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        dispatch(updateCursorSize(size));
    };

    return (
        <div className={`size-modal ${show ? 'show' : ''}`}>
            <div className="modal_wrapper">
                <input
                    className="ms-2 me-2 custom-vertical-range"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={cursorData.cursorSize}
                    onChange={changeSize}
                />
                <div className="range-value" style={{left: pixels - 10}}>{cursorData.cursorSize} px</div>
                <Image width={25} height={25} alt="icon" src='/line-weight.svg'/>
            </div>
        </div>
    );
};

export default SizeModal;
