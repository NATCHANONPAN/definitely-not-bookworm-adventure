import CharacterPad from "./gameConsole/characterPad";
import {
  CharArrayContext,
  SelectedArrayContext,
  CurrentWordContext,
  getRandomLetter,
} from "../pages/Game";
import { useContext } from "react";

const GameControl: React.FC = () => {
  // context
  const { charArray, setCharArray } = useContext(CharArrayContext) || {
    charArray: [],
    setCharArray: () => {},
  };
  const { selectedArray, setSelectedArray } = useContext(
    SelectedArrayContext,
  ) || { selectedArray: [], setSelectedArray: () => {} };

  const { currentWord } = useContext(CurrentWordContext) || {
    currentWord: "",
  };

  const submitWord = () => {
    if (currentWord !== "") {
      const word = currentWord;
      // change char array
      const tempCharArray = [...charArray];
      tempCharArray.forEach((char, index) => {
        if (selectedArray.includes(index)) {
          tempCharArray[index] = getRandomLetter();
        }
      });
      setCharArray(tempCharArray);
      // reset select array to empty
      setSelectedArray([]);
      // submit word
      alert(word);
    } else {
      alert("no");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <CharacterPad />
      <button
        onClick={() => {
          submitWord();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default GameControl;
