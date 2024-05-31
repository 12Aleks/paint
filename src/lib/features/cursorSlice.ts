import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Point {
    x: number;
    y: number;
}
export type TextAlign = 'left' | 'right' | 'center';
export type SubMode = 'bi-brush-fill' | 'bi-brush-calligraphy'| 'bi-pen-calligraphy' | 'bi-airbrush-fill'|'bi-brush-oil'|'bi-crayon-fill'|'bi-marker-fill'|'bi-pencil-fill'|'bi-brush-watercolor'

export interface ICursorSlice {
    positionX: number;
    positionY: number
    colorFirst: string;
    colorSecond: string;
    drawing: Point[];
    picker: string;
    cursorSize: number;
    mode: string,
    submode: SubMode,
    fontFamily: string,
    fontSize: number,
    fonStyle: string,
    fontWeight: string,
    textDecoration: string,
    textArea: boolean,
    textStrikethrough: string,
    textPosition: TextAlign,
    textAreaSize: number
}

const initialState: ICursorSlice = {
    positionX: 0,
    positionY: 0,
    colorFirst: '#000000',
    colorSecond: '#ffffff',
    drawing: [],
    picker: 'violet',
    cursorSize: 1,
    mode: 'bi-pencil-fill',
    submode: 'bi-brush-fill',
    fontFamily: 'Arial',
    fontSize: 11,
    fonStyle: 'normal',
    fontWeight: 'normal',
    textDecoration: '',
    textStrikethrough: '',
    textArea: false,
    textPosition: 'left',
    textAreaSize: 131,
}
export const cursorSlice = createSlice({
    name: 'cursor',
    initialState,
    reducers: {
        setPosition: (state, action: PayloadAction<number[]>) => {
            state.positionX = action.payload[0]
            state.positionY = action.payload[1]
        },
        updateCursorMainColor: (state, action: PayloadAction<[boolean, string]>) => {
            if (action.payload[0]) {
                state.colorFirst = action.payload[1]
            } else {
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
        },
        updateSubMode: (state, action: PayloadAction<SubMode>) => {
            state.submode = action.payload
        },
        updateFontFamily: (state, action: PayloadAction<string>) => {
            state.fontFamily = action.payload
        },
        updateFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload
        },
        updateTextDecoration: (state, action: PayloadAction<string>) => {
            state.textDecoration = action.payload
        },
        updateFontWeight: (state, action: PayloadAction<string>) => {
            state.fontWeight = action.payload
        },
        updateFonStyle: (state, action: PayloadAction<string>) => {
            state.fonStyle = action.payload
        },
        updateTextArea: (state, action: PayloadAction<boolean>) => {
            state.textArea = action.payload
        },
        updateTextStrikethrough: (state, action: PayloadAction<string>) => {
            state.textStrikethrough = action.payload
        },
        updateTextPosition: (state, action: PayloadAction<TextAlign>) => {
            state.textPosition = action.payload
        },
        updateTextAreaSize: (state, action: PayloadAction<number>) => {
            state.textAreaSize = action.payload
        }

    }
})

export const {
    updateTextStrikethrough,
    updateFonStyle,
    updateFontWeight,
    updateTextArea,
    updateTextDecoration,
    updateFontSize,
    updateFontFamily,
    setPosition,
    updateSubMode,
    updateMode,
    updateCursorSize,
    updateDrawing,
    updateCursorMainColor,
    updateTextPosition,
    updateTextAreaSize
} = cursorSlice.actions;
export default cursorSlice.reducer