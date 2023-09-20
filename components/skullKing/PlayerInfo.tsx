import React from "react";
import BidBtn from "./BidBtn";
import WonBtn from "./WonBtn";
import BonusBtn from "./BonusBtn";
import { Player, PlayerRound } from "../../types/skullKeeper";

type Props = {
	player: Player;
	playerRound: PlayerRound;
};

export default function PlayerInfo({ player, playerRound }: Props) {
	return (
		<div className="flex-col mx-2 mb-2">
			<div className="flex">
				<label className="w-full uppercase tracking-wide text-gray-700 text-xs font-bold">
					{player.name}
				</label>
				<label className="uppercase tracking-wide text-gray-700 text-xs font-bold">
					total
				</label>
			</div>
			<form className="flex-row">
				<div className="flex">
					<BidBtn player={player} playerRound={playerRound} />
					<WonBtn player={player} playerRound={playerRound} />
					<BonusBtn player={player} playerRound={playerRound} />
					<label className="w-12 text-end align-middle uppercase self-center tracking-wide text-gray-700 text-2xl font-bold">
						{playerRound.total}
					</label>
				</div>
			</form>
		</div>
	);
}
