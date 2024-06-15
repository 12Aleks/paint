'use client'
import {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateSizeInFooter} from "@/lib/features/paintSlice";

const FooterRight = () => {
    const sizeInPercent: number[] = [12.5, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800];
    const [startSize, setStartSize] = useState<number>(100)
    const dispatch = useAppDispatch();

    const data = useAppSelector(state => state.data)
    const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const pixels = parseInt(event.target.value, 10);
        const newSize = (pixels / data.startSize) * 800;
        const range = 6400 - data.startSize;
        const percentageRange = data.startSize - 100;
        const percentage = ((pixels - data.startSize) / range) * percentageRange + 100;

        setStartSize(percentage);
        dispatch(updateSizeInFooter(newSize))
    }

    const sizeChangeInPercent = (percent: number) => {
        setStartSize(percent)
        const newSize = (data.startSize * percent) / 100;
        dispatch(updateSizeInFooter(newSize))
    };

    return (
        <div className="d-flex ms-auto align-items-center h-100 ">
            <i className="bi bi-fullscreen"
               data-bs-toggle="tooltip" data-bs-placement="top"
               title="Fit to window"
               onClick={() => sizeChangeInPercent(100)}
            ></i>
            <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle border-secondary ms-3 me-3" type="button"
                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    {startSize}%
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton"
                    style={{minWidth: '100px', width: '100%'}}>
                    {sizeInPercent.reverse().map(percent => (
                        <li key={percent}>
                            <button className="dropdown-item" type="button"
                                    onClick={() => sizeChangeInPercent(percent)}>
                                {percent}%
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <i className="bi bi-zoom-out"></i>
            <input
                className="ms-2 me-2"
                type="range"
                min="0"
                max="6400"
                step="50"
                value={data.sizeWidth}
                onChange={handleSizeChange} // Call handleSizeChange when size changes
            />
            <i className="bi bi-zoom-in"></i>
        </div>
    );
};

export default FooterRight;