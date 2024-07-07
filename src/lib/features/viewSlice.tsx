import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IViewSlice {
    isStatusBar: boolean;
    isRulerModal: boolean;
    isGridLine: boolean;
    gridLineSize: number;
}

const initialState: IViewSlice = {
    isStatusBar: true,
    isRulerModal: false,
    isGridLine: false,
    gridLineSize: 20,
}

export const viewSlice = createSlice({
    name: "viewSlice",
    initialState,
    reducers: {
        changeStatusBar: (state, action:PayloadAction<boolean>) => {
            state.isStatusBar = action.payload
        },
        changeViewRuler: (state, action:PayloadAction<boolean>) => {
            state.isRulerModal = action.payload
        },
        changeViewGridLine: (state, action:PayloadAction<boolean>) => {
            state.isGridLine = action.payload
        },
        changeGridLineSize: (state, action:PayloadAction<number>) => {
            state.gridLineSize = action.payload
        }
    }
})

export const {changeStatusBar,
              changeGridLineSize,
              changeViewGridLine,
              changeViewRuler} = viewSlice.actions;
export default viewSlice.reducer;