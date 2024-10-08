import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {number} from "prop-types";


interface IPaintSlice{
    refCanvas : string;
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
    refCanvas: '',
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
        getRef: (state, action: PayloadAction<string>) => {
            state.refCanvas = action.payload;
        },
        createImageData: (state, action: PayloadAction<string>) => {
            state.imageData = action.payload;
        },
        updateSizeInFooter:(state, action: PayloadAction<number[] | number>) => {
            if(Array.isArray(action.payload)){
                state.sizeWidth = action.payload[0];
                state.sizeHeight = action.payload[1];
            }else{
                state.sizeWidth = action.payload;
                state.sizeHeight = action.payload;
            }

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

export const {  getRef,updateTextInput, updateRotate, flipHorizontal, flipVertical,setPath, updateSizeInFooter, createImageData} = paintSlice.actions;
export default paintSlice.reducer;