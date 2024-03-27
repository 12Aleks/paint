import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateTextInput} from "@/lib/features/paintSlice";

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
        <div className={`modal ${show ? 'show' : ''}`} id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        Text
                        <input
                            type="text"
                            value={data.textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;