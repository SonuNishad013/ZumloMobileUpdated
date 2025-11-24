import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonHeader from "../../../../components/Header/commonHeader";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import CommonLoader from "../../../../components/Loader";
import CustomImage from "../../../../components/ImageRender";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../../constant/appConstant";
import { APPLY_STATUS } from "../../../../constant/ENUM";
import { strings } from "../../../../constant/strings";

interface Props {
  allValue?: any;
  answerData?: any;
  sendAnser?: any;
  route?: any;
  navigation?: any;
}
const ExplorerPromptsDetails: React.FC<Props> = ({
  allValue,
  answerData,
  sendAnser,
  route,
  navigation,
}) => {
  const { promptDetails, index } = route?.params;
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(0);
  const [idx, setIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = (isIncrement: boolean) => {
    setIsLoading(true);
    if (isIncrement) {
      setIdx((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      setIdx((prevIndex) => prevIndex - 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  const SaveOnboardingExplorerSteps = (data: any) => {
    setIsLoading(true);
    try {
      const selectedOptionID =
        data?.stepFields[0]?.stepFieldOptions[selectedItem]?.optionID;
      const requestBody = {
        categoryId: data?.categoryId,
        stepOption: {
          stepId: data?.stepID,
          optionId: selectedOptionID,
          isSkip: true,
        },
      };

      allActions.OnBoarding.SaveOnboardingExplorerSteps(
        dispatch,
        requestBody,
        API_FUN_NAMES?.SaveOnboardingExplorerSteps
      )
        .then((response: any) => {
          setIsLoading(false);
          if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
            navigation.goBack();
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const imageComponent = () => {
    return (
      <View style={styles?.iconMainContainer}>
        <View style={styles?.lessIconContainer}>
          {idx == 0 ? null : (
            <TouchableOpacity onPress={() => handleButtonClick(false)}>
              <Image
                style={[styles?.iconStyle, styles?.rotateView]}
                source={imagePath?.GreaterNext}
                resizeMode={APPLY_STATUS?.contain}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(idx);
          }}
          style={[
            styles?.clickView,
            {
              borderWidth:
                selectedItem == idx ? moderateScale(2) : moderateScale(0),
            },
          ]}
        >
          <View
            style={[
              styles?.imageContainer,
              {
                backgroundColor:
                  index == 2
                    ? colors.polishedPine
                    : index == 3
                    ? colors.SurfCrest
                    : colors.themeColor,
              },
            ]}
          >
            {isLoading ? null : (
              <CustomImage
                source={{
                  uri: promptDetails?.stepFields[0]?.stepFieldOptions[idx]
                    ?.logo,
                }}
                width={
                  idx == 0 && index == 0
                    ? moderateScale(130)
                    : moderateScale(192)
                }
                height={
                  idx == 0 && index == 0
                    ? moderateScale(130)
                    : moderateScale(192)
                }
                style={{
                  height:
                    idx == 0 && index == 0
                      ? moderateScale(130)
                      : moderateScale(192),
                  width:
                    idx == 0 && index == 0
                      ? moderateScale(130)
                      : moderateScale(192),
                }}
                isTintColor={false}
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles?.greaterIconContainer}>
          {idx ==
          promptDetails?.stepFields[0]?.stepFieldOptions.length - 1 ? null : (
            <TouchableOpacity onPress={() => handleButtonClick(true)}>
              <Image
                style={[styles?.iconStyle]}
                source={imagePath?.GreaterNext}
                resizeMode={APPLY_STATUS?.contain}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.saltNew}>
      <CommonHeader
        onBackPress={() => navigation.goBack()}
        headerName={""}
        mainContainer={styles?.headerView}
      />

      <ImageBackground source={imagePath.BGSaltBox} style={styles?.flexView}>
        <View style={styles?.mainView}>
          <Text style={styles?.questionTexr}>
            {promptDetails?.stepFields[0]?.fieldName}
          </Text>
          <Text style={styles?.subTitle}>{""}</Text>
          {imageComponent()}
          <Text style={styles?.answerTextStyle}>
            {promptDetails?.stepFields[0]?.stepFieldOptions[idx]?.title}
          </Text>
        </View>
        <CommonButton
          btnName={strings?.Save}
          mainContainer={styles?.buttonView}
          onPress={() => {
            SaveOnboardingExplorerSteps(promptDetails);
          }}
        />
        {isLoading && <CommonLoader />}
      </ImageBackground>
    </ScreenWrapper>
  );
};

export default ExplorerPromptsDetails;

const styles = StyleSheet.create({
  iconMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lessIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-start",
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
  imageContainer: {
    backgroundColor: colors?.SurfCrest,
    height: moderateScale(192),
    width: moderateScale(192),
    borderRadius: moderateScale(96),
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: moderateScale(192),
    width: moderateScale(192),
    // borderRadius: moderateScale(96),
  },
  questionTexr: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },
  subTitle: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors?.SurfCrest,
    alignSelf: "center",
    marginTop: moderateScale(75),
    marginBottom: moderateScale(10),
  },
  answerTextStyle: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors?.royalOrangeDark,
    alignSelf: "center",
    textAlign: "center",
    marginTop: moderateScale(40),
    marginHorizontal: moderateScale(15),
  },
  rotateView: {
    transform: [{ rotate: "180deg" }],
  },
  clickView: {
    width: moderateScale(200),
    height: moderateScale(200),
    justifyContent: "center",
    borderRadius: moderateScale(100),
    borderColor: colors?.polishedPine,
  },
  headerView: {
    marginHorizontal: moderateScale(15),
  },
  flexView: {
    flex: 1,
  },
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(30),
  },
  buttonView: {
    marginHorizontal: moderateScale(20),
    position: "absolute",
    bottom: moderateScale(30),
    alignSelf: "center",
  },
});
