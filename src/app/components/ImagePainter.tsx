'use client'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setPath} from "@/lib/features/paintSlice";
import Canvas from "@/app/components/Canvas";


const ImagePainter = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);

    const setImagePath = (imagePath: string) => {
        dispatch(setPath(imagePath));
    };

    return (
        <div className='position-relative overflow-hidden'>
            <Canvas/>
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