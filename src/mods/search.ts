import { RefObject } from "react";

interface ISearchMode {
    canvasRef: RefObject<HTMLCanvasElement>;
    currentPosition: { x: number; y: number } | null;
    origin: { x: number; y: number } | null;
}

interface ISelection {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const searchMode = ({ canvasRef, currentPosition, origin }: ISearchMode): ISelection | null => {
    const canvas = canvasRef.current;
    if (!canvas || !origin || !currentPosition) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Clear previous selection rectangle
    ctx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);

    const x = origin.x;
    const y = origin.y;
    const width = currentPosition.x - origin.x;
    const height = currentPosition.y - origin.y;

    // Draw the selection rectangle
    ctx.setLineDash([5]);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();

    return { x, y, width, height };
}