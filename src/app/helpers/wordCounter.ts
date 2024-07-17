export const getTotalWords = (str: string) => {
    const stringArr = str.trim().split(/\s+/);
    return stringArr.length;
}

export const removePunc = (text: string): string => {
    const specialChars = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;
    const hasCapitals = /[^A-Z]/;
    let finalParagraph: string = text
    if (specialChars.test(text)) {
        finalParagraph = finalParagraph.replace(specialChars, "");
    }
    if (hasCapitals.test(finalParagraph)) {
        finalParagraph = finalParagraph.toLowerCase();
    }
    return finalParagraph;
}

export const removeNumbers = (text: string): string => {
    return text.replace(/\d/g, '');
}

//Returns an array of portions of the words
export const wordSections = (paragraph: string, totalWords: number): string[][] => {
    let arrayOfWords = paragraph.split(" ");
    const segmentSize = Math.floor(totalWords / 8);
    let wordArraySections: string[][] = [];
    let extraWords: string[] = []
    if (totalWords % 8 !== 0) {
        const newArraySize = totalWords - (totalWords % 8);
        extraWords = arrayOfWords.slice(newArraySize);
        arrayOfWords = arrayOfWords.slice(0, newArraySize);
    }
    for (let i = 0; i < arrayOfWords.length; i += segmentSize) {
        const section = arrayOfWords.slice(i, i + segmentSize);
        wordArraySections.push(section);
    }
    if (extraWords.length > 0) {
        wordArraySections.push(extraWords)
    }
    return wordArraySections
}
