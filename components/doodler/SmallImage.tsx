import React from "react";

type Props = {
  source: string;
};

export default function SmallImage({ source }: Props) {
  return (
    <img
      className="border-2 rounded-md border-teal-500 m-2"
      src={source}
      width={window.innerWidth * 0.1}
      height={window.innerWidth * 0.1}
    />
  );
}
