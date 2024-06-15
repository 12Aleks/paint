"use client"
import {useAppDispatch} from "@/lib/hooks";
import {createImageData} from "@/lib/features/paintSlice";

const Navbar= () => {
    const dispatch = useAppDispatch();


    const createImage = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Get the image data URL
            const dataURL = canvas.toDataURL();
            dispatch(createImageData(dataURL));
        }
    }


    return (
        <div className="p-2 border-0 navbar">
            <div className="d-grid d-inline-flex gap-1">
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        File
                    </button>
                    <ul className="dropdown-menu bg-dark ">
                        <li onClick={createImage} className="dropdown-item">New</li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Edit
                    </button>
                    <ul className="dropdown-menu bg-dark">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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