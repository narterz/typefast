"use client"
import { configureStore } from "@reduxjs/toolkit";
import configGameSlice from "./configGameSlice";
import gameStatsSlice from "./gameStatsSlice";

export const store = configureStore({
    reducer: {
        configGame: configGameSlice,
        gameStats: gameStatsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch