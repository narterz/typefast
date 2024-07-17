"use client"

import { BsKeyboardFill } from 'react-icons/bs';
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { RiTwitterXLine } from 'react-icons/ri';
import { updateTextSetting, settingSelector, updateZenMode, updateTimeMode, updateWordMode, updateTimeModeSettings, updateWordModeSettings } from '../lib/reducers/configGameSlice';
import { CiTimer } from 'react-icons/ci';
import { TbLetterW } from 'react-icons/tb';
import { BsYinYang, BsHash } from 'react-icons/bs';
import { FiAtSign } from 'react-icons/fi';
import { FaInfinity } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../lib/reducers/hooks';
import { useEffect, useState } from 'react';
import { GameModes, GameSettings } from '../types';

const timerModeValues = [
    { difficulty: "short", duration: 30 },
    { difficulty: "normal", duration: 60 },
    { difficulty: "long", duration: 120 }
]

const wordModeValues = [
    { difficulty: "short", duration: 25 },
    { difficulty: "normal", duration: 50 },
    { difficulty: "long", duration: 100 },
]

export default function Nav() {
    const { timeMode, wordMode, zenMode } = useAppSelector(settingSelector).gameMode;
    const [gameModeValues, setGameModeValues] = useState(timerModeValues);
    const [currentDuration, setCurrentDuration] = useState(timeMode.settings.duration)

    const dispatch = useAppDispatch();
    const { punctuation, numbers } = useAppSelector(settingSelector).textSetting;

    const handleTextSettings = (setting: string) => {
        if (setting === "punc") {
            dispatch(updateTextSetting({
                punctuation: !punctuation,
                numbers: numbers
            }))
        } else {
            dispatch(updateTextSetting({
                punctuation: punctuation,
                numbers: !numbers
            }))
        }
    }

    const handleGameMode = (mode: string) => {
        if (mode === "Timer") {
            dispatch(updateTimeMode());
            setGameModeValues(timerModeValues)
        } else if (mode === "Words") {
            dispatch(updateWordMode())
            setGameModeValues(wordModeValues)
        } else {
            dispatch(updateZenMode())
        }
    }

    const handleGameSettings = (difficulty: GameSettings['difficulty'], duration: GameSettings['duration']) => {
        if (wordMode.active) {
            dispatch(updateWordModeSettings({
                difficulty: difficulty,
                duration: duration
            }))
        } else {
            dispatch(updateWordModeSettings({
                difficulty: difficulty,
                duration: duration
            }))
        }
    }

    const gameSettings = [
        {
            name: "Punctuation",
            value: punctuation,
            onClick: () => handleTextSettings("punc"),
            icon: <FiAtSign size={20} />,
        },
        {
            name: "Numbers",
            value: numbers,
            onClick: () => handleTextSettings("num"),
            icon: <BsHash size={20} />,
        }
    ];

    const gameModes = [
        { name: "Timer", icon: <CiTimer size={20} />, active: timeMode.active },
        { name: "Words", icon: <TbLetterW size={20} />, active: wordMode.active },
        { name: "Zen", icon: <BsYinYang size={20} />, active: zenMode.active }
    ];

    useEffect(() => {
        dispatch(updateTimeMode());
        setGameModeValues(timerModeValues)
    },[]);

    useEffect(() => {
        if(wordMode.active){
            setCurrentDuration(wordMode.settings.duration)
        } else {
            setCurrentDuration(timeMode.settings.duration)
        }

    },[handleGameMode])

    return (
        <>
            <nav className='flex flex-row items-center w-screen h-[10vh] justify-evenly bg-secondary'>
                <div className='flex flex-row items-center w-1/4 h-1/2 justify-evenly'>
                    <BsKeyboardFill size={60} className="text-textColor" />
                    <h2>TypeFast</h2>
                </div>
                <div className='flex flex-row items-center w-1/3 h-1/2 justify-evenly'>
                    <AiFillFacebook className="nav-logo" size={30} />
                    <AiOutlineInstagram className="nav-logo" size={30} />
                    <RiTwitterXLine className="nav-logo" size={30} />
                </div>
            </nav>
            <div className='h-[8vh] w-1/2 flex flex-row items-center border-transparent rounded-xl border border-red-500'>
                <div className="w-1/4 h-full border-e border-[#aaa] flex flex-row justify-evenly items-center">
                    {gameSettings.map((mode) => {
                        return (
                            <div
                                className='flex flex-row items-center menu-hover h-1/2 justify-evenly'
                                key={mode.name}
                                style={{ color: mode.value ? "#6B4E86" : "#A9A9A9" }}
                                onClick={mode.onClick}
                            >
                                {mode.icon}
                                <p>{mode.name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="w-2/4 h-full border-e border-[#aaa] flex flex-row justify-evenly items-center">
                    {gameModes.map((type) => {
                        return (
                            <div
                                className="flex flex-row w-1/4 menu-hover h-1/2 justify-evenly"
                                key={type.name}
                                style={{ color: type.active ? "#6B4E86" : "#A9A9A9" }}
                                onClick={() => handleGameMode(type.name)}
                            >
                                {type.icon}
                                <p className='menu-hover' style={{ color: type.active ? "#6B4E86" : "#A9A9A9" }}>{type.name}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row items-center w-1/4 h-full justify-evenly">
                    {zenMode.active
                        ? <FaInfinity size={20} className="bg-textColor" />
                        : gameModeValues.map((val) => {
                            return (
                                <p
                                    className='menu-hover'
                                    onClick={() => handleGameSettings(val.difficulty, val.duration)}
                                    style={{ color: val.duration === currentDuration ? "#6B4E86" : "#A9A9A9" }}
                                    key={val.difficulty}
                                >
                                    {val.duration}
                                </p>
                            )
                        })

                    }
                </div>
            </div>
        </>
    )
}