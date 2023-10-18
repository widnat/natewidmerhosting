import React from "react";

type Props = {
  source: string;
};

export default function VerySmallImage({ source }: Props) {
  return (
    <img
      className="border-2 rounded-md border-teal-500 bg-white m-2"
      src={source}
      width={window.innerWidth * 0.03}
      height={window.innerWidth * 0.03}
    />
  );
}
