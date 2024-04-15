import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";


interface IPaintSlice{
    imageData: string | null;
    imagePath: string | null;
    startSize: number;
    sizeWidth: number;
    sizeHeight: number;
    flip: string;
    rotate: number;
    textInput: string
}

const initialState: IPaintSlice = {
    imageData: null,
    imagePath: null,
    startSize: 800,
    sizeWidth: 800,
    sizeHeight: 800,
    flip: '',
    rotate: 0,
    textInput: ''
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
        },

        updateRotate: (state, acttion: PayloadAction<number>) => {
            state.rotate = acttion.payload
        },

        updateTextInput: (state, action: PayloadAction<string>) => {
            state.textInput = action.payload
        },

    }
});

export const {  updateTextInput, updateRotate, flipHorizontal, flipVertical,setPath, updateSizeInFooter, createImageData} = paintSlice.actions;
export default paintSlice.reducer;