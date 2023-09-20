import React from "react";

type Props = {
	action: any;
	text: number;
};

export default function NumberBtn({ action, text }: Props) {
	return (
		<div className="flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold">
			<button
				type="button"
				className="rounded-full h-20 w-20 flex items-center bg-teal-600 justify-center shadow-lg hover:border-2 hover:border-gray-200 focus:outline-none"
				onClick={() => action(text)}
			>
				{text}
			</button>
		</div>
	);
}
