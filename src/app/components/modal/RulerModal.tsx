import { FC, useState, useEffect } from 'react';
import { useAppSelector } from "@/lib/hooks";

const RulerModal: FC = () => {
    const { isRulerModal } = useAppSelector(state => state.view);
    const [windowDimensions, setWindowDimensions] = useState<{ width: number, height: number }>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = (): void => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        if (typeof window !== 'undefined') {
            // Set initial dimensions
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    const generateLabels = (size: number): number[] => {
        const step: number = 10;
        const labels: number[] = [];
        for (let i: number = 0; i <= size; i += step) {
            labels.push(i);
        }
        return labels;
    };

    const horizontalLabels: number[] = generateLabels(windowDimensions.width);
    const verticalLabels: number[] = generateLabels(windowDimensions.height);

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
