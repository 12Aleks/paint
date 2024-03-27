import {RefObject} from "react";

export const rotateCanvas = (canvasRef: RefObject<HTMLCanvasElement>, angle: number) => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
    ctx.rotate(-angle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
};