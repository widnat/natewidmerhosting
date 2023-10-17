import React from "react";
import QRCode from "react-qr-code";

type Props = {
	link: string;
};

export default function LargeQRCode({ link }: Props) {
	return (
		<div
              style={{
                height: "auto",
                margin: "0 auto",
                width: "auto",
              }}
            >
              <QRCode
                size={300}
                value={link}
                viewBox={`0 0 300 300`}
              />
            </div>
	);
}
