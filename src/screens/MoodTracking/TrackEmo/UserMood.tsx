import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CommonBoxButton from "../../../components/Buttons/commonBoxButton";
import {
  NeutralIcon03,
  RelaxedEmoji,
  RelaxedIcon4,
  StressedEmoji,
  StressedIcon02,
  VeryRelaxedEmoji,
  VeryRelaxedIcon5,
  VeryStressedEmoji,
  VeryStressedIcon01,
} from "../../../assets";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { FlatList } from "react-native-gesture-handler";
import { strings } from "../../../constant/strings";
import CustomImage from "../../../components/ImageRender";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  emoData?: any;
  userMood?: any;
  data?: any;
  selectedOption?: any;
}

const UserMood: React.FC<Props> = ({ userMood, data, selectedOption }) => {
  const emoData: any[] = [
    {
      id: 1,
      icon: VeryStressedIcon01,
      title: "Very Stressed",
      emoji: VeryStressedEmoji,
    },
    {
      id: 2,
      icon: StressedIcon02,
      title: "Stressed",
      emoji: StressedEmoji,
    },
    {
      id: 3,
      icon: NeutralIcon03,
      title: "Neutral",
      emoji: RelaxedEmoji,
    },
    {
      id: 4,
      icon: RelaxedIcon4,
      title: "Relaxed",
      emoji: RelaxedEmoji,
    },
    {
      id: 5,
      icon: VeryRelaxedIcon5,
      title: "Very Relaxed",
      emoji: VeryRelaxedEmoji,
    },
  ];
  const [emoji, setEmoji] = useState<any>(emoData[0]?.emoji);
  const [idx, setIdx] = useState(0);
  const [moodText, setMoodText] = useState("Very Stressed");

  const renderMood = (item: any, index: any) => {
    setIdx(index);
    setMoodText(item?.title);
    setEmoji(item?.emoji);
  };

  useEffect(() => {
    userMood(moodText);
    selectedOption(data?.moodTrackingStepOptions[idx]);
  }, [moodText]);

  const renderItems = (item: any, index: any) => {
    return (
      <View style={style?.flatListMainContainer}>
        <CommonBoxButton
          SvgIcon={item?.icon}
          mainContainer={{
            backgroundColor:
              index === idx ? colors?.royalOrange : "rgba(255, 255, 255, 0.7)",
            height: index === idx ? moderateScale(71) : moderateScale(57),
            width: index === idx ? moderateScale(71) : moderateScale(57),
            borderRadius: index === idx ? moderateScale(10) : moderateScale(0),
            opacity: index == idx ? 1 : 0.5,
            borderRightWidth: index == idx ? 0 : 1,
            borderColor: colors?.white,
            borderBottomStartRadius: index === 0 || index === idx ? 10 : 0,
            borderTopStartRadius: index === 0 || index === idx ? 10 : 0,
            borderBottomEndRadius: index === 4 || index === idx ? 10 : 0,
            borderTopEndRadius: index === 4 || index === idx ? 10 : 0,
          }}
          onPress={() => renderMood(item, index)}
        />
      </View>
    );
  };

  return (
    <View style={style.container}>
      <Text style={style.heading}>{data?.stepName}</Text>
      <View
        style={[
          style?.emojiContainer,
          { width: moderateScale(200), height: moderateScale(200) },
        ]}
      >
        {/* <Image
          source={{ uri: data?.moodTrackingStepOptions[idx]?.logo }}
          style={{
            height: moderateScale(149),
            width: moderateScale(149),
            alignSelf: "center",
          }}
          resizeMode="contain"
        /> */}
        <CustomImage
          source={{ uri: data?.moodTrackingStepOptions[idx]?.logo }}
          width={moderateScale(149)}
          height={moderateScale(149)}
          // tintColor={tintIconColor}
          mainContainer={{ alignSelf: "center" }}
          isTintColor={false}
        />
      </View>

      <Text style={style.moodText}>
        {data?.moodTrackingStepOptions[idx]?.optionValue}
      </Text>
      <FlatList
        scrollEnabled={false}
        data={emoData}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        contentContainerStyle={style?.contentContainerStyle}
        renderItem={({ item, index }: any) => renderItems(item, index)}
      />
      <Text style={style.submoodText}>{"Tap the face that feels right "}</Text>
    </View>
  );
};

export default UserMood;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: moderateScale(150),
    width: moderateScale(150),
    alignSelf: "center",
    marginTop: moderateScale(40),
  },
  heading: {
    fontSize: textLabelSize?.fieldText,
    fontWeight: "600",
    color: colors?.SurfCrest,
    width: moderateScale(222),
    textAlign: "center",
    alignSelf: "center",
  },
  moodText: {
    fontSize: textLabelSize?.mainTitle,
    fontWeight: "700",
    color: colors?.SurfCrest,
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
  submoodText: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "400",
    color: colors?.royalOrangeDark,
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  contentContainerStyle: { alignItems: "center" },
  emojiContainer: { marginTop: moderateScale(40) },
  flatListMainContainer: { marginTop: moderateScale(40) },
});
