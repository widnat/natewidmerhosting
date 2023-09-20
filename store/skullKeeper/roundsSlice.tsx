import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type {
	Rounds,
	Round,
	PlayerRound,
	PlayerRoundUpdate,
} from "../../types/skullKeeper";

const initialState: Rounds = {
	rounds: [],
};

function getRoundTotal(playerRound: PlayerRound) {
	var score = 0;
	if (playerRound.bid !== -1 && playerRound.won != -1) {
		score = Math.abs(playerRound.bid - playerRound.won);
		if (score === 0 && playerRound.bid > 0) score = playerRound.bid * 20;
		else if (score === 0) score = (playerRound.roundIndex + 1) * 10;
		else score = score * -1 * 10;
	}

	if (score > 0 && playerRound.bonus > 0) score += playerRound.bonus;

	return score;
}

export const roundsSlice = createSlice({
	name: "rounds",
	initialState,
	reducers: {
		createRounds: (state, action: PayloadAction<number>) => {
			state.rounds = [];
			for (var i = 0; i < 11; ++i) {
				var round = {
					roundIndex: i,
					playerRounds: [],
				} as Round;
				for (var k = 0; k < action.payload; ++k) {
					var playerRound = {
						playerIndex: k,
						roundIndex: i,
						bid: -1,
						won: -1,
						bonus: -1,
						total: 0,
						previousRoundTotal: 0,
					} as PlayerRound;
					round.playerRounds.push(playerRound);
				}
				state.rounds.push(round);
			}
		},
		updatePlayerRoundBid: (state, action: PayloadAction<PlayerRoundUpdate>) => {
			var update = action.payload;
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].bid =
				update.value;
		},
		updatePlayerRoundWon: (state, action: PayloadAction<PlayerRoundUpdate>) => {
			var update = action.payload;
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].won =
				update.value;
		},
		updatePlayerRoundBonus: (
			state,
			action: PayloadAction<PlayerRoundUpdate>
		) => {
			var update = action.payload;
			state.rounds[update.roundIndex].playerRounds[update.playerIndex].bonus =
				update.value;
		},
		updatePlayerRoundTotals: (
			state,
			action: PayloadAction<PlayerRoundUpdate>
		) => {
			var update = action.payload;
			for (var i = update.roundIndex; i < 10; ++i) {
				var previousRoundTotal =
					i > 0
						? state.rounds[i - 1].playerRounds[update.playerIndex].total
						: 0;
				var roundTotal = getRoundTotal(
					state.rounds[i].playerRounds[update.playerIndex]
				);
				var total = roundTotal + previousRoundTotal;
				var s = "prev: " + previousRoundTotal + ", total: " + total;
				console.log(s);
				state.rounds[i].playerRounds[update.playerIndex].total = total;
			}
		},
	},
});

export const {
	createRounds,
	updatePlayerRoundBid,
	updatePlayerRoundWon,
	updatePlayerRoundBonus,
	updatePlayerRoundTotals,
} = roundsSlice.actions;

export const roundsState = (state: StoreState) => state.rounds.rounds;

export default roundsSlice.reducer;
