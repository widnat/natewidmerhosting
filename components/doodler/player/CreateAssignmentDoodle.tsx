import { useState } from "react";
import DrawingArea from "@/components/doodler/DrawingArea";
import Spinner from "@/components/Spinner";
import LargeText from "../LargeText";

type Props = {
	action: any;
	assignment: string;
};

export default function CreateDoodle({ action, assignment }: Props) {
	const [waiting, setWaiting] = useState(false);

	function doneDrawing(doodleURL: string) {
		setWaiting(true);
		action(doodleURL);
	}

	return (
		<>
			<div className="h-screen bg-gradient-to-l from-cyan-200 to-blue-200">
				{!waiting && (
					<div>
						<div className="flex items-center justify-center py-5">
							<LargeText text={`Draw ${assignment}`}/>
						</div>
						<DrawingArea action={doneDrawing} actionText="Submit Doodle" />
					</div>
				)}
				{waiting && (
					<Spinner message="waiting for other players to finish..." />
				)}
			</div>
		</>
	);
}
