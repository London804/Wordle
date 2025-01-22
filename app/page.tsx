"use client";

import { useState } from "react";
import { Grid } from "./components/Grid";
import { isWinningWord, solution} from "./utilities/words";
import { Keyboard } from "./components/Keyboard";
import { WORDS } from "./constants/wordlist";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "postcss";


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
  

  return (
    <div>
      <main className="flex flex-col justify-center p-8">
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
        <div className="flex justify-center mt-16">
          <div className="absolute">
           <Dialog>
            <DialogTrigger asChild>
              <Button>How to play</Button>
            </DialogTrigger>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-out" />
            <DialogContent className="sm:max-w-md fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
              <DialogHeader className="text-left mt-4">
                <DialogTitle className="font-bold text-xl">How To Play</DialogTitle>
                <DialogDescription className="">
                  <h3 className="font-bold">Guess the Wordle in 6 tries.</h3>

                  <ul className="mt-4">
                    <li className="list-disc ml-4">Each guess must be a valid 5-letter word.</li>
                    <li className="list-disc ml-4">The color of the tiles will change to show how close your guess was to the word.</li>
                  </ul>

                  <div className="mt-4">
                    <p className="font-bold">Examples</p>

                    <div className="flex">
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5 bg-lime-600 text-white">W</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">O</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">R</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">D</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">Y</span>
                    </div>
                    <p><span className="font-bold">W</span> is in the word and in the correct spot.</p>

                    <div className="flex mt-4">
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5 ">L</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5 bg-yellow-500 text-white">I</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">G</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">H</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">T</span>
                    </div>
                    <p><span className="font-bold">I</span> is in the word but in the wrong spot.</p>

                    <div className="flex mt-4">
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5 ">R</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">O</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">G</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5 bg-slate-400 text-white">U</span>
                      <span className="w-7 text-center text-xl font-bold mr-2 border border-black p-0.5">E</span>
                    </div>
                    <p><span className="font-bold">U</span> is not in the word in any spot.</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>

        </div>
      </main>
      
    </div>
  );
}
