import { useRouter } from "next/router";
import { useState } from "react";
import Btn from "@/components/doodler/Btn";

export default function AddPlayer() {
	const router = useRouter();
	const [gameId, setGameId] = useState("");

    function join() {
        if (gameId) {
            router.push(`/doodler/${gameId}/player`);
        }
    }

	return (
		<>
		<div className="h-screen">
        <div className="flex items-center justify-center">
					<div className="w-96 px-3 mb-3">
						<label className="block uppercase tracking-wide text-teal-700 text-xs font-bold mb-2">
							Enter the Game Id and press Join
						</label>
						<input
							className="appearance-none block w-full text-gray-700 border border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
							type="text"
							onChange={(e) => setGameId(e.target.value)}
						/>
						<div className="flex self-stretch justify-center">
							<Btn action={() => join()} text="Join" />
						</div>
					</div>
				</div>
		</div>
		</>
	);
}
