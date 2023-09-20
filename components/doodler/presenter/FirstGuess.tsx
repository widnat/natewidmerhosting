import { Player } from "../../../types/doodler";
import { useEffect, useState } from "react";

type Props = {
	action: any;
	playerAssignmentIndex: number;
	players: Player[];
};

export default function FirstGuess({
	action,
	players,
	playerAssignmentIndex,
}: Props) {
	const [playerDisplays, setPlayerDisplays] = useState(
		new Array<JSX.Element>()
	);
	const [message, setMessage] = useState("Make your best guess!");

	useEffect(() => {
		var numFinishedPlayers = 0;
		var updatedPlayers = players.map((player) => {
			if (player.firstGuess) ++numFinishedPlayers;

			return (
				<div key={player.id}>
					{player.firstGuess && (
						<div className="m-3">
							<img
								className="border-2 rounded-md border-teal-500"
								key={player.name}
								src={player.pictureURL}
								width={200}
								height={200}
							/>
							<div className="flex mt-3 self-stretch justify-center text-lg text-teal-700 uppercase font-extrabold">
								{player.name} Finished!
							</div>
						</div>
					)}
				</div>
			);
		});

		setPlayerDisplays(updatedPlayers);
		if (numFinishedPlayers + 1 === players.length) {
			console.log("first guess finished");
			setMessage("All finished!");
			setTimeout(function () {
				setMessage("On to the next guess!");
			}, 1500);
			setTimeout(function () {
				action();
			}, 1500);
		}
	}, [players]);

	return (
		<div className="flex self-stretch w-screen justify-center">
			<div className="flex-col space-y-3">
				<div className="flex self-stretch justify-center">{message}</div>
				<div className="flex self-stretch justify-center">
					<img
						className="border-2 rounded-md border-teal-500"
						src={players[playerAssignmentIndex].assignment.drawingURL}
						width={200}
						height={200}
					/>
				</div>

				<div className="flex self-stretch justify-center text-4xl font-bold pt-16">
					Players finished with first guess
				</div>
				<div className="flex self-stretch justify-center max-w-7xl">
					<div className="flex flex-wrap">{playerDisplays}</div>
				</div>
			</div>
		</div>
	);
}
