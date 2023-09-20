import { Player } from "../../../types/doodler";
import { useEffect, useState } from "react";

type Props = {
	action: any;
	players: Player[];
};

export default function CreateAssignmentDoodles({ action, players }: Props) {
	const [playerDisplays, setPlayerDisplays] = useState(
		new Array<JSX.Element>()
	);
	const [message, setMessage] = useState(
		"It's time to draw something AWESOME!"
	);

	useEffect(() => {
		var readyToContinue = true;
		var updatedPlayers = players.map((player) => {
			if (!player.assignment?.drawingURL) readyToContinue = false;

			return (
				<div key={player.id}>
					{player.assignment?.drawingURL && (
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
		if (readyToContinue) {
			setMessage("All finished!");
			setTimeout(function () {
				setMessage("Lets play!");
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
				<div className="flex self-stretch justify-center max-w-7xl">
					<div className="flex flex-wrap">{playerDisplays}</div>
				</div>
			</div>
		</div>
	);
}
