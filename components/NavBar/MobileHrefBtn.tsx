import React from "react";

type Props = {
	route: string;
	text: string;
};

export default function MobileHrefBtn({ route, text }: Props) {
	return (
		<a
			href={route}
			className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
			aria-current="page"
		>
			{text}
		</a>
	);
}
