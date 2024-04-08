import {ICursorSlice} from "@/lib/features/cursorSlice";

export const renderText = (cursorData: ICursorSlice, ctx: CanvasRenderingContext2D, textInput: string, x: number, y: number) => {
    ctx.font = `${cursorData.textFormat} ${cursorData.fontSize}px  ${cursorData.fontFamily}`; // Set font size and family
    ctx.fillStyle = cursorData.colorFirst; // Set text color
    ctx.fillText(textInput, x, y); // Render text at the specified coordinates
    ctx.strokeStyle = "#ff0000";
    ctx.clearRect(0, 0, x, y);
    ctx.beginPath();
    ctx.stroke();
}