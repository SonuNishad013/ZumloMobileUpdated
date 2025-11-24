import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import moment from "moment";

interface Props {
  title?: any;
  count?: any;
  unit?: any;
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

const StatsCard: React.FC<Props> = ({
  title,
  count,
  unit,
  update,
  container,
  titleStyle,
  countContainer,
  countText,
  unitText,
  updateText,
  currentStats,
  selectedStat,
}) => {
  console.log("selectedStat stats card data", selectedStat);
  return (
    <Pressable
      style={[
        defaultStyles?.container,
        container,
        {
          borderWidth: 1,
          borderColor:
            title === selectedStat ? colors?.SurfCrest : colors?.transparent,
        },
      ]}
      onPress={currentStats}
    >
      <Text style={[defaultStyles?.title, titleStyle]}>{title || "--"}</Text>
      <View style={[defaultStyles?.countContainer, countContainer]}>
        <Text style={[defaultStyles?.countText, countText]}>
          {count || "--"}
          <Text style={[defaultStyles?.unitText, unitText]}>
            {unit || "--"}
          </Text>
        </Text>
        <Text style={[defaultStyles?.updateText, updateText]}>
          {update ? `Last update ${moment(update + "Z").fromNow()}` : "--"}
        </Text>
      </View>
    </Pressable>
  );
};

export default StatsCard;

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
    fontSize: textScale(24),
    color: colors?.SurfCrest,
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
