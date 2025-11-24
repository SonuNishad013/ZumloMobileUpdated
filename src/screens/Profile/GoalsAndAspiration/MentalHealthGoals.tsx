import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import CommonButton from "../../../components/Buttons/commonButton";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import AddButton from "./AddButton";
import TitleHeader from "./TitleHeader";
import MultiButton from "./MultiButton";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import { CODES } from "../../../constant/DefaultGlobalCode";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
const MentalHealthGoals = ({
  data,
  navigation,
  goalID,
  short_longID,
  userData,
  onSwiperClick,
  screenIndex,
  setScreenIndex,
  setToasterDetails,
  from,
  setNextSection,
}: any) => {
  const dispatch = useDispatch();
  const [allData, setAllData] = useState(data?.[0]?.globalCodeOptions);
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let newData = allData.filter(
      (item: any) => item.codeName !== strings?.other
    );
    setAllData(newData);
  }, []);
  const [isAlert, setIsAlert] = useState(false);

  const onAddNew = () => {
    setIsNewAddedSpec(true);

    let newObj = {
      globalCodeId: CODES?.mental_health_code,
      codeName: "",
      isNewSpecification: true,
      isSelected: false,
    };

    setAllData([...allData, newObj]);
  };

  const onChangeNewSpec = (text: any) => {
    setCurrentInputValue(text);
    setAllData((prev: any) =>
      prev.map((item: any) =>
        item.isNewSpecification ? { ...item, codeName: text } : item
      )
    );
  };

  const onSaveMentalHealthData = () => {
    setIsLoading(true);
    let selectedData = allData
      .map((item: any) => (item.isSelected ? item.globalCodeId : undefined))
      .filter((item: any) => item !== undefined);

    if (
      selectedData.length > 0 ||
      (isNewAddedSpec && currentInputValue.trim() !== "")
    ) {
      setErrorMessage("");

      let requestBody = {
        userId: userData?.userId,
        goalCategoryId: short_longID,
        categoryId: goalID,
        mentalHealthGoals: {
          mentalHealthObjectiveId: selectedData,
          otherMentalHealthObjective: currentInputValue,
          targetOutcome: strings?.string,
        },
      };
      allActions.seekerDetails
        .CreateGoalAndAspirations(
          dispatch,
          requestBody,
          API_FUN_NAMES?.onSaveMentalHealthData
        )
        .then((response) => {
          if (response.statusCode === STATUS_CODES?.RESPONSE_OK) {
            setIsError(false);
            setToasterDetails({
              showToast: true,
              code: TOAST_STATUS?.SUCCESS,
              message: response.message,
            });
            setTimeout(() => {
              setIsLoading(false);
              setIsAlert(true);
            }, 2000);
          } else {
            setIsLoading(false);
            setIsError(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(false);
        });
    } else {
      setIsLoading(false);
      setErrorMessage(strings?.Please_select_a_mental_health);
      setIsError(true);
    }
  };

  const onActivitySelection = (item: any) => {
    const updatedArray = allData.map((val: any) =>
      val.globalCodeId === item.globalCodeId
        ? { ...val, isSelected: !val.isSelected }
        : val
    );
    if (isError) {
      setIsError(false);
    }
    setAllData(updatedArray);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textSubHeaderTitle}>{"Mental Well-being "}</Text>
        <TitleHeader title={"What would you like support with right now? "} />
        {allData?.map(
          (elem: any, index: any) =>
            !elem.isNewSpecification && (
              <CommonButton
                key={index}
                btnName={capitalizeFirstLetter(elem.codeName)}
                tintIconColor={
                  elem?.isSelected ? colors.royalOrangeDark : colors.SurfCrest
                }
                iconSource={elem?.imageURL}
                mainContainer={{
                  ...styles.activityButton,
                  borderBottomWidth:
                    index !== allData.length - 1 ? moderateScale(0.7) : 0,
                }}
                tintColor={
                  elem?.isSelected ? colors.royalOrangeDark : colors.SurfCrest
                }
                onPress={() => onActivitySelection(elem)}
                btnNameStyle={styles.btnNameStyle}
                rightImage={elem?.isSelected && imagePath?.Greentick}
              />
            )
        )}
        {isError && (
          <View>
            <Text style={styles.errorText}>
              {"Pick a goal to get started or tap on `Maybe later`"}
            </Text>
          </View>
        )}
        {isNewAddedSpec && (
          <TextInput
            style={styles.newSpecInput}
            placeholder={strings?.Specify_others}
            placeholderTextColor={colors.SurfCrest}
            value={currentInputValue}
            onChangeText={onChangeNewSpec}
          />
        )}
        {!isNewAddedSpec && (
          // <AddButton containerStyle={styles.addButton} onPress={onAddNew} />
          <AddButton
            containerStyle={styles.addButton}
            onPress={onAddNew}
            btnName={"It's something else"}
            plusImageStyle={{
              height: moderateScale(11),
              width: moderateScale(11),
            }}
            textStyle={{ marginHorizontal: 0, color: colors?.SurfCrest }}
          />
        )}
        <MultiButton
          onPress={onSaveMentalHealthData}
          navigation={navigation}
          onSwiperClick={onSwiperClick}
          screenIndex={screenIndex}
          setScreenIndex={setScreenIndex}
          setNextSection={() => {
            setNextSection(false);
          }}
        />
      </ScrollView>

      {isLoading && <CommonLoader />}
      <CommonAlert
        isVisible={isAlert}
        alertMessage={strings?.You_have_successfully_set_your_goal}
        alertLeftButtonOnPress={() => {
          setScreenIndex(screenIndex - 1);
        }}
        alertLeftButtonText={strings?.Set_more_goals}
        alertRightButtonOnPress={() => {
          setIsAlert(false);
          if (
            [
              strings?.fromExplorer,
              strings?.ExplorerActivity,
              strings?.AIGeneratedSkipped,
            ].includes(from)
          ) {
            const isFromAIGeneratedSkipped =
              from === strings?.AIGeneratedSkipped; //if user get from value equalevalent to AI skipped then set is planner tru else false because user is probably from explorer side

            event.emit(SOCKET_FUN_NAME?.login);
            AsyncStorageUtils.storeItemKey(
              AsyncStorageUtils.ISPLANNER_USER,
              JSON.stringify({
                isPlanner: isFromAIGeneratedSkipped,
                isSelected: true,
              })
            );
          } else {
            navigation?.navigate(navigationString.Home);
            navigation.pop(3);
          }
        }}
        alertRightButtonText={strings?.goToDashboard}
      />
    </View>
  );
};

export default MentalHealthGoals;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: moderateScale(20),
  },
  textSubHeaderTitle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(8),
  },
  activityButton: {
    backgroundColor: colors.backgroundTheme,
    width: "100%",
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.SurfCrest,
    height: moderateScale(57),
    borderRadius: 0,
  },
  leftImageStyle: {
    width: moderateScale(23),
    height: moderateScale(23),
  },
  btnNameStyle: {
    textAlign: "left",
    paddingStart: moderateScale(16),
  },
  errorText: {
    color: colors.royalOrange,
    marginTop: moderateScale(10),
  },
  newSpecInput: {
    height: moderateScale(60),
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: 1,
    padding: moderateScale(10),
    color: colors.SurfCrest,
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    paddingTop: 20,
    textAlignVertical: "top",
  },
  addButton: {
    marginVertical: moderateScale(20),
    borderColor: colors?.SurfCrest,
    justifyContent: "center",
  },
});
