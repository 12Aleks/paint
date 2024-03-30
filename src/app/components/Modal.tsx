import {FC} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateTextInput} from "@/lib/features/paintSlice";
import {updateMode} from "@/lib/features/cursorSlice";

interface IShow{
    show: boolean
}
const Modal:FC<IShow> = ({show}) => {
    const data = useAppSelector(state => state.data);
    const dispatch = useAppDispatch()
    function setTextInput(e: string){
        dispatch(updateTextInput(e))
    }

    console.log(show)
    return (
        <div className={`modal_overlay ${show ? 'show' : ''}`} >
            <div className="modal_wrapper">
                <div className="modal_block">
                    <div className="modal_body d-flex">
                        <div className="w-50 d-flex">
                            <select className="form-control" id="exampleFormControlSelect1" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <select className="form-control" id="exampleFormControlSelect1" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="w-25 d-flex">
                            <i className="bi bi-type-bold"></i>
                            <i className="bi bi-type-italic"></i>
                            <i className="bi bi-type-underline"></i>
                            <i className="bi bi-type-strikethrough"></i>
                        </div>
                        <div className="w-25 d-flex">
                            <i className="bi bi-filter-left"></i>
                            <i className="bi bi-filter"></i>
                            <i className="bi bi-filter-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;