import React from "react";

type Props = {
	source: string;
};

export default function SmallImage({ source }: Props) {
	return (
		<img
              src={source}
              width={window.innerWidth * .05}
              height={window.innerWidth * .05}
            />
	);
}
