import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  RelaxedEmoji,
  StressedEmoji,
  VeryRelaxedEmoji,
  VeryStressedEmoji,
} from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  data?: any;
}

const EmoText: React.FC<Props> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subemojiText}>{"Noted! Your mood’s logged"}</Text>
      <Text style={styles.subTitle}>
        {
          "Want to share a bit more about how you're feeling? (Totally optional—only if you're up for it!)"
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  subemojiText: {
    fontSize: textLabelSize?.mainTitle,
    fontWeight: "600",
    color: colors?.royalOrangeDark,
    marginLeft: moderateScale(20),
    // alignSelf: "center",
    marginTop: moderateScale(25),
  },
  subTitle: {
    fontSize: textLabelSize?.subHeaderTextSize,
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginHorizontal: moderateScale(20),
    // alignSelf: "center",
    marginTop: moderateScale(10),
  },
  emojiText: {
    fontSize: textLabelSize?.fieldText,
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(20),
    // alignSelf: "center",
    marginTop: moderateScale(10),
  },

  messageText: {
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
    fontWeight: "500",
    fontSize: textScale(14),
  },
});

export default EmoText;
