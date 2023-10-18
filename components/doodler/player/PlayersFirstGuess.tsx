import React from "react";
import { useState } from "react";
import Btn from "@/components/doodler/Btn";
import Spinner from "@/components/Spinner";
import BasicInput from "../BasicInput";

type Props = {
  submitGuess: any;
};

export default function PlayersFirstGuess({ submitGuess }: Props) {
  const [guess, setGuess] = useState("");
  const [waiting, setWaiting] = useState(false);

  function submit() {
    setWaiting(true);
    submitGuess(guess);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-l from-cyan-200 to-blue-200">
      {!waiting && (
        <div>
          <BasicInput updateInput={setGuess} text="What is this doodle?" />
          <div className="flex self-stretch justify-center">
            <Btn action={() => submit()} text="Submit Guess" />
          </div>
        </div>
      )}

      {waiting && <Spinner message="waiting for other players to finish..." />}
    </div>
  );
}
