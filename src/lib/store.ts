import {configureStore} from "@reduxjs/toolkit";
import paintSlice from "./features/paintSlice";
import cursorSlice from "@/lib/features/cursorSlice";
import viewSlice from "@/lib/features/viewSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
           data: paintSlice,
           view: viewSlice,
           cursorData: cursorSlice
        },
    })
};

export type  AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];