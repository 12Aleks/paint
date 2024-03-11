import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface Point {
    x: number;
    y: number;
}
interface ICursorSlice{
    positionX: number;
    positionY: number
    colorFirst: string;
    colorSecond: string;
    drawing: Point[];
    picker: string
}

const initialState:ICursorSlice = {
    positionX: 0,
    positionY: 0,
    colorFirst: 'black',
    colorSecond: 'white',
    drawing: [],
    picker: 'violet',
}
export const cursorSlice = createSlice({
    name: 'cursor',
    initialState,
    reducers:{
        setPosition: (state , action: PayloadAction<number[]>) =>{
            state.positionX = action.payload[0]
            state.positionY = action.payload[1]
        },
        updateCursorMainColor: (state, action: PayloadAction<[boolean, string]>) => {
            if(action.payload[0]){
                state.colorFirst = action.payload[1]
            }else{
                state.colorSecond = action.payload[1]
            }
        },
        updateDrawing: (state, action: PayloadAction<Point[]>) => {
            state.drawing = action.payload;
        }
    }
})

export const {setPosition,  updateDrawing ,updateCursorMainColor} = cursorSlice.actions;
export default cursorSlice.reducer