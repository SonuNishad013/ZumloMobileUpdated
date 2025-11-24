import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../../../constant/colors";
import { imagePath } from "../../../../../../assets/png/imagePath";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import { filterEmojis } from "../../../../../../validations/validation";

interface Props {
  questionValue?: any;
  answerData?: any;
  answerIndex?: any;
  ableData?: any;
  placeHolder?: String;
}

const TextAreaInput: React.FC<Props> = ({
  questionValue,
  answerData,
  answerIndex,
  ableData,
  placeHolder,
}) => {
  const [data, setData] = useState<any>(questionValue?.stepFieldOption);
  const [textValue, setTextValue] = useState(
    ableData?.answer ? ableData?.answer : ""
  );

  useEffect(() => {
    if (questionValue?.stepFieldOptions != undefined) {
      setData(questionValue?.stepFieldOptions);
    }
  }, [questionValue?.stepFieldOptions]);

  useEffect(() => {
    if (questionValue !== undefined) {
      answerData({
        indexId: answerIndex,
        answer: {
          regenerateStepId: questionValue?.regenerateStepId,
          answer: textValue,
        },
      });
    }
  }, [textValue]);
  const placeHolder_ = placeHolder ? placeHolder : "Describe here";
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questionValue?.stepName}</Text>
      <Text style={styles.subtitle}>
        {questionValue?.stepDescription + "."}
      </Text>
      <TextInput
        multiline
        style={styles.textInput}
        placeholder={placeHolder_}
        placeholderTextColor={colors?.SurfCrest}
        value={textValue}
        onChangeText={(value: any) => {
          const filterEmojies = filterEmojis(value);
          setTextValue(filterEmojies);
        }}
      />
      {/* <View style={styles.infoContainer}>
        <Image source={imagePath?.infoCircle} style={styles.infoImage} />
        <Text style={styles.infoText}>
          {"Please add your own reason here "}
        </Text>
      </View> */}
    </View>
  );
};

export default TextAreaInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(19),
  },
  title: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(15),
  },
  subtitle: {
    fontSize: textScale(13),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginTop: moderateScale(10),
  },
  textInput: {
    height: moderateScale(125),
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "400",
    borderWidth: 1,
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10),
    color: colors?.SurfCrest,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
    textAlignVertical: "top",
    marginTop: moderateScale(30),
    paddingBottom: moderateScale(20),
  },
  infoContainer: {
    flexDirection: "row",
    gap: moderateScale(7),
    marginTop: moderateScale(15),
    alignItems: "center",
  },
  infoImage: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  infoText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.royalOrangeDark,
  },
  newSpecInput: {
    height: moderateScale(60),
    width: "auto",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: moderateScale(1),
    color: colors.SurfCrest,
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },
});
