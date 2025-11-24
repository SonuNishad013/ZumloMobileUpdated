import { Image, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  startFrom?: any;
  endTo?: any;
  title?: any;
  length?: any;
  icon?: any;
  circle?: ViewStyle;
  separatorLineBottom?: ViewStyle;
  separatorLineTop?: ViewStyle;
}
const TaskCard: React.FC<Props> = ({
  startFrom,
  endTo,
  title,
  length,
  icon,
  circle,
  separatorLineBottom,
  separatorLineTop,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <View style={[styles.separatorLineTop, separatorLineTop]} />
        <View style={[styles.circle, circle]}></View>
        <View style={[styles.separatorLineBottom, separatorLineBottom]} />
      </View>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Image source={icon} resizeMode={"contain"}/>
        </View>
        <View style={styles.contentContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailsText}>{`${startFrom} - ${endTo}`}</Text>
            <Text style={styles.detailsText}>{length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    alignItems: "center",
    marginRight: moderateScale(10),
  },
  separatorLineTop: {
    width: moderateScale(0.1),
    flex: 1,
    borderWidth: moderateScale(1),
    borderStyle: "dashed",
  },
  separatorLineBottom: {
    width: moderateScale(0.1),
    flex: 1,
    borderWidth: moderateScale(1),
    borderStyle: "dashed",
  },
  circle: {
    height: moderateScale(12),
    width: moderateScale(12),
    backgroundColor: colors.polishedPine,
    borderRadius: moderateScale(6),
    borderColor: "white",
    borderWidth: moderateScale(1),
  },
  row: {
    flexDirection: "row",
    backgroundColor: colors.SaltBox,
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(10),
    flex: 1,
    marginVertical: moderateScale(10),
    paddingVertical: moderateScale(12),
  },

  iconWrapper: {
    height: moderateScale(55),
    width: moderateScale(55),
    alignItems: "center",
    borderRadius: moderateScale(8),
    backgroundColor: "#806E8B",
    justifyContent:"center"
  },
  contentContainer: {
    justifyContent: "space-between",
    paddingLeft: moderateScale(15),
    flex: 1,
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.SurfCrest,
  },
});
