import React, { useState, useRef } from "react";
import {
  View,
  PanResponder,
  LayoutChangeEvent,
  ViewStyle,
  Text,
} from "react-native";
import Svg, {
  Circle,
  G,
  LinearGradient,
  Path,
  Defs,
  Stop,
} from "react-native-svg";
import range from "lodash.range";
import { interpolateHcl as interpolateGradient } from "d3-interpolate";
import ClockFace from "./ClockFace";
import colors from "../../constant/colors";

type CircularSliderProps = {
  startAngle: number;
  angleLength: number;
  onUpdate: (params: { startAngle: number; angleLength: number }) => void;
  segments?: number;
  strokeWidth?: number;
  radius?: number;
  gradientColorFrom?: string;
  gradientColorTo?: string;
  showClockFace?: boolean;
  clockFaceColor?: string;
  bgCircleColor?: string;
  stopIcon?: any;
  startIcon?: JSX.Element;
  startCircleColor?: any;
  endCircleColor?: any;
  mainStyle?: ViewStyle;
  value?: any;
  showMin: boolean;
};
const showHourLabel = (value: any) => {
  return (
    <Text
      style={{
        fontSize: 24,
        fontWeight: "500",
        color: colors?.SurfCrest,
        position: "absolute",
      }}
    >
      {value ?? "Hours"}
    </Text>
  );
};
const CircularSlider: React.FC<CircularSliderProps> = ({
  startAngle,
  angleLength,
  onUpdate,
  segments = 5,
  strokeWidth = 40,
  radius = 145,
  gradientColorFrom = "#ff9800",
  gradientColorTo = "#ffcf00",
  showClockFace = true,
  clockFaceColor = "#9d9d9d",
  bgCircleColor = "#171717",
  stopIcon,
  startIcon,
  startCircleColor,
  endCircleColor,
  mainStyle,
  value,
  showMin = false,
}) => {
  const [circleCenterX, setCircleCenterX] = useState<number | null>(null);
  const [circleCenterY, setCircleCenterY] = useState<number | null>(null);
  const circleRef = useRef<Svg>(null);

  const getContainerWidth = () => strokeWidth + radius * 2 + 2;

  const setCircleCenter = () => {
    if (circleRef.current) {
      circleRef.current.measure((x, y, w, h, px, py) => {
        const halfOfContainer = getContainerWidth() / 2;
        setCircleCenterX(px + halfOfContainer);
        setCircleCenterY(py + halfOfContainer);
      });
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => setCircleCenter(),
    onPanResponderMove: (_, { moveX, moveY }) => {
      if (circleCenterX !== null && circleCenterY !== null) {
        let newAngle =
          Math.atan2(moveY - circleCenterY, moveX - circleCenterX) +
          Math.PI / 2;
        if (newAngle < 0) newAngle += 2 * Math.PI;

        const newAngleLength = (newAngle - startAngle) % (2 * Math.PI);
        onUpdate({
          startAngle,
          angleLength:
            newAngleLength >= 0 ? newAngleLength : newAngleLength + 2 * Math.PI,
        });
      }
    },
  });

  const onLayout = (e: LayoutChangeEvent) => {
    setCircleCenter();
  };

  const calculateArcColor = (index: number) => {
    const interpolate = interpolateGradient(gradientColorFrom, gradientColorTo);
    return {
      fromColor: interpolate(index / segments),
      toColor: interpolate((index + 1) / segments),
    };
  };

  const calculateArcCircle = (index: number) => {
    const start = startAngle % (2 * Math.PI);
    const length = angleLength % (2 * Math.PI);
    const idx = index + 1;
    const fromAngle = (length / segments) * (idx - 1) + start;
    const toAngle = (length / segments) * idx + start;
    const fromX = radius * Math.sin(fromAngle);
    const fromY = -radius * Math.cos(fromAngle);
    const toX = radius * Math.sin(toAngle);
    const toY = -radius * Math.cos(toAngle);
    return { fromX, fromY, toX, toY };
  };

  const containerWidth = getContainerWidth();
  const start = calculateArcCircle(0);
  const stop = calculateArcCircle(segments - 1);

  const iconWidth = 19; // set based on your design
  const iconHeight = 19;

  return (
    <View
      style={[{ width: containerWidth, height: containerWidth }, mainStyle]}
      onLayout={onLayout}
    >
      {showHourLabel(value)}
      <Svg height={containerWidth} width={containerWidth} ref={circleRef}>
        <Defs>
          {range(segments).map((i: any) => {
            const { fromX, fromY, toX, toY } = calculateArcCircle(i);
            const { fromColor, toColor } = calculateArcColor(i);
            return (
              <LinearGradient
                key={i}
                id={`gradient${i}`}
                x1={fromX.toFixed(2)}
                y1={fromY.toFixed(2)}
                x2={toX.toFixed(2)}
                y2={toY.toFixed(2)}
              >
                <Stop offset="0%" stopColor={fromColor} />
                <Stop offset="100%" stopColor={toColor} />
              </LinearGradient>
            );
          })}
        </Defs>

        <G
          transform={{
            translate: `${strokeWidth / 2 + radius + 1}, ${
              strokeWidth / 2 + radius + 1
            }`,
          }}
        >
          <Circle
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            stroke={bgCircleColor}
          />

          {showClockFace && (
            <ClockFace
              r={radius - strokeWidth / 2}
              stroke={clockFaceColor}
              showMin
            />
          )}

          {range(segments).map((i: any) => {
            const { fromX, fromY, toX, toY } = calculateArcCircle(i);
            const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(
              2
            )} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(2)}`;

            return (
              <Path
                key={i}
                d={d}
                strokeWidth={strokeWidth}
                stroke={`url(#gradient${i})`}
                fill="transparent"
              />
            );
          })}

          {/* First circle (stop icon) */}
          <G
            fill={gradientColorTo}
            transform={{ translate: `${stop.toX}, ${stop.toY}` }}
            {...panResponder.panHandlers}
          >
            <Circle
              r={(strokeWidth - 1) / 2}
              fill={startCircleColor}
              stroke={gradientColorTo}
              strokeWidth="0"
            />
            <G
              transform={{
                translate: `${-iconWidth / 2.7}, ${-iconHeight / 2.5}`, // Center the icon
              }}
            >
              {stopIcon}
            </G>
          </G>

          {/* Second circle (start icon) - applying the same structure as the first */}
          <G
            fill={gradientColorFrom}
            transform={{ translate: `${start.fromX}, ${start.fromY}` }}
            {...panResponder.panHandlers}
          >
            <Circle
              r={(strokeWidth - 1) / 2}
              fill={endCircleColor}
              stroke={gradientColorFrom}
              strokeWidth="1"
            />
            <G
              transform={{
                translate: `${-iconWidth / 2.7}, ${-iconHeight / 2.5}`, // Same as the first circle
              }}
            >
              {startIcon}
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
};

export default CircularSlider;
