import { useEffect, useState } from "react";
import Btn from "@/components/doodler/Btn";
import { Player } from "@/types/doodler";

type Props = {
	players: Player[];
	message: string;
};

export default function Results({ players, message }: Props) {
	const playerDisplays = players.map((player) => {
		return (
			<div key={player.connectionId} className="flex-col m-3">
				<div className="flex self-stretch justify-center">
					<img
						className="border-2 rounded-md border-teal-500"
						key={player.name}
						src={player.pictureURL}
						width={100}
						height={100}
					/>
				</div>
				<div className="flex mt-3 self-stretch justify-center text-lg text-teal-700 uppercase font-extrabold">
					{player.name}
					{"s score: "}
					{player.score}
				</div>
			</div>
		);
	});

	return (
		<div className="flex-row self-stretch w-screen justify-center">
			<div className="flex self-stretch justify-center text-4xl font-bold pt-16">
				{message}
			</div>
			<div className="flex-col self-stretch justify-center  space-y-3">
				<div className="flex self-stretch justify-center max-w-7xl">
					<div className="flex flex-wrap">{playerDisplays}</div>
				</div>
			</div>
		</div>
	);
}
