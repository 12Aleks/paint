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
    picker: string;
    cursorSize: number;
    mode: string
}

const initialState:ICursorSlice = {
    positionX: 0,
    positionY: 0,
    colorFirst: '#000000',
    colorSecond: '#ffffff',
    drawing: [],
    picker: 'violet',
    cursorSize: 1,
    mode: 'bi-pencil-fill'
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
        },
        updateCursorSize: (state, action: PayloadAction<number>) => {
            state.cursorSize = action.payload
        },
        updateMode: (state, action: PayloadAction<string>) => {
            state.mode = action.payload
        }
    }
})

export const {setPosition,updateMode,updateCursorSize,   updateDrawing ,updateCursorMainColor} = cursorSlice.actions;
export default cursorSlice.reducer