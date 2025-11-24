import React from "react";
import { G, Line, Text } from "react-native-svg";
import range from "lodash.range";

type ClockFaceProps = {
  r: number;
  stroke: string;
  showMin: boolean;
};

const ClockFace: React.FC<ClockFaceProps> = ({
  r,
  stroke,
  showMin = false,
}) => {
  const faceRadius = r - 5;
  const textRadius = r - 26;

  return (
    <G>
      {range(48).map((i: any) => {
        const cos = Math.cos(((2 * Math.PI) / 48) * i);
        const sin = Math.sin(((2 * Math.PI) / 48) * i);

        return (
          <Line
            key={i}
            stroke={stroke}
            strokeWidth={i % 4 === 0 ? 3 : 1}
            x1={cos * faceRadius}
            y1={sin * faceRadius}
            x2={cos * (faceRadius - 7)}
            y2={sin * (faceRadius - 7)}
          />
        );
      })}
      <G transform={{ translate: "0, 6" }}>
        {range(12).map((h: any, i: any) => (
          <Text
            key={"key" + i}
            fill={stroke}
            fontSize="16"
            textAnchor="middle"
            x={
              textRadius *
              Math.cos(((2 * Math.PI) / 12) * i - Math.PI / 2 + Math.PI / 6)
            }
            y={
              textRadius *
              Math.sin(((2 * Math.PI) / 12) * i - Math.PI / 2 + Math.PI / 6)
            }
          >
            {showMin ? `${(h + 1) * 5}` : h + 1}
            {/* {h + 1 } */}
          </Text>
        ))}
      </G>
    </G>
  );
};

export default ClockFace;
