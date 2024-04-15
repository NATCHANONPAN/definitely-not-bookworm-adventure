import { useState, createContext, useEffect } from "react";
import GameCanvas from "../components/gameCanvas";
import GameControl from "../components/gameControl";

interface CharArrayContextType {
  charArray: string[];
  setCharArray: React.Dispatch<
    React.SetStateAction<CharArrayContextType["charArray"]>
  >;
}

interface SelectedArrayContextType {
  selectedArray: number[];
  setSelectedArray: React.Dispatch<
    React.SetStateAction<SelectedArrayContextType["selectedArray"]>
  >;
}

interface CurrentWordContextType {
  currentWord: string;
  setCurrentWord: React.Dispatch<
    React.SetStateAction<CurrentWordContextType["currentWord"]>
  >;
}

// Context is like a global var in scope where you declare
export const CharArrayContext = createContext<CharArrayContextType | null>(
  null,
);
export const SelectedArrayContext =
  createContext<SelectedArrayContextType | null>(null);

export const CurrentWordContext = createContext<CurrentWordContextType | null>(
  null,
);

export const getRandomLetter = () => {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const typeProb = Math.random();
  console.log("type prob" + typeProb);
  if (typeProb < 0.25) {
    alphabet = "AEIOU";
  } else if (0.25 < typeProb && typeProb < 0.9) {
    alphabet = "BCDFGHKLMNPRST";
  } else {
    alphabet = "JQVWXYZ";
  }
  const temp = Math.random();
  console.log("temp" + temp);
  const randomIndex = Math.floor(temp * alphabet.length);
  console.log(randomIndex);
  return alphabet[randomIndex];
};
export default function GamePage() {
  // state
  // change curr word of game to list of
  // 1. character in that pad len 25
  // 2. isAlreadySelect contain true false len 25
  // 3. TODO -> superpower, disabled len 25

  const [charArray, setCharArray] = useState<CharArrayContextType["charArray"]>(
    [],
  );
  const [selectedArray, setSelectedArray] = useState<
    SelectedArrayContextType["selectedArray"]
  >([]);

  const [currentWord, setCurrentWord] =
    useState<CurrentWordContextType["currentWord"]>("");

  // init char array and selected array when mounted
  useEffect(() => {
    const length = 16;
    const falseArray = new Array();
    setSelectedArray(falseArray);
    const randomLettersArray = Array.from({ length }, getRandomLetter);
    setCharArray(randomLettersArray);
  }, []);

  // calculate currentword
  useEffect(() => {
    let currWord = "";
    selectedArray.forEach((charIndex) => {
      currWord = currWord + charArray[charIndex];
    });
    setCurrentWord(currWord);
    console.log(currWord);
  }, [charArray, selectedArray]);
  return (
    // Provide State in Context Provider
    <CurrentWordContext.Provider value={{ currentWord, setCurrentWord }}>
      <CharArrayContext.Provider value={{ charArray, setCharArray }}>
        <SelectedArrayContext.Provider
          value={{ selectedArray, setSelectedArray }}
        >
          <div className="background">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <GameCanvas></GameCanvas>
              <GameControl></GameControl>
            </div>
          </div>
        </SelectedArrayContext.Provider>
      </CharArrayContext.Provider>
    </CurrentWordContext.Provider>
  );
}
