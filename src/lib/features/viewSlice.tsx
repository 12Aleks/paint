import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IViewSlice {
    isStatusBar: boolean;
    isRulerModal: boolean;
    isGridLine: boolean;
}

const initialState: IViewSlice = {
    isStatusBar: true,
    isRulerModal: false,
    isGridLine: false
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
        }
    }
})

export const {changeStatusBar,changeViewGridLine, changeViewRuler} = viewSlice.actions;
export default viewSlice.reducer;