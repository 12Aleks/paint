import {ICursorSlice} from "@/lib/features/cursorSlice";

export const drawWithPenAngle = (cursorData: ICursorSlice, ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.lineCap = 'butt';
    ctx.lineWidth = cursorData.cursorSize;
    ctx.strokeStyle = cursorData.colorFirst;
    const angle = 45; // угол наклона пера, можно сделать его параметром состояния
    const length = cursorData.cursorSize;

    // вычисляем координаты кончика пера
    const offsetX = Math.cos((angle * Math.PI) / 180) * length;
    const offsetY = Math.sin((angle * Math.PI) / 180) * length;

    ctx.beginPath();
    ctx.moveTo(x - offsetX, y - offsetY);
    ctx.lineTo(x + offsetX, y + offsetY);
    ctx.stroke();
};