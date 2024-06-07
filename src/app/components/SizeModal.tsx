import React, {ChangeEvent, FC} from 'react';
import {updateCursorSize} from "@/lib/features/cursorSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {IShow} from "@/app/components/Modal";
import Image from "next/image";
import {Tooltip} from "@nextui-org/tooltip";

const SizeModal: FC<IShow> = ({show}) => {
    const cursorData = useAppSelector(state => state.cursorData);
    const dispatch = useAppDispatch();


    const changeSize = (event: ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        console.log(size);
        dispatch(updateCursorSize(size)); // Dispatch action to update cursor size
    };


    return (
        <div className={`size-modal ${show ? 'show' : ''}`}>
            <Tooltip  content={`${cursorData.cursorSize}px`} color="primary" placement="bottom">
            <input className="ms-2 me-2 custom-vertical-range"
                   type="range"
                   min="0"
                   max="100"
                   step="1"
                   value={cursorData.cursorSize}
                   onChange={changeSize}
            />
            </Tooltip>
            <Image width={25} height={25} alt="icon" src='/line-weight.svg' />
        </div>
    )
};

export default SizeModal;