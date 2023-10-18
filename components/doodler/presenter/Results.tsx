import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";
import SmallImage from "../SmallImage";
import LargeText from "../LargeText";
import LargeImage from "../LargeImage";
import MediumText from "../MediumText";
import VerySmallImage from "../VerySmallImage";

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
    if (player.connectionId == players[playerAssignmentIndex].connectionId) {
      return (
        <div key={player.connectionId} className="flex flex-row m-2">
          <VerySmallImage source={player.pictureURL} />
          <div className="flex flex-col">
            <MediumText text={`${player.name}s Score: ${player.score}`} />
            <MediumText text={`Correct Answer: ${player.assignment.assignment}`} />
          </div>
        </div>
      );
    }
    else {
      return (
        <div key={player.connectionId} className="flex flex-row m-2">
          <VerySmallImage source={player.pictureURL} />
          <div className="flex flex-col">
            <MediumText text={`${player.name}s Score: ${player.score}`} />
            <MediumText text={`Guess: ${player.firstGuess}`} />
          </div>
        </div>
      );
    }
  });

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center w-2/3 pb-36 bg-gradient-to-l from-cyan-200 to-blue-200 h-screen">
        <div className="my-10 mx-10">
          <LargeText
            text={`${players[playerAssignmentIndex].name} drew this AWESOME doodle!!!`}
          />
        </div>
        <LargeImage source={players[playerAssignmentIndex].pictureURL} />
        <div className="mt-10">
          <Btn action={() => action()} text="Continue" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-36 bg-gradient-to-r from-cyan-200 to-blue-200 h-screen">
        <div className="my-10 mx-10">
          <LargeText text={message} />
        </div>
        <div className="flex flex-col items-start self-stretch">{playerDisplays}</div>
      </div>
    </div>
  );
}
