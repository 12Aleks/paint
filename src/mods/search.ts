import {RefObject} from "react";

interface ISearchMode{
    canvasRef: RefObject<HTMLCanvasElement>;
    currentPosition: { x: number; y: number }| null;
    origin: { x: number; y: number } | null
}

export const searchMode = ({ canvasRef, currentPosition, origin }: ISearchMode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (origin && currentPosition) {
        ctx.setLineDash([5]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

         ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(
            origin.x,
            origin.y,
            currentPosition.x - origin.x,
            currentPosition.y - origin.y
        );
        ctx.stroke();
    }
}