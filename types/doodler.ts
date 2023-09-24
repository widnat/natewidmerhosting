export type Game = {
    players: Array<Player>;
}

export type Message = {
    action: string;
    type: number;
    recipientConnectionId: string;
    senderConnectionId: string;
    value: string;
}

export type AddPlayerMessage = {
    name: string;
    imageUrl: string;
}

export type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
}

export type Point = {
	x: number;
	y: number;
}

export type Player = {
    connectionId: string;
	name: string;
    pictureURL: string;
    assignment: DoodleAssignment;
	firstGuess: string;
    secondGuess: string;
    score: number;
}

export type DoodleAssignment = {
    assignment: string;
    drawingURL: string;
}

export type ChatGptResponse = {
    success: boolean;
    contentList: [string];
}