import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";
import SmallImage from "../SmallImage";

type Props = {
  action: any;
  players: Player[];
  message: string;
  playerAssignmentIndex: number;
};

export default function Results({
  action,
  players,
  message,
  playerAssignmentIndex,
}: Props) {
  const playerDisplays = players.map((player) => {
    return (
      <div key={player.connectionId} className="flex-row m-3">
        <SmallImage source={player.pictureURL} />
        <div className="flex mt-3 self-stretch justify-center text-lg text-black font-bold break-normal">
          {`${player.name}s guess: ${player.firstGuess}`}
        </div>
      </div>
    );
  });

  return (
    <div className="flex-col self-stretch w-screen justify-center">
      <div>
        <div className="flex mt-3 self-stretch justify-center text-2xl text-black uppercase font-extrabold">
          {players[playerAssignmentIndex].name}
          <div className="ml-3 text-lg lowercase font-bold">
            {"drew this AWESOME doodle!!!"}
          </div>
        </div>
        <div className="flex self-stretch justify-center">
          <img
            className="border-2 rounded-md border-teal-500"
            key={players[playerAssignmentIndex].name}
            src={players[playerAssignmentIndex].pictureURL}
            width={window.innerWidth * 0.25}
            height={window.innerWidth * 0.25}
          />
        </div>
      </div>

      <div className="flex-row self-stretch justify-center  space-y-3">
        <div className="flex self-stretch justify-center text-4xl font-bold pt-16">
          {message}
        </div>
        <div className="flex self-stretch justify-center max-w-7xl">
          <div className="flex self-stretch justify-center">
            <img
              className="border-2 rounded-md border-teal-500"
              key={players[playerAssignmentIndex].name}
              src={players[playerAssignmentIndex].pictureURL}
              width={window.innerWidth * 0.05}
              height={window.innerWidth * 0.05}
            />
          </div>
          <div className="flex mt-3 self-stretch justify-center text-lg text-black font-bold break-normal">
            {`Answered by ${players[playerAssignmentIndex].name}: ${players[playerAssignmentIndex].firstGuess}`}
          </div>
        </div>
        <div className="flex flex-wrap">{playerDisplays}</div>
      </div>
    </div>
  );
}
