export const zoomPlus = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    zoom(ctx, canvas, 1.1, 8);
};

export const zoomMinus = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    zoom(ctx, canvas, 0.9, 0.25);
};

const zoom = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, scale: number, maxZoom: number) => {
    const tempCanvas = createTempCanvas(canvas);
    if (!tempCanvas) return;

    const { newWidth, newHeight, offsetX, offsetY } = calculateZoomDimensions(canvas, scale, maxZoom);

    resizeCanvas(canvas, newWidth, newHeight);
    if (!ctx) return;
    ctx.drawImage(tempCanvas, -offsetX, -offsetY, canvas.width, canvas.height);

    tempCanvas.remove();
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

const calculateZoomDimensions = (canvas: HTMLCanvasElement, scale: number, maxZoom: number) => {
    let newWidth = Math.round(canvas.width * scale);
    let newHeight = Math.round(canvas.height * scale);
    console.log(newWidth)
    // Limit zoom levels
    if (scale > 1 && newWidth > canvas.width * maxZoom) {
        newWidth = canvas.width * maxZoom;
        newHeight = canvas.height * maxZoom;
    } else if (scale < 1 && newWidth < canvas.width * maxZoom) {
        newWidth = canvas.width * maxZoom;
        newHeight = canvas.height * maxZoom;
    }

    const offsetX = (newWidth - canvas.width) / 2;
    const offsetY = (newHeight - canvas.height) / 2;

    return { newWidth, newHeight, offsetX, offsetY };
};

const resizeCanvas = (canvas: HTMLCanvasElement, newWidth: number, newHeight: number) => {
    canvas.width = newWidth;
    canvas.height = newHeight;
};