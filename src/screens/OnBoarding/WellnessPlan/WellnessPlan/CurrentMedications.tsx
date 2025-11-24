import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { useEffect, useState } from "react";
import CommonInput from "../../../../components/Inputs/commonInput";
import { MinusIcon, PlusSvgIcon } from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";

import TitleHeader from "../../../Profile/GoalsAndAspiration/TitleHeader";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import onBoardingTypes from "../../../../redux/types/onBoardingTypes";
import WellnessHeader from "./WellnessHeader";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";
import AddButton from "../../../Profile/GoalsAndAspiration/AddButton";
interface Props {
  navigation?: any;
  questionData?: any;
  allData?: any;
  stepNumber?: any;
  reqData?: any;
}
const CurrentMedications: React.FC<Props> = ({
  navigation,
  questionData,
  allData,
  stepNumber,
  reqData,
}) => {
  const dispatch = useDispatch();
  const [data, setdata] = useState(questionData.stepFields);

  const options = ["Once daily", "Twice daily", "Thrice daily"];

  useEffect(() => {
    setdata(transformData(questionData.stepFields, 0));
  }, []);
  const onAddmore = () => {
    let data_ = [
      {
        stepId: 0,
        fieldID: 137,
        fieldName: "What's the name of the medication?",
        fieldType: "TextBox",
        isRequired: true,
        stepNumber: null,
        stepFieldOptions: [],
        freIndex: 0,
      },
      {
        stepId: 0,
        fieldID: 138,
        fieldName: "What's the dosage?",
        fieldType: "TextBox",
        isRequired: true,
        stepNumber: null,
        stepFieldOptions: [],
        freIndex: 0,
      },
      {
        stepId: 0,
        fieldID: 139,
        fieldName: "How often is it taken?",
        fieldType: "SingleSelect",
        isRequired: true,
        stepNumber: null,
        freIndex: 0,
        stepFieldOptions: [
          {
            optionID: 560,
            title: "Once daily",
            optionLabel: null,
            logo: null,
            optionOrder: 1,
          },
          {
            optionID: 561,
            title: "Twice daily",
            optionLabel: null,
            logo: null,
            optionOrder: 2,
          },
          {
            optionID: 564,
            title: "Thrice daily",
            optionLabel: null,
            logo: null,
            optionOrder: 3,
          },
        ],
      },
      {
        stepId: 0,
        fieldID: 140,
        fieldName: "Noticed any side effects?",
        fieldType: "TextArea",
        isRequired: true,
        stepNumber: null,
        freIndex: 0,
        stepFieldOptions: [],
      },
    ];
    let updatedData = data.concat(data_);
    setdata(updatedData);
  };
  const transformData_ = (dat: any) => {
    let medications = [];

    for (let i = 0; i < data.length; i += 4) {
      console.log("first");
      let medication = {
        MedicationName: data[i].value || "",
        Description: data[i + 1].value || "",
        Frequency: options[data[i + 2].freIndex],
        SideEffect: data[i + 3].value || "",
      };
      medications.push(medication);
    }
    return {
      StepId: questionData.stepID,
      Questions: questionData.stepName,
      Type: questionData.fieldName,
      Medications: medications,
    };
  };

  console.log(":data->", data);
  const clearReduxSavedData = () => {
    dispatch({
      type: onBoardingTypes.SAVE_SHORT_TERM_GOAL_DATA,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_LONG_TERM_GOAL_DATA,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_MEDICAL_CONDITIONS,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.FITNESS_ACTIVITY,
      payload: null,
    });
    dispatch({
      type: onBoardingTypes.SAVE_STRESSORS_TRIGGERS,
      payload: null,
    });
  };

  const [feilds, setFields] = useState(false);
  const onNext = () => {
    const transformedData = transformData_(data);
    const isNotEmpty = transformedData?.Medications?.every((medication: any) =>
      Object?.values(medication)?.every((value: any) => value?.trim() !== "")
    );

    if (isNotEmpty) {
      reqData(transformedData);
      clearReduxSavedData();
      stepNumber(questionData?.stepNumber + 1);
    } else {
      setFields(true);
    }
  };
  const handleInputChange = (index: number, field: string, value: any) => {
    const newInputsData = [...data];
    newInputsData[index][field] = value;
    let data_ = transformData(newInputsData, index);
    setdata(data_);
  };
  const transformData = (data: any, itemIdx: any) => {
    const preData = [...data];

    return preData?.map((item: any, index: any) => {
      if (index == itemIdx) {
        return {
          value: item[item.fieldName],
          fieldID: item.fieldID,
          fieldName: item.fieldName,
          fieldType: item.fieldType,
          isRequired: item.isRequired,
          stepFieldOptions: item.stepFieldOptions,
          stepId: item.stepId,
          stepNumber: item.stepNumber,
          freIndex: 0,
        };
      } else {
        return { ...item, freIndex: 0 };
      }
    });
  };
  const onSubtractFrequency = (item: any, index: any) => {
    setdata((prevData: any) =>
      prevData?.map((dataItem: any, i: any) =>
        i === index
          ? {
              ...dataItem,
              freIndex:
                data[index]?.freIndex == 0
                  ? data[index]?.freIndex
                  : data[index]?.freIndex - 1,
            }
          : dataItem
      )
    );
  };

  const onAddFrequency = (item: any, index: any) => {
    setdata((prevData: any) =>
      prevData?.map((dataItem: any, i: any) => {
        return i === index
          ? {
              ...dataItem,
              freIndex:
                data[index]?.freIndex == 2
                  ? data[index]?.freIndex
                  : data[index]?.freIndex + 1,
            }
          : dataItem;
      })
    );
  };

  const getFrequency = (item: any, index: any) => {
    let data: any = item?.stepFieldOptions?.[item?.freIndex];
    return (
      <View
        style={{
          flexDirection: "row",
          borderRadius: moderateScale(53),
          backgroundColor: colors.themeColor,
          height: moderateScale(91),
        }}
      >
        <TouchableOpacity
          onPress={() => onSubtractFrequency(item, index)}
          style={{
            borderTopLeftRadius: moderateScale(53),
            backgroundColor: colors.SurfCrest,
            borderBottomLeftRadius: moderateScale(53),
            width: moderateScale(150),
            justifyContent: "center",
            alignItems: "center",
            height: moderateScale(91),
          }}
        >
          <MinusIcon />
        </TouchableOpacity>
        <View
          style={{
            zIndex: 20,
            position: "relative",
            height: moderateScale(90),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: colors.themeColor,
              borderWidth: 1,
              width: moderateScale(100),
              height: moderateScale(100),
              backgroundColor: colors.themeColor,
              borderRadius: moderateScale(95),
              position: "absolute",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderColor: colors.royalOrange,
                borderWidth: 1,
                width: moderateScale(95),
                height: moderateScale(95),
                backgroundColor: colors.themeColor,
                borderRadius: moderateScale(95),
                position: "absolute",
              }}
            >
              <Text
                style={{
                  fontSize: textScale(14),
                  fontWeight: "500",
                  color: colors.SurfCrest,
                }}
              >
                {data?.title}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onAddFrequency(item, index)}
          style={{
            backgroundColor: colors.SurfCrest,
            borderTopRightRadius: moderateScale(53),
            borderBottomRightRadius: moderateScale(53),
            width: moderateScale(150),
            justifyContent: "center",
            alignItems: "center",
            height: moderateScale(91),
          }}
        >
          <PlusSvgIcon />
        </TouchableOpacity>
      </View>
    );
  };

  const getCommonInput = (item: any, index: any, placeholderName: any) => {
    return (
      <CommonInput
        isWidth={false}
        mainContainer={{
          height:
            item.fieldName == "What’s the name of the medication?"
              ? moderateScale(56)
              : moderateScale(150),
          width: "100%",
          borderWidth: 1,
          borderColor: colors?.SurfCrest,
          borderRadius: moderateScale(10),
          backgroundColor: "transparent",
        }}
        placeholder={placeholderName}
        placeholderTextColor={colors.SurfCrest}
        multiline
        textAlignVertical={"top"}
        value={item.title}
        inputText={{ color: colors.SurfCrest }}
        onChangeText={(text: any) =>
          handleInputChange(index, item.fieldName, text)
        }
      />
    );
  };
  const getFields = (item: any, index: any) => {
    switch (item.fieldName) {
      case "What’s the name of the medication?":
      case "What?s the name of the medication?":
      case "What's the name of the medication?":
        return getCommonInput(item, index, "E.g., “Sertraline” or “Vitamin D”");
      case "What’s the dosage?":
      case "What?s the dosage?":
      case "What's the dosage?":
        return getCommonInput(item, index, "E.g., “10mg every morning”");
      case "How often is it taken?":
        return (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: moderateScale(10),
            }}
          >
            {getFrequency(item, index)}
          </View>
        );
      case "Noticed any side effects?":
        return getCommonInput(
          item,
          index,
          "E.g., “Dry mouth,” “Drowsiness,” or “None so far”"
        );
      default:
        return null;
    }
  };
  const renderData = ({ item, index }: any) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TitleHeader title={capitalizeFirstLetter(item.fieldName)} />
        </View>
        {getFields(item, index)}
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <WellnessHeader
        onBackPress={() => {
          stepNumber(questionData?.stepNumber - 1);
        }}
        headerName={capitalizeFirstLetter(questionData?.fieldName)}
      />
      <View style={{ flex: 1, paddingHorizontal: moderateScale(19) }}>
        <FlatList
          data={data}
          renderItem={renderData}
          keyExtractor={(item, index) => "key" + index}
          contentContainerStyle={{
            marginTop: moderateScale(10),
            paddingBottom: moderateScale(100),
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
                  btnName={"Add another medication"}
                  onPress={() => onAddmore()}
                  textStyle={{ color: colors?.SurfCrest }}
                />
                <View style={{ marginTop: moderateScale(15) }}>
                  <CommonButton
                    btnName={"Next"}
                    mainContainer={{ width: "auto" }}
                    onPress={() => onNext()}
                  />
                </View>
              </View>
            );
          }}
          ListHeaderComponent={
            <Text style={[styles.commonText, { fontSize: textScale(25) }]}>
              {capitalizeFirstLetter(questionData?.fieldName)}
            </Text>
          }
        />
      </View>
      <Toast />

      <CommonAlert
        isVisible={feilds}
        alertLeftButtonOnPress={() => {
          setFields(false);
        }}
        alertLeftButtonText={"Got it"}
        alertMessage={"Let’s complete this step"}
        DescriptionMessage={
          "Looks like some info is missing. Just fill in the required fields so everything’s safe and accurate."
        }
        isDescription
      />
    </View>
  );
};
export default CurrentMedications;
const styles = StyleSheet.create({
  commonText: {
    fontWeight: "500",
    color: colors.SurfCrest,
    marginTop: moderateScale(20),
  },
});
