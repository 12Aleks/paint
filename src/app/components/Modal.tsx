import {FC} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateTextInput} from "@/lib/features/paintSlice";
import {updateMode} from "@/lib/features/cursorSlice";
import {linkGc} from "next/dist/client/app-link-gc";

interface IShow {
    show: boolean
}

const Modal: FC<IShow> = ({show}) => {
    const data = useAppSelector(state => state.data);
    const dispatch = useAppDispatch();
    const fontSize: number[] = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    const fontName : string[] = ['Calibri']

    function setTextInput(e: string) {
        dispatch(updateTextInput(e))
    }

    function changeFontSize(size: number){
        console.log(size)
    }
    function changeFontName(name: string){
        console.log(name)
    }

    console.log(show)
    return (
        <div className={`modal_overlay ${show ? 'show' : ''}`}>
            <div className="modal_wrapper">
                <div className="modal_block">
                    <div className="modal_body d-flex ">
                        <div className="w-50 d-flex pe-2">
                            <div className="dropdown w-75 me-2">
                                <button className="btn btn-dark dropdown-toggle border-secondary w-100 d-flex justify-content-between align-items-center" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    {fontName.at(0)}
                                </button>
                                <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                                    {fontName.map(name => (
                                        <li key={name}>
                                            <button className="dropdown-item" type="button"
                                                    onClick={() => changeFontName(name)}>
                                                {name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="dropdown w-25 ">
                                <button className="btn btn-dark dropdown-toggle border-secondary w-100" type="button"
                                        id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    {fontSize.at(0)} px
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {fontSize.map(size => (
                                        <li key={size}>
                                            <button className="dropdown-item" type="button"
                                                    onClick={() => changeFontSize(size)}>
                                                {size} px
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div
                            className="w-25 d-flex justify-content-between border-start border-2-secondary ps-2 pe-2 wrapper">
                            <div>
                                <i className="bi bi-type-bold"></i>
                            </div>
                            <div>
                                <i className="bi bi-type-italic"></i>
                            </div>
                            <div>
                                <i className="bi bi-type-underline"></i>
                            </div>
                            <div>
                                <i className="bi bi-type-strikethrough"></i>
                            </div>
                        </div>
                        <div className="w-25 d-flex justify-content-between border-start border-2-secondary ps-2 pe-2 wrapper">
                            <div>
                                <i className="bi bi-filter-left"></i>
                            </div>
                            <div>
                                <i className="bi bi-filter"></i>
                            </div>
                            <div>
                                <i className="bi bi-filter-right"></i>
                            </div>
                        </div>
                        <div className="w-25 d-flex justify-content-between border-start border-2-secondary ps-2 pe-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;