import { ImageStyle, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import RoundButton from "../Buttons/roundButton";

interface Props {
  icon?: any;
  title?: any;
  quantity?: any;
  duration?: any;
  container?: ViewStyle;
  roundButtonIcon?: ImageStyle;
  roundButtonContainer?: ViewStyle;
}

const SecondaryGoalsCard: React.FC<Props> = ({
  icon,
  title,
  quantity,
  duration,
  container,
  roundButtonIcon,
  roundButtonContainer,
}) => {
  return (
    <View style={[styles?.container, container]}>
      <View style={styles?.card}>
        <View style={styles?.header}>
          <RoundButton
            PngIcon={true}
            mainContainer={[styles?.roundButtonContainer, roundButtonContainer]}
            iconStyle={[styles?.roundButtonIcon, roundButtonIcon]}
            iconShow={icon}
            resizeMode={"contain"}
          />
          <Text style={styles?.title}>{title}</Text>
        </View>
        <View style={styles?.quantityContainer}>
          <Text style={styles?.quantity}>
            {quantity}
            {"/"}
          </Text>
          <Text style={styles?.duration}>{duration}</Text>
        </View>
      </View>
    </View>
  );
};

export default SecondaryGoalsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.royalOrange,
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(20),
    borderColor: colors?.white,
    borderWidth: moderateScale(1),
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundButtonContainer: {
    height: moderateScale(26),
    width: moderateScale(26),
    borderColor: colors?.white,
    borderWidth: moderateScale(1),
  },
  roundButtonIcon: {
    height: moderateScale(14),
    width: moderateScale(14),
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.white,
    marginLeft: moderateScale(7),
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  quantity: {
    color: colors.white,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  duration: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.white,
    marginBottom: moderateScale(0.4),
  },
});
