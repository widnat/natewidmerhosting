import NavBar from "../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../components/skullKing/NavBar";
import Title from "../../components/Title";
import PlayerNameInput from "../../components/skullKing/PlayerNameInput";
import { useStoreDispatch, useStoreSelector } from "../../hooks/store";
import { playersState } from "../../store/skullKeeper/playersSlice";
import { createRounds } from "../../store/skullKeeper/roundsSlice";
import type { Player } from "../../types/skullKeeper";
import { useRouter } from "next/router";
import { updatePlayer } from "../../store/skullKeeper/playersSlice";

export default function SkullKeeper() {
	const router = useRouter();
	const dispatch = useStoreDispatch();
	const players = useStoreSelector(playersState);
	const playerInputs = players.map((player: Player) => {
		return <PlayerNameInput key={player.index} player={player} />;
	});

	function handleNavigate(route: string) {
		movePlayersToTop();
		var numPlayers = 0;
		players.forEach((player: Player) => {
			if (player.name) ++numPlayers;
		});
		dispatch(createRounds(numPlayers));
		router.push("/skullKeeper/round/1");
	}

	function movePlayersToTop() {
		var lastEmptyPlayerIndex = 0;
		for (var i = 0; i < 8; ++i) {
			if (lastEmptyPlayerIndex < i && players[i].name) {
				dispatch(
					updatePlayer({
						name: players[i].name,
						index: lastEmptyPlayerIndex,
					} as Player)
				);
				dispatch(updatePlayer({ name: "", index: i } as Player));
			}

			if (players[i].name) ++lastEmptyPlayerIndex;
		}
	}

	return (
		<div>
			<NavBar />
			<Title title="Skull Keeper" page="Players" />
			<SkullKeeperNavBar
				page="Players"
				roundIndex={0}
				handleNavigate={handleNavigate}
			/>
			<form className="flex justify-center">
				<div className="flex flex-wrap justify-center -mx-3 mb-3 max-w-4xl">
					{playerInputs}
				</div>
			</form>
		</div>
	);
}
