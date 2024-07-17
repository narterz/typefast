//Game config state
export interface TextSetting {
    punctuation: boolean;
    numbers: boolean;
}

export interface GameModes {
    wordMode: {
        active: boolean;
        settings: GameSettings
    },
    timeMode: {
        active: boolean;
        settings: GameSettings
    },
    zenMode: {
        active: boolean;
    }
}

export interface GameSettings {
    difficulty: string,
    duration: number
}

export interface GameText {
    words: string;
    wordCount: number;
}

//Game stats state
export interface UserStats {
    activeGameStats: ActiveGameStats;
    endGameStats: EndGameStats;
    bestStats: BestStats;
    gameActive: boolean;
}

export interface ActiveGameStats {
    currentSentence: number;
    highlightedWords: string[][];
    typedWords:string[];
}

export interface EndGameStats {
    gameDuration: number;
    wordsPerMin: number;
    wordsCompleted: number;
    grade: string;
}

export interface BestStats {
    bestDuration?: number;
    bestWordsPerMin?: number;
    bestGrade: string
}




