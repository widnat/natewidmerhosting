import React from "react";

type Props = {
  action: any;
  text: string;
};

export default function Btn({ action, text }: Props) {
  return (
    <button
      type="button"
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      onClick={action}
    >
      {text}
    </button>
  );
}
