"use client"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {flipHorizontal, flipVertical, updateRotate} from "@/lib/features/paintSlice";
import Image from "next/image";

const ImageBlock = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data)
    const handleFlipVertical = () => {
        dispatch(flipVertical('vertical'));
    };

    const handleFlipHorizontal = () => {
        dispatch(flipHorizontal('horizontal'));
    };


    const rotateTo = (degrees: number) => {
        dispatch(updateRotate(degrees))
    }

    return (
        <div className="image_block d-inline-flex flex-column h-100 border-start border-2-secondary ms-3">
            <div className="wrapper">
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButtonRotate"
                            aria-expanded='false'
                            data-bs-toggle="dropdown">
                        <Image width="20" height="20" src='/rotateToRight.svg' alt="icon"/>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonRotate">
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() => rotateTo(90)}
                            ><Image width="20" height="18" src='/rotateToRight.svg' alt="icon"/>
                                <i className="ms-2">Rotate right 90°</i>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() => rotateTo(-90)}
                            ><Image width="20" height="18" src='/rotateToLeft.svg' alt="icon"/>
                                <i className="ms-2">Rotate left 90°</i>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() => rotateTo(180)}
                            ><Image width="20" height="18" src='/rotate.svg' alt="icon"/>
                                <i className="ms-2">Rotate 180°</i>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButtonFlip"
                            aria-expanded='false'
                            data-bs-toggle="dropdown">
                        <i className="bi bi-symmetry-vertical"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButtonFlip">
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() => handleFlipHorizontal()}
                            ><i className="bi bi-symmetry-horizontal">Flip horizontal</i>
                            </button>
                        </li>
                        <li>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                type="button"
                                onClick={() => handleFlipVertical()}
                            ><i className="bi bi-symmetry-vertical">Flip vertical</i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <p className="text-center mt-auto mb-0">Image</p>
        </div>
    );
};

export default ImageBlock;