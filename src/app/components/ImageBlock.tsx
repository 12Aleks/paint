"use client"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {flipHorizontal, flipVertical} from "@/lib/features/paintSlice";

const ImageBlock = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data)
    const handleFlipVertical = () => {
        dispatch(flipVertical('vertical'));
    };

    const handleFlipHorizontal = () => {
        dispatch(flipHorizontal('horizontal'));
    };


    return (
        <div className="image_block d-inline-flex flex-column h-100">
            <div className="wrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                            aria-expanded='false'
                            data-bs-toggle="dropdown" >
                            <i className="bi bi-symmetry-vertical"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li >
                                <button
                                    className="dropdown-item d-flex align-items-center"
                                    type="button"
                                    onClick={() => handleFlipHorizontal()}
                                ><i className="bi bi-symmetry-horizontal">Flip horizontal</i>
                                </button>
                            </li>
                        <li >
                            <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() => handleFlipVertical()}
                            ><i className="bi bi-symmetry-vertical">Flip vertical</i>
                            </button>
                        </li>
                    </ul>
                </div>
            <p className="text-center mt-auto mb-0">Image</p>
            </div>
        </div>
    );
};

export default ImageBlock;