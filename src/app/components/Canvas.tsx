import {FC, MouseEvent, MouseEventHandler, useEffect, useRef, useState} from 'react';
import {setPosition, updateDrawing, updateCursorMainColor} from "@/lib/features/cursorSlice";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {floodFill} from "@/mods/fill";
import {getColor} from "@/mods/picker";
import {eraserCanvas} from "@/mods/eraser";
import {zoomPlus} from "@/mods/zoom";
import {flipHorizontal, flipVertical} from "@/mods/flip";
import {rotateCanvas} from "@/mods/rotate";
import {updateRotate, updateTextInput} from "@/lib/features/paintSlice";
import {renderText} from "@/mods/text";


interface ICanvas{
    dragOffset: { x: number; y: number };
}
const Canvas: FC<ICanvas> = ({dragOffset}) => {
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

    useEffect(() => {
        data.flip.includes('horizontal') && flipHorizontal(canvasRef);
        data.flip.includes('vertical') && flipVertical(canvasRef);
    }, [data.flip]);

    useEffect(() => {
        data.rotate && rotateCanvas(canvasRef, data.rotate);
        dispatch(updateRotate(0))
    }, [data.rotate]);


    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d')!;
        const rect = canvas?.getBoundingClientRect();
        const x = Math.round(event.clientX - (rect?.left || 0));
        const y = Math.round(event.clientY - (rect?.top || 0));

        if (event.buttons !== 1 || !ctx) return;
        if (cursorData.mode.includes('bi-pencil-fill')) {
            ctx.imageSmoothingEnabled = false;
            ctx.strokeStyle = cursorData.colorFirst;
            ctx.lineWidth = cursorData.cursorSize;
            ctx.lineTo(x, y);
            ctx.stroke();
            dispatch(updateDrawing([...cursorData.drawing, {x, y}]));
        } else if (cursorData.mode.includes('bi-eraser')) {
            eraserCanvas(ctx, x, y, cursorData.cursorSize)
        }
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
        if (cursorData.mode.includes('bi-pencil-fill')) {
            ctx.strokeStyle = cursorData.colorFirst;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y);
            ctx.stroke();
            dispatch(updateDrawing([...cursorData.drawing, {x, y}]));
        } else if (cursorData.mode.includes('bi-paint-bucket')) {
            floodFill(ctx, x, y, cursorData.colorFirst);
        } else if (cursorData.mode.includes('bi-eyedropper')) {
            const color = getColor(ctx, x, y);
            dispatch(updateCursorMainColor([true, color]))
        } else if (cursorData.mode.includes('bi-eraser')) {
            eraserCanvas(ctx, x, y, cursorData.cursorSize)
        } else if (cursorData.mode.includes('bi-zoom-in')) {
            zoomPlus(ctx, canvas)
        } else if (cursorData.mode.includes('bi-fonts')) {
            renderText(cursorData, ctx, data.textInput, x, y );
        }

        dispatch(setPosition([x, y]));
    };
    const handleCanvasDragOver: MouseEventHandler<HTMLCanvasElement> = (event) => {
        event.preventDefault();
    };

    const handleCanvasDrop: MouseEventHandler<HTMLCanvasElement> = (event) => {
        event.preventDefault();
        if (data.textInput.trim() !== "") {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d')!;
            const rect = canvas?.getBoundingClientRect();
            const x = event.clientX - (rect?.left || 0) - dragOffset.x;
            const y = event.clientY - (rect?.top || 0) - dragOffset.y;
            renderText(cursorData, ctx, data.textInput, x, y);
            dispatch(updateTextInput(''))
        }
    };

    return (

        <canvas
            ref={canvasRef}
            width={data.sizeWidth}
            height={data.sizeHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`position-absolute top-0 left-0 right-0 bottom-0 ${cursorData.mode}`}
            onDragOver={handleCanvasDragOver}
            onDrop={handleCanvasDrop}
        />

    );
};

export default Canvas;