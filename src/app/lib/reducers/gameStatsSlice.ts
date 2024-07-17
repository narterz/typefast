import { BestStats, ActiveGameStats, EndGameStats, UserStats } from "@/app/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store";

export const initialState = {
    activeGameStats: {
        currentSentence: 0,
        highlightedWords: [[""]],
        typedWords: [""]
    },
    endGameStats: {
        gameDuration: 0,
        wordsPerMin: 0,
        wordsCompleted: 0,
        grade: ""
    },
    bestStats: {
        bestDuration: 0,
        bestWordsPerMin: 0,
        bestGrade: ""
    },
    gameActive: false
} as UserStats

const gameStatsSlice = createSlice({
    name: "gameStats",
    initialState,
    reducers: {
        toggleStartGame(state, action: PayloadAction<boolean>) {
            state.gameActive = action.payload
        },
        getGameResults(state, action: PayloadAction<EndGameStats>) {
            state.endGameStats = action.payload
        },
        setGameDuration(state, action: PayloadAction<number>) {
            state.endGameStats.gameDuration = action.payload
        },
        getBestResults(state, action: PayloadAction<BestStats>) {
            state.bestStats = action.payload;
        },
        decrementTime(state) {
            state.endGameStats.gameDuration = state.endGameStats.gameDuration - 1
        },
        incrementTime(state) {
            state.endGameStats.gameDuration = state.endGameStats.gameDuration + 1
        },
        incrementWordsCompleted(state) {
            state.endGameStats.wordsCompleted = state.endGameStats.wordsCompleted + 1
        },
        decrementWordsCompleted(state) {
            state.endGameStats.wordsCompleted = state.endGameStats.wordsCompleted - 1
        },
        setHighlightedWords(state, action: PayloadAction<string[][]>){
            state.activeGameStats.highlightedWords = action.payload;
        },
        endGame(state) {
            state.endGameStats = initialState.endGameStats;
            state.activeGameStats.currentSentence = 0;
            state.activeGameStats.highlightedWords = [state.activeGameStats.highlightedWords[state.activeGameStats.currentSentence]];
            state.gameActive  = false;
        },
        clearGameResults(state) {
            state.endGameStats = initialState.endGameStats
        },
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
    decrementWordsCompleted,
    endGame,
    setHighlightedWords
} = gameStatsSlice.actions;

export default gameStatsSlice.reducer;
export const statSelector = (state: RootState) => state.gameStats
