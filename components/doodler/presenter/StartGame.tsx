import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";
import QRCode from "react-qr-code";

type Props = {
  gameIndex: number;
  action: any;
  players: Player[];
  newPlayerLink: string;
};

export default function StartGame({
  gameIndex,
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
        <div key={player.id} className="flex-col m-3">
          <div className="flex self-stretch justify-center">
            <img
              className="border-2 rounded-md border-teal-500"
              key={player.name}
              src={player.pictureURL}
              width={100}
              height={100}
            />
          </div>
          <div className="flex mt-3 self-stretch justify-center text-lg text-teal-700 uppercase font-extrabold">
            {player.name}
          </div>
        </div>
      );
    });
    setPlayerDisplays(updatedPlayers);
  }, [players]);

  return (
    <div>
      {gameIndex != -1 && (
        <div className="flex self-stretch w-screen justify-center">
          <div className="flex-col space-y-3">
            <div className="flex self-stretch justify-center">
              Add player by entering this url in a browser or use the QRCode
            </div>
            <div className="flex self-stretch justify-center">
              {newPlayerLink}
            </div>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 256,
                width: "100%",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={newPlayerLink}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="flex self-stretch justify-center">
              <Btn action={() => action()} text="Start Game" />
            </div>

            <div className="flex self-stretch justify-center text-4xl font-bold">
              Players that have joined
            </div>
            <div className="flex self-stretch justify-center max-w-7xl">
              <div className="flex flex-wrap">{playerDisplays}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
