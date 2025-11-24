import React from "react";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";
import { moderateScale } from "../../constant/responsiveStyle";

interface Props {
  scaleHeight?: number;
  scaleWidth?: number;
  labelCount?: number;
}
const ScaleIcon: React.FC<Props> = ({
  scaleHeight = 410,
  scaleWidth = 60,
  labelCount = 5,
}) => {
  // Padding to prevent labels or ticks from being cut off
  const paddingTop = 6;
  const paddingBottom = 6;

  // Total height available for the scale
  const usableHeight = scaleHeight - paddingTop - paddingBottom;

  // Creating an array of label numbers in descending order
  const labels = Array.from(
    { length: labelCount },
    (_, index) => labelCount - index
  );

  return (
    <View
      style={{
        alignItems: "center",
        right: moderateScale(-30),
      }}
    >
      <Svg height={scaleHeight} width={scaleWidth}>
        {labels.map((label, index) => {
          const yPosition =
            paddingTop + (usableHeight / (labelCount - 1)) * index;

          return (
            <React.Fragment key={index + label}>
              <Line
                x1={scaleWidth / 2}
                y1={yPosition}
                x2={scaleWidth / 2 - 50} // Length of the main tick mark
                y2={yPosition}
                stroke={"#D3D3D3"} // Color for tick marks
                strokeWidth={2}
              />
            </React.Fragment>
          );
        })}

        {/* Small tick marks */}
        {labels.map((_, index) => {
          const startY = paddingTop + (usableHeight / (labelCount - 1)) * index;
          const stepCount = 9; // Number of smaller ticks between each label
          const stepHeight = usableHeight / (labelCount - 1) / (stepCount + 1);

          return Array.from({ length: stepCount }).map((__, subIndex) => {
            const yPosition = startY + stepHeight * (subIndex + 1);
            return (
              <Line
                key={index + subIndex}
                x1={scaleWidth / 2}
                y1={yPosition}
                x2={
                  subIndex % 2 === 0 ? scaleWidth / 2 - 10 : scaleWidth / 2 - 20
                } // Length of the small tick mark
                y2={yPosition}
                stroke={"#D3D3D3"}
                strokeWidth={1}
              />
            );
          });
        })}
      </Svg>
    </View>
  );
};

export default ScaleIcon;
