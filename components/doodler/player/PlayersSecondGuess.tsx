import React from "react";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import OptionBtn from "./OptionBtn";

type Props = {
	submitGuess: any;
	options: Array<string>;
};

export default function PlayersSecondGuess({ submitGuess, options }: Props) {
	const [waiting, setWaiting] = useState(false);
	var count = 0;
	const optionDisplays = options.map((option: string) => {
		++count;
		return (
			<div key={count} className="flex-row">
				<OptionBtn action={() => submit(option)} text={option} />
			</div>
		);
	});

	function submit(option: string) {
		setWaiting(true);
		var msg = "guess was: " + option;
		console.log(msg);
		submitGuess(option);
	}

	return (
		<div className="h-screen">
			{!waiting && (
				<div className="flex items-center justify-center">
					<div className="w-96 px-3 mb-3">
						<label className="block uppercase tracking-wide text-teal-700 text-xs font-bold mb-2">
							What option describes the Doodle the best?
						</label>
						{optionDisplays}
					</div>
				</div>
			)}

			{waiting && <Spinner message="waiting for other players to finish..." />}
		</div>
	);
}
