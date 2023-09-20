import React from "react";

type Props = {
	route: string;
	text: string;
};

export default function HrefBtn({ route, text }: Props) {
	return (
		<a
			href={route}
			className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
		>
			{text}
		</a>
	);
}
