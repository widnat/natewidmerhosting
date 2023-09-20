import React from "react";
import Image from "next/image";
import Stack from "react-bootstrap/Stack";

export default function AboutMe() {
	return (
		<Stack direction="horizontal" gap={3}>
			<Image
				src="/images/HeadShot.png"
				alt="head shot"
				width={180}
				height={190}
				
			/>
			<Stack gap={3}>
				<div className="bg-light border">First item</div>
				<div className="bg-light border">Second item</div>
				<div className="bg-light border">Third item</div>
			</Stack>
		</Stack>
	);
}
