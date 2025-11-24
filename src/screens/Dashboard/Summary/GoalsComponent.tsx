import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import moment from "moment";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  title?: any;
  startDate?: any;
  EndDate?: any;
  update?: any;
  container?: ViewStyle;
  titleStyle?: TextStyle;
  countContainer?: ViewStyle;
  countText?: TextStyle;
  unitText?: TextStyle;
  updateText?: TextStyle;
  currentStats?: () => void;
  selectedStat?: string;
}

const GoalsCard: React.FC<Props> = ({
  title,
  startDate,
  EndDate,
  container,
  titleStyle,
  countContainer,
  countText,
  unitText,
  currentStats,
}) => {
  return (
    <TouchableOpacity
      style={[defaultStyles?.container, container, {}]}
      onPress={currentStats}
    >
      <Text style={[defaultStyles?.title, titleStyle]}>{title || "--"}</Text>
      <View style={[defaultStyles?.countContainer, countContainer]}>
        <Text style={[defaultStyles?.countText, countText]}>
          {"Start Date" + ": "}
          <Text style={[defaultStyles?.unitText, unitText]}>
            {moment(startDate).format("DD MMM YYYY")}
          </Text>
        </Text>
        <Text style={[defaultStyles?.countText, countText]}>
          {"End Date" + ": "}
          <Text style={[defaultStyles?.unitText, unitText]}>
            {moment(EndDate).format("DD MMM YYYY")}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoalsCard;

const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    // height: moderateScale(107),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(20),
    backgroundColor: colors?.polishedPine,
    justifyContent: "flex-end",
    // borderWidth: true:,
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginBottom: moderateScale(5),
  },
  countContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  countText: {
    fontWeight: "500",
    fontSize: textScale(12),
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
  unitText: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  updateText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
