import React from "react";

type Props = {
	route: string;
	text: string;
	handleNavigate: any;
};

export default function NavBtn({ route, text, handleNavigate }: Props) {
	return (
		<a
			onClick={() => handleNavigate(route)}
			className="text-white bg-teal-600 duration-500 shadow-lg hover:cursor-pointer hover:bg-teal-800 px-3 py-2 rounded-md text-sm font-medium no-underline"
		>
			{text}
		</a>
	);
}
