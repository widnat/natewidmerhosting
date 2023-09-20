import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { StoreState } from "../store";
import type { Players, Player } from "../../types/skullKeeper";

const initialState: Players = {
	players: [
		{ name: "", index: 0 },
		{ name: "", index: 1 },
		{ name: "", index: 2 },
		{ name: "", index: 3 },
		{ name: "", index: 4 },
		{ name: "", index: 5 },
		{ name: "", index: 6 },
		{ name: "", index: 7 },
	],
};

export const playersSlice = createSlice({
	name: "players",
	initialState,
	reducers: {
		updatePlayer: (state, action: PayloadAction<Player>) => {
			if (state.players.length > action.payload.index)
				state.players[action.payload.index].name = action.payload.name;
			else alert("playersSlice.updatePlayer: unable to update player");
		},
	},
});

export const { updatePlayer } = playersSlice.actions;

export const playersState = (state: StoreState) => state.players.players;

export default playersSlice.reducer;
