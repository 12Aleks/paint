import React, {ChangeEvent} from 'react';
import {updateCursorSize} from "@/lib/features/cursorSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";

const SizeModal = () => {
    const cursorData = useAppSelector(state => state.cursorData);
    const dispatch = useAppDispatch();


    const changeSize = (event: ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        console.log(size);
        dispatch(updateCursorSize(size)); // Dispatch action to update cursor size
    };

    return (
        <div className="size-modal">
            <input className="ms-2 me-2 custom-vertical-range"
                   type="range"
                   min="0"
                   max="100"
                   step="5"
                   value={cursorData.cursorSize}
                   onChange={changeSize}
            />
        </div>
    )
};

export default SizeModal;