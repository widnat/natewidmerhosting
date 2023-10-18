import { Player } from "../../../types/doodler";
import { useEffect, useState } from "react";
import SmallImage from "../SmallImage";
import LargeText from "../LargeText";

type Props = {
  action: any;
  players: Player[];
};

export default function CreateAssignmentDoodles({ action, players }: Props) {
  const [playerDisplays, setPlayerDisplays] = useState(
    new Array<JSX.Element>()
  );
  const [message, setMessage] = useState(
    "It's time to draw something AWESOME!"
  );

  useEffect(() => {
    var readyToContinue = true;
    var updatedPlayers = players.map((player) => {
      if (!player.assignment?.drawingURL) readyToContinue = false;

      return (
        <div key={player.connectionId}>
          {player.assignment?.drawingURL && (
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
    if (readyToContinue) {
      setMessage("All finished!");
      setTimeout(function () {
        setMessage("Lets play!");
      }, 4000);
      setTimeout(function () {
        action();
      }, 4000);
    }
  }, [players]);

  return (
	<div className="flex flex-col items-center justify-center w-full pb-36 bg-gradient-to-r from-cyan-200 to-blue-200 h-screen">
	  <div className="my-10 mx-10">
		<LargeText text={message} />
	  </div>
	  <div className="flex flex-wrap">{playerDisplays}</div>
	</div>
  );
}
