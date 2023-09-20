import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AddPlayerMessage, Message } from "@/types/doodler";
import JoinGame from "@/components/doodler/player/JoinGame";
import CreateAssignmentDoodle from "@/components/doodler/player/CreateAssignmentDoodle";
import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/Title";
import PlayersFirstGuess from "@/components/doodler/player/PlayersFirstGuess";
import PlayersSecondGuess from "@/components/doodler/player/PlayersSecondGuess";
import { MessageType, PlayerComponent } from "@/enums/doodler";

export default function Doodler() {
	const router = useRouter();
	const gameIndex = Number(router.query.gameIndex);
	const [connected, setConnected] = useState(false);
	var hasConstructed = false;
	const playerId = useRef<number>(-1);
	const [doodleAssignment, setDoodleAssignment] = useState("");
	const [component, setComponent] = useState(PlayerComponent.JoinGame);
	const [options, setOptions] = useState(new Array<string>());
	const ws = useRef<WebSocket>();

	useEffect(() => {
		if (!hasConstructed && router.isReady) {
			hasConstructed = true;
			ws.current = new WebSocket("ws://localhost:8080", String(gameIndex));
			ws.current.onerror = (err) => console.error(err);
			ws.current.onopen = (event) => setConnected(true);
			ws.current.onmessage = (msg: any) => handleServerMessage(msg.data);
		}
	}, [router.isReady]);

	function handleServerMessage(msg: string) {
		const message = JSON.parse(msg) as Message;
		if (message.type === MessageType.PlayerId) {
			playerId.current = Number(message.value);
		} else if (message.type === MessageType.CreateDoodle) {
			setDoodleAssignment(message.value);
			setComponent(PlayerComponent.CreateAssignmentDoodle)
		} else if (message.type === MessageType.WaitingForOtherPlayers) {
			console.log("waiting for other players to guess");
			setComponent(PlayerComponent.WaitingForOtherPlayers);
		} else if (message.type === MessageType.MakeAGuess) {
			console.log("ready to guess");
			setComponent(PlayerComponent.PlayersFirstGuess);
		} else if (message.type === MessageType.ChooseYourAnswer) {
			console.log("ready to guess again");
			setComponent(PlayerComponent.PlayersSecondGuess);
			var updateOptions = JSON.parse(message.value) as Array<string>;
			setOptions(updateOptions);
		}
	}

	function joinGame(playerName: string, doodleURL: string) {
		var addPlayer = {
			name: playerName,
			imageUrl: doodleURL,
		} as AddPlayerMessage;
		var jsonAddPlayer = JSON.stringify(addPlayer);
		var msg = {
			type: MessageType.AddPlayer,
			gameIndex: gameIndex,
			value: jsonAddPlayer,
		} as Message;
		SendMessage(msg);
	}

	function submitAssignmentDoodle(doodleURL: string) {
		var msg = {
			type: MessageType.SubmitAssignmentDoodle,
			gameIndex: gameIndex,
			playerId: playerId.current,
			value: doodleURL,
		} as Message;
		SendMessage(msg);
	}

	function submitFirstGuess(guess: string) {
		var msg = {
			type: MessageType.SubmitFirstGuess,
			gameIndex: gameIndex,
			playerId: playerId.current,
			value: guess,
		} as Message;
		SendMessage(msg);
	}

	function submitSecondGuess(guess: string) {
		var msg = {
			type: MessageType.SubmitSecondGuess,
			gameIndex: gameIndex,
			playerId: playerId.current,
			value: guess,
		} as Message;
		SendMessage(msg);
	}

	function SendMessage(msg: Message) {
		var jsonRequest = JSON.stringify(msg);
		if (ws.current !== undefined) {
			ws.current.send(jsonRequest);
		}
	}

	return (
		<>
			<NavBar />
			<Title title="Doodler" page="" />
			{connected && component === PlayerComponent.JoinGame && (
				<JoinGame action={joinGame} />
			)}
			{connected && component === PlayerComponent.CreateAssignmentDoodle && (
				<CreateAssignmentDoodle
					action={submitAssignmentDoodle}
					assignment={doodleAssignment}
				/>
			)}
			{connected && component === PlayerComponent.WaitingForOtherPlayers && (
				<div className="h-screen">
					<div className="flex items-center justify-center">
						sit back and relax while the others guess!
					</div>
				</div>
			)}
			{connected && component === PlayerComponent.PlayersFirstGuess && (
				<div className="h-screen">
					<PlayersFirstGuess submitGuess={submitFirstGuess} />
				</div>
			)}
			{connected && component === PlayerComponent.PlayersSecondGuess && (
				<div className="h-screen">
					<PlayersSecondGuess
						submitGuess={submitSecondGuess}
						options={options}
					/>
				</div>
			)}
		</>
	);
}
