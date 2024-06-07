'use client'
import {updateMode} from "@/lib/features/cursorSlice";
import {useAppDispatch} from "@/lib/hooks";

const select: string[] = ['Rectangle', 'Free-form']

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
                    <button className="btn dropdown-toggle m-auto" type="button" id="dropdownMenuButton"
                            aria-expanded='false'
                            data-bs-toggle="dropdown">
                            <div></div>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-center" aria-labelledby="dropdownMenuButton">
                        {select.map((el) => (
                            <li key={el}>
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    type="button"
                                    onClick={() => changeSelectReg(el)}
                                >
                                   <div className="me-3"></div> {el}
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