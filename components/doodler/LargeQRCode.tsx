import React from "react";
import QRCode from "react-qr-code";

type Props = {
  link: string;
};

export default function LargeQRCode({ link }: Props) {
  return <QRCode size={300} value={link} viewBox={`0 0 300 300`} />;
}
