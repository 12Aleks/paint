import { Dispatch, FC, MouseEvent, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import { setPosition, updateDrawing, updateCursorMainColor, updateTextArea } from "@/lib/features/cursorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { floodFill } from "@/mods/fill";
import { getColor } from "@/mods/picker";
import { eraserCanvas } from "@/mods/eraser";
import { zoomPlus } from "@/mods/zoom";
import { flipHorizontal, flipVertical } from "@/mods/flip";
import { rotateCanvas } from "@/mods/rotate";
import {getRef, updateRotate, updateTextInput} from "@/lib/features/paintSlice";
import { renderText } from "@/mods/text";
import { searchMode } from "@/mods/search";
import { drawWithBrushAngle } from "@/mods/submode/calligraphy";
import {drawWithOil} from "@/mods/submode/oil";
import GridLines from "@/app/components/GridLines";

interface ICanvas {
    position: { x: number; y: number };
    changeTextPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

const Canvas: FC<ICanvas> = ({ position, changeTextPosition }) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.data);
    const cursorData = useAppSelector(state => state.cursorData);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cursorLayerRef = useRef<HTMLDivElement>(null);
    const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
    const [currentPosition, setCurrentPosition] = useState<{ x: number; y: number } | null>(null);
    const [savedImageData, setSavedImageData] = useState<ImageData | null>(null);
    const [selection, setSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [prevPosition, setPrevPosition] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        if (data.imageData) {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
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
        if (!canvasRef.current) return;
        if (data.flip.includes('horizontal')) flipHorizontal(canvasRef);
        if (data.flip.includes('vertical')) flipVertical(canvasRef);
    }, [data.flip]);

    useEffect(() => {
        if (!canvasRef.current) return;
        if (data.rotate) {
            rotateCanvas(canvasRef, data.rotate);
            dispatch(updateRotate(0));
        }
    }, [data.rotate]);

    useEffect(() => {
        canvasRef?.current && dispatch(getRef(canvasRef?.current.toDataURL('image/png')));
    }, [canvasRef?.current]);

    useEffect(() => {
        if (!cursorData.mode.includes('bi-fonts')) dispatch(updateTextArea(false));
    }, [cursorData.mode]);

    const handleMouseMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
        const canvas = canvasRef.current;
        const cursorLayer = cursorLayerRef.current;
        if (!canvas || !cursorLayer) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            cursorLayer.style.display = 'block';
            cursorLayer.style.left = `${x}px`;
            cursorLayer.style.top = `${y}px`;
            cursorLayer.style.width = `${cursorData.cursorSize}px`;
            cursorLayer.style.height = `${cursorData.cursorSize}px`;
        } else {
            cursorLayer.style.display = 'none';
        }

        if (event.buttons !== 1) return;
        if (cursorData.mode.includes('bi-pencil-fill')) {
            if (cursorData.submode.includes('bi-brush-fill')) {
                ctx.setLineDash([]);
                ctx.imageSmoothingEnabled = false;
                ctx.strokeStyle = cursorData.colorFirst;
                ctx.lineWidth = cursorData.cursorSize;
                ctx.lineTo(x, y);
                ctx.stroke();
                dispatch(updateDrawing([...cursorData.drawing, { x, y }]));
            } else if (cursorData.submode.includes('bi-brush-calligraphy')) {
                prevPosition && drawWithBrushAngle(cursorData, ctx, x, y, prevPosition.x, prevPosition.y, 45);
                setPrevPosition({ x, y });
                dispatch(updateDrawing([...cursorData.drawing, { x, y }]));
            } else if (cursorData.submode.includes('bi-pen-calligraphy')) {
                prevPosition && drawWithBrushAngle(cursorData, ctx, x, y, prevPosition.x, prevPosition.y, -45);
                setPrevPosition({ x, y });
                dispatch(updateDrawing([...cursorData.drawing, { x, y }]));
            } else if (cursorData.submode.includes('bi-brush-oil')) {
                prevPosition && drawWithOil(cursorData, ctx, x, y, prevPosition.x, prevPosition.y, 90);
                setPrevPosition({ x, y });
                dispatch(updateDrawing([...cursorData.drawing, { x, y }]));
            }
        } else if (cursorData.mode.includes('bi-eraser')) {
            ctx.setLineDash([]);
            eraserCanvas(ctx, x, y, cursorData.cursorSize);
        } else if (cursorData.mode.includes('search')) {
            if (!origin) return;
            setCurrentPosition({ x, y });

            // Restore the saved image data
            if (savedImageData) {
                ctx.putImageData(savedImageData, 0, 0);
            }

            // Draw the selection rectangle
            const selectionRect = searchMode({ canvasRef, currentPosition: { x, y }, origin });
            if (selectionRect) setSelection(selectionRect);
        } else if (isDragging && selection && savedImageData) {
            ctx.putImageData(savedImageData, 0, 0); // Restore the canvas
            const newX = x - (selection.width / 2);
            const newY = y - (selection.height / 2);
            ctx.putImageData(savedImageData, newX, newY); // Draw the dragged image
        }
        dispatch(getRef(canvas.toDataURL()))
        dispatch(setPosition([x, y]));
    };

    const handleMouseLeave = () => {
        const cursorLayer = cursorLayerRef.current;
        if (cursorLayer) {
            cursorLayer.style.display = 'none';
        }
        dispatch(updateDrawing([]));
        dispatch(setPosition([0, 0]));
    };

    const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);

        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return;
        if (cursorData.mode.includes('bi-pencil-fill')) {
            if (cursorData.submode.includes('bi-brush-fill')) {
                ctx.strokeStyle = cursorData.colorFirst;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y);
                ctx.stroke();
                dispatch(updateDrawing([{ x, y }]));
            } else if (cursorData.submode.includes('bi-brush-calligraphy')) {
                setPrevPosition(null);
                setPrevPosition({ x, y });
                dispatch(updateDrawing([{ x, y }]));
            } else if (cursorData.submode.includes('bi-pen-calligraphy')) {
                setPrevPosition(null);
                setPrevPosition({ x, y });
                dispatch(updateDrawing([{ x, y }]));
            } else if (cursorData.submode.includes('bi-brush-oil')) {
                setPrevPosition(null);
                setPrevPosition({ x, y });
                dispatch(updateDrawing([{ x, y }]));
            }
        } else if (cursorData.mode.includes('bi-paint-bucket')) {
            floodFill(ctx, x, y, cursorData.colorFirst);
        } else if (cursorData.mode.includes('bi-eyedropper')) {
            const color = getColor(ctx, x, y);
            dispatch(updateCursorMainColor([true, color]));
        } else if (cursorData.mode.includes('bi-eraser')) {
            eraserCanvas(ctx, x, y, cursorData.cursorSize);
        } else if (cursorData.mode.includes('bi-zoom-in')) {
            zoomPlus(ctx, canvas);
        } else if (cursorData.mode.includes('bi-fonts')) {
            renderText(cursorData, ctx, data.textInput, position.x, position.y);
            dispatch(updateTextInput(''));
            dispatch(updateTextArea(!cursorData.textArea));
            !cursorData.textArea && changeTextPosition({ x, y });
        } else if (cursorData.mode.includes('search')) {
            setOrigin({ x, y });

            // Save the current canvas image data
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            setSavedImageData(imageData);
        } else if (selection) {
            // Check if the click is within the selection area
            if (
                x >= selection.x &&
                x <= selection.x + selection.width &&
                y >= selection.y &&
                y <= selection.y + selection.height
            ) {
                setIsDragging(true);
            }
        }
        dispatch(getRef(canvas.toDataURL()))
        dispatch(setPosition([x, y]));
    };

    const handleMouseUp: MouseEventHandler<HTMLCanvasElement> = (event) => {
        setIsDragging(false);
        if (!origin || !currentPosition) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);

        if (selection) {
            const newX = x - (selection.width / 2);
            const newY = y - (selection.height / 2);

            ctx.putImageData(savedImageData!, newX, newY);

            setOrigin(null);
            setCurrentPosition(null);
            setSelection(null);
            setSavedImageData(null);
        }

        if (cursorData.submode.includes('bi-brush-calligraphy')) {
            setPrevPosition(null);
        }
        dispatch(getRef(canvas.toDataURL()))
    };

    useEffect(() => {
        if (origin && currentPosition) {
            searchMode({ canvasRef, currentPosition, origin });
        }
    }, [origin, currentPosition]);

    return (
        <div style={{ position: 'relative' }}>
            <canvas
                ref={canvasRef}
                width={data.sizeWidth}
                height={data.sizeHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                className={`position-absolute top-0 left-0 right-0 bottom-0 ${cursorData.mode}`}
            />
            <GridLines width={data.sizeWidth} height={data.sizeHeight} cellSize={20} />
            <div
                ref={cursorLayerRef}
                style={{
                    position: 'absolute',
                    background: cursorData.colorFirst,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </div>
    );
};

export default Canvas;
