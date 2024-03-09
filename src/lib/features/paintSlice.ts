import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface IPaintSlice{
    imageData: string | null;
    imagePath: string | null;
    startSize: number;
    sizeWidth: number;
    sizeHeight: number;
}

const initialState: IPaintSlice = {
    imageData: null,
    imagePath: null,
    startSize: 800,
    sizeWidth: 800,
    sizeHeight: 800
}

export const paintSlice = createSlice({
    name: 'paint',
    initialState,
    reducers: {
        createImageData: (state, action: PayloadAction<string>) => {
            state.imageData = action.payload;
        },
        updateSizeInFooter:(state, action: PayloadAction<number>) => {
            state.sizeWidth = action.payload;
            state.sizeHeight = action.payload;
        },
        setPath: (state, action: PayloadAction<string>) => {
            state.imagePath = action.payload;
        },

    }
});

export const {setPath, updateSizeInFooter, createImageData} = paintSlice.actions;
export default paintSlice.reducer;