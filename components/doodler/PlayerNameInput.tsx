import React from "react";

type Props = {
	updateName: any;
};

export default function PlayerNameInput({ updateName }: Props) {
	return (
		<div className="flex items-center justify-center">
			<div className="w-96 px-3">
				<label className="block uppercase tracking-wide text-teal-700 text-xs font-bold mb-2">
					Enter your name
				</label>
				<input
					className="appearance-none block w-full text-gray-700 border border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
					type="text"
					onChange={(e) => updateName(e.target.value)}
				/>
			</div>
		</div>
	);
}
