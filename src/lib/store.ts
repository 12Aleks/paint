import {configureStore} from "@reduxjs/toolkit";
import paintSlice from "./features/paintSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
           data: paintSlice
        },
    })
};

export type  AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];