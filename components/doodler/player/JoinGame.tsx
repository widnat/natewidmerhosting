import { useState } from "react";
import DrawingArea from "@/components/doodler/DrawingArea";
import Spinner from "@/components/Spinner";
import BasicInput from "@/components/doodler/BasicInput";

type Props = {
  action: any;
};

export default function JoinGame({ action }: Props) {
  const [playerName, setPlayerName] = useState("");
  const [waiting, setWaiting] = useState(false);

  function doneDrawing(doodleURL: string) {
    if (playerName) {
      setWaiting(true);
      action(playerName, doodleURL);
    } else alert("Please enter a name");
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center  bg-gradient-to-l from-cyan-200 to-blue-200">
        {!waiting && (
          <div className="pt-10">
            <BasicInput updateInput={setPlayerName} text="Enter your name" />
            <DrawingArea action={doneDrawing} actionText="Join Game" />
          </div>
        )}
        {waiting && <Spinner message="waiting for other players to begin..." />}
      </div>
    </>
  );
}
