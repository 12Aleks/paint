import { ICursorSlice } from "@/lib/features/cursorSlice";

export const renderText = (cursorData: ICursorSlice, ctx: CanvasRenderingContext2D, textInput: string, x: number, y: number) => {
    ctx.font = `${cursorData.fontWeight} ${cursorData.fonStyle} ${cursorData.fontSize}px  ${cursorData.fontFamily}`;
    ctx.fillStyle = cursorData.colorFirst;
    ctx.imageSmoothingEnabled = false;

    // Text position in textarea. Calculate text width
    const textWidth = ctx.measureText(textInput).width;
    let adjustedX = x;
    if (cursorData.textPosition === 'center') {
        adjustedX = x + (cursorData.textAreaSize / 2) - (textWidth / 2); // Center the text horizontally below the textarea window
    }
    if (cursorData.textPosition === 'right') {
        adjustedX = x + cursorData.textAreaSize - textWidth; // Align to the right below the textarea window
    }

    ctx.fillText(textInput, Math.round(adjustedX), Math.round(y) + cursorData.fontSize);

    if (cursorData.textDecoration.includes('underline') || cursorData.textStrikethrough.includes('line-through')) {
        const textMetrics = ctx.measureText(textInput);
        const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

        if (cursorData.textDecoration.includes('underline')) {
            ctx.beginPath();
            ctx.moveTo(Math.round(adjustedX), Math.round(y) + cursorData.fontSize + 1);
            ctx.lineTo(Math.round(adjustedX) + textMetrics.width, Math.round(y) + cursorData.fontSize + 1);
            ctx.strokeStyle = cursorData.colorFirst;
            ctx.stroke();
        }

        if (cursorData.textStrikethrough.includes('line-through')) {
            console.log('TRUE')
            ctx.beginPath();
            ctx.moveTo(Math.round(adjustedX), Math.round(y) + textHeight - 2);
            ctx.lineTo(Math.round(adjustedX) + textMetrics.width, Math.round(y) + textHeight - 2);
            ctx.strokeStyle = cursorData.colorFirst;
            ctx.stroke();
        }
    }
}