import {ICursorSlice} from "@/lib/features/cursorSlice";

export const renderText = (cursorData: ICursorSlice, ctx: CanvasRenderingContext2D, textInput: string, x: number, y: number) => {
    ctx.font = `${cursorData.textDecoration} ${cursorData.fontSize}px  ${cursorData.fontFamily}`;
    ctx.fillStyle = cursorData.colorFirst;
    ctx.fillText(textInput, x + 2, y + cursorData.fontSize - 1 );
    ctx.clearRect(0, 0, x + 2, y + cursorData.fontSize - 1);
    ctx.beginPath();
    ctx.stroke();
}