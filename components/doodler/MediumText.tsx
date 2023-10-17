import React from "react";

type Props = {
	text: string;
};

export default function MediumText({ text }: Props) {
	return (
		<div className="text-xl font-bold">{text}</div>
	);
}
