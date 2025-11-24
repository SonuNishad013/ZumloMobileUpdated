import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import navigationString from "../../../navigation/navigationString";
import { RightArrowWithBackgrpoundIcon } from "../../../assets";
import { APPLY_STATUS } from "../../../constant/ENUM";

interface RecommendationCardProps {
  navigation: any;
  allRecommendations: any;
}
const RecommendationCard: React.FC<RecommendationCardProps> = ({
  //Dashboard card for going to see recommendation.
  navigation,
  allRecommendations,
}: RecommendationCardProps) => {
  return (
    <ImageBackground
      source={imagePath.d_purple_7}
      style={styles?.conatiner}
      resizeMode={APPLY_STATUS?.cover}
    >
      <Text style={styles?.titleText}>{string?.title}</Text>
      <Text style={styles?.subTitleText}>{string?.subtitle}</Text>
      <TouchableOpacity
        style={styles?.buttonView}
        onPress={() => {
          navigation.navigate(navigationString?.AllRecommendations, {
            allRecommendations: allRecommendations,
          });
        }}
      >
        <View style={styles?.dummyView} />
        <Text style={styles?.viewMoreView}>{string?.View_More}</Text>
        <RightArrowWithBackgrpoundIcon
          width={`${moderateScale(25)}`}
          height={`${moderateScale(25)}`}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const string = {
  title: `Here’s what we’ve\nhandpicked for you.`,
  subtitle: `Based on your selected\nrecommendations, here are some\ntop picks we think you'll enjoy. `,
  View_More: "View More",
};
export default RecommendationCard; //Dashboard card for going to see recommendation.
const styles = StyleSheet.create({
  conatiner: {
    borderRadius: moderateScale(17),
    overflow: "hidden",
    padding: moderateScale(20),
  },
  titleText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: colors?.royalOrangeDark,
  },
  subTitleText: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    fontStyle: "italic",
    marginTop: moderateScale(10),
  },
  buttonView: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(20),
    alignSelf: "flex-start",
  },
  dummyView: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  viewMoreView: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "600",
    marginHorizontal: moderateScale(5),
    textAlign: "center",
    paddingHorizontal: moderateScale(25),
  },
});
