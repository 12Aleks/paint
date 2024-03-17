export const getColor = (ctx: CanvasRenderingContext2D, x: number, y: number): string => {
    const imgData = Array.from(ctx.getImageData(x, y, 1, 1).data);
    return rgbaToHex(imgData);
}

function componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbaToHex(rgba: number[]): string {
    if (rgba.length < 3) return '#000000';

    const [red, green, blue] = rgba;
    return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`.toUpperCase();
}
