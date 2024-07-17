import { TextSetting, GameModes, GameText, GameSettings} from "@/app/types";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
import { removePunc, getTotalWords, removeNumbers } from "@/app/helpers/wordCounter";

export const initialState = {
    textSetting: {
        punctuation: true,
        numbers: true
    } as TextSetting,
    gameMode: {
        wordMode: {
            active: false,
            settings: {
                difficulty: "normal",
                duration: 50
            }
        },
        timeMode: {
            active: false,
            settings: {
                difficulty: "normal",
                duration: 60
            }
        },
        zenMode: {
            active: false
        } 
    } as GameModes,
    gameText: {
        words: "",
        wordCount: 0,
    } as GameText
};


export const gameText = createAsyncThunk(
    'fetchText',
    async (sentences: number, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI
        try {
            const state = getState() as RootState;
            const textSetting = state.configGame.textSetting;
            const response = await axios.get(`https://hipsum.co/api/?type=hipster-centric&sentences=${sentences}`);
            let text = response.data.join(" ");
            if(textSetting.punctuation) {
                text = removePunc(text)
            }
            if(textSetting.numbers) {
                text = removeNumbers(text)
            }
            const wordCount = getTotalWords(text);
            return {
                words: text,
                wordCount: wordCount
            }
        } catch (error: any) {
            return rejectWithValue(error.response.data || error.message)
        }
    }
)

const configGameSlice = createSlice({
    name: 'configGame',
    initialState,
    reducers: {
        updateTextSetting(state, action: PayloadAction<TextSetting>) {
            state.textSetting = action.payload
        },
        updateWordMode(state) {
            state.gameMode.wordMode.active = true;
            state.gameMode.timeMode = initialState.gameMode.timeMode;
            state.gameMode.zenMode = initialState.gameMode.zenMode
        },
        updateTimeMode(state) {
            state.gameMode.timeMode.active = true 
            state.gameMode.wordMode = initialState.gameMode.wordMode
            state.gameMode.zenMode = initialState.gameMode.zenMode
        },
        updateZenMode(state){
            state.gameMode.zenMode.active = true
            state.gameMode.timeMode = initialState.gameMode.timeMode;
            state.gameMode.wordMode = initialState.gameMode.wordMode
        },
        pauseGame(state){
            state.gameMode.timeMode.active = false;
            state.gameMode.zenMode.active = false;
            state.gameMode.wordMode.active = false;
        },
        updateWordModeSettings(state, action: PayloadAction<GameSettings>){
            state.gameMode.wordMode.settings = action.payload
        },
        updateTimeModeSettings(state, action: PayloadAction<GameSettings>){
            state.gameMode.timeMode.settings = action.payload
        },
        incrementWordCount(state){
            state.gameText.wordCount = state.gameText.wordCount + 1
        },
        decrementWordCount(state){
            state.gameText.wordCount = state.gameText.wordCount - 1
        },
        clearWords(state){
            state.gameText = initialState.gameText
        }
    },
    extraReducers: (builder) => {
        builder.addCase(gameText.fulfilled, (state, action: PayloadAction<GameText>) => {
            state.gameText = action.payload
        });
        builder.addCase(gameText.rejected, (state, action) => {
            console.error("Failed to fetch new text: ", action.payload)
        });
    }
})

export const {
    updateTextSetting,
    updateTimeMode,
    updateWordMode,
    updateZenMode,
    updateTimeModeSettings,
    updateWordModeSettings,
    decrementWordCount,
    incrementWordCount
} = configGameSlice.actions;

export default configGameSlice.reducer;
export const settingSelector = (state: RootState) => state.configGame;
