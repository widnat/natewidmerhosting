import NavBar from "@/components/NavBar/NavBar";
import Title from "@/components/Title";
import { useState } from "react";
import DrawingArea from "@/components/doodler/DrawingArea";
import PlayerNameInput from "@/components/doodler/PlayerNameInput";
import Spinner from "@/components/Spinner";

type Props = {
	action: any;
};

export default function JoinGame({ action }: Props) {
	const [playerName, setPlayerName] = useState("");
	const [waiting, setWaiting] = useState(false);

	function doneDrawing(doodleURL: string) {
		if (playerName) {
			setWaiting(true);
			action(playerName, doodleURL);
		} else alert("Please enter a name");
	}

	return (
		<>
			<div className="h-screen">
				{!waiting && (
					<div>
						<PlayerNameInput updateName={setPlayerName} />
						<DrawingArea action={doneDrawing} actionText="Join Game" />
					</div>
				)}
				{waiting && <Spinner message="waiting for other players to begin..." />}
			</div>
		</>
	);
}
