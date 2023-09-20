import React from "react";

type Props = {
	action: any;
	text: string;
};

export default function Btn({ action, text }: Props) {
	return (
		<button
			type="button"
			className="p-2 rounded-md border border-black"
			onClick={action}
		>
			{text}
		</button>
	);
}
