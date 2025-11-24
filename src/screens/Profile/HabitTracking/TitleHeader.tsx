import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
interface titleHeaderProps {
  title?: string;
}
const TitleHeader: React.FC<titleHeaderProps> = ({ title }) => {
  return (
    <View
      style={{
        gap: moderateScale(15),
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors?.SurfCrest,
          fontSize: textScale(14),
          fontWeight: "600",
        }}
      >
        {title ?? "Frequency"}
      </Text>
      <View
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          height: StyleSheet.hairlineWidth,
          // flex: 1,
          width: "100%",
          borderColor: "rgba(203, 226, 209, 0.28)",
        }}
      />
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({});
