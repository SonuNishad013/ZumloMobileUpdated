import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import WellnessHeader from "./WellnessHeader";
import { useDispatch, useSelector } from "react-redux";
import onBoardingTypes from "../../../../redux/types/onBoardingTypes";
import { useFocusEffect } from "@react-navigation/native";
import { getFitnessActivity } from "../../../../redux/selector";
import CommonLoader from "../../../../components/Loader";
import CustomToast from "../../../../components/Toast";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../../components/ImageRender";

interface Props {
  navigation?: any;
  questionData?: any;
  allData?: any;
  stepNumber?: any;
  reqData?: any;
}
const FitnessActivityLevels: React.FC<Props> = ({
  navigation,
  questionData,
  stepNumber,
  reqData,
}) => {
  const [isLoading, setisLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null); // Selected index
  const fitnessData: any = useSelector(getFitnessActivity());
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (fitnessData !== null && fitnessData !== undefined) {
        setSelectedIdx(fitnessData);
      }
      return () => {
        // Additional cleanup code if needed
      };
    }, [])
  );

  const getIndexForBG = (index: any) => {
    return index === selectedIdx
      ? colors?.royalOrange
      : colors?.lightSurfCrest02;
  };

  const onNext = () => {
    if (selectedIdx !== null) {
      let selectedItem =
        questionData?.stepFields?.[0]?.stepFieldOptions?.[selectedIdx];

      let apiReq = {
        StepId: questionData.stepID,
        "Questions:": questionData.stepName,
        Type: questionData.fieldName,
        Options: [selectedItem],
        OptionsAnswer: [selectedItem],
      };

      dispatch({
        type: onBoardingTypes.FITNESS_ACTIVITY,
        payload: selectedIdx,
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
        message: "Please select any fitness activity level.",
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WellnessHeader
        onBackPress={() => stepNumber(questionData?.stepNumber - 1)}
        headerName={questionData?.fieldName}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginHorizontal: moderateScale(19) }}>
          <Text style={styles.title}>{questionData?.stepName}</Text>
          <Text style={styles.subtitle}>
            {
              "How active are you most days?\nThis helps balance your goals and energy."
            }
          </Text>
          {/* <Text style={styles.subtitle}>
            {""}
          </Text> */}
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: moderateScale(20),
          }}
        >
          <View
            style={{
              backgroundColor: colors?.lightSurfCrest02,
              width: moderateScale(180),
              alignItems: "center",
              borderRadius: moderateScale(15),
              borderWidth: moderateScale(1),
              borderColor: colors?.SurfCrest,
              paddingVertical: moderateScale(2),
              marginVertical: moderateScale(20),
            }}
          >
            <FlatList
              data={questionData?.stepFields?.[0]?.stepFieldOptions}
              scrollEnabled={false}
              keyExtractor={(item, index) => "key" + index}
              renderItem={({ item, index }: any) => {
                let lastIndex =
                  questionData?.stepFields?.[0]?.stepFieldOptions.length - 1;
                return (
                  <TouchableOpacity onPress={() => setSelectedIdx(index)}>
                    <View
                      style={{
                        height: moderateScale(90),
                        width: moderateScale(175),
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: getIndexForBG(index),
                        borderTopLeftRadius:
                          index === 0 ? moderateScale(15) : 0,
                        borderTopRightRadius:
                          index === 0 ? moderateScale(15) : 0,
                        borderBottomRightRadius:
                          index === lastIndex ? moderateScale(15) : 0,
                        borderBottomLeftRadius:
                          index === lastIndex ? moderateScale(15) : 0,
                      }}
                    >
                      {item?.logo && (
                        // <Image
                        //   source={{ uri: item?.logo }}
                        //   style={{
                        //     height: moderateScale(20),
                        //     width: moderateScale(20),
                        //     tintColor:
                        //       index === selectedIdx
                        //         ? colors?.prussianBlue
                        //         : colors?.lightSurfCrest,
                        //   }}
                        //   resizeMode={"contain"}
                        // />
                        <CustomImage
                          source={{ uri: item?.logo }}
                          width={moderateScale(20)}
                          height={moderateScale(20)}
                          tintColor={
                            index === selectedIdx
                              ? colors?.prussianBlue
                              : colors?.lightSurfCrest
                          }
                        />
                      )}
                      <Text
                        style={{
                          fontSize: textScale(14),
                          color:
                            index === selectedIdx
                              ? colors?.prussianBlue
                              : colors?.SurfCrest,
                          fontWeight: "600",
                          marginTop: moderateScale(10),
                        }}
                      >
                        {capitalizeFirstLetter(item?.title)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
            />
          </View>
        </View>
      </ScrollView>

      <CommonButton
        btnName={"NEXT"}
        mainContainer={styles.commonButtonContainer}
        onPress={onNext}
      />
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
  );
};

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
  itemSeparator: {
    flex: 1,
    height: moderateScale(0.9),
    backgroundColor: colors?.surfCrustOp,
    marginHorizontal: moderateScale(20),
  },
  commonButtonContainer: {
    marginBottom: moderateScale(30),
    marginHorizontal: moderateScale(19),
    width: "auto",
  },
});

export default FitnessActivityLevels;
