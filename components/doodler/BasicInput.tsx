import React from "react";
import LargeText from "./LargeText";

type Props = {
	updateInput: any;
	text: string;
};

export default function BasicInput({ updateInput, text }: Props) {
	return (
		<div className="w-96 px-3">
			<LargeText text={text}/>
			<input
				className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
				type="text"
				onChange={(e) => updateInput(e.target.value)}
			/>
		</div>
	);
}
