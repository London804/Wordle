"use client";

import { useEffect, useState } from "react";
import { Grid } from "./components/Grid";
import { isWinningWord, solution} from "./utilities/words";
import { Keyboard } from "./components/Keyboard";
import { WORDS } from "./constants/wordlist";

export default function Home() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [checkSolution, setCheckSolution] = useState('')
  const [isWordInList, setIsWordInList] = useState(true);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    setCheckSolution(solution)
    const winningWord = isWinningWord(currentGuess);
    if (winningWord) {
      setIsGameWon(true)
    }


    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        setIsGameLost(true);
      }
    }

    if (!WORDS.includes(currentGuess.toLowerCase())) {
       setIsWordInList(false)
      setTimeout(() => {
        setIsWordInList(true)
      }, 2000);
      setGuesses(prevGuess => prevGuess.slice(0, -1))

    }
  }

  const newGame = () => {
    setIsGameLost(false);
    setGuesses([])
    setCurrentGuess('')
  }

  useEffect(() => {
    console.log("guesses", guesses)
  },[guesses])
  

  return (
    <div>
      <main className="min-h-screen flex justify-center p-8">
        <div className="">
          <div className="h-16 text-center">
            {
              isGameWon &&
                <>
                  <h1 className="text-2xl">Winner!</h1>
                  <p>Come back tomorrow for a new word.</p>
                </>
            }

            {
              isGameLost &&
                <>
                  <h1 className="text-xl">You ran out of guesses. Try again?</h1>
                  <button onClick={newGame}>New game</button>
                </>
            }

            {
              !isWordInList &&
                <>
                  <h1 className="text-xl">Word not in list</h1>
                </>
              }
          </div>
          <div className="flex justify-center">
            <Grid currentGuess={currentGuess} guesses={guesses} solution={checkSolution} />
          </div>
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              guesses={guesses}
            />
        </div>


       
      </main>
    </div>
  );
}
