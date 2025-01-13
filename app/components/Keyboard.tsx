import { Key } from "./Key";
import { CharStatus } from "../shared/types";
import { solution} from "../utilities/words";

interface KeyboardProps {
  onEnter: () => void;
  onDelete: () => void;
  onChar: (value: string) => void;
  guesses: Array<string>
}

export const Keyboard = ({onEnter, onDelete, onChar, guesses}: KeyboardProps) => {

  const getStatuses = (guesses: Array<string>) => {
    const charObj: { [key: string]: CharStatus } = {};
    guesses.forEach((word) => {
      word.split("").forEach((letter, i) => {
        if (!solution.includes(letter)) {
          // make status absent
          return (charObj[letter] = "absent");
        }

        if (letter === solution[i]) {
          //make status correct
          return (charObj[letter] = "correct");
        }

        if (charObj[letter] !== "correct") {
          //make status present
          return (charObj[letter] = "present");
        }
      });
    });

    return charObj;
  }

  const charStatuses = getStatuses(guesses);

 
  const handleClick = (event: any) => {
      if (event.target.innerText === "Enter") {
        return onEnter();
      }
      if (event.target.innerText === "Delete") {
        return onDelete();
      }
      return onChar(event.target.innerText);
  }

  return (
     <div onClick={handleClick}>
      <div className="flex justify-center mb-1">
        <Key value="Q" status={charStatuses["Q"]} />
        <Key value="W" status={charStatuses["W"]} />
        <Key value="E" status={charStatuses["E"]} />
        <Key value="R" status={charStatuses["R"]} />
        <Key value="T" status={charStatuses["T"]} />
        <Key value="Y" status={charStatuses["Y"]} />
        <Key value="U" status={charStatuses["U"]} />
        <Key value="I" status={charStatuses["I"]} />
        <Key value="O" status={charStatuses["O"]} />
        <Key value="P" status={charStatuses["P"]} />
      </div>
      <div className="flex justify-center mb-1">
        <Key value="A" status={charStatuses["A"]} />
        <Key value="S" status={charStatuses["S"]} />
        <Key value="D" status={charStatuses["D"]} />
        <Key value="F" status={charStatuses["F"]} />
        <Key value="G" status={charStatuses["G"]} />
        <Key value="H" status={charStatuses["H"]} />
        <Key value="J" status={charStatuses[""]} />
        <Key value="K" status={charStatuses["K"]} />
        <Key value="L" status={charStatuses["L"]} />
      </div> 
      <div className="flex justify-center">
        <Key value="Enter"></Key>
        <Key value="Z" status={charStatuses["Z"]}/>
        <Key value="X" status={charStatuses["X"]}/>
        <Key value="C" status={charStatuses["C"]} />
        <Key value="V" status={charStatuses["V"]}/>
        <Key value="B" status={charStatuses["B"]}/>
        <Key value="N" status={charStatuses["N"]}/>
        <Key value="M" status={charStatuses["M"]}/>
        <Key value="Delete"></Key>
      </div>
    </div>

  )

}