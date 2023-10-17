import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";

type Props = {
  players: Player[];
  message: string;
  playerAssignmentIndex: number;
};

export default function Results({
  players,
  message,
  playerAssignmentIndex,
}: Props) {
  const playerDisplays = players.map((player) => {
    return (
      <div key={player.connectionId} className="flex-row m-3">
        <div className="flex self-stretch justify-center">
          <img
            className="border-2 rounded-md border-teal-500"
            key={player.name}
            src={player.pictureURL}
            width={window.innerWidth * 0.02}
            height={window.innerWidth * 0.02}
          />
        </div>
        <div className="flex mt-3 self-stretch justify-center text-lg text-black font-bold break-normal">
          {player.name}
          {"s guess: "}
          {player.firstGuess}
        </div>
      </div>
    );
  });

  return (
    <div className="flex-row self-stretch w-screen justify-center">
      <div className="flex mt-3 self-stretch justify-center text-2xl text-black uppercase font-extrabold">
        {players[playerAssignmentIndex].name}
        <div className="ml-3 text-lg lowercase font-bold">
          {"drew this AWESOME doodle!!!"}
        </div>
      </div>
      <div className="flex mt-3 self-stretch justify-center text-2xl text-black uppercase font-extrabold">
        <div className="text-lg lowercase font-bold">
          "The correct answer was: "
        </div>
        {players[playerAssignmentIndex].assignment.assignment}
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
      <div className="flex self-stretch justify-center text-4xl font-bold pt-16">
        {message}
      </div>
      <div className="flex-col self-stretch justify-center  space-y-3">
        <div className="flex self-stretch justify-center max-w-7xl">
          <div
            key={players[playerAssignmentIndex].connectionId}
            className="flex-row m-3"
          >
            <div className="flex self-stretch justify-center">
              <img
                className="border-2 rounded-md border-teal-500"
                key={players[playerAssignmentIndex].name}
                src={players[playerAssignmentIndex].pictureURL}
                width={window.innerWidth * 0.02}
                height={window.innerWidth * 0.02}
              />
            </div>
            <div className="flex mt-3 self-stretch justify-center text-lg text-black font-bold break-normal">
              {`Answered by ${players[playerAssignmentIndex].name}: ${players[playerAssignmentIndex].firstGuess}`}
            </div>
          </div>
          <div className="flex flex-wrap">{playerDisplays}</div>
        </div>
      </div>
    </div>
  );
}
