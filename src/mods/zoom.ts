import {logAppDirError} from "next/dist/server/dev/log-app-dir-error";

export const zoomPlus = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    zoom(ctx, canvas, 1.1);
};

export const zoomMinus = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    zoom(ctx, canvas, 0.9);
};

const zoom = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scale: number) => {
    const tempCanvas = createTempCanvas(canvas);
    if (!tempCanvas) return;

    const { offsetX, offsetY } = calculateZoomOffsets(canvas, scale);
    const { newWidth, newHeight } = calculateZoomDimensions(canvas, scale);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear current canvas
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);
    ctx.drawImage(tempCanvas, 0, 0, newWidth, newHeight);
    ctx.restore();
    console.log(tempCanvas.width)
    tempCanvas.remove();
};

const calculateZoomOffsets = (canvas: HTMLCanvasElement, scale: number) => {
    const offsetX = (canvas.width * (1 - scale)) / 2;
    const offsetY = (canvas.height * (1 - scale)) / 2;
    return { offsetX, offsetY };
};

const calculateZoomDimensions = (canvas: HTMLCanvasElement, scale: number) => {
    let newWidth = Math.round(canvas.width * scale);
    let newHeight = Math.round(canvas.height * scale);

    // Limit zoom levels
    const maxZoom = 8; // Maximum zoom (800%)
    const minZoom = 0.25; // Minimum zoom (25%)
    newWidth = Math.max(Math.min(newWidth, canvas.width * maxZoom), canvas.width * minZoom);
    newHeight = Math.max(Math.min(newHeight, canvas.height * maxZoom), canvas.height * minZoom);

    return { newWidth, newHeight };
};

const createTempCanvas = (canvas: HTMLCanvasElement) => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return null;

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    return tempCanvas;
};