import {Dispatch, SetStateAction, FC, ChangeEvent, DragEvent} from 'react'
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {updateTextInput} from "@/lib/features/paintSlice";


interface DragDropInputProps {
    isDragging: boolean;
    position: { x: number; y: number };
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    dragOffset: { x: number; y: number };
}

const DragDropInput: FC<DragDropInputProps> = ({ isDragging, position, setPosition,dragOffset}) => {
    const data = useAppSelector(state => state.data);
    const dispatch = useAppDispatch()

    const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTextInput(event.target.value));
    };

    const handleDragStart = (event: DragEvent<HTMLInputElement>) => {
        if (!isDragging) {
            event.dataTransfer.setData('text/plain', ''); // Necessary for Firefox
        }
    };

    const handleDragEnd = (event: DragEvent<HTMLInputElement>) => {
        let maxX = data.sizeWidth - event.currentTarget.offsetWidth;
        let maxY = data.sizeHeight - event.currentTarget.offsetHeight;

        let deltaX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffset.x;
        let deltaY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffset.y;

        let newX = Math.min(Math.max(position.x + deltaX , 0), maxX);
        let newY = Math.min(Math.max(position.y + deltaY, 0), maxY);

        setPosition({ x: newX, y: newY });
    };

    return (
        <input
            type="text"
            value={data.textInput}
            onChange={handleTextInputChange}
            draggable={!isDragging}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="inputTextMode"
            style={{ position: 'absolute', left: position.x, top: position.y }}
        />
    );
};

export default DragDropInput;