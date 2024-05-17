import {Dispatch, SetStateAction, FC, ChangeEvent, DragEvent, useEffect, useRef} from 'react'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateTextInput } from "@/lib/features/paintSlice";
import {updateTextAreaSize} from "@/lib/features/cursorSlice";

interface DragDropInputProps {
    isDragging: boolean;
    position: { x: number; y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    show: boolean
}

const TextArea: FC<DragDropInputProps> = ({ isDragging, position, setPosition,  show }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const data = useAppSelector(state => state.data);
    const cursorData = useAppSelector(state => state.cursorData);
    const dispatch = useAppDispatch();

    const handleTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => { // Change to HTMLTextAreaElement
        dispatch(updateTextInput(event.target.value));
    };

    useEffect(() => {
        !show && setPosition({ x: 0, y: 0 });
    }, [show])

    useEffect(() => {
        const handleResize = () => {
            if (textAreaRef.current) {
                const width = textAreaRef.current.offsetWidth;
                dispatch(updateTextAreaSize(width));
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);
        if (textAreaRef.current) {
            resizeObserver.observe(textAreaRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [textAreaRef.current]);

    return (
        <textarea
            ref={textAreaRef}
            value={data.textInput}
            onChange={handleTextInputChange}
            draggable={!isDragging}
            className={`textMode ${show ? 'show' : ''}`}
            style={{ maxHeight: data.sizeHeight,
                      maxWidth: data.sizeWidth,
                      left: position.x,
                      top: position.y,
                      fontSize: cursorData.fontSize,
                      fontFamily: cursorData.fontFamily,
                      fontWeight: cursorData.fontWeight,
                      textDecoration: `${cursorData.textDecoration} ${cursorData.textStrikethrough}`,
                      fontStyle: cursorData.fonStyle,
                      lineHeight: cursorData.fontSize + 'px',
                      color: cursorData.colorFirst,
                      textAlign: cursorData.textPosition
           }}
        />
    );
};

export default TextArea;