import { statusClasses } from "../shared/types";

interface Grid {
  currentGuess: string;
  guesses: Array<string>;
  solution: string;
}

export const Grid = ({ currentGuess, guesses, solution }: Grid) => {
  const rows = 6;
  const emptyRows = guesses.length < rows
    ? Array.from(Array(rows - guesses.length - 1))
    : [];

  return (
    <div className="grid gap-2 mb-8">
      {guesses.map((guess, i) => (
        <Row key={i} word={guess} solution={solution} />
      ))}

      {guesses.length < 6 &&
        <Row word={currentGuess} />
      }

      {emptyRows.map((_, i) => (
        <Row key={`empty-${i}`} word="" />
      ))}
    </div>
  );
};

interface Row {
  word: string;
  solution?: string;
}

const Row = ({ word, solution }: Row) => {
  const cols = 5;
  const letters = word.split("");
  const emptyCells = Array.from(Array(cols - letters.length));

   // Calculate the status of each letter
  const statuses = Array.from({ length: cols }, (_, i) => {

    if (!letters[i]) return null; // If no letter, return no status

    if (solution ) {

      if (solution[i] === letters[i]) return "correct"; // Correct position
      if (solution.includes(letters[i])) return "present"; // Letter is in solution
    }
    return "absent"; // Letter is not in solution
  });

  return (
    <div className="flex">
      {letters.map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i] || null} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={`empty-${i}`} value="" />
      ))}
    </div>
  );
};

interface Cell {
  value: string;
  status?: "correct" | "present" | "absent" | null; // Status of the cell
}

const Cell = ({ value, status }: Cell) => {

  const statusClass = statusClasses[status || "default"];
  
  return (
    <div className={`${statusClass} w-14 h-14 mx-0.5 border border-gray-400 flex items-center justify-center`}>
      {value}
    </div>
  );
};
