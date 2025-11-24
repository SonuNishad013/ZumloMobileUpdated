import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { imagePath } from "../../../assets/png/imagePath";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonInput from "../../../components/Inputs/commonInput";
import colors from "../../../constant/colors";
import TitleHeader from "./TitleHeader";
import AddButton from "./AddButton";
import CustomDatePicker from "./CustomDatePicker";
import MultiButton from "./MultiButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import CustomImage from "../../../components/ImageRender";
import navigationString from "../../../navigation/navigationString";
import { CODES } from "../../../constant/DefaultGlobalCode";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import { strings } from "../../../constant/strings";
import { style } from "../../UserGoals/MyGoals/style";
import styles from "./styles";

const ProfessionalGoals = ({
  data,
  item,
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
  const [allData, setAllData] = useState<any>(item?.[0]?.globalCodeOptions);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aspirationVal, setAspirationVal] = useState("");
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isError1, setIsError1] = useState(false);
  const [isError2, setIsError2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    let newData = allData.filter((item: any) => item.codeName !== "Other");
    newData = newData.map((item: any) => ({ ...item, isSelected: false }));
    setAllData(newData);
  }, []);

  const onAddNew = () => {
    setIsNewAddedSpec(true);
    let newObj = {
      globalCodeId: CODES?.professional_goal_code,
      codeName: "",
      isNewSpecification: true,
      isSelected: true,
    };
    setAllData([...allData, newObj]);
  };
  const onChangeNewSpec = (text: any) => {
    const filteredText = text;
    setCurrentInputValue(filteredText);
    setAllData((prev: any) =>
      prev.map((item: any) =>
        item.isNewSpecification ? { ...item, codeName: filteredText } : item
      )
    );
  };
  const saveProfessionalGoalsData = () => {
    setIsLoading(true);
    let selectedData = allData
      .map((item: any) => {
        if (item.isSelected) {
          return item.globalCodeId;
        }
      })
      .filter((item: any) => item !== undefined);
    if (
      selectedData.length > 0 ||
      (isNewAddedSpec && currentInputValue.trim() !== "")
    ) {
      setErrorMessage("");
      try {
        let requestbody = {
          userId: userData?.userId,
          goalCategoryId: short_longID,
          categoryId: goalID,
          professionalGoals: {
            careerAspiration: aspirationVal,
            professionalDevelopmentActivitiesId: selectedData,
            otherProfessionalDevelopmentActivities: currentInputValue,
            targetDate: selectedDate.toISOString(),
          },
        };
        allActions.seekerDetails
          .CreateGoalAndAspirations(
            dispatch,
            requestbody,
            API_FUN_NAMES?.saveProfessionalGoalsData
          )
          .then((response: any) => {
            if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
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
              setIsError(true);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setIsError(true);
          });
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    } else {
      setIsLoading(false);
      setErrorMessage(
        "Select at least one area of development or tap “Other” to add your own."
      );
      setIsError(true);
    }
  };
  const onActivitySelection = (item: any) => {
    const updatedArray = allData?.map((val: any) => {
      if (val.globalCodeId === item.globalCodeId) {
        return { ...val, isSelected: !val.isSelected };
      }
      return val;
    });
    if (isError) {
      setIsError(!isError);
    } else {
      setIsError(false);
    }
    setAllData(updatedArray);
  };
  const onChangeAspirations = (text: any) => {
    setAspirationVal(text);
  };
  const heightWidht = moderateScale(140);
  return (
    <View style={stylesInternal?.container}>
      {isLoading && <CommonLoader />}
      <ScrollView contentContainerStyle={stylesInternal?.mainContainer}>
        <Text style={stylesInternal?.capitalLetterView}>
          {capitalizeFirstLetter(data?.goalType)}
        </Text>
        <TitleHeader
          title={"What is your career aspiration?"}
          style={stylesInternal?.titleStyle}
        />
        <CommonInput
          placeholder={
            "E.g., “Become a therapist,” or “Start my own business,”" //error= Enter a goal or aspiration to shape the focus.
          }
          mainContainer={stylesInternal?.addTop}
          value={aspirationVal}
          inputText={{ color: colors.SurfCrest }}
          placeholderTextColor={colors.SurfCrest}
          backGroundColor={colors.SaltBox}
          borderColor={colors.SurfCrest}
          isWidth={false}
          onChangeText={(text: any) => onChangeAspirations(text)}
        />
        {isError ? (
          <View
            style={{
              marginTop: moderateScale(5),
              marginLeft: moderateScale(-50),
            }}
          >
            <Text style={{ color: colors.royalOrange }}>
              {"Enter a goal or aspiration to shape the focus."}
            </Text>
          </View>
        ) : null}
        <View style={stylesInternal?.addWidth}>
          <TitleHeader
            title={
              "What professional development activities are planned or currently in progress?"
            }
          />
        </View>

        <View style={stylesInternal?.listView}>
          {allData?.map((item: any, index: any) => {
            return (
              <>
                {!item.isNewSpecification && (
                  <TouchableOpacity
                    onPress={() => onActivitySelection(item)}
                    style={[
                      stylesInternal?.clickableView,
                      {
                        width: heightWidht,
                        height: heightWidht,
                        borderRadius: heightWidht / 2,
                        backgroundColor: item?.isSelected
                          ? colors?.royalOrange
                          : colors?.transparent,
                      },
                    ]}
                  >
                    <ImageBackground
                      source={
                        item?.isSelected
                          ? imagePath?.ImgFrame
                          : imagePath?.UnSelectedImgFrame
                      }
                      style={stylesInternal?.bgImageStyle}
                    >
                      <CustomImage
                        source={{ uri: item.imageURL }}
                        width={moderateScale(34)}
                        height={moderateScale(34)}
                        tintColor={
                          item?.isSelected
                            ? colors?.prussianBlue
                            : colors?.SurfCrest
                        }
                      />
                      <Text
                        style={{
                          fontSize: textScale(13),
                          fontWeight: "600",
                          color: item.isSelected
                            ? colors.prussianBlue
                            : colors.SurfCrest,
                          margin: moderateScale(10),
                          textAlign: "center",
                        }}
                      >
                        {capitalizeFirstLetter(item?.codeName)}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              </>
            );
          })}
        </View>
        {isError ? (
          <View style={{ marginTop: moderateScale(15) }}>
            <Text style={{ color: colors.royalOrange }}>
              {
                errorMessage
                //Set a goal date to keep things clear and trackable.
              }
            </Text>
          </View>
        ) : null}
        {isNewAddedSpec && (
          <TextInput
            style={stylesInternal?.addSpecInput}
            placeholder={strings?.Specify_others}
            placeholderTextColor={colors?.SurfCrest}
            value={currentInputValue}
            onChangeText={onChangeNewSpec}
          />
        )}
        {!isNewAddedSpec && (
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
        <View style={stylesInternal?.pickerView}>
          <CustomDatePicker
            showDatePicker={showDatePicker}
            innerTitle={"Select a timeline that feels right"}
            selectedDate={selectedDate}
            setShowDatePicker={setShowDatePicker}
            setSelectedDate={(date: any) => {
              setShowDatePicker(false);
              setSelectedDate(date);
            }}
            title={"What is the target date to achieve this goal?"}
          />
        </View>
        {isError ? (
          <View style={{ marginTop: moderateScale(15) }}>
            <Text style={{ color: colors.royalOrange }}>
              {"Set a goal date to keep things clear and trackable."}
            </Text>
          </View>
        ) : null}
        <MultiButton
          onPress={() => saveProfessionalGoalsData()}
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
        alertRightButtonOnPress={async () => {
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
            navigation?.navigate(navigationString.PlannerDashboard);
            navigation.pop(3);
          }
        }}
        alertRightButtonText={strings?.goToDashboard}
      />
    </View>
  );
};

export default ProfessionalGoals;

const stylesInternal = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: moderateScale(19),
    justifyContent: "center",
    alignItems: "center",
  },
  capitalLetterView: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginVertical: moderateScale(20),
    alignSelf: "flex-start",
  },
  titleStyle: {
    marginVertical: 1,
    width: "100%",
  },
  addTop: {
    marginTop: moderateScale(10),
  },
  addWidth: {
    width: "100%",
  },
  listView: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "center",
    gap: moderateScale(30),
  },
  clickableView: {
    justifyContent: "center",
    alignItems: "center",
  },
  bgImageStyle: {
    width: moderateScale(150),
    height: moderateScale(150),
    justifyContent: "center",
    alignItems: "center",
  },
  addSpecInput: {
    height: moderateScale(60),
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    color: colors?.SurfCrest,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(15),
    paddingTop: moderateScale(20),
  },
  pickerView: {
    marginHorizontal: moderateScale(15),
    width: "100%",
  },
  addOrangeColor: {
    color: colors.royalOrange,
  },
});
