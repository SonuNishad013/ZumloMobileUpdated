import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import RecommendationCard from "../../../components/OnBoardiingComponents/RecommendationCard";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import colors from "../../../constant/colors";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import {
  RecommendationQoute,
  RightArrowWithBackgrpoundIcon,
  bg_aff,
} from "../../../assets";
import { strings } from "../../../constant/strings";
import logger from "../../../constant/logger";
import { examplerImage } from "../../../constant/RecommendationConstant";
import Affirmations from "./Affirmations";
interface Props {
  navigation?: any;
  recommendationData?: any;
  isLoading?: boolean;
  resourceLibrary?: boolean;
}
const RecommendationsList: React.FC<Props> = ({
  //NOT USING ANYWHERE IN THE APP
  navigation,
  recommendationData,
  isLoading,
  resourceLibrary,
}) => {
  const renderData = resourceLibrary
    ? recommendationData.slice(0, 1)
    : recommendationData.slice(0, 3);
  return (
    <>
      <HeaderWithNameSeeAll
        name={strings?.Daily_Recommendations}
        msg={strings?.seeAll}
        onPress={() => {
          navigation?.navigate(navigationString?.AllRecommendations, {
            allRecommendations: recommendationData,
          });
        }}
        showSeeAll={renderData?.length ? true : false}
      />

      <View style={styles.container}>
        <View style={styles?.contain}>
          <Image source={imagePath?.bg_aff} style={styles?.Affirmations_bg} />
          {/* <RecommendationQoute width={width - 30} height={width * 0.4} /> */}
        </View>
        <View style={styles?.position}>
          <Text style={styles.overlayText}>
            {strings?.Power_your_day_with_daily_affirmation}
          </Text>
          <TouchableOpacity
            style={styles.upgradeButtonContainer}
            onPress={() => {
              navigation.navigate(navigationString?.Affirmations, {
                from: strings?.recommendations,
                data: [
                  {
                    name: strings?.What_You_Think_You_Become,
                    description:
                      strings?.Affirmations_are_powerful_statements_that_reshape_your_mindset,
                    msg: strings?.Success_money_and_happiness,
                  },
                ],
              });
            }}
          >
            <View
              style={{ width: moderateScale(25), height: moderateScale(25) }}
            />
            <Text style={styles.upgradeText}>{strings?.View_}</Text>
            <RightArrowWithBackgrpoundIcon
              width={`${moderateScale(25)}`}
              height={`${moderateScale(25)}`}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <ShimmerPlaceHolder
          width={width - moderateScale(50)}
          height={moderateScale(110)}
          backgroundColor={colors.darkthemeColor}
        ></ShimmerPlaceHolder>
      ) : (
        <FlatList
          style={styles?.flatlistStyle}
          keyExtractor={(item, index) => "key" + index}
          data={renderData}
          renderItem={({ item, index }: any) => (
            <RecommendationCard
              title={item?.title ? item?.title : "--"}
              description={item?.description ? item?.description : "--"}
              frequency={item?.frequency ? item?.frequency : "--"}
              items={
                item?.items?.length > 0 || item?.items
                  ? item?.items?.length
                  : "--"
              }
              source={
                item?.logo && !examplerImage.includes(item.logo)
                  ? { uri: item?.logo }
                  : imagePath?.VideoPlayButton
              }
              onPress={() =>
                navigation?.navigate(navigationString?.RecommendationList, {
                  data: item,
                })
              }
              card={{
                backgroundColor:
                  index % 2 == 0 ? colors.SaltBox : colors.polishedPine,
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default RecommendationsList; //NOT USING ANYWHERE IN THE APP

const styles = StyleSheet.create({
  container: {
    position: "relative", // Allows children to be absolutely positioned
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    textAlign: "center",
    color: colors.royalOrange, // or whatever stands out on the SVG
    fontSize: textScale(14),
    fontWeight: "600",
  },
  upgradeButtonContainer: {
    backgroundColor: "rgb(54,87,103)",
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(15),
  },
  upgradeText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "600",
    marginHorizontal: moderateScale(5),
    textAlign: "center",
    // marginLeft: moderateScale(50),
  },
  contain: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  position: {
    position: "absolute",
  },
  flatlistStyle: {
    gap: moderateScale(10),
  },
  Affirmations_bg: {
    height: moderateScale(140),
    width: Dimensions?.get("window")?.width - moderateScale(40),
    resizeMode: "stretch",
    marginBottom: moderateScale(20),
  },
});
