'use client'
import {updateMode} from "@/lib/features/cursorSlice";
import {useAppDispatch} from "@/lib/hooks";

const select: string[] = ['Rectangle']

const SelectionBlock = () => {
    const dispatch =useAppDispatch();

    const changeMode = () => {
        dispatch(updateMode('search'))
    }
    const changeSelectReg = (select: string) => {
        console.log(select)
    };

    return (
        <div className="selection_block d-inline-flex flex-column h-100  ms-3">
            <div className="wrapper">
                <div className="dropdown" onClick={() => changeMode()}>
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            aria-expanded='false'
                            data-bs-toggle="dropdown">
                            <div className="p-3" style={{border: '1px dashed white'}}></div>
                    </button>
                    <ul className={`dropdown-menu`}
                        aria-labelledby="dropdownMenuButton">
                        {select.map((el) => (
                            <li key={el}>
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    type="button"
                                    onClick={() => changeSelectReg(el)}
                                >
                                    {el}px <div className="bg-light w-100 ms-2" style={{height: el}}></div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text-center mt-auto mb-0">Selection</p>
        </div>
    );
};

export default SelectionBlock;