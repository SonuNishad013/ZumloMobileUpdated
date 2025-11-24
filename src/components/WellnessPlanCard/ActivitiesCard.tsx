import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import CommonBoxButton from "../Buttons/commonBoxButton";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
  title?: any;
  quantity?: any;
  duration?: any;
  separatorLineTop?: ViewStyle;
  circle?: ViewStyle;
  separatorLineBottom?: ViewStyle;
  iconContainer?: ViewStyle;
}

const ActivitiesCard: React.FC<Props> = ({
  title,
  quantity,
  duration,
  separatorLineTop,
  circle,
  separatorLineBottom,
  iconContainer,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <View style={[styles.separatorLineTop, separatorLineTop]} />
        <View style={[styles.circle, circle]}></View>
        <View style={[styles.separatorLineBottom, separatorLineBottom]} />
      </View>
      <View style={styles.cardContent}>
        <CommonBoxButton
          PngIcon={true}
          source={imagePath?.DumbIcon}
          mainContainer={[styles.iconContainer, iconContainer]}
          iconStyle={styles.iconStyle}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.details}>
            {quantity}/{duration}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivitiesCard;

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
    borderColor: colors?.royalOrange,
  },
  separatorLineBottom: {
    width: moderateScale(0.1),
    flex: 1,
    borderWidth: moderateScale(1),
    borderStyle: "dashed",
    borderColor: colors?.royalOrange,
  },
  circle: {
    height: moderateScale(12),
    width: moderateScale(12),
    backgroundColor: colors.royalOrange,
    borderRadius: moderateScale(6),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.polishedPine,
    borderWidth: moderateScale(1),
    paddingVertical: moderateScale(11),
    paddingHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    flex: 1,
    marginVertical: moderateScale(5),
  },
  iconContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(9),
    backgroundColor: colors.SaltBox,
  },
  iconStyle: {
    tintColor: colors.SurfCrest,
  },
  textContainer: {
    marginLeft: moderateScale(10),
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  details: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.prussianBlue,
    marginTop: moderateScale(2),
  },
});
