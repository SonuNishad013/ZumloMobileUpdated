import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import TitleHeader from "../../../Profile/GoalsAndAspiration/TitleHeader";
import AddButton from "../../../Profile/GoalsAndAspiration/AddButton";
import CommonButton from "../../../../components/Buttons/commonButton";
import { imagePath } from "../../../../assets/png/imagePath";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { strings } from "../../../../constant/strings";
import Toast from "react-native-toast-message";
import WellnessHeader from "./WellnessHeader";
import { useDispatch, useSelector } from "react-redux";
import onBoardingTypes from "../../../../redux/types/onBoardingTypes";
import { useFocusEffect } from "@react-navigation/native";
import { getMedicalCondition } from "../../../../redux/selector";
import CommonLoader from "../../../../components/Loader";
import TextInputStretch from "../../../../components/OnBoardiingComponents/TextInputStretch";
import CustomToast from "../../../../components/Toast";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import CustomImage from "../../../../components/ImageRender";

const MedicalConditions = ({
  navigation,
  questionData,
  allData,
  stepNumber,
  reqData,
}: any) => {
  const [isOtherData, setisOtherData] = useState(false);
  const [otherValue, setotherValue] = useState("");
  const [isSelected, setIsSelected] = useState<any>([]);
  const medicalData: any = useSelector(getMedicalCondition());
  const [isLoading, setisLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const [data, setdata] = useState(
    questionData?.stepFields?.[0]?.stepFieldOptions
  );
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (medicalData !== null && medicalData !== undefined) {
        setdata(medicalData);
      }
      return () => {
        // Additional cleanup code if needed
      };
    }, [])
  );
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
        if (otherValue !== "") {
          if (item.title == "Other") {
            return {
              optionID: item.optionID,
              Option: item.title,
              OtherAnswer: otherValue,
            };
          }
        }
      })
      .filter((item: any) => item !== undefined);
    let selectedAnswer = data
      .map((item: any, selectedIdx: number) => {
        let selectedItem = data[selectedIdx];
        if (item.isSelected) {
          return {
            optionID: selectedItem.optionID,
            Option: selectedItem.title,
          };
        }
      })
      .filter((item: any) => item !== undefined);
    let apiReq = {
      StepId: questionData.stepID,
      "Questions:": questionData.stepName,
      Type: questionData.fieldName,
      Options: data_,
      OptionsAnswer: selectedAnswer,
    };
    console.log("apiReq:=>", otherData);
    console.log("data for save medical conditions==>", data, selectedAnswer);

    if (selectedAnswer.length > 0 || otherData.length > 0) {
      dispatch({
        type: onBoardingTypes.SAVE_MEDICAL_CONDITIONS,
        payload: data,
      });
      reqData(apiReq);
      setisLoading(true);
      setTimeout(() => {
        setisLoading(false);
        stepNumber(questionData?.stepNumber + 1);
      }, 1000);
    } else {
      setToasterDetails({
        showToast: true,
        code: 0,
        message: strings.pleaseSelectOption_orAddYour,
      });
    }
  };
  const onOtherValChange = (text: any) => {
    setotherValue(text);
    setdata((prev: any) =>
      prev.map((item: any) =>
        item.title == "Other" ? { ...item, OtherAnswer: text } : item
      )
    );
  };
  const onAddSpecification = () => {
    setisOtherData(true);
  };
  const setSelected = (item: any, index: number) => {
    const NONE_INDEX = 0; // assuming "None" is at index 0, adjust as needed
    let updatedData = [...data]; // Copy the data array

    if (index === NONE_INDEX) {
      // If "None" is selected
      if (updatedData[NONE_INDEX].isSelected) {
        // Unselect "None"
        updatedData[NONE_INDEX].isSelected = false;
      } else {
        // Select "None" and unselect all others
        updatedData = updatedData.map((item, idx) => ({
          ...item,
          isSelected: idx === NONE_INDEX,
        }));
      }
    } else {
      if (updatedData[index].isSelected) {
        // Unselect the item
        updatedData[index].isSelected = false;
      } else {
        // Select the item and unselect "None"
        updatedData[index].isSelected = true;
        updatedData[NONE_INDEX].isSelected = false;
      }
    }

    setdata(updatedData); // Update the state with the new data
  };

  // const setSelected = (item: any, index: number) => {
  //   const NONE_INDEX = 0; // assuming "none" is at index 0, adjust as needed
  //   let updatedSelection = [...isSelected];

  //   if (index === NONE_INDEX) {
  //     if (isSelected.includes(NONE_INDEX)) {
  //       updatedSelection = updatedSelection.filter(
  //         (elem: number) => elem !== NONE_INDEX
  //       );
  //     } else {
  //       updatedSelection = [NONE_INDEX];
  //     }
  //   } else {
  //     if (isSelected.includes(index)) {
  //       updatedSelection = updatedSelection.filter(
  //         (elem: number) => elem !== index
  //       );
  //     } else {
  //       updatedSelection.push(index);
  //       updatedSelection = updatedSelection.filter(
  //         (elem: number) => elem !== NONE_INDEX
  //       );
  //     }
  //   }

  //   setIsSelected(updatedSelection);
  // };

  const renderFooter = () => {
    return (
      <>
        <View style={{ paddingHorizontal: moderateScale(19) }}>
          {!isOtherData ? (
            // <AddButton onPress={() => onAddSpecification()} />
            <AddButton
              containerStyle={{
                justifyContent: "center",
                borderColor: colors?.SurfCrest,
              }}
              isBtnName
              btnName={"It's something else"}
              onPress={() => onAddSpecification()}
              textStyle={{ color: colors?.SurfCrest }}
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
        </View>
      </>
    );
  };
  return (
    console.log("medicalData", medicalData),
    (
      <View style={{ flex: 1 }}>
        <WellnessHeader
          onBackPress={() => {
            stepNumber(questionData?.stepNumber - 1);
          }}
          headerName={questionData?.fieldName}
        />
        <KeyboardAwareScrollView>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <View>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: textScale(25),
                    color: colors?.SurfCrest,
                    marginVertical: moderateScale(20),
                    paddingStart: moderateScale(19),
                  }}
                >
                  {capitalizeFirstLetter(questionData?.stepName)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <TitleHeader
                  title={
                    "If you’re living with any of these, it helps me plan around your real-life needs."
                  }
                  style={{ marginHorizontal: 15 }}
                  isLineNeeded={false}
                />
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }) => {
                    //   let isSelected = item?.data;
                    return (
                      <>
                        {item.title !== "Other" ? (
                          // <TouchableOpacity
                          //   onPress={() => {
                          //     setSelected(item, index);
                          //   }}
                          //   style={{
                          //     borderBottomWidth: 0.25,
                          //     borderColor: colors?.SurfCrest,
                          //     padding: moderateScale(20),
                          //     flexDirection: "row",
                          //     justifyContent: "space-between",
                          //   }}
                          // >
                          //   <View
                          //     style={{
                          //       flexDirection: "row",
                          //       alignItems: "center",
                          //     }}
                          //   >
                          //     <Image
                          //       source={{ uri: item.logo }}
                          //       style={{
                          //         tintColor: isSelected?.includes(index)
                          //           ? colors?.royalOrangeDark
                          //           : colors?.lightSurfCrest,
                          //         height: moderateScale(20),
                          //         width: moderateScale(20),
                          //       }}
                          //       resizeMode={"contain"}
                          //     />
                          //     <Text
                          //       style={{
                          //         marginHorizontal: moderateScale(20),
                          //         fontSize: textScale(14),
                          //         fontWeight: "400",
                          //         color: isSelected?.includes(index)
                          //           ? colors?.royalOrangeDark
                          //           : colors?.lightSurfCrest,
                          //       }}
                          //     >
                          //       {item?.title}
                          //     </Text>
                          //   </View>
                          //   {isSelected?.includes(index) && (
                          //     <Image source={imagePath?.Greentick} />
                          //   )}
                          // </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setSelected(item, index)}
                            style={{
                              borderBottomWidth: 0.25,
                              borderColor: colors?.SurfCrest,
                              padding: moderateScale(20),
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              {/* <Image
                                source={{ uri: item.logo }}
                                style={{
                                  tintColor: item.isSelected
                                    ? colors?.royalOrangeDark
                                    : colors?.lightSurfCrest,
                                  height: moderateScale(20),
                                  width: moderateScale(20),
                                }}
                                resizeMode={"contain"}
                              /> */}
                              <CustomImage
                                source={{ uri: item.logo }}
                                width={moderateScale(22)}
                                height={moderateScale(22)}
                                tintColor={
                                  item.isSelected
                                    ? colors?.royalOrangeDark
                                    : colors?.lightSurfCrest
                                }
                              />
                              <Text
                                style={{
                                  marginHorizontal: moderateScale(20),
                                  fontSize: textScale(14),
                                  fontWeight: "400",
                                  color: item.isSelected
                                    ? colors?.royalOrangeDark
                                    : colors?.lightSurfCrest,
                                }}
                              >
                                {formatSentenceCase(item?.title)}
                              </Text>
                            </View>
                            {item.isSelected && (
                              <Image source={imagePath?.Greentick} />
                            )}
                          </TouchableOpacity>
                        ) : null}
                      </>
                    );
                  }}
                />
                {renderFooter()}
              </View>
              <View
                style={{
                  // gap: 20,
                  // marginVertical: moderateScale(20),
                  marginBottom: moderateScale(20),
                  paddingHorizontal: moderateScale(19),
                }}
              >
                <CommonButton
                  onPress={() => onNext()}
                  mainContainer={{
                    width: "auto",
                    marginTop: moderateScale(10),
                  }}
                  btnName={"Next"}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
        {toasterDetails?.showToast && (
          <CustomToast
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
        {isLoading && <CommonLoader />}
      </View>
    )
  );
};

export default MedicalConditions;
