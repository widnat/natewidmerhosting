import React from "react";

type Props = {
	message: string;
};

export default function Spinner({ message }: Props) {
	return (
		<div className="flex items-center justify-center h-1/2">
			<div className="flex-col">
				<div className="flex self-stretch text-2xl justify-center lowercase">
					{message}
				</div>
				<div className="flex self-stretch justify-center">
					<div
						className="ml-5 mt-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					>
						<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
							Loading...
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
