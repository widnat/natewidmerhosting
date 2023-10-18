import React from "react";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import OptionBtn from "./OptionBtn";
import LargeText from "../LargeText";

type Props = {
  submitGuess: any;
  options: Array<string>;
};

export default function PlayersSecondGuess({ submitGuess, options }: Props) {
  const [waiting, setWaiting] = useState(false);
  var count = 0;
  const optionDisplays = options.map((option: string) => {
    ++count;
    return (
      <div key={count} className="mb-2">
        <OptionBtn action={() => submit(option)} text={option} />
      </div>
    );
  });

  function submit(option: string) {
    setWaiting(true);
    var msg = "guess was: " + option;
    console.log(msg);
    submitGuess(option);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-l from-cyan-200 to-blue-200">
      {!waiting && (
        <div>
          <LargeText text="What option describes the Doodle the best?" />
          <label className="mt-5 block uppercase tracking-wide text-teal-700 text-xs font-bold mb-2"></label>
          {optionDisplays}
        </div>
      )}

      {waiting && <Spinner message="waiting for other players to finish..." />}
    </div>
  );
}
