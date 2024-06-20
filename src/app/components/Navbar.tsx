"use client"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {createImageData, getRef} from "@/lib/features/paintSlice";
import {useState} from "react";


const Navbar = () => {
    const dispatch = useAppDispatch();
    const {refCanvas} = useAppSelector(state => state.data);
    const [canvasLink, setCanvasLink] = useState('');

    const createImage = () => {
        const canvas = document.createElement('canvas');

        canvas.width = 800;  // Установите ширину
        canvas.height = 800; // Установите высоту
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Можно добавить дополнительную отрисовку на холст
            const dataURL = canvas.toDataURL();
// dispatch(getRef(dataURL))
            dispatch(createImageData(dataURL));
        }
    }

    const download = () => {

        console.log(refCanvas)

        if (refCanvas) {
            const link = document.createElement('a');

            link.setAttribute('download', 'canvas.png');
            link.setAttribute('href', refCanvas);
            link.click();
        } else {
            console.error('Canvas reference is not available');
        }
    }


    return (
        <div className="p-2 border-0 navbar">
            <div className="d-grid d-inline-flex gap-1">
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        File
                    </button>
                    <ul className="dropdown-menu bg-dark ">
                        <li onClick={createImage} className="dropdown-item"><i className="bi bi-file-earmark me-3"></i>New
                        </li>
                        <li onClick={download} className="dropdown-item"><i className="bi bi-floppy me-3"></i>Save</li>
                        <li className="nav-item dropend">
                            <a className="nav-link dropdown-toggle ps-2 pe-2 pt-1 pb-1" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="bi bi-floppy me-3"></i>Save As
                            </a>
                            <ul className="dropdown-menu bg-dark ">
                                <li className="dropdown-item">PNG picture</li>
                                <li className="dropdown-item">JPEG picture</li>
                                <li className="dropdown-item">BMP picture</li>
                            </ul>
                        </li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        Edit
                    </button>
                    <ul className="dropdown-menu bg-dark">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        View
                    </button>
                    <ul className="dropdown-menu bg-dark">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
            <i className="bi bi-gear-wide"></i>
        </div>
    );
};

export default Navbar;