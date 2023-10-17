import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";
import LargeImage from "../LargeImage";
import LargeText from "../LargeText";
import QRCode from "react-qr-code";

type Props = {
  gameId: string;
  action: any;
  players: Player[];
  newPlayerLink: string;
};

export default function StartGame({
  gameId,
  action,
  players,
  newPlayerLink,
}: Props) {
  const [playerDisplays, setPlayerDisplays] = useState(
    new Array<JSX.Element>()
  );

  useEffect(() => {
    var updatedPlayers = players.map((player) => {
      return (
        <div key={player.connectionId} className="flex flex-col items-center">
          <LargeImage source={player.pictureURL} />
          {player.name}
        </div>
      );
    });
    setPlayerDisplays(updatedPlayers);
  }, [players]);

  return (
    <>
      {gameId != "-1" && (
        <div className="flex flex-row">
          <div className="flex flex-col items-center justify-center w-2/3 pb-36 bg-gradient-to-l from-cyan-200 to-blue-200 h-screen">
            <div className="my-10 mx-10">
              <LargeText text="Add player by using the QRCode" />
            </div>
              <QRCode
                size={300}
                value={newPlayerLink}
                viewBox={`0 0 300 300`}
              />
            <div className="mt-10">
              <Btn action={() => action()} text="Start Game" />
            </div>
            <div className="mt-10 text-cyan-800 text-lg underline">
              {newPlayerLink}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full pb-36 bg-gradient-to-r from-cyan-200 to-blue-200 h-screen">
            <div className="my-10 mx-10">
              <LargeText text="Players that have joined" />
            </div>
            <div className="">
              <div className="flex flex-wrap">{playerDisplays}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
