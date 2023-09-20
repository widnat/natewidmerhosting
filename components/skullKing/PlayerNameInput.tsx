import React from "react";
import { Player } from "../../types/skullKeeper";
import { useStoreDispatch } from "../../hooks/store";
import { updatePlayer } from "../../store/skullKeeper/playersSlice";

type Props = {
	player: Player;
};

export default function PlayerNameInput({ player }: Props) {
	const dispatch = useStoreDispatch();

	function updatePlayerHelper(name: string, index: number) {
		dispatch(updatePlayer({ name, index } as Player));
	}

	return (
		<div className="w-96 px-3 mb-3">
			<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
				{"Player " + Number(player.index + 1)}
			</label>
			<input
				className="appearance-none block w-full text-gray-700 border border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				type="text"
				value={player.name}
				onChange={(e) => updatePlayerHelper(e.target.value, player.index)}
			/>
		</div>
	);
}
