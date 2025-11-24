import { FunctionComponent, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { dashboardLabelAlignemnt } from "../../../utils/TextConfig";
import colors from "../../../constant/colors";
import { textScale } from "../../../constant/responsiveStyle";

interface LabelHeaderProps {
  title: any;
  showAll: any;
  seelAllClick: any;
}
const LabelHeader: FunctionComponent<LabelHeaderProps> = ({
  title,
  showAll,
  seelAllClick,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: dashboardLabelAlignemnt?.topSpace,
        marginBottom: dashboardLabelAlignemnt?.bottomSpace,
        paddingLeft: dashboardLabelAlignemnt?.leftSpace,
      }}
    >
      <Text
        style={{
          color: colors.prussianBlue,
          fontSize: dashboardLabelAlignemnt?.fontSize,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>
      {showAll && (
        <TouchableOpacity onPress={() => seelAllClick()}>
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "400",
              color: colors.polishedPine,
            }}
          >
            {"See All"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default LabelHeader;
