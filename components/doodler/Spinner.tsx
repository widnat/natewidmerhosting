import React from "react";

type Props = {
  message: string;
};

export default function Spinner({ message }: Props) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-l from-cyan-200 to-blue-200">
      <div
        className="ml-5 mt-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
		<div className="ml-10">{message}</div>
      </div>
    </div>
  );
}
