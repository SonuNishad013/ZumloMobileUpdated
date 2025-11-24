import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import CommonInput from "../../../components/Inputs/commonInput";
import { filterEmojis, NotEmojiAllow } from "../../../validations/validation";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  allValue?: any;
  answerData?: any;
  selectedIndex?: any;
  isYesSelected?: any;
  onClickSkip?: any;
  onPressSkip?: any;
}
const DiagnosedScreen: React.FC<Props> = ({
  allValue,
  answerData,
  selectedIndex,
  isYesSelected,
  onClickSkip,
  onPressSkip,
}) => {
  const [idx, setIdx] = useState<any>(1);
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>("");
  const [writedWordsL, setWritedWordsL] = useState<number>(0);
  const [desMaxLen, setDesMaxLen] = useState<number>(150);
  const [filledWords, setFilledWords] = useState<number>(0);
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    if (allValue !== undefined) {
      answerData({
        indexId: 6,
        answer: {
          stepId: allValue?.stepID,
          optionId: allValue?.stepFields[0]?.stepFieldOptions[idx]?.optionID,
          isSkip: skip,
          answer: skip || idx == 0 ? "" : description,
        },
      });
    }
  }, [idx, allValue, skip, description]);

  const iconView = () => {
    return (
      <View style={styles?.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles?.imageStyle}
          source={{ uri: allValue?.logo }}
        />
      </View>
    );
  };

  const userInput = (val: any) => {
    if (val.trim() !== null) {
      setDescription(val);

      setWritedWordsL(val.length);
      setFilledWords(val.length);
      if (val.length - 1 >= desMaxLen) {
        setDescriptionError(true);
        setDescriptionErrorText("Your Text is to lengthy");
      } else {
        setDescriptionError(false);
      }
    }
  };
  const OneSelect = (index: any) => {
    setIdx(index);
    selectedIndex(index);
    onClickSkip(skip);
  };

  const boxView = () => {
    return (
      <CommonInput
        placeholderTextColor={colors?.SurfCrest}
        placeholder={
          "Type your diagnosis (e.g., anxiety, depression, PTSD, bipolar, etc.) "
        }
        textAlignVertical={"top"}
        wordCount={true}
        multiline={true}
        writeWords={filledWords}
        maxWords={desMaxLen}
        writeWordsStyle={{
          color: colors?.SurfCrest,
        }}
        isWidth={false}
        mainContainer={{
          height: moderateScale(162),
          marginTop: moderateScale(15),
          width: "auto",
        }}
        inputText={{
          height: moderateScale(130),
          color: colors?.SurfCrest,
          marginTop: moderateScale(10),
        }}
        value={description}
        onChangeText={(val: any) => {
          const filteredText = filterEmojis(val);
          userInput(filteredText);
        }}
        errorMsg={descriptionErrorText}
        isError={descriptionError}
        backGroundColor={"transparent"}
        borderColor={colors?.royalOrange}
      />
    );
  };
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles?.questionText}>
        {!isYesSelected ? allValue?.stepName : "Thanks for sharing"}
      </Text>
      {isYesSelected && (
        <Text style={styles?.subquestionText}>
          {"If you’re comfortable, let us know what you were diagnosed with. "}
        </Text>
      )}
      {iconView()}
      {!isYesSelected ? (
        <View style={[styles?.diagnosedMainContainer]}>
          {allValue?.stepFields[0]?.stepFieldOptions.map(
            (itm: any, index: any) => {
              return (
                <Diagnosed_or_not
                  key={index}
                  onPress={() => OneSelect(index)}
                  heading={itm?.title}
                  subHeading={itm?.optionLabel}
                  diagnosedView={{
                    borderWidth: moderateScale(1),
                    borderColor:
                      idx == index
                        ? colors?.royalOrange
                        : colors?.rgbaBackgroundTheme,
                  }}
                />
              );
            }
          )}
        </View>
      ) : (
        <View style={styles?.diagnosedMainContainer}>{boxView()}</View>
      )}
      <TouchableOpacity
        onPress={() =>
          onPressSkip({
            indexId: 6,
            answer: {
              stepId: allValue?.stepID,
              optionId:
                allValue?.stepFields[0]?.stepFieldOptions[idx]?.optionID,
              isSkip: true,
              answer: "",
            },
          })
        }
      >
        <Text style={styles?.skipText}>{"Skip for now"}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};
export default DiagnosedScreen;
const styles = StyleSheet.create({
  questionText: {
    fontWeight: "500",
    fontSize: textScale(28),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },
  subquestionText: {
    fontWeight: "500",
    fontSize: textScale(16),
    color: colors?.royalOrangeDark,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
    marginTop: moderateScale(10),
  },
  diagnosedView: {
    backgroundColor: colors?.saltDark,
    height: moderateScale(70),
    // width: moderateScale(300),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(11),
    marginBottom: moderateScale(20),
  },
  headingText: {
    fontWeight: "600",
    fontSize: textScale(14),
    textAlign: "center",
    color: colors?.SurfCrest,
  },
  subHeadingText: {
    fontWeight: "400",
    fontSize: textScale(14),
    textAlign: "center",
    color: colors?.SurfCrest,
    marginTop: moderateScale(5),
  },
  diagnosedMainContainer: {
    marginTop: moderateScale(30),
    marginBottom: moderateScale(30),
    // alignItems: "center",
    // marginHorizontal:moderateScale(15)
  },
  skipText: {
    fontWeight: "400",
    fontSize: textScale(14),
    textAlign: "center",
    color: colors?.SurfCrest,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors?.bBlack,
    borderRadius: moderateScale(50),
    height: moderateScale(102),
    width: moderateScale(102),
    marginTop: moderateScale(50),
  },
  imageStyle: {
    height: moderateScale(60),
    width: moderateScale(60),
  },
});

const Diagnosed_or_not = ({
  heading,
  subHeading,
  onPress,
  diagnosedView,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles?.diagnosedView, diagnosedView]}
    >
      <Text style={styles?.headingText}>{heading}</Text>
      <Text style={styles?.subHeadingText}>{subHeading}</Text>
    </TouchableOpacity>
  );
};
