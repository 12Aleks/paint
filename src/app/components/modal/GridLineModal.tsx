import {ChangeEvent,  useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import Image from "next/image";
import {changeGridLineSize} from "@/lib/features/viewSlice";


const GridLineModal = () => {
    const {isGridLine, gridLineSize} = useAppSelector(state => state.view);
    const dispatch = useAppDispatch();
    const [viewportHeight, setViewportHeight] = useState<number>(0);
    const [pixels, setPixels] = useState<number>(0);



    const changeSize = (event: ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        dispatch(changeGridLineSize(size));
    };

    return (
        <div className={`size-modal gridLine ${isGridLine? 'show' : ''}`}>
            <div className="modal_wrapper">
                <input
                    className="ms-2 me-2 custom-vertical-range"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={gridLineSize}
                    onChange={changeSize}
                />
                <div className="range-value" style={{right: pixels - 10}}>{gridLineSize} px</div>
                <i className="bi bi-border"></i>
            </div>
        </div>
    );
};

export default GridLineModal;
