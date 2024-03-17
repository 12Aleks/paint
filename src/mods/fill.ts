export const floodFill = (ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) => {
    // Get the image data of the canvas
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Get the target color of the pixel at position (x, y)
    const targetColor = getPixelColor(imageData, x, y);

    // If the target color is the same as the fill color, no need to fill
    if (targetColor === fillColor) return

    // Stack to hold pixels to be filled
    const stack: [number, number][] = [[x, y]];

    // Set to keep track of visited pixels
    const visited: boolean[][] = new Array(imageData.width)
        .fill(false)
        .map(() => new Array(imageData.height).fill(false));

    // Perform flood fill
    while (stack.length) {
        const [cx, cy] = stack.pop()!;

        // Check if the current pixel color matches the target color
        if (getPixelColor(imageData, cx, cy) === targetColor) {
            // Fill the current pixel with the fill color
            setPixelColor(imageData, cx, cy, fillColor);
            visited[cx][cy] = true;

            // Push neighboring pixels onto the stack
            pushNeighboringPixels(cx, cy, stack, visited, imageData);
        }
    }

    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
};

// Helper function to check if a pixel is within the canvas bounds
const isValidPixel = (x: number, y: number, imageData: ImageData) => {
    return x >= 0 && x < imageData.width && y >= 0 && y < imageData.height;
};

// Helper function to push neighboring pixels onto the stack
const pushNeighboringPixels = (x: number, y: number, stack: [number, number][], visited: boolean[][], imageData: ImageData) => {
    const neighbors = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (const [nx, ny] of neighbors) {
        if (isValidPixel(nx, ny, imageData) && !visited[nx][ny]) {
            stack.push([nx, ny]);
        }
    }
};

// Helper function to get the color of a pixel at a given position
const getPixelColor = (imageData: ImageData, x: number, y: number): string => {
    const index = (y * imageData.width + x) * 4;
    return `rgb(${imageData.data[index]}, ${imageData.data[index + 1]}, ${imageData.data[index + 2]})`;
};

// Helper function to set the color of a pixel at a given position
const setPixelColor = (imageData: ImageData, x: number, y: number, color: string) => {
    const index = (y * imageData.width + x) * 4;
    const { r, g, b } = hexToRgb(color);
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255; // Alpha channel
};

// Helper function to convert hex color to RGB
const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
};