import React from "react";
import { useState } from "react";
import Btn from "@/components/doodler/Btn";
import Spinner from "@/components/Spinner";

type Props = {
	submitGuess: any;
};

export default function PlayersFirstGuess({ submitGuess }: Props) {
	const [guess, setGuess] = useState("");
	const [waiting, setWaiting] = useState(false);

	function submit() {
		setWaiting(true);
		submitGuess(guess);
	}

	return (
		<div className="h-screen">
			{!waiting && (
				<div className="flex items-center justify-center">
					<div className="w-96 px-3 mb-3">
						<label className="block uppercase tracking-wide text-teal-700 text-xs font-bold mb-2">
							What is this doodle?
						</label>
						<input
							className="appearance-none block w-full text-gray-700 border border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="text"
							onChange={(e) => setGuess(e.target.value)}
						/>
						<div className="flex self-stretch justify-center">
							<Btn action={() => submit()} text="Submit Guess" />
						</div>
					</div>
				</div>
			)}

			{waiting && <Spinner message="waiting for other players to finish..." />}
		</div>
	);
}
