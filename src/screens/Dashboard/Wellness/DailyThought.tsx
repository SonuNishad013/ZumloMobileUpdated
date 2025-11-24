import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import RoundButton from "../../../components/Buttons/roundButton";
import { PlayIcon } from "../../../assets";

interface Props {
  navigation?: any;
  dailyThought?: any;
}

const DailyThought: React.FC<Props> = ({ navigation, dailyThought }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{dailyThought?.title}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{dailyThought?.type}</Text>
          <Text style={styles.dot}>-</Text>
          <Text style={styles.duration}>{dailyThought?.time}</Text>
        </View>
      </View>
      <View>
        <RoundButton
          mainContainer={styles.buttonContainer}
          SvgIcon={PlayIcon}
        />
      </View>
    </View>
  );
};

export default DailyThought;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(95),
    width: moderateScale(331),
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.white,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  category: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.white,
  },
  dot: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.white,
  },
  duration: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.white,
  },
  buttonContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
});
