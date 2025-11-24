import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import AssessmentShowData from "./AssessmentShowData";
import { strings } from "../../../constant/strings";
import { imagePath } from "../../../assets/png/imagePath";

interface Props {
  navigation?: any;
}
const AssessmentResult: React.FC<Props> = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={style?.headerMainContainer}>
        <CommonHeader
          onBackPress={() => navigation.goBack()}
          iconContainer={style?.iconContainerView}
          headerName={strings?.AssessmentResult}
        />
      </View>
    );
  };
  const renderlevelBtn = () => {
    return (
      <View style={style?.levelBtnMainContainer}>
        <View style={style?.charView}></View>
        <CommonButton
          btnName={strings?.medium}
          mainContainer={style?.mediumBtnView}
          btnNameStyle={style?.mediumBtnNameStyle}
        />
        <Text style={style?.titleTxtStyle}>{strings?.assesmentResultTxt}</Text>
      </View>
    );
  };
  const data = [
    {
      title: "Anxiety Issues",
      percentage: "30%",
      description:
        "Acknowledge anxiety as common but seek support when it interferes with daily life.",
      icon: imagePath?.SadIcon,
      lineColor: colors?.royalOrange,
    },
    {
      title: "Gain Mental Focus",
      percentage: "60%",
      description:
        "Consult a healthcare professional for strategies and medications to enhance focus.",
      icon: imagePath?.ComputerWebcam,
      lineColor: colors?.SaltBox,
    },
    {
      title: "Chances for Cure",
      percentage: "80%",
      description:
        "Embrace various treatment options and strategies with patience and optimism for improvement.",
      icon: imagePath?.InterfaceTimeRewind,
      lineColor: colors?.polishedPine,
    },
  ];
  const renderResultData = () => {
    return (
      <View>
        {data.map((item: any, index: any) => {
          return (
            <AssessmentShowData
              title={item?.title}
              percentage={item?.percentage}
              description={item?.description}
              icon={item?.icon}
              renderPerView={{
                width: item?.percentage,
                backgroundColor: item?.lineColor,
              }}
            />
          );
        })}
      </View>
    );
  };
  const renderBtn = () => {
    return (
      <View style={style?.renderBtnMainContainer}>
        <CommonButton
          btnName={strings?.getPlan}
          mainContainer={style?.cmnBtnUp}
        />
        <CommonButton
          btnName={strings?.saveAssessment}
          mainContainer={style?.cmnBtnDown}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <ScrollView>
        {renderHeader()}
        <View style={style?.mainnViewContainer}>
          {renderlevelBtn()}
          {renderResultData()}
          {renderBtn()}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AssessmentResult;

const style = StyleSheet.create({
  mainnViewContainer: {
    alignItems: "center",
    paddingBottom: moderateScale(30),
  },

  // renderHeader
  headerMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(15),
  },
  iconContainerView: {
    backgroundColor: colors?.Daintree,
  },

  // renderlevelBtn
  charView: {
    height: moderateScale(140),
    width: moderateScale(333),
  },

  levelBtnMainContainer: {
    alignItems: "center",
    marginTop: moderateScale(40),
  },
  mediumBtnView: {
    height: moderateScale(33),
    width: moderateScale(98),
    backgroundColor: colors?.royalOrange,
    marginTop: moderateScale(25),
  },
  mediumBtnNameStyle: {
    color: colors?.white,
  },

  titleTxtStyle: {
    color: colors?.minGray,
    fontSize: textScale(14),
    fontWeight: "400",
    width: moderateScale(286),
    textAlign: "center",
    marginTop: moderateScale(20),
  },

  // renderBtn
  renderBtnMainContainer: {
    marginTop: moderateScale(40),
  },
  cmnBtnUp: {
    width: moderateScale(331),
  },
  cmnBtnDown: {
    width: moderateScale(331),
    marginTop: moderateScale(20),
    backgroundColor: "transparent",
    borderColor: colors?.polishedPine,
    borderWidth: moderateScale(1),
  },
});
