"use client";

import Nav from "../components/nav";
import Counter from "../components/counter";
import MenuBtns from "../components/menuBtns";
import { useAppDispatch, useAppSelector } from '../lib/reducers/hooks';
import { endGame, statSelector } from "../lib/reducers/gameStatsSlice";
import { useEffect } from 'react';
import { settingSelector, updateWordMode} from "../lib/reducers/configGameSlice";
import Highlighter from "react-highlight-words";

/*
TODO:
    - Dynamically change fonts of based on words quantity
    - Increase size of word div
    - lower max words to 100
    - Configure word Array ✅
    - Add currentSentence, highLightedWords, typedWords to redux store✅
    - Move word counting and time counting methods to counter component
    - Turn buttons to react icons✅
    - Implement pause game✅
*/

export default function Game() {
    const dispatch = useAppDispatch();
    const { words, wordCount } = useAppSelector(settingSelector).gameText;
    const { timeMode, wordMode } = useAppSelector(settingSelector).gameMode;
    const { gameDuration, wordsCompleted } = useAppSelector(statSelector).endGameStats;
    const { highlightedWords, currentSentence } = useAppSelector(statSelector).activeGameStats

    useEffect(() => {
        dispatch(updateWordMode());
    }, [])

    useEffect(() => {
        if (wordMode.active) {
            if (wordCount === wordsCompleted) {
                dispatch(endGame())
            }
        }
        if (timeMode.active) {
            if (gameDuration === 0) {
                dispatch(endGame());
            }
        }
    }, [wordCount]);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-main">
            <header>
                <Nav />
            </header>
            <main className="flex flex-col w-1/2 items-center h-[80vh] border justify-evenly">
                <div className="flex items-center w-full text-justify border text-md h-3/5">
                    <Highlighter
                        highlightClassName="highlighted-text"
                        searchWords={highlightedWords[currentSentence]}
                        caseSensitive={true}
                        textToHighlight={words}
                    />
                </div>
                <div className="flex items-center justify-center w-1/2 h-1/5">
                    <Counter />
                </div>
                <div className="flex items-center justify-center w-full border border-red-500 h-1/5">
                    <MenuBtns/>
                </div>
            </main>
        </div>
    )
}