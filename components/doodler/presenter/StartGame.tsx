import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";
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
        <div key={player.connectionId} className="flex-col m-3">
          <div className="flex self-stretch justify-center">
            <img
              className="border-2 rounded-md border-teal-500"
              key={player.name}
              src={player.pictureURL}
              width={window.innerWidth * .05}
              height={window.innerWidth * .05}
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
      {gameId != '-1' && (
        <div className="flex self-stretch w-screen justify-center">
          <div className="flex-col space-y-3">
            <div className="flex self-stretch justify-center">
              Add player by using the QRCode
            </div>
            <div className="flex self-stretch justify-center">
              Or enter <div className="text-cyan-500 ml-2 mb-5 underline">{newPlayerLink}</div>
            </div>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: window.innerWidth * .25,
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
              There must be at least two players to start a game
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
