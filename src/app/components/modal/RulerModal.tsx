import React, { useState, useEffect } from 'react';
import { useAppSelector } from "@/lib/hooks";

const RulerModal: React.FC = () => {
    const { isRulerModal } = useAppSelector(state => state.view);
    const [windowDimensions, setWindowDimensions] = useState<{ width: number, height: number }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = (): void => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const generateLabels = (size: number): number[] => {
        const step = 100;
        const labels = [];
        for (let i = 0; i <= size; i += step) {
            labels.push(i);
        }
        return labels;
    };

    const horizontalLabels = generateLabels(windowDimensions.width);
    const verticalLabels = generateLabels(windowDimensions.height);

    return (
        <div style={{ display: isRulerModal ? "block" : "none" }}>
            <div className="ruler_wrapper horizontal_ruler">
                {horizontalLabels.map(label => (
                    <label key={label}>{label}</label>
                ))}
            </div>
            <div className="ruler_wrapper vertical_ruler">
                {verticalLabels.map(label => (
                    <label key={label}>{label}</label>
                ))}
            </div>
        </div>
    );
};

export default RulerModal;
