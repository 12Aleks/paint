import {ICursorSlice} from "@/lib/features/cursorSlice";



export const drawWithBrushAngle = (cursorData: ICursorSlice, ctx: CanvasRenderingContext2D, x: number, y: number, prevX: number, prevY: number, angle: number) => {
    ctx.lineCap = 'butt';
    ctx.lineWidth = cursorData.cursorSize;
    ctx.strokeStyle = cursorData.colorFirst;
    ctx.lineJoin = 'round';

    const halfWidth = cursorData.cursorSize / 2;

    // Calculate the offsets for the pen based on the angle
    const dx = Math.cos((angle * Math.PI) / 180) * halfWidth;
    const dy = Math.sin((angle * Math.PI) / 180) * halfWidth;

    // Adjust drawing method to minimize jagged edges
    ctx.beginPath();
    ctx.moveTo(prevX - dx, prevY - dy);
    ctx.lineTo(prevX + dx, prevY + dy);
    ctx.lineTo(x + dx, y + dy);
    ctx.lineTo(x - dx, y - dy);
    ctx.closePath();
    ctx.fillStyle = cursorData.colorFirst;
    ctx.fill();

};

