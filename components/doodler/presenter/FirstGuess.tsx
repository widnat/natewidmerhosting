import { Player } from "../../../types/doodler";
import { useEffect, useState } from "react";
import LargeImage from "../LargeImage";
import LargeText from "../LargeText";
import SmallImage from "../SmallImage";

type Props = {
  action: any;
  playerAssignmentIndex: number;
  players: Player[];
};

export default function FirstGuess({
  action,
  players,
  playerAssignmentIndex,
}: Props) {
  const [playerDisplays, setPlayerDisplays] = useState(
    new Array<JSX.Element>()
  );
  const [message, setMessage] = useState("Make your best guess!");

  useEffect(() => {
    var numFinishedPlayers = 0;
    var updatedPlayers = players.map((player) => {
      if (player.firstGuess) ++numFinishedPlayers;

      return (
        <div key={player.connectionId}>
          {player.firstGuess && (
            <div
              key={player.connectionId}
              className="flex flex-col items-center"
            >
              <SmallImage source={player.pictureURL} />
              {player.name} Finished!
            </div>
          )}
        </div>
      );
    });

    setPlayerDisplays(updatedPlayers);
    if (numFinishedPlayers + 1 === players.length) {
      console.log("first guess finished");
      setMessage("All finished!");
      setTimeout(function () {
        setMessage("On to the next guess!");
      }, 4000);
      setTimeout(function () {
        action();
      }, 4000);
    }
  }, [players]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center w-2/3 pb-36 bg-gradient-to-l from-cyan-200 to-blue-200 h-screen">
        <div className="my-10 mx-10">
          <LargeText text={message} />
        </div>
        <LargeImage
          source={players[playerAssignmentIndex].assignment.drawingURL}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-36 bg-gradient-to-r from-cyan-200 to-blue-200 h-screen">
        <div className="my-10 mx-10">
          <LargeText text="Players finished with first guess" />
        </div>
        <div className="flex flex-wrap">{playerDisplays}</div>
      </div>
    </div>
  );
}
