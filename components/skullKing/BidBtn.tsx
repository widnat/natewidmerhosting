import { useState } from "react";
import type { Player, PlayerRound } from "../../types/skullKeeper";
import { useStoreDispatch } from "../../hooks/store";
import {
	updatePlayerRoundBid,
	updatePlayerRoundTotals,
} from "../../store/skullKeeper/roundsSlice";
import NumberBtn from "./NumberBtn";
import { PlayerRoundUpdate } from "../../types/skullKeeper";

type Props = {
	player: Player;
	playerRound: PlayerRound;
};

export default function BidBtn({ player, playerRound }: Props) {
	const dispatch = useStoreDispatch();
	const [showPopup, setShowPopup] = useState(false);
	const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const numberButtons = numbers.map((i) => {
		if (i < playerRound.roundIndex + 2)
			return (
				<NumberBtn
					key={i}
					text={i}
					action={(i: number) => handleBidChanged(i)}
				/>
			);
	});

	function handleBidChanged(bid: number) {
		var playerRoundUpdate = {
			roundIndex: playerRound.roundIndex,
			playerIndex: player.index,
			value: bid,
		} as PlayerRoundUpdate;
		dispatch(updatePlayerRoundBid(playerRoundUpdate));
		dispatch(updatePlayerRoundTotals(playerRoundUpdate));
		setShowPopup(false);
	}

	return (
		<div className=" mr-2">
			<button
				type="button"
				onClick={() => setShowPopup(true)}
				className="inline-flex w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
			>
				BID: {playerRound.bid != -1 && playerRound.bid}
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
												Bid
											</h3>
											<div className="flex flex-wrap">{numberButtons}</div>
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
