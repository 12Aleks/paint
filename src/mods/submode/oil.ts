import {ICursorSlice} from "@/lib/features/cursorSlice";

export const drawWithOil = (
    cursorData: ICursorSlice,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    angle: number
) => {
    const halfWidth = cursorData.cursorSize / 2;
    const dx = Math.cos((angle * Math.PI) / 180) * halfWidth;
    const dy = Math.sin((angle * Math.PI) / 180) * halfWidth;

    // Add randomness to the stroke direction and length
    const randomFactor = Math.random() * 0.6 + 0.7;
    const randDX = dx * randomFactor;
    const randDY = dy * randomFactor;

    // Vary the opacity and thickness of the brushstrokes
    const baseOpacity = 0.7;
    const opacity = baseOpacity + Math.random() * 0.3;
    const lineWidth = cursorData.cursorSize * (0.7 + Math.random() * 0.3);

    // Adjust drawing method to minimize jagged edges
    ctx.beginPath();
    ctx.moveTo(prevX - randDX, prevY - randDY);
    ctx.lineTo(prevX + randDX, prevY + randDY);
    ctx.lineTo(x + randDX, y + randDY);
    ctx.lineTo(x - randDX, y - randDY);
    ctx.closePath();

    ctx.fillStyle = cursorData.colorFirst;
    ctx.globalAlpha = opacity;
    ctx.lineWidth = lineWidth;
    ctx.fill();
    ctx.globalAlpha = 1.0; // Reset the opacity to default

    // Optionally, add a brush texture here if available
    // const brushTexture = new Image();
    // brushTexture.src = 'path_to_brush_texture.png';
    // ctx.drawImage(brushTexture, x - halfWidth, y - halfWidth, cursorData.cursorSize, cursorData.cursorSize);
};
