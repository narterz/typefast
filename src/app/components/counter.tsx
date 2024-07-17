import { statSelector, getGameResults, clearGameResults, toggleStartGame, setGameDuration, incrementTime, incrementWordsCompleted, decrementTime, decrementWordsCompleted } from "../lib/reducers/gameStatsSlice";
import { useAppDispatch, useAppSelector } from '../lib/reducers/hooks';
import { settingSelector, } from "../lib/reducers/configGameSlice";
import { useEffect, useState } from "react";


export default function Counter() {
    const dispatch = useAppDispatch();
    const { wordCount, words } = useAppSelector(settingSelector).gameText;
    const { gameDuration, wordsCompleted } = useAppSelector(statSelector).endGameStats
    const gameActive = useAppSelector(statSelector).gameActive
    const { timeMode } = useAppSelector(settingSelector).gameMode;

    const handleTimer = () => {
        const timer = setTimeout(() => {
            dispatch(decrementTime())
        }, 1000);
        if(gameDuration === 0){
            toggleStartGame(false)
            return () => clearTimeout(timer)
        }
    };

    const handleIncrementTime = () => {
        if(!gameActive) {
            return () => clearTimeout(timer)
        }
        const timer = setTimeout(() => {
            dispatch(incrementTime());
        }, 1000)
    }

    //A word is completed when space bar is pressed and the previous index is ""
    const incrementWordCount = () => {
        
    }

    //When backspace is pressed and the current index
    const decrementWordCount = () => {

    }

    //Start game config duration
    useEffect(() => {
        if(gameActive){
            if(timeMode.active){
                dispatch(setGameDuration(timeMode.settings.duration))
            } else {
                dispatch(setGameDuration(0))
            }
        }
    },[gameActive]);

    //Timer config
    useEffect(() => {
        if(gameActive){
            if(timeMode.active){
                handleTimer()
            } else {
                handleIncrementTime()
            }
        }

    },[gameActive, gameDuration]);

    return (
        <div className="flex flex-row items-center w-full h-full text-center border border-red-500 justify-evenly">
            <h3>{gameDuration}</h3>
            <h3>{wordsCompleted}</h3>
        </div>
    )
}