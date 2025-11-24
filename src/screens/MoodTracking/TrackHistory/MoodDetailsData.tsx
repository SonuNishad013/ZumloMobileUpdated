import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { LampOnIcon, PlusIconGreen, SubGreen } from "../../../assets";
import moment from "moment";
import { strings } from "../../../constant/strings";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import CustomImage from "../../../components/ImageRender";

interface Props {
  moodType?: any;
  createdDate?: any;
  title?: any;
  description?: any;
  aiTipsList?: any;
  item?: any;
  type?: any;
  isFade?: boolean;
}

const MoodDetailsData: React.FC<Props> = ({
  moodType,
  createdDate,
  title,
  description,
  aiTipsList,
  item,
  type,
  isFade,
}) => {
  const [showFullData, setShowFullData] = useState(false);
  const getShowFullData = () => {
    setShowFullData(!showFullData);
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors?.transparent,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        {type === strings?.moodTracking_ && (
          // <Image
          //   source={
          //     item?.logo !== "" ? { uri: item?.logo } : imagePath?.SadIcon
          //   }
          //   style={styles.image}
          //   resizeMode={"contain"}
          // />
          <CustomImage
            source={{ uri: item?.logo }}
            width={moderateScale(34)}
            height={moderateScale(34)}
            isTintColor={false}
          />
        )}
        <View>
          <Text style={styles.moodType}>{formatSentenceCase(moodType)}</Text>
          <Text style={styles.createDate}>
            {moment(moment(createdDate + "Z").toLocaleString()).format(
              "hh:mm a"
            )}
          </Text>
        </View>
      </View>
      {/* <Text style={styles.title}>{title}</Text>  moment(createdDate + "Z").toLocaleString() */}
      <Text
        numberOfLines={showFullData ? undefined : 1}
        style={styles.description}
      >
        {formatSentenceCase(description)}
      </Text>
      {description?.length > 50 && (
        <View style={styles.readMoreContainer}>
          {showFullData ? (
            <SubGreen height={moderateScale(12)} width={moderateScale(12)} />
          ) : (
            <PlusIconGreen
              height={moderateScale(12)}
              width={moderateScale(12)}
            />
          )}
          <Text onPress={getShowFullData} style={styles.readMoreText}>
            {showFullData ? "Read less" : "Read more"}
          </Text>
        </View>
      )}
      <View style={styles.divider} />
      <View style={styles.tipIconContainer}>
        <LampOnIcon height={moderateScale(16)} width={moderateScale(16)} />
        <Text style={styles.tipText}>{"Tip of day"}</Text>
      </View>
      <FlatList
        keyExtractor={(item, index) => "key" + index}
        data={aiTipsList.length > 3 ? aiTipsList.slice(0, 3) : aiTipsList}
        renderItem={({ item, index }) => {
          return <AiTips title={item?.title} tip={item?.tip} index={index} />;
        }}
      />
      <View
        style={{
          borderWidth: 1,
          marginTop: moderateScale(15),
          // borderColor: colors?.royalOrange,
          borderColor: colors?.transparent,
        }}
      />
    </View>
  );
};

const AiTips = ({ tip, index }: any) => {
  return (
    <>
      <View style={styles.tipContainer}>
        <Text style={styles.tipDescription}>
          {index + 1}. {formatSentenceCase(tip)}
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  image: {
    height: moderateScale(34),
    width: moderateScale(34),
    tintColor: colors?.SurfCrest,
  },
  moodType: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  createDate: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
    width: "82%",
  },
  description: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(7),
  },
  readMoreText: {
    fontSize: moderateScale(14),
    fontWeight: "500",
    color: colors?.polishedPine,
    marginLeft: moderateScale(5),
  },
  divider: {
    height: moderateScale(1),
    backgroundColor: colors?.royalOrange,
    marginTop: moderateScale(15),
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
    justifyContent: "space-between",
  },
  tipTitle: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  tipIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  tipText: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.royalOrange,
    marginLeft: moderateScale(5),
  },
  tipDescription: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
});

export default MoodDetailsData;
