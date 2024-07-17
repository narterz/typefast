"use client";

import { useAppDispatch, useAppSelector } from '../lib/reducers/hooks';
import { statSelector, toggleStartGame, endGame, clearGameResults, setHighlightedWords } from '../lib/reducers/gameStatsSlice';
import { gameText, settingSelector } from '../lib/reducers/configGameSlice';
import { FaPause, FaPlay } from "react-icons/fa";
import { VscDebugRestart } from 'react-icons/vsc';
import { IoAddSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { wordSections } from '../helpers/wordCounter';
import { useEffect } from 'react';

export default function MenuBtns() {
    const dispatch = useAppDispatch();
    const gameActive = useAppSelector(statSelector).gameActive;
    const { words, wordCount } = useAppSelector(settingSelector).gameText;
    const { wordMode } = useAppSelector(settingSelector).gameMode;

    const getInitalStates = (difficulty: string) => {
        let duration: number
        switch (difficulty) {
            case "short":
                duration = wordMode.active ? 25 : 30;
                break;
            case "normal":
                duration = wordMode.active ? 50 : 60;
                break;
            case "long":
                duration = wordMode.active ? 100 : 120;
                break;
            default:
                duration = wordMode.active ? 50 : 60;
        }
        return { difficulty: difficulty, duration: duration }
    }

    const handleMenuKeys = (e: KeyboardEvent) => {
        switch (e.key) {
            case ' ':
                handleStartGame();
                break;
            case 'esp':
                handleEndGame();
                break;
            case 'alt':
                handleRestartGame();
                break;
            case 'ctrl':
                handleNewText();
                break;
            case 'tab':
                handlePauseGame();
                break;
            default:
                break
        }
    }

    const handleNewText = () => {
        const wordAndZenText = Math.round(50 / 4);
        if (wordMode.active) {
            const duration = getInitalStates(wordMode.settings.difficulty).duration;
            dispatch(gameText(Math.round(duration / 4)))
        } else {
            dispatch(gameText(wordAndZenText));
        }
    }

    const handleStartGame = () => {
        if (!words) {
            handleNewText();
        }
        dispatch(toggleStartGame(true));
        setHighlightedWords(wordSections(words, wordCount));
    }

    const handleRestartGame = () => {
        dispatch(toggleStartGame(false));
        dispatch(clearGameResults());
    }

    const handleEndGame = () => {
        dispatch(endGame());
    }

    const handlePauseGame = () => {
        dispatch(toggleStartGame(false));
    }

    const activeGameButtons = [
        {
            name: "Restart (alt)",
            icon: <VscDebugRestart size={30} onClick={handleRestartGame} className="menu-hover text-textColor" />
        },
        {
            name: gameActive ? "Pause (tab)" : "Resume (space)",
            icon: gameActive
                ? <FaPause size={30} onClick={handlePauseGame} className='menu-hover' />
                : <FaPlay size={30} onClick={handleStartGame} className='menu-hover' />
        },
        {
            name: "End (esp)",
            icon: <FaXmark size={30} onClick={handleEndGame} className='menu-hover' />
        },
    ]

    const nonActiveGameButtons = [
        {
            name: "Play (space)",
            icon: <FaPlay size={30} onClick={handleStartGame} className='menu-hover' />
        },
        {
            name: "New text",
            icon: <IoAddSharp size={30} onClick={handleNewText} className='menu-hover' />
        }
    ]

    useEffect(() => {
        window.addEventListener('keydown', handleMenuKeys);

        return () => {
            window.removeEventListener('keydown', handleMenuKeys)
        }
    });

    return (
        <>
            {gameActive
                ? <div className='game-menu-buttons'>
                    {activeGameButtons.map((btn, i) => {
                        return (
                            <div className='flex items-center justify-center w-1/3 h-full text-center' key={`btn${i}`}>
                                {btn.icon}
                                <p>{btn.name}</p>
                            </div>
                        )
                    })}
                </div>
                : <div className='game-menu-buttons'>
                    {nonActiveGameButtons.map((btn, i) => {
                        return (
                            <div className='flex items-center justify-center w-1/3 h-full text-center' key={`btn${i}`}>
                                {btn.icon}
                                <p>{btn.name}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}