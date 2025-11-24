import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CommonHeader from "../../../../components/Header/commonHeader";
import SplashScreen from "react-native-splash-screen";
import colors from "../../../../constant/colors";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import {
  height,
  moderateScale,
  textScale,
} from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import AddButton from "../../../Profile/GoalsAndAspiration/AddButton";

import Severity from "./Severity/Severity";
import navigationString from "../../../../navigation/navigationString";
import CommonInput from "../../../../components/Inputs/commonInput";
import { strings } from "../../../../constant/strings";
import Toast from "react-native-toast-message";
import WellnessHeader from "./WellnessHeader";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import CustomToast from "../../../../components/Toast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MinusIcon, MinusIcon2 } from "../../../../assets";
import { JsonHubProtocol } from "@microsoft/signalr";

const HealthSymptoms = ({
  navigation,
  questionData,
  allData,
  stepNumber,
  reqData,
  from,
  isWellnessPrompt,
}: any) => {
  const refRBSheet = useRef<any>();

  const [data, setData] = useState(
    questionData?.stepFields?.[0]?.stepFieldOptions
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [ServerityAndFrequencyData, setServerityAndFrequencyData] =
    useState<any>([]);
  const [isOther, setisOther] = useState(false);
  const [otherValue, setotherValue] = useState("");
  const [isSelected, setisSelected] = useState<any>();
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: "",
    message: "",
  });

  useEffect(() => {
    getQuestionParentId(allData, questionData.stepID);
  }, []);
  const getQuestionParentId = (data: any, currentStep: any) => {
    if (currentStep) {
      let data_ = data.filter((item: any) => {
        if (item.parentStepId == currentStep) {
          return item;
        }
      });
      console.log("data_", data_);
      setServerityAndFrequencyData(data_);
    }
  };
  const onNext = () => {
    let selectedAnswer = data
      .map((item: any) => {
        if (item.data) {
          let severity_ = item.data
            .map((item: any) => {
              if (item.type == "slider") {
                return item.title;
              }
            })
            .filter((item: any) => item !== undefined)
            .toString();
          let frequency_ = item.data
            .map((item: any) => {
              if (item.logo) {
                return item.title;
              }
            })
            .filter((item: any) => item !== undefined)
            .toString();
          let newObj = {
            OptionId: item.optionID,
            Option: item.title,
            Severity: `${severity_}`,
            Frequency: `${frequency_}`,
            OtherAnswer: null,
          };
          return newObj;
        }
        if (otherValue !== "") {
          if (item.title === "Other") {
            let newObj = {
              OptionId: item.optionID,
              Option: item.title,
              OtherAnswer: item.OtherAnswer,
              Severity: null,
              Frequency: null,
            };
            return newObj;
          }
        }
      })
      .filter((item: any) => item !== undefined);
    let data_ = questionData?.stepFields?.[0]?.stepFieldOptions.map(
      (item: any) => {
        let newObj = {
          optionID: item.optionID,
          Option: item.title,
        };
        return newObj;
      }
    );
    let apiReq = {
      StepId: questionData.stepID,
      "Questions:": questionData.stepName,
      Type: questionData.fieldName,
      Options: data_,
      OptionsAnswer: selectedAnswer,
    };
    if (selectedAnswer.length > 0) {
      reqData(apiReq);
      stepNumber(questionData?.stepNumber + 1);
    } else {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings.pleaseSelectOption_orFill,
      });
    }
  };
  const onOtherValChange = (text: any) => {
    setotherValue(text);
    setData((prev: any) =>
      prev.map((item: any) =>
        item.title == "Other" ? { ...item, OtherAnswer: text } : item
      )
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
          {questionData?.stepName}
        </Text>
        <Text
          style={{
            fontWeight: "400",
            fontSize: textScale(13),
            color: colors?.SurfCrest,
          }}
        >
          {"Tap any symptoms you’ve noticed — big or small, they all matter."}
          {/* {questionData?.FieldLabel} */}
        </Text>
      </View>
    );
  };
  const onActivitySelection = (index: number, isSelected: any) => {
    setisSelected(isSelected);
    setSelectedItemIndex(index);
    refRBSheet.current.open();
  };

  const symptomSelection = () => {
    return (
      <View style={{}}>
        <FlatList
          numColumns={2}
          data={data}
          extraData={data}
          columnWrapperStyle={{ flexWrap: "wrap" }}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }: any) => {
            let isSelected = item?.data;
            return (
              <>
                {item.title !== "Other" ? (
                  <TouchableOpacity
                    onPress={() => onActivitySelection(index, isSelected)}
                    style={{
                      borderWidth: 1,
                      borderRadius: moderateScale(25),
                      justifyContent: "center",
                      alignItems: isSelected ? "flex-start" : "center",
                      paddingVertical: isSelected
                        ? moderateScale(5)
                        : moderateScale(0),
                      margin: 5,
                      paddingHorizontal: moderateScale(15),
                      minWidth: !isSelected
                        ? moderateScale(130)
                        : moderateScale(0),
                      // maxWidth: moderateScale(240),
                      maxHeight: moderateScale(65),
                      minHeight: moderateScale(45),
                      borderColor: colors?.SurfCrest,
                      // backgroundColor: isSelected
                      //   ? colors?.polishedPine
                      //   : "transparent",
                      backgroundColor: item?.data
                        ? colors?.polishedPine
                        : "transparent",
                    }}
                  >
                    {item?.data && (
                      <Pressable
                        onPress={() => {
                          let updatedData = [...data];
                          updatedData[index].data = null;
                          setData(updatedData);
                        }}
                        style={{
                          backgroundColor: colors?.royalOrangeDark,
                          // borderWidth: 1,
                          // borderColor: colors?.SurfCrest,
                          position: "absolute",
                          right: 0,
                          top: -5,
                          borderRadius: 10,
                        }}
                      >
                        <MinusIcon2 width={20} height={20} />
                      </Pressable>
                    )}
                    <Text
                      style={{
                        color: colors?.SurfCrest,
                        fontSize: textScale(14),
                        fontWeight: isSelected ? "600" : "400",
                      }}
                    >
                      {capitalizeFirstLetter(item?.title)}
                    </Text>

                    <View
                      style={{ flexDirection: "row", gap: moderateScale(10) }}
                    >
                      {item?.data?.map((elem: any) => {
                        console.log("elem", elem);

                        return (
                          <View
                            style={{
                              borderRadius: moderateScale(30),
                              // width: moderateScale(50),
                              backgroundColor: colors?.SurfCrest,
                              alignItems: "center",
                              justifyContent: "center",
                              paddingHorizontal: moderateScale(5),
                              height: moderateScale(17),
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "400",
                                fontSize: 10,
                                color: colors?.prussianBlue,
                              }}
                            >
                              {capitalizeFirstLetter(elem.title)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </TouchableOpacity>
                ) : null}
              </>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View style={{ marginTop: moderateScale(10) }}>
                <AddButton
                  containerStyle={{
                    justifyContent: "center",
                    borderColor: colors?.SurfCrest,
                  }}
                  isBtnName
                  btnName={"It's something else"}
                  onPress={() => setisOther(true)}
                  textStyle={{ color: colors?.SurfCrest }}
                />
                <View
                  style={{
                    marginTop: moderateScale(15),
                    marginBottom: moderateScale(15),
                  }}
                >
                  <CommonButton
                    onPress={() => onNext()}
                    btnName={"Next"}
                    mainContainer={{
                      width: "auto",
                      marginBottom: moderateScale(20),
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };
  const getSelectedData = (data: any) => {
    if (data?.data) {
      console.log("selectedItem=>", data);
      let data_ = data?.data?.filter((item: any) => item?.type);
      if (data_) {
        let inputString = data_?.[0]?.title;
        const match = inputString?.match(/\d+/);

        console.log("=>>match", match);
        if (match) {
          const number = match[0];
          return number;
        } else {
          console.log("No number found in the string.");
        }
      }
    }
  };
  const getSelectedFreq = (data: any) => {
    if (data?.data) {
      let data_1 = data?.data.filter((item: any) => item.optionOrder);
      if (data_1) {
        let a = { ...data_1?.[0], isSelected: true };
        console.log("data_1", a);
        return a;
      }
    }

    // if(data_1){
    //   return
    // }
  };

  return (
    console.log(
      "questionData===>",

      from
    ),
    (
      <View>
        <WellnessHeader
          onBackPress={() => {
            if (from == "Dashboard") {
              if (isWellnessPrompt) {
                // setisOther(!isOther);
                if (isOther) {
                  setisOther(!isOther);
                } else {
                  navigation?.goBack();
                }
              } else {
                navigation?.goBack();
              }
            } else {
              if (isOther) {
                setisOther(!isOther);
              } else {
                navigation?.goBack();
              }
            }
            // if (isOther) {
            //   setisOther(!isOther);
            // } else {
            //   if (from === "Dashboard" && isWellnessPrompt) {
            //     navigation?.goBack();
            //   } else {
            //     navigation?.goBack();
            //   }
            // }
          }}
          headerName={questionData?.fieldName}
          from={from}
        />
        <View style={{ marginHorizontal: moderateScale(15) }}>
          {!isOther ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <FlatList
                data={["0"]}
                keyExtractor={(item, index) => "key" + index}
                renderItem={() => {
                  return (
                    <View>
                      {questionSelection()}
                      {symptomSelection()}
                    </View>
                  );
                }}
                contentContainerStyle={{ paddingBottom: moderateScale(120) }}
              />

              <Severity
                refRBSheet={refRBSheet}
                selectedItem={data[selectedItemIndex]}
                getSelectedData={getSelectedData(data[selectedItemIndex])}
                getSelectedFreq={getSelectedFreq(data[selectedItemIndex])}
                onClose={() => {
                  setisSelected([]);
                }}
                tapOnNext={(array: any) => {
                  let newData: any = [...data];
                  newData[selectedItemIndex].data = array;
                  setData(newData);
                  refRBSheet.current.close();
                }}
                frequencyData={ServerityAndFrequencyData.filter(
                  (item: any) => item.stepName == "Frequency"
                )}
                ServerityAndFrequencyData={ServerityAndFrequencyData}
                isCounsellingSheet={false}
                isSelected={isSelected}
                x
              />
            </View>
          ) : (
            <View style={{ height }}>
              <CommonInput
                value={otherValue}
                onChangeText={onOtherValChange}
                placeholderTextColor={colors?.minGray}
                placeholder={"Tell me more about your symptoms"}
                textAlignVertical={"top"}
                backGroundColor={"transparent"}
                borderColor={colors?.SurfCrest}
                multiline={true}
                mainContainer={{
                  height: moderateScale(162),
                  borderColor: colors?.royalOrange,
                  marginTop: moderateScale(15),
                }}
                inputText={{
                  height: moderateScale(130),
                  color: colors.SurfCrest,
                  marginTop: moderateScale(10),
                }}
                isWidth={false}
              />

              <View
                style={{
                  justifyContent: "flex-end",
                  marginTop: moderateScale(10),
                }}
              >
                <CommonButton
                  onPress={() => setisOther(false)}
                  btnName={"Next"}
                  mainContainer={{ width: "auto" }}
                />
              </View>
            </View>
          )}
        </View>
        {toasterDetails?.showToast && (
          <CustomToast
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </View>
    )
  );
};

export default HealthSymptoms;
