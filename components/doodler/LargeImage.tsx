import React from "react";

type Props = {
  source: string;
};

export default function LargeImage({ source }: Props) {
  return (
    <img
      className="border-2 rounded-md border-teal-500 m-2"
      src={source}
      width={window.innerWidth * 0.25}
      height={window.innerWidth * 0.25}
    />
  );
}
