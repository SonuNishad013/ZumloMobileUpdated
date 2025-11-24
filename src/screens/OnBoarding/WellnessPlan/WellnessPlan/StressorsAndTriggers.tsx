import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "underscore";
import { strings } from "../../../../constant/strings";
import WellnessHeader from "./WellnessHeader";
import { useDispatch, useSelector } from "react-redux";
import onBoardingTypes from "../../../../redux/types/onBoardingTypes";
import { useFocusEffect } from "@react-navigation/native";
import { getStressors } from "../../../../redux/selector";
import CommonLoader from "../../../../components/Loader";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../../components/ImageRender";
interface Props {
  navigation?: any;
  questionData?: any;
  allData?: any;
  stepNumber?: any;
  reqData?: any;
}
const StressorsAndTriggers: React.FC<Props> = ({
  navigation,
  questionData,
  allData,
  stepNumber,
  reqData,
}) => {
  const [selectIndex, setSelectIndex] = useState<any>();
  const [data, setdata] = useState<any>(
    questionData?.stepFields?.[0]?.stepFieldOptions
  );
  const [isOtherData, setisOtherData] = useState(false);
  const [otherValue, setotherValue] = useState("");
  const dispatch = useDispatch();
  const stressorsData: any = useSelector(getStressors());
  const [isLoading, setisLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (stressorsData !== null && stressorsData !== undefined) {
        setSelectIndex(stressorsData);
      }
      return () => {
        // Additional cleanup code if needed
      };
    }, [])
  );
  const onSelectItem = (item: any, index: any) => {
    let updatedData = [...data]; // Copy the data array

    updatedData[index].isSelected = !updatedData[index].isSelected;
    setdata(updatedData); // Update the state with the new data
  };
  const onOtherValChange = (text: any) => {
    console.log("text", text);
    setotherValue(text);
    setdata((prev: any) =>
      prev.map((item: any) =>
        item.title == "Other" ? { ...item, OtherAnswer: text } : item
      )
    );
  };
  const onNext = () => {
    let data_ = questionData?.stepFields?.[0]?.stepFieldOptions.map(
      (item: any) => {
        let newObj = {
          optionID: item.optionID,
          Option: item.title,
        };
        return newObj;
      }
    );
    let otherData = data
      .map((item: any, index: any) => {
        if (item.title == "Other") {
          return {
            optionID: item.optionID,
            Option: item.title,
            OtherAnswer: otherValue,
          };
        }
      })
      .filter((item: any) => item !== undefined);
    let selectedItem = {
      OptionId: selectIndex !== undefined && data?.[selectIndex].optionID,
      Option: selectIndex !== undefined && data?.[selectIndex].title,
    };

    let apiReq = {
      StepId: questionData.stepID,
      "Questions:": questionData.stepName,
      Type: questionData.fieldName,
      Options: data_,
      OptionsAnswer: isOtherData
        ? otherData
        : selectIndex !== undefined
        ? selectedItem
        : [],
    };
    if (!_.isEmpty(selectedItem)) {
      dispatch({
        type: onBoardingTypes.SAVE_STRESSORS_TRIGGERS,
        payload: selectIndex,
      });
      reqData(apiReq);
      setisLoading(true);
      setTimeout(() => {
        setisLoading(false);
        stepNumber(questionData?.stepNumber + 1);
      }, 1000);
    } else {
      setisLoading(false);
    }
  };
  const renderFooter = () => {
    return (
      <>
        {isOtherData && (
          <TextInputStretch
            newSpecInputView={{
              marginHorizontal: moderateScale(19),
              borderRadius: moderateScale(15),
              marginTop: moderateScale(15),
              paddingTop: moderateScale(5),
            }}
            placeholder={"Enter Other"}
            value={otherValue}
            onChangeText={onOtherValChange}
          />
        )}
      </>
    );
  };
  return (
    console.log("stressorsData", stressorsData),
    (
      <View style={{ flex: 1 }}>
        <WellnessHeader
          onBackPress={() => {
            stepNumber(questionData?.stepNumber - 1);
          }}
          headerName={questionData?.fieldName}
        />
        <KeyboardAwareScrollView>
          <View
            style={{
              marginHorizontal: moderateScale(15),
            }}
          >
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              data={data}
              keyExtractor={(item, index) => "key" + index}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={{
                gap: 15,
                marginBottom: moderateScale(20),
              }}
              ListHeaderComponent={() => {
                return (
                  <View>
                    <Text style={styles.title}>
                      {capitalizeFirstLetter(questionData?.stepName)}
                    </Text>
                    <Text style={styles.subtitle}>
                      {
                        "Pick anything that's been weighing on your mind or adding stress."
                      }
                    </Text>
                  </View>
                );
              }}
              renderItem={({ item, index }) => {
                console.log("item=====>", item);
                return (
                  <>
                    {item.title !== "Other" ? (
                      <TouchableOpacity
                        onPress={() => onSelectItem(item, index)}
                        style={{
                          borderWidth: 1,
                          borderColor: colors?.SurfCrest,
                          padding: moderateScale(5),
                          borderRadius: moderateScale(15),
                          gap: 10,
                          alignItems: "center",
                          height: moderateScale(130),
                          width: moderateScale(110),
                          justifyContent: "center",
                          backgroundColor: item.isSelected
                            ? colors?.polishedPine
                            : "transparent",
                        }}
                      >
                        {/* <Image
                          source={{ uri: item.logo }}
                          resizeMode={"contain"}
                          style={{
                            width: moderateScale(30),
                            height: moderateScale(30),
                            tintColor:
                              index == selectIndex
                                ? colors?.prussianBlue
                                : colors?.SurfCrest,
                          }}

                        /> */}
                        <CustomImage
                          source={{ uri: item.logo }}
                          width={moderateScale(22)}
                          height={moderateScale(22)}
                          tintColor={
                            index == selectIndex
                              ? colors?.prussianBlue
                              : colors?.SurfCrest
                          }
                        />
                        <Text
                          style={{
                            fontSize: textScale(10),
                            fontWeight: "600",
                            color:
                              index == selectIndex
                                ? colors?.prussianBlue
                                : colors?.SurfCrest,
                            textAlign: "center",
                          }}
                        >
                          {capitalizeFirstLetter(item?.title)}
                        </Text>
                        <View>
                          {item?.data?.map((elem: any) => {
                            console.log("elem.title", elem);
                            return (
                              // <View
                              //   style={{
                              //     alignItems: "center",
                              //     justifyContent: "center",
                              //   }}
                              // >
                              <Text
                                style={{
                                  fontWeight: "400",
                                  fontSize: 10,
                                  color: colors?.prussianBlue,
                                  textAlign: "center",
                                }}
                              >
                                {elem?.type === "slider"
                                  ? `Effectiveness ${elem.title}`
                                  : elem.title}
                              </Text>
                              // </View>
                            );
                          })}
                        </View>
                      </TouchableOpacity>
                    ) : null}
                  </>
                );
              }}
            />
          </View>
          {renderFooter()}
          <CommonButton
            btnName={"NEXT"}
            mainContainer={styles.commonButtonContainer}
            onPress={() => onNext()}
          />
        </KeyboardAwareScrollView>
        {isLoading && <CommonLoader />}
      </View>
    )
  );
};

export default StressorsAndTriggers;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  headerMainContainer: {
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
  headerIconContainer: {
    backgroundColor: colors?.saltDark,
  },
  commonButtonContainer: {
    width: "auto",
    marginBottom: moderateScale(30),
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
});
