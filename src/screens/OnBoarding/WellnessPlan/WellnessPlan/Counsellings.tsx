import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import TitleHeader from "../../../Profile/GoalsAndAspiration/TitleHeader";
import AddButton from "../../../Profile/GoalsAndAspiration/AddButton";
import CommonButton from "../../../../components/Buttons/commonButton";
import Severity from "./Severity/Severity";
import { strings } from "../../../../constant/strings";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WellnessHeader from "./WellnessHeader";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import CustomToast from "../../../../components/Toast";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { MinusIcon2 } from "../../../../assets";
import CustomImage from "../../../../components/ImageRender";
import logger from "../../../../constant/logger";

interface Props {
  navigation?: any;
}
const Counsellings = ({
  navigation,
  questionData,
  allData,
  stepNumber,
  reqData,
}: any) => {
  const [isOtherData, setisOtherData] = useState(false);
  const refRBSheet = useRef<any>();
  const [ServerityAndFrequencyData, setServerityAndFrequencyData] =
    useState<any>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [data, setData] = useState(
    questionData?.stepFields?.[0]?.stepFieldOptions
  );
  const [otherValue, setotherValue] = useState("");
  const [isSelected, setisSelected] = useState<any>();

  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
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
      setServerityAndFrequencyData(data_);
    }
  };
  // const onActivitySelection = (index: number) => {
  //   setSelectedItemIndex(index);
  //   refRBSheet.current.open();
  // };
  const onActivitySelection = (index: number, isSelected: any) => {
    console.log("isSelected===>", isSelected);
    setisSelected(isSelected);
    if (data[index]?.data) {
      let updatedData = [...data];
      updatedData[index].data = null;
      setData(updatedData);
    } else {
      let updatedData = [...data];
      const indexOfNoneOption = updatedData.findIndex(
        (item: any) => item?.title === "None"
      );
      if (indexOfNoneOption !== -1) {
        updatedData[indexOfNoneOption] = {
          ...updatedData[indexOfNoneOption],
          data: null,
        };
      }
      setData(updatedData);

      setSelectedItemIndex(index);
      refRBSheet.current.open();
    }
  };

  const onAddSpecification = () => {
    setisOtherData(true);
  };
  const onOtherValChange = (text: any) => {
    setotherValue(text);
    setData((prev: any) =>
      prev.map((item: any) =>
        item.title == "Other" ? { ...item, OtherAnswer: text } : item
      )
    );
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
              if (item.optionID) {
                return item.title;
              }
            })
            .filter((item: any) => item !== undefined)
            .toString();

          let newObj = {
            OptionId: item.optionID,
            Option: item.title,
            Effectiveness: `${severity_}`,
            Frequency: `${frequency_}`,
            OtherAnswer: null,
          };
          return newObj;
        }
        if (item.title === "Other") {
          if (otherValue) {
            let newObj = {
              OptionId: item.optionID,
              Option: item.title,
              OtherAnswer: item.OtherAnswer,
              Effectiveness: null,
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
    console.log("selectedAnswer=-=->", selectedAnswer);

    if (selectedAnswer.length > 0) {
      reqData(apiReq);
      stepNumber(questionData?.stepNumber + 1);
    } else {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings.pleaseSelectOption_orAddYour,
      });
    }
  };
  const getSelectedData = (data: any) => {
    if (data?.data) {
      console.log("selectedItem=>", data);
      let data_ = data?.data.filter((item: any) => item?.type);

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
  const renderFooter = () => {
    return (
      <>
        {!isOtherData ? (
          // <AddButton onPress={() => onAddSpecification()} />
          <AddButton
            containerStyle={{
              borderColor: colors?.SurfCrest,
              justifyContent: "center",
              width: "100%",
            }}
            isBtnName
            btnName={"Add another"}
            onPress={onAddSpecification}
            textStyle={{ color: colors?.SurfCrest }}
            // textColor={true}
            tintColor={colors?.SurfCrest}
          />
        ) : (
          <TextInputStretch
            newSpecInputView={{
              marginHorizontal: moderateScale(0),
              borderRadius: moderateScale(15),
              marginTop: moderateScale(15),
              paddingTop: moderateScale(5),
            }}
            placeholder={"Describe other"}
            value={otherValue}
            onChangeText={onOtherValChange}
          />
        )}
      </>
    );
  };
  return (
    console.log("questiData data=-=>", questionData, data),
    (
      <View style={{ flex: 1 }}>
        <WellnessHeader
          onBackPress={() => {
            stepNumber(questionData?.stepNumber - 1);
          }}
          headerName={questionData?.fieldName}
        />
        <KeyboardAwareScrollView>
          <ScrollView style={{ flex: 1, paddingHorizontal: moderateScale(20) }}>
            <View
              style={{
                marginTop: moderateScale(20),
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
                {"Select any therapy types you’ve used — past or present."}
              </Text>
            </View>
            <TitleHeader title={"Type of therapy"} />
            <FlatList
              columnWrapperStyle={{
                justifyContent: "space-between",
                paddingTop: moderateScale(10),
              }}
              keyExtractor={(item, index) => "key" + index}
              data={data.filter((item: any) => item?.title !== "Other")}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={{
                gap: 15,
                marginBottom: moderateScale(20),
                justifyContent: "space-between",
              }}
              renderItem={({ item, index }) => {
                let isSelected = item?.data;
                return (
                  <>
                    {item.title !== "Other" ? (
                      <TouchableOpacity
                        onPress={() => {
                          logger("item_______", item?.title === "None");
                          if (item?.title === "None") {
                            let newData: any = [...data]
                              .filter((item: any) => item?.title !== "Other")
                              .map((item: any) => ({ ...item, data: null }));
                            if (
                              item?.data === null ||
                              item?.data === undefined
                            ) {
                              //If already selected then Deselected that None
                              newData[index].data = [];
                              setData(newData);
                            } else {
                              newData[index].data = null; //Select the None option
                              setData(newData);
                            }
                          } else {
                            onActivitySelection(index, isSelected);
                          }
                        }}
                        style={{
                          borderWidth: 1,
                          borderColor: colors?.SurfCrest,
                          padding: moderateScale(5),
                          borderRadius: moderateScale(15),
                          gap: 10,
                          alignItems: "center",
                          height: moderateScale(130),
                          flex: 1,
                          justifyContent: "center",
                          backgroundColor: item?.data
                            ? colors?.polishedPine
                            : "transparent",
                          marginHorizontal: moderateScale(4),
                        }}
                      >
                        <CustomImage
                          source={{ uri: item.logo }}
                          width={moderateScale(22)}
                          height={moderateScale(22)}
                          tintColor={colors?.SurfCrest}
                        />
                        <Text
                          style={{
                            fontSize: textScale(10),
                            fontWeight: "600",
                            color: colors?.SurfCrest,
                            textAlign: "center",
                          }}
                        >
                          {formatSentenceCase(item?.title)}
                        </Text>
                        <View>
                          {item?.data?.map((elem: any) => {
                            return (
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
                            );
                          })}
                        </View>
                        {item?.data && (
                          <Pressable
                            onPress={() => {
                              let updatedData = [...data];
                              updatedData[index].data = null;
                              setData(updatedData);
                            }}
                            style={{
                              backgroundColor: colors?.royalOrangeDark,
                              position: "absolute",
                              right: 0,
                              top: -5,
                              borderRadius: 10,
                            }}
                          >
                            <MinusIcon2 width={20} height={20} />
                          </Pressable>
                        )}
                      </TouchableOpacity>
                    ) : null}
                  </>
                );
              }}
            />
            {renderFooter()}
            <Severity
              isCounsellingSheet={true}
              refRBSheet={refRBSheet}
              selectedItem={data[selectedItemIndex]}
              getSelectedData={getSelectedData(data[selectedItemIndex])}
              getSelectedFreq={getSelectedFreq(data[selectedItemIndex])}
              tapOnNext={(array: any) => {
                let newData: any = [...data];
                newData[selectedItemIndex].data = array;
                setData(newData);
                logger("CommunityAVATARISSUE______array", {
                  array,
                  spredDed: [...data],
                  newData,
                });
                refRBSheet.current.close();
              }}
              frequencyData={ServerityAndFrequencyData.filter(
                (item: any) => item.stepName == "Frequency"
              )}
              ServerityAndFrequencyData={ServerityAndFrequencyData}
              isSelected={isSelected}
              onClose={() => {
                setisSelected([]);
              }}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
        <CommonButton
          onPress={() => onNext()}
          mainContainer={{
            marginHorizontal: moderateScale(19),
            marginBottom: moderateScale(25),
            width: "auto",
            marginTop: moderateScale(10),
          }}
          btnName={"Next"}
        />
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

export default Counsellings;
