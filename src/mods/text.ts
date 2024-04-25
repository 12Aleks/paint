import {ICursorSlice} from "@/lib/features/cursorSlice";
import {RefObject} from "react";


export const renderText = (cursorData: ICursorSlice, canvasRef: RefObject<HTMLCanvasElement>, textInput: string, x: number, y: number) => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    ctx.font = `${cursorData.fontWeight} ${cursorData.fonStyle} ${cursorData.fontSize}px  ${cursorData.fontFamily}`;
    ctx.fillStyle = cursorData.colorFirst;
    ctx.imageSmoothingEnabled = false;
    ctx.fillText(textInput, Math.round(x) + 2, Math.round(y) + cursorData.fontSize - 1 );
    // Calculate text width
    const textWidth = ctx.measureText(textInput).width;
    // Adjust x coordinate based on alignment
    console.log('Text', cursorData.textPosition)
    if (cursorData.textPosition === 'center') {
        x -= textWidth / 2;
    } else if (cursorData.textPosition === 'right') {
        x -= textWidth;
    }

    if (cursorData.textDecoration.includes('underline') || cursorData.textStrikethrough.includes("strikethrough")) {
        const textMetrics = ctx.measureText(textInput);
        const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

        if (cursorData.textDecoration.includes('underline')) {
            ctx.beginPath();
            ctx.moveTo(Math.round(x) + 2, Math.round(y) + cursorData.fontSize + 1);
            ctx.lineTo(Math.round(x) + 2 + textMetrics.width, Math.round(y) + cursorData.fontSize + 1);
            ctx.strokeStyle = cursorData.colorFirst;
            ctx.stroke();
        }

        if (cursorData.textStrikethrough.includes("strikethrough")) {
            ctx.beginPath();
            ctx.moveTo(Math.round(x) + 2, Math.round(y) + textHeight - 2);
            ctx.lineTo(Math.round(x) + 2 + textMetrics.width, Math.round(y) + textHeight - 2);
            ctx.strokeStyle = cursorData.colorFirst;
            ctx.stroke();
        }
    }
}