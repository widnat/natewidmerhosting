import { useState } from "react";
import type { Player, PlayerRound } from "../../types/skullKeeper";
import { useStoreDispatch } from "../../hooks/store";
import {
	updatePlayerRoundBonus,
	updatePlayerRoundTotals,
} from "../../store/skullKeeper/roundsSlice";
import { PlayerRoundUpdate } from "../../types/skullKeeper";

type Props = {
	player: Player;
	playerRound: PlayerRound;
};

export default function BonusBtn({ player, playerRound }: Props) {
	const dispatch = useStoreDispatch();
	const [showPopup, setShowPopup] = useState(false);

	function handleBonusChanged(bonus: number) {
		var playerRoundUpdate = {
			roundIndex: playerRound.roundIndex,
			playerIndex: player.index,
			value: bonus,
		} as PlayerRoundUpdate;
		dispatch(updatePlayerRoundBonus(playerRoundUpdate));
		dispatch(updatePlayerRoundTotals(playerRoundUpdate));
		setShowPopup(false);
	}

	return (
		<div className="mr-2">
			<button
				type="button"
				onClick={() => setShowPopup(true)}
				className="inline-flex w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
			>
				BONUS: {playerRound.bonus != -1 && playerRound.bonus}
			</button>

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
												Bonus
											</h3>
											<div className="flex flex-wrap">
												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-20 flex items-center bg-teal-500 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(10)}
													>
														14
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-20 flex items-center bg-purple-600 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(10)}
													>
														14
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-20 flex items-center bg-yellow-500 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(10)}
													>
														14
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-20 flex items-center bg-gray-600 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(20)}
													>
														14
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-40 flex items-center bg-blue-400 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(50)}
													>
														Mermaid
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-40 flex items-center bg-red-600 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(30)}
													>
														Pirate x1
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-40 flex items-center bg-red-600 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(60)}
													>
														Pirate x2
													</button>
												</div>

												<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
													<button
														type="button"
														className="rounded-full h-20 w-40 flex items-center bg-red-600 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
														onClick={() => handleBonusChanged(90)}
													>
														Pirate x3
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<button
										type="button"
										onClick={() => setShowPopup(false)}
										className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									>
										Cancel
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
