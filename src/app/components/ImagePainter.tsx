'use client'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setPath} from "@/lib/features/paintSlice";
import Canvas from "@/app/components/Canvas";
import Modal from "@/app/components/Modal";


const ImagePainter = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);
    const cursorData = useAppSelector(state => state.cursorData)

    const setImagePath = (imagePath: string) => {
        dispatch(setPath(imagePath));
    };

    return (
        <div className='position-relative overflow-hidden w-100 h-100'>
            <Canvas/>
            <Modal show={cursorData.mode.includes('bi-fonts')}/>
            {data.imageData && <img
                src={data.imageData}
                width={data.sizeWidth}
                height={data.sizeHeight}
                onLoad={() => data.imageData && setImagePath(data.imageData)}
                alt="Painted Image" />}
        </div>
    );
};

export default ImagePainter;