import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SkullKeeperNavBar from "../../../components/skullKing/NavBar";
import Title from "../../../components/Title";
import PlayerInfo from "../../../components/skullKing/PlayerInfo";
import { useStoreSelector } from "../../../hooks/store";
import { roundsState } from "../../../store/skullKeeper/roundsSlice";
import { playersState } from "../../../store/skullKeeper/playersSlice";
import { useRouter } from "next/router";

export default function SkullKeeper() {
	const router = useRouter();
	const [showPopup, setShowPopup] = useState(false);
	const roundNumber = Number(router.query.index);
	const roundIndex = roundNumber - 1;
	const title = "Round " + roundNumber;
	const players = useStoreSelector(playersState);
	const round = useStoreSelector(roundsState)[roundIndex];
	const playerInfoList = players.map((player) => {
		if (player.name)
			return (
				<PlayerInfo
					key={player.index}
					player={player}
					playerRound={round.playerRounds[player.index]}
				/>
			);
	});

	function handleNavigate(route: string) {
		if (route === "new game") setShowPopup(true);
		else if (route === "previous")
			router.push("/skullKeeper/round/" + Number(roundNumber - 1));
		else if (route === "next") {
			router.push("/skullKeeper/round/" + Number(roundNumber + 1));
		} else if (route === "results") router.push("/skullKeeper/results");
	}

	return (
		<div>
			<NavBar />
			<Title title="Skull Keeper" page={title} />
			<SkullKeeperNavBar
				page={title}
				roundIndex={roundNumber}
				handleNavigate={handleNavigate}
			/>
			<div className="flex justify-center">
				<div className="flex justify-center lg:max-w-5xl sm:max-w-xs">
					<div className="flex flex-wrap justify-start">{playerInfoList}</div>
				</div>
			</div>

			{showPopup && (
				<div
					className="relative z-10"
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity"></div>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
							<div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mt-3 text-center sm:mt-0 sm:ml-4">
											<h3
												className="text-base font-semibold leading-6 text-gray-900"
												id="modal-title"
											>
												Are you sure you want to start a new game?
											</h3>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button
										type="button"
										onClick={() => setShowPopup(false)}
										className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									>
										No
									</button>
									<button
										type="button"
										onClick={() => {
											setShowPopup(false);
											router.push("/skullKeeper/players");
										}}
										className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									>
										Yes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
