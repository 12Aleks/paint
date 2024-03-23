import {RefObject} from "react";

export const flipHorizontal = (canvasRef: RefObject<HTMLCanvasElement>) => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix
};

export const flipVertical = (canvasRef: RefObject<HTMLCanvasElement>) => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformation matrix
};