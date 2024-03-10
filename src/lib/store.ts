import {configureStore} from "@reduxjs/toolkit";
import paintSlice from "./features/paintSlice";
import cursorSlice from "@/lib/features/cursorSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
           data: paintSlice,
           cursorData: cursorSlice
        },
    })
};

export type  AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];