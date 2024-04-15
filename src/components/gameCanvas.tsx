import { CharArrayContext, SelectedArrayContext } from "../pages/Game";
import { useContext, useEffect } from "react";

const GameCanvas: React.FC = () => {
  // context
  const { charArray, setCharArray } = useContext(CharArrayContext) || {
    charArray: [],
    setCharArray: () => {},
  };
  const { selectedArray, setSelectedArray } = useContext(
    SelectedArrayContext,
  ) || { selectedArray: [], setSelectedArray: () => {} };

  const wordButtonList = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    selectedArray.forEach((charIndex) => {
      elements.push(
        <button
          key={charIndex}
          className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-500 bg-white "
          onClick={() => removeChar(charIndex)}
        >
          {charArray[charIndex]}
        </button>,
      );
    });
    return elements;
  };

  const removeChar = (charIndex: number) => {
    let temp = [...selectedArray];
    const index = temp.indexOf(charIndex);
    temp.splice(index, 1);
    setSelectedArray(temp);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {wordButtonList()}
    </div>
  );
};

export default GameCanvas;
