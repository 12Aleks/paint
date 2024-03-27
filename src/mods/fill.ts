export const floodFill = (ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const targetColor = getPixelColor(imageData, x, y);

    if (targetColor === fillColor) return
    const stack: [number, number][] = [[x, y]];
    const visited: boolean[][] = new Array(imageData.width)
        .fill(false)
        .map(() => new Array(imageData.height).fill(false));

    while (stack.length) {
        const [cx, cy] = stack.pop()!;

        if (getPixelColor(imageData, cx, cy) === targetColor) {
            setPixelColor(imageData, cx, cy, fillColor);
            visited[cx][cy] = true;
            pushNeighboringPixels(cx, cy, stack, visited, imageData);
        }
    }

    ctx.putImageData(imageData, 0, 0);
};


const isValidPixel = (x: number, y: number, imageData: ImageData) => {
    return x >= 0 && x < imageData.width && y >= 0 && y < imageData.height;
};


const pushNeighboringPixels = (x: number, y: number, stack: [number, number][], visited: boolean[][], imageData: ImageData) => {
    const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (const [nx, ny] of neighbors) {
        if (isValidPixel(nx, ny, imageData) && !visited[nx][ny]) {
            stack.push([nx, ny]);
        }
    }
};


const getPixelColor = (imageData: ImageData, x: number, y: number): string => {
    const index = (y * imageData.width + x) * 4;
    return `rgb(${imageData.data[index]}, ${imageData.data[index + 1]}, ${imageData.data[index + 2]})`;
};


const setPixelColor = (imageData: ImageData, x: number, y: number, color: string) => {
    const index = (y * imageData.width + x) * 4;
    const { r, g, b } = hexToRgb(color);
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255; // Alpha channel
};


const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
};