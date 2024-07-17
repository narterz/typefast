import { BestStats, Stats, UserStats } from "@/app/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";

export const initialState = {
    stats: {
        gameDuration: 0,
        wordsPerMin: 0,
        wordsCompleted: 0,
        grade: ""
    } as Stats,
    bestStats: {
        bestDuration: 0,
        bestWordsPerMin: 0,
        bestGrade: ""
    } as BestStats,
    gameActive: false
} as UserStats

const gameStatsSlice = createSlice({
    name: "gameStats",
    initialState,
    reducers: {
        toggleStartGame(state, action: PayloadAction<boolean>) {
            state.gameActive = action.payload
        },
        getGameResults(state, action: PayloadAction<Stats>) {
            state.stats = action.payload
        },
        setGameDuration(state, action: PayloadAction<number>) {
            state.stats.gameDuration = action.payload
        },
        getBestResults(state, action: PayloadAction<BestStats>) {
            state.bestStats = action.payload;
        },
        decrementTime(state) {
            state.stats.gameDuration = state.stats.gameDuration - 1
        },
        incrementTime(state) {
            state.stats.gameDuration = state.stats.gameDuration + 1
        },
        incrementWordsCompleted(state) {
            state.stats.wordsCompleted = state.stats.wordsCompleted + 1
        },
        decrementWordsCompleted(state) {
            state.stats.wordsCompleted = state.stats.wordsCompleted - 1
        },
        clearGameResults(state) {
            state.stats = initialState.stats
        }
    }
});

export const {
    getGameResults,
    getBestResults,
    clearGameResults,
    toggleStartGame,
    setGameDuration,
    incrementTime,
    incrementWordsCompleted,
    decrementTime,
    decrementWordsCompleted
} = gameStatsSlice.actions;

export default gameStatsSlice.reducer;
export const statSelector = (state: RootState) => state.gameStats
