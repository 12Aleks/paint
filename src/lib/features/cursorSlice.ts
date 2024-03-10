import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ICursorSlice{
    positionX: number;
    positionY: number
}

const initialState:ICursorSlice = {
    positionX: 0,
    positionY: 0
}
export const cursorSlice = createSlice({
    name: 'cursor',
    initialState,
    reducers:{
        setPosition: (state , action: PayloadAction<number[]>) =>{
            console.log(action.payload)
            state.positionX = action.payload[0]
            state.positionY = action.payload[1]
        }

    }
})

export const {setPosition} = cursorSlice.actions;
export default cursorSlice.reducer