import {
  FlatList,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../components/Header/commonHeader";
import { imagePath } from "../../assets/png/imagePath";
import { strings } from "../../constant/strings";
import MusicPlayButton from "../../components/OnBoardiingComponents/MusicPlayButton";
import { findValueByKey } from "../Dashboard/Summary/component/Hooks/transformGoalsFromAPI";
import logger from "../../constant/logger";
import { parseDurationToMinutesString } from "../OnBoarding/AIGeneration/CommonScreen/AllRecommendationList";

const ResourceLibraryTempDetails = ({ route, navigation }: any) => {
  const { data } = route?.params;
  const renderMusic = (itm: any) => {
    Linking.openURL(itm);
  };
  console.log("ResourceLibraryTempDetails route", data);
  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <ImageBackground
        style={styles.imageBackground}
        source={imagePath?.BGMeditation}
      >
        <CommonHeader
          onBackPress={() => navigation?.goBack()}
          mainContainer={styles.headerMainContainer}
          iconContainer={styles.headerIconContainer}
          textStyle={styles.headerTextStyle}
        />
      </ImageBackground>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {data?.subCategory ? data?.subCategory : "Some sugesstions for you"}
          </Text>
          <Text style={styles.description}>
            {data?.subActivityName
              ? data?.subActivityName
              : data?.description
              ? data?.description
              : "List of sugesstions"}
          </Text>
          <Text style={styles.otherSessions}>{strings?.otherSessions}</Text>
        </View>
      </View>
      <View style={styles.div} />
      <View style={styles.recommendationsContainer}>
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          data={data?.resourceContent ? data?.resourceContent : data?.items}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeparator} />;
          }}
          renderItem={({ item }: any) => {
            let duration_: any = findValueByKey(item, "duration");
            logger("duration____", duration_);
            return (
              <MusicPlayButton
                activityContainer={styles.musicPlayButtonContainer}
                title={item?.category}
                durationMusic={parseDurationToMinutesString(duration_)}
                onPress={() => renderMusic(item?.link)}
              />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ResourceLibraryTempDetails;

const styles = StyleSheet.create({
  imageBackground: {
    height: moderateScale(291),
    paddingHorizontal: moderateScale(19),
  },
  headerMainContainer: {
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  headerIconContainer: {
    backgroundColor: colors.saltOpLight2,
  },
  headerTextStyle: {
    color: colors.SurfCrest,
  },
  mainContainer: {
    backgroundColor: colors.SurfCrest,
  },
  textContainer: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
  },
  title: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.prussianBlue,
    width: moderateScale(310),
  },
  description: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.prussianBlue,
    marginTop: moderateScale(10),
  },
  otherSessions: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.prussianBlue,
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
  div: {
    height: moderateScale(1),
    backgroundColor: colors.prussianBlue,
  },
  recommendationsContainer: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  itemSeparator: {
    height: moderateScale(1),
    flex: 1,
    backgroundColor: colors.blackO,
    marginLeft: moderateScale(19),
  },
  musicPlayButtonContainer: {
    marginHorizontal: moderateScale(19),
    marginVertical: moderateScale(20),
  },
});
