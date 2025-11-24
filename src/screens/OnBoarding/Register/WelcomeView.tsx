import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  seekerName?: any;
}

const WelcomeView: React.FC<Props> = ({ seekerName }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        {`${strings.welcomeUser}${seekerName}` + "!"}
      </Text> */}
      <Text style={styles.title}>
        {`Just a few taps, ${seekerName} — then it’s all about you. `}
      </Text>
      <Text
        style={styles.title2}
      >{`Choose what’s easiest — phone, email, or a quick sign-in. `}</Text>
      {/* <Text style={styles.subtitle}>{strings.WelcomeTitle}</Text> */}
    </View>
  );
};

export default WelcomeView;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
  title: {
    fontSize: textLabelSize?.headerTextSize,
    color: colors.SurfCrest,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: textLabelSize?.subHeaderTextSize,
    color: colors.whiteOp6,
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  title2: {
    fontSize: textScale(17),
    color: colors.royalOrangeDark,
    fontWeight: "500",
    marginTop: moderateScale(15),
  },
});
