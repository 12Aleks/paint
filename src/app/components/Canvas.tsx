import { MouseEvent, MouseEventHandler, useEffect, useRef } from 'react';
import {setPosition, updateDrawing} from "@/lib/features/cursorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";


const Canvas = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);
    const cursorData = useAppSelector(state => state.cursorData);
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        if (data.imageData) {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d')!;
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, data.sizeWidth, data.sizeHeight);

                cursorData.drawing.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                    ctx.stroke();
                });
            };
            img.src = data.imageData;
        }
    }, [data.imageData]);

    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d')!;
        const rect = canvas?.getBoundingClientRect();
        const x = Math.round(event.clientX - (rect?.left || 0));
        const y = Math.round(event.clientY - (rect?.top || 0));

        if (event.buttons !== 1 || !ctx) return;
        ctx.strokeStyle = cursorData.colorFirst;
        ctx.lineTo(x, y);
        ctx.stroke();
        dispatch(updateDrawing([...cursorData.drawing, { x, y }]));
        dispatch(setPosition([x, y]))
    }

    const handleMouseLeave = () => {
        dispatch(updateDrawing([]));
        dispatch(setPosition([0, 0]));
    };

    const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas?.getContext('2d')!;
        const rect = canvas?.getBoundingClientRect();
        const x = Math.round(event.clientX - (rect?.left || 0));
        const y = Math.round(event.clientY - (rect?.top || 0));

        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;
        ctx.strokeStyle = cursorData.colorFirst;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
        dispatch(updateDrawing([...cursorData.drawing, { x, y }]));
        dispatch(setPosition([x, y]));
    };

    return (
        <canvas
            ref={canvasRef}
            width={data.sizeWidth}
            height={data.sizeHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="position-absolute top-0 left-0 right-0 bottom-0"
        />
    );
};

export default Canvas;