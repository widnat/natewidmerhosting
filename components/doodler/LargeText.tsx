import React from "react";

type Props = {
	text: string;
};

export default function LargeText({ text }: Props) {
	return (
		<div className="text-3xl font-bold">{text}</div>
	);
}
