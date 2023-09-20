import React from "react";

type Props = {
	title: string;
	page: string;
};

export default function Title({ title, page }: Props) {
	return (
		<>
			<h1 className="flex justify-center text-6xl py-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-gray-800">
				{title}
			</h1>
			<h1 className="flex justify-center mb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-gray-800">
				{page}
			</h1>
		</>
	);
}
