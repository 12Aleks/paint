'use client'
import {useEffect, useState} from 'react';
import {useAppSelector} from "@/lib/hooks";


const FooterLeft = () => {
    const data = useAppSelector(state => state.data)
    const [fileSize, setFileSize] = useState<number>(0);

    useEffect(() => {
        const getImageInfo = async () => {
            if (data.imagePath) {
                try {
                    const response = await fetch(data.imagePath);
                    const blob = await response.blob();
                    const kb = parseFloat((blob.size / 1024).toFixed(2));
                    console.log(kb)
                    blob && setFileSize(kb);
                } catch (error) {
                    console.error('Error getting image info:', error);
                }
            }
        };

        getImageInfo();
    }, [data.sizeWidth, data.imagePath]);

    return (
        <div className="d-flex align-items-center h-100">
            <span className="d-flex align-items-center ms-3 me-3">
                <i className="bi bi-cursor"></i>
            </span>
            <span className="d-flex align-items-center ms-3 me-3 border-start border-2-secondary ps-3">
                <i className="bi bi-crop me-2"></i>{data.sizeWidth} x {data.sizeHeight}px
            </span>
            <span className="d-flex align-items-center ms-3 me-3 border-start border-2-secondary ps-3"><i className="bi bi-floppy me-2"></i>Size: {fileSize} KB</span>
        </div>
    );
};

export default FooterLeft;