import { Dispatch, SetStateAction, FC, ChangeEvent, DragEvent } from 'react'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateTextInput } from "@/lib/features/paintSlice";

interface DragDropInputProps {
    isDragging: boolean;
    position: { x: number; y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    dragOffset: { x: number; y: number };
    show: boolean
}

const TextArea: FC<DragDropInputProps> = ({ isDragging, position, setPosition, dragOffset, show }) => {
    const data = useAppSelector(state => state.data);
    const dispatch = useAppDispatch()

    const handleTextInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => { // Change to HTMLTextAreaElement
        dispatch(updateTextInput(event.target.value));
    };

    const handleDragStart = (event: DragEvent<HTMLTextAreaElement>) => { // Change to HTMLTextAreaElement
        if (!isDragging) {
            event.dataTransfer.setData('text/plain', ''); // Necessary for Firefox
        }
    };

    const handleDragEnd = (event: DragEvent<HTMLTextAreaElement>) => { // Change to HTMLTextAreaElement
        let maxX = data.sizeWidth - event.currentTarget.offsetWidth;
        let maxY = data.sizeHeight - event.currentTarget.offsetHeight;

        let deltaX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffset.x;
        let deltaY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffset.y;

        let newX = Math.min(Math.max(position.x + deltaX , 0), maxX);
        let newY = Math.min(Math.max(position.y + deltaY, 0), maxY);

        setPosition({ x: newX, y: newY });
    };

    return (
        <textarea
            value={data.textInput}
            onChange={handleTextInputChange}
            draggable={!isDragging}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`textMode ${show ? 'show' : ''}`}
            style={{ position: 'absolute', left: position.x, top: position.y }}
        />
    );
};

export default TextArea;