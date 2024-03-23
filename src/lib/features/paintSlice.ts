import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {RefObject} from "react";

interface IPaintSlice{
    imageData: string | null;
    imagePath: string | null;
    startSize: number;
    sizeWidth: number;
    sizeHeight: number;
    flip: string;
}

const initialState: IPaintSlice = {
    imageData: null,
    imagePath: null,
    startSize: 800,
    sizeWidth: 800,
    sizeHeight: 800,
    flip: '',
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
        flipVertical: (state, action: PayloadAction<string>) => {
            state.flip = action.payload
        },

        flipHorizontal: (state, action: PayloadAction<string>) => {
            state.flip = action.payload
        }

    }
});

export const {  flipHorizontal, flipVertical,setPath, updateSizeInFooter, createImageData} = paintSlice.actions;
export default paintSlice.reducer;