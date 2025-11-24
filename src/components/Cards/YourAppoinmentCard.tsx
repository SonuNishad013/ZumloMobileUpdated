import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { CalendarIcon, Clock, Phone } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import RoundButton from "../Buttons/roundButton";
import CommonButton from "../Buttons/commonButton";

interface Props {
  date?:any
  time?:any
  status?:string
}
const YourAppoinmentCard: React.FC<Props> = ({date,time,status}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.infoRowTop}>
          <View style={styles.iconContainer}>
            <CalendarIcon />
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <RoundButton
            mainContainer={styles.roundButtonContainer}
            SvgIcon={Phone}
          />
        </View>
        <View style={styles?.infoRowBottom}>
          <Clock />
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <CommonButton
        activeOpacity={1}
          btnName={status}
          mainContainer={styles.callButtonContainer}
        />
      </View>
    </View>
  );
};

export default YourAppoinmentCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    paddingLeft: moderateScale(5),
    borderRadius: moderateScale(8),
    overflow: "hidden",
  },
  contentContainer: {
    backgroundColor: colors?.SaltBox,
    paddingTop: moderateScale(9),
  },
  infoRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  infoRowBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: moderateScale(2),
    paddingHorizontal: moderateScale(15),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    marginLeft: moderateScale(5),
  },
  timeText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    marginLeft: moderateScale(7),
  },
  roundButtonContainer: {
    height: moderateScale(30),
    width: moderateScale(30),
    backgroundColor: colors?.darkbackgroundTheme,
  },
  callButtonContainer: {
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(0),
    borderBottomLeftRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(0),
    width: moderateScale(89),
    height: moderateScale(25),
    alignSelf: "flex-end",
    backgroundColor: colors?.surfCrustOp,
  },
});
