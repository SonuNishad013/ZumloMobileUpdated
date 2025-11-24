import React, { ReactElement } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import {
  BirdIcon,
  CommmunitySmallIcon,
  HalfMoonIcon,
  MindfulnessIcon,
  VideoPlayIcon,
} from "../../../assets";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";
import { APPLY_STATUS } from "../../../constant/ENUM";
interface Props {
  navigation?: any;
  MindfulnessData?: any;
}
const Mindfulness: React.FC<Props> = ({
  navigation,
  MindfulnessData,
}): ReactElement => {
  const renderMindfulness = (item: any, index: any) => {
    switch (item?.type) {
      case strings?.session:
        return (
          <View style={styles.sessionContainer}>
            <View style={styles.sessionContent}>
              <View style={styles.sessionDetails}>
                <Text style={styles.sessionTitle}>
                  {item.details?.[0]?.name}
                </Text>
                <Text style={styles.sessionDescription}>
                  {item.details?.[0]?.description}
                </Text>
              </View>
              <BirdIcon />
            </View>
            <View style={styles.sessionFooter}>
              <View style={styles.membersContainer}>
                <CommmunitySmallIcon />
                <Text style={styles.membersCount}>
                  {item.details?.[0]?.count + " " + strings?.Members}
                </Text>
              </View>
              <MindfulnessIcon />
            </View>
          </View>
        );
      case strings?.video_:
        return (
          <View style={styles.videoContainer}>
            <ImageBackground
              source={imagePath.nightBackground}
              resizeMode={APPLY_STATUS?.contain}
              style={styles.imageBackground}
            >
              <View style={styles.videoContent}>
                <View style={styles.videoDetails}>
                  <Text style={styles.videoTitle}>
                    {item?.details?.[0]?.name}
                  </Text>
                  <View>
                    <Text style={styles.videoDescription}>
                      {item?.details?.[0]?.description}
                    </Text>
                    <Text style={styles.videoDuration}>
                      {item?.details?.[0]?.duration}
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <HalfMoonIcon />
                  <View style={styles.playNowContainer}>
                    <Text style={styles.playNowText}>{strings?.Play_Now}</Text>
                    <TouchableOpacity>
                      <VideoPlayIcon />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        );
      default:
        break;
    }
  };

  return (
    <FlatList
      data={MindfulnessData}
      keyExtractor={(item, index) => "key" + index}
      ListHeaderComponent={() => (
        <HeaderWithNameSeeAll
          name={strings?.Categories_specific}
          msg={strings?.View_All}
          container={{ marginTop: moderateScale(10) }}
        />
      )}
      renderItem={({ item, index }) => renderMindfulness(item, index)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
  },

  sessionContainer: {
    backgroundColor: colors.lightroyalOrange,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    // padding: moderateScale(15),
  },
  sessionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor:'red'
    padding: moderateScale(15),
  },
  sessionDetails: {
    width: width / 1.9,
  },
  sessionTitle: {
    color: colors.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  sessionDescription: {
    color: colors.prussianBlue,
    fontSize: textScale(10),
    fontWeight: "400",
    marginVertical: moderateScale(5),
    marginTop: moderateScale(20),
  },
  sessionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(10),
    // backgroundColor:'red'
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: moderateScale(15),
  },
  membersCount: {
    color: colors.prussianBlue,
    fontSize: textScale(10),
    fontWeight: "400",
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(5),
  },
  videoContainer: {},
  imageBackground: {
    height: moderateScale(120),
  },
  videoContent: {
    margin: moderateScale(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  videoDetails: {
    flexDirection: "column",
    height: moderateScale(95),
    justifyContent: "space-evenly",
  },
  videoTitle: {
    color: colors.lightblue,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  videoDescription: {
    color: colors.lightblue,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  videoDuration: {
    color: colors.lightblue,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  iconContainer: {
    flexDirection: "column",
    height: moderateScale(95),
    justifyContent: "space-between",
  },
  playNowContainer: {
    flexDirection: "row",
    marginHorizontal: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  playNowText: {
    color: colors.lightblue,
    fontSize: textScale(14),
    fontWeight: "600",
    marginHorizontal: moderateScale(5),
  },
});

export default Mindfulness;
