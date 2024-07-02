"use client"
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {createImageData} from "@/lib/features/paintSlice";
import {useEffect} from "react";
import {changeStatusBar, changeViewGridLine, changeViewRuler} from "@/lib/features/viewSlice";
import {is} from "immutable";


const Navbar = () => {
    const dispatch = useAppDispatch();
    const {refCanvas} = useAppSelector(state => state.data);
    const {isStatusBar, isRulerModal, isGridLine} = useAppSelector(state => state.view);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'r') {
                event.preventDefault();
                showRulers();
            } else if(event.ctrlKey && event.key === 'g'){
                event.preventDefault();
                showGridLine();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const createImage = () => {
        const canvas = document.createElement('canvas');

        canvas.width = 800;  // Установите ширину
        canvas.height = 800; // Установите высоту
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL();
            dispatch(createImageData(dataURL));
        }
    }

    const download = (extension: string = 'png') => {

        if (refCanvas) {
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
            link.setAttribute('download', `canvas_${timestamp}.${extension}`);
            link.setAttribute('href', refCanvas);
            link.click();
        } else {
            console.error('Canvas reference is not available');
        }
    }


    const printCanvas = () => {
        if (refCanvas) {
            const printWindow = window.open('', '', 'width=800,height=800');
            if (printWindow) {
                printWindow.document.write('<html><head><title>Print Canvas</title></head><body>');
                printWindow.document.write(`<img src="${refCanvas}" />`);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            } else {
                console.error('Failed to open print window');
            }
        } else {
            console.error('Canvas reference is not available');
        }
    }



    const showRulers = () => {
        console.log(isRulerModal)
        dispatch(changeViewRuler(!isRulerModal));
    };

    const showStatusBar = () => {
        dispatch(changeStatusBar(!isStatusBar));
    }

    const showGridLine = () => {
        dispatch(changeViewGridLine(!isGridLine));
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
                        <li onClick={() => download()} className="dropdown-item"><i className="bi bi-floppy me-3"></i>Save</li>
                        <li className="nav-item dropend">
                            <a className="nav-link dropdown-toggle ps-2 pe-2 pt-1 pb-1" href="#" role="button"
                               data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i className="bi bi-floppy me-3"></i>Save As <i className="bi bi-chevron-right float-end pt-1 pb-1" style={{fontSize: '10px'}}></i>
                            </a>
                            <ul className="dropdown-menu bg-dark ">
                                <li className="dropdown-item" onClick={() => download('png')}>PNG picture</li>
                                <li className="dropdown-item" onClick={() => download('jpeg')}>JPEG picture</li>
                                <li className="dropdown-item" onClick={() => download('bmp')}>BMP picture</li>
                            </ul>
                        </li>
                        <li onClick={printCanvas} className="dropdown-item"><i className="bi bi-printer me-3"></i>Print</li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        Edit
                    </button>
                    <ul className="dropdown-menu bg-dark">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">GridLines</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        View
                    </button>
                    <ul className="dropdown-menu bg-dark">
                        <li className="dropdown-item" onClick={showRulers}>
                            <i className="bi bi-check-lg me-3"  style={{opacity: isRulerModal ? 1 : 0}}></i>
                            Rulers <span>Ctrl+R</span>
                        </li>
                        <li className="dropdown-item" onClick={showGridLine}>
                            <i className="bi bi-check-lg me-3" style={{opacity: isGridLine ? 1 : 0}}></i>
                            Gridlines <span>Ctrl+G</span>
                        </li>
                        <li className="dropdown-item" onClick={showStatusBar}>
                            <i className="bi bi-check-lg me-3" style={{opacity: isStatusBar ? 1 : 0}}></i>
                            Status bar
                        </li>
                    </ul>
                </div>
            </div>
            <i className="bi bi-gear-wide"></i>
        </div>
    );
};

export default Navbar;