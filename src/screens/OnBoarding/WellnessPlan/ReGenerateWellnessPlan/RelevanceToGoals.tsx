import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AnswerTitle from "./AnswerTitle";
// import { style } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import { height, moderateScale, textScale, width } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import colors from "../../../../constant/colors";
import Slider from "@react-native-community/slider";
import { imagePath } from "../../../../assets/png/imagePath";

const RelevanceToGoals = ({ title, onPress, quesData, currentIndex, regenerationStepTypeId, fieldType }: any) => {
  const [learningIndex, setLearningIndex] = useState(-1);
  const PickAnswer = [
    { title: "Required more time than I can commit" },
    { title: "Fit well into my schedule" },
    { title: "Had too little activity" },
  ];
  const slider = useRef();
  const images = [
    imagePath?.Always,
    imagePath?.Always,
    imagePath?.Always,
    imagePath?.Always,
    imagePath?.Always,
  ];

  const [idx, setIdx] = useState(1);

  const handleButtonClick = (isIncrement: boolean) => {
    if (isIncrement) {
      setIdx((prevIndex) => prevIndex + 1);
    } else {
      setIdx((prevIndex) => prevIndex - 1);
    }
  };

  // useEffect(() => {
  //   slider?.current?.scrollToIndex({ animated: false, index: idx });
  // }, [idx]);

  const onViewableItemsChanged = ({ viewableItems, changed }: any) => {
    let visibleIndex = viewableItems[0]?.index;
    if (visibleIndex >= 0) setIdx(visibleIndex);
  };

  const onSliderChange = (val: any, isIncrement: any) => {
    console.log("val-=-=>", val.toFixed());

    setIdx(val.toFixed())
    // const index = val.toFixed() - 1;
    // if (index >= 0 && index <= 4) {
    //   setIdx(index);
    // }
  };

  const onNext = () => {
    onPress(regenerationStepTypeId, quesData.regenerateStepId, false, idx, currentIndex, fieldType);
  }
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.titleHeader}>{title}</Text>
      {/* <Text style={styles.titleHeader1}>{quesData?.stepDescription}</Text> */}

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Slider
          style={{ height: moderateScale(40), width: width - moderateScale(50) }}

          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor="#FF9D48"
          maximumTrackTintColor="#CBE2D1"
          thumbTintColor={'#FF9D48'}

          onValueChange={(val) => onSliderChange(val, true)}
        // value={idx}
        />

        {/* {imageComponent()} */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            // marginTop: moderateScale(15),
            alignItems: 'center',
            marginHorizontal: moderateScale(15)
          }}
        >
          <Image
            source={imagePath?.infoCircle}
            style={{ width: moderateScale(15), height: moderateScale(15) }}
          />
          <Text
            style={{
              fontSize: textScale(12),
              fontWeight: "400",
              color: colors?.royalOrangeDark,

            }}
          >

            {quesData?.stepDescription}
          </Text>
        </View>
        <View style={{
          justifyContent: 'center', alignItems: 'center'
          , borderRadius: moderateScale(50)
        }}>
          <Text style={{ fontSize: textScale(120), fontWeight: '900', color: colors.royalOrange }}>
            {idx}
          </Text>
        </View>
        <View style={{ marginVertical: moderateScale(50), justifyContent: 'flex-end', height: height / 3, alignItems: 'center' }}>
          <CommonButton
            btnName={"NEXT"}
            mainContainer={styles.buttonContainer}
            onPress={() => onNext()}
          />
        </View>
      </View>
    </View>
  );
};

export default RelevanceToGoals;

const styles = StyleSheet.create({
  ticketCount: { color: "#EF602E", fontWeight: "500", fontSize: 28 },
  questionView: {
    alignSelf: "center",
    alignItems: "center",
    marginVertical: moderateScale(25),
    width: "85%",
    height: moderateScale(100),
  },
  questionText: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
  },

  headingText: {
    fontWeight: "700",

    fontSize: textScale(24),
    color: colors?.SaltBox,
    alignSelf: "center",
    marginTop: moderateScale(30),
  },
  subHeadingText: {
    fontWeight: "400",
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    marginTop: moderateScale(30),
    alignSelf: "center",
    textAlign: "center",
  },
  buttonView: {
    flex: 1,
    alignSelf: "center",
    // marginTop: moderateScale(40),
    justifyContent: "center",
  },

  questionTexr: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },

  greaterIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-end",
  },
  iconStyle: {
    // transform: [{ rotate: "180deg" }],
    height: moderateScale(24),
    width: moderateScale(20),
    tintColor: colors?.SurfCrest,
  },
  lessIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-start",
  },
  titleHeader: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(30),
  },
  titleHeader1: {
    fontSize: textScale(12),
    fontWeight: "500",
    color: colors?.SurfCrest,
    // marginVertical: moderateScale(30),
  },
  subHeading: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: moderateScale(30),
    marginBottom: moderateScale(10),
  },
});