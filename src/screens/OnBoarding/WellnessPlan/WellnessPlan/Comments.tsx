import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CommonHeader from "../../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import CommonInput from "../../../../components/Inputs/commonInput";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import { strings } from "../../../../constant/strings";

const Comments = ({ navigation }: any) => {
  const header = () => {
    return (
      <View>
        <CommonHeader
          onBackPress={() => {
            navigation?.goBack();
          }}
          iconContainer={{ backgroundColor: "#00000033" }}
          headerName="Mental Health Symptoms"
        />
      </View>
    );
  };

  const questionSelection = () => {
    return (
      <View
        style={{
          marginVertical: moderateScale(20),
          gap: moderateScale(10),
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: textScale(25),
            color: colors?.SurfCrest,
          }}
        >
          What mental health symptoms do you experience?
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: textScale(10),
            color: colors?.SurfCrest,
          }}
        >
          Select all mental health symptoms you have experienced.
        </Text>
      </View>
    );
  };
  const inputSection = () => {
    return (
      <View style={{ flex: 0.95 }}>
        <CommonInput
          placeholderTextColor={colors?.SurfCrest}
          placeholder={strings?.feelingBox}
          textAlignVertical={"top"}
          backGroundColor={"transparent"}
          borderColor={colors?.SurfCrest}
          multiline={true}
          mainContainer={{
            height: moderateScale(162),
            borderColor: colors?.royalOrange,
            marginTop: moderateScale(15),
          }}
          inputText={{ height: moderateScale(130) }}
          isWidth={false}
        />
        <Text
          style={{
            color: colors?.royalOrangeDark,
            fontWeight: "400",
            fontSize: textScale(10),
            width: moderateScale(315),
          }}
        >
          Any additional comments or preferences regarding app usability
          (optional).
        </Text>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={{ flex: 1, paddingHorizontal: moderateScale(20), marginTop: moderateScale(10) }}>
        {header()}
        {questionSelection()}
        {inputSection()}

        <CommonButton
          onPress={() => {
            // navigation?.navigate("Preferences");
          }}
          btnName={"Next"}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Comments;

const styles = StyleSheet.create({});
