export const renderText = (cursorData: string, ctx: CanvasRenderingContext2D, textInput: string, x: number, y: number) => {
    ctx.font = '20px Arial'; // Set font size and family
    ctx.fillStyle = cursorData; // Set text color
    ctx.fillText(textInput, x, y); // Render text at the specified coordinates
}