export const eraserCanvas = (ctx: CanvasRenderingContext2D, x: number, y: number, cursorSize: number) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, cursorSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}