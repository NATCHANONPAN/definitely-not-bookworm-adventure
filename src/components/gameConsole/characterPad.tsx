import { useContext, useEffect } from "react";
import { CharArrayContext, SelectedArrayContext } from "../../pages/Game";

const CharacterPad: React.FC = () => {
  // context
  const { charArray, setCharArray } = useContext(CharArrayContext) || {
    charArray: [],
    setCharArray: () => {},
  };
  const { selectedArray, setSelectedArray } = useContext(
    SelectedArrayContext,
  ) || { selectedArray: [], setSelectedArray: () => {} };

  const initBlock = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    for (let i = 0; i < 25; i++) {
      elements.push(
        <button
          key={i}
          className=" flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-500 bg-white disabled:bg-gray-600"
          onClick={() => {
            selectChar(i);
          }}
          disabled={selectedArray.includes(i)}
        >
          {charArray[i]}
        </button>,
      );
    }
    return elements;
  };

  const selectChar = (index: number) => {
    let temp = [...selectedArray];
    temp.push(index);
    setSelectedArray(temp);
  };

  return (
    <div className="flex h-80 w-80 flex-row flex-wrap rounded-xl bg-black">
      {initBlock()}
    </div>
  );
};

export default CharacterPad;
