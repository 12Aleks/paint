import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IViewSlice {
    isStatusBar: boolean;
    isRulerModal: boolean;
}

const initialState: IViewSlice = {
    isStatusBar: true,
    isRulerModal: false
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
        }
    }
})

export const {changeStatusBar, changeViewRuler} = viewSlice.actions;
export default viewSlice.reducer;