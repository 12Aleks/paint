import { FC, useEffect, useRef } from 'react';
import styles from '../styles/gridline.module.scss';
import {useAppSelector} from "@/lib/hooks";

interface IGridLines {
    width: number;
    height: number;
    cellSize: number;
}

const GridLines: FC<IGridLines> = ({ width, height, cellSize }) => {
    const {isGridLine} = useAppSelector(state => state.view)
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;

        // Draw vertical lines
        for (let x = 0; x <= width; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= height; y += cellSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }, [width, height, cellSize]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                display: `${isGridLine? 'block': 'none'}`
            }}
        />
    );
};

export default GridLines;
