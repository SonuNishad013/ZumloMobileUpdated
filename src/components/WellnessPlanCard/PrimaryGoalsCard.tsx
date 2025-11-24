import { ImageStyle, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import RoundButton from "../Buttons/roundButton";

interface Props {
  title?: any;
  description?: any;
  card?: ViewStyle;
  roundMainContainer?: ViewStyle;
  iconStyle?: ImageStyle;
  meter?:any
  value?:any
  time?:any
  iconShow?:any
}

const PrimaryGoalsCard: React.FC<Props> = ({
  title,
  description,
  card,
  roundMainContainer,
  iconStyle,
  meter,
  time,
  value,
  iconShow
}) => {
  return (
    <View style={[styles.card, card]}>
      <View style={styles.headerContainer}>
        <View style={styles.goalContainer}>
          <RoundButton
            PngIcon={true}
            mainContainer={[styles?.roundMainContainer, roundMainContainer]}
            iconStyle={[styles?.iconStyle, iconStyle]}
            resizeMode={"contain"}
            iconShow={{uri:iconShow}}
          />
          <Text style={styles.goalText}>{title}</Text>
        </View>
        <View style={styles.unitContainer}>
          <Text style={styles.unitText}>{meter}</Text>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
      <Text style={styles.descriptionText}> 
      {description}
      </Text>
    </View>
  );
};

export default PrimaryGoalsCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.prussianBlue,
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(15),
    borderRadius: moderateScale(10),
    paddingBottom: moderateScale(20),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  goalText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
    marginLeft: moderateScale(7),
  },
  unitContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitText: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(1.5),
    marginRight:moderateScale(2)
  },
  valueText: {
    fontSize: textScale(14),
    color: colors.SurfCrest,
    fontWeight: "600",
    marginLeft: moderateScale(0.5),
  },
  timeText: {
    fontWeight: "400",
    fontSize: textScale(10),
    color: colors.SurfCrest,
    marginLeft: moderateScale(5),
    marginTop: moderateScale(2.5),
  },
  descriptionText: {
    fontSize: textScale(10),
    color: colors.SurfCrest,
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  roundMainContainer: {
    height: moderateScale(26),
    width: moderateScale(26),
    borderColor:colors?.SurfCrest,
    borderWidth:moderateScale(1)
  },
  iconStyle: {
    height: moderateScale(14),
    width: moderateScale(14),
  },
});
