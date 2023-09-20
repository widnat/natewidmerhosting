export interface Players {
	players: Array<Player>;
}

export interface Player {
	name: string;
	index: number;
}

export interface Rounds {
	rounds: Array<Round>;
}

export interface Round {
	roundIndex: number;
	playerRounds: Array<PlayerRound>;
}

export interface PlayerRoundUpdate {
	roundIndex: number;
	playerIndex: number;
	value: number;
}

export interface PlayerRound {
	playerIndex: number;
	roundIndex: number;
	bid: number;
	won: number;
	bonus: number;
	total: number;
}