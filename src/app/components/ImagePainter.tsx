'use client'
import {useAppSelector} from "@/lib/hooks";

const ImagePainter = () => {
    const data = useAppSelector(state => state.data)

    return (
        <div>
            {data.imageData && <img
                src={data.imageData}
                width={data.sizeWidth}
                height={data.sizeHeight}
                alt="Painted Image" />}
        </div>
    );
};

export default ImagePainter;