import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import CommonInput from "../../../components/Inputs/commonInput";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import {
  DEVELOPING_NEW_SKILLS_DATA,
  DEVELOPING_NEW_SKILLS_DATA_,
  LEARNING_RESOURCES_NEEDED,
} from "./data";
import CommonButton from "../../../components/Buttons/commonButton";
import styles from "./styles";
import TitleHeader from "./TitleHeader";
import { imagePath } from "../../../assets/png/imagePath";
import MultiButton from "./MultiButton";
import CustomDatePicker from "./CustomDatePicker";
import AddButton from "./AddButton";
import DevelopingSkills from "./developingSkillssecond";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import { CODES } from "../../../constant/DefaultGlobalCode";
import { PATTERNS } from "../../../constant/Patterns";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES, TOAST_STATUS } from "../../../constant/appConstant";
import logger from "../../../constant/logger";

const StepThree = ({
  onPress,
  item,
  nextSection,
  setNextSection,
  navigation,
  ProficiencyData,
  goalID,
  short_longID,
  userData,
  onSwiperClick,
  screenIndex,
  setScreenIndex,
  setToasterDetails,
  from,
}: any) => {
  const [allData, setallData] = useState<any>(item?.[0]?.globalCodeOptions);
  const [learningIndex, setLearningIndex] = useState(-1);
  const [fieldsData, setFieldsData] = useState(DEVELOPING_NEW_SKILLS_DATA_);
  const [learningResources, setLearningResources] = useState(
    LEARNING_RESOURCES_NEEDED
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isNewAddedSpec, setIsNewAddedSpec] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [SelectedData, setsetSelectedData] = useState<any>();
  const [isError, setisError] = useState(false);
  const [isError1, setisError1] = useState(false);
  const [isError2, setisError2] = useState(false);
  const [isError3, setisError3] = useState(false);
  const [isAlert, setisAlert] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    let newData = allData.filter(
      (item: any) => item.codeName !== strings?.Other
    );
    setallData(newData);
  }, []);

  const onAddNew = () => {
    setIsNewAddedSpec(true);
    let newObj = {
      globalCodeId: CODES?.added_spec_code,
      codeName: "",
      isNewSpecification: true,
    };

    setallData([...allData, newObj]);
  };
  const onChangeNewSpec = (text: any) => {
    const filteredText = text.replace(PATTERNS?.string_match, "");
    setCurrentInputValue(filteredText);
    setallData((prev: any) =>
      prev.map((item: any) =>
        item.isNewSpecification ? { ...item, codeName: text } : item
      )
    );
  };
  const saveDevelopingData = () => {
    setisLoading(true);
    let selectedData = allData
      ?.map((item: any) => {
        if (item.isSelected) {
          return item.globalCodeId;
        }
      })
      .filter((item: any) => item !== undefined);

    let selectedData_ = SelectedData?.map((item: any) => {
      if (item.isSelected) {
        return item.globalCodeId;
      }
    }).filter((item: any) => item !== undefined);

    if (selectedData_ !== undefined) {
      try {
        let requestbody = {
          userId: userData?.userId,
          goalCategoryId: short_longID,
          categoryId: goalID,
          developingNewSkill: {
            skillDescription: fieldsData?.[0]?.value,
            reasonForDevelopment: fieldsData?.[0]?.value,
            learningResourcesNeededId:
              selectedData.length !== undefined ? selectedData : null,
            otherLearningResourcesNeeded: currentInputValue,
            targetProficiencyLevelId:
              selectedData_ !== undefined ? selectedData_?.[0] : null,
            targetDate: selectedDate.toISOString(),
          },
        };
        allActions.seekerDetails
          .CreateGoalAndAspirations(
            dispatch,
            requestbody,
            API_FUN_NAMES?.saveDevelopingData
          )
          .then((response: any) => {
            if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
              setisError(false);

              setToasterDetails({
                showToast: true,
                code: TOAST_STATUS?.SUCCESS,
                message: response.message,
              });
              setTimeout(() => {
                setisLoading(false);
                setisAlert(true);
              }, 2000);
            } else {
              setisLoading(false);
            }
          })
          .catch((err) => {
            manageState(false, false);
          });
      } catch (error) {
        manageState(false, false);
      }
    } else {
      manageState(false, true);
    }
  };

  const manageState = (loading: boolean, error: boolean) => {
    setisLoading(loading);
    setisError(error);
  };

  const onActivitySelection = (item: any) => {
    const updatedArray = allData.map((val: any) => {
      if (val.globalCodeId === item.globalCodeId) {
        return { ...val, isSelected: !val.isSelected };
      }
      return val;
    });
    setallData(updatedArray);
  };
  const handleSelectedData = (item: any) => {
    if (isError) {
      setisError(!isError);
    } else {
      setisError(false);
    }
    setsetSelectedData(item);
  };
  const renderFooter = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <View style={stylesInternal?.container}>
      <Text style={styles.textSubHeaderTitle}>
        {strings?.Developing_new_skill}
      </Text>
      {!nextSection ? (
        <>
          <FlatList
            contentContainerStyle={stylesInternal?.addGap}
            data={allData}
            keyExtractor={(item, index) => "key" + index}
            ListHeaderComponent={
              <>
                {fieldsData?.map((elem, index) => {
                  return (
                    <View style={stylesInternal?.addTop}>
                      <TitleHeader
                        title={elem.question}
                        style={stylesInternal?.addVertical}
                      />
                      <CommonInput
                        placeholder={elem?.placeHolder}
                        mainContainer={stylesInternal?.addTop}
                        value={elem.value}
                        inputText={{ color: colors.SurfCrest }}
                        onChangeText={(value: any) => {
                          const filteredText = value.replace(
                            PATTERNS?.string_match,
                            ""
                          );
                          let data = [...fieldsData];
                          data[index].value = filteredText;
                          setFieldsData(data);
                        }}
                        placeholderTextColor={colors.SurfCrest}
                        backGroundColor={colors.SaltBox}
                        borderColor={colors.SurfCrest}
                        isWidth={false}
                      />
                      {isError1 ? (
                        <View style={stylesInternal?.addTop}>
                          <Text style={stylesInternal?.addOrangeColor}>
                            {
                              "Tell us the skill you’re excited to begin—this helps us shape your plan."
                            }
                          </Text>
                        </View>
                      ) : null}
                      {isError2 ? (
                        <View style={stylesInternal?.addTop}>
                          <Text style={stylesInternal?.addOrangeColor}>
                            {
                              "A little context goes a long way—we’d love to know your why."
                            }
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  );
                })}
                <View style={stylesInternal?.addTop20}>
                  <TitleHeader
                    title={"How do you like to learn?"}
                    style={stylesInternal?.addVertical}
                  />
                </View>
              </>
            }
            renderItem={({ item, index }) => {
              return (
                <>
                  {!item.isNewSpecification && (
                    <CommonButton
                      btnName={item?.codeName}
                      onPress={() => onActivitySelection(item)}
                      iconSource={item?.imageURL}
                      rightImage={index == learningIndex && imagePath.Tick}
                      tintIconColor={colors.SurfCrest}
                      btnNameStyle={stylesInternal?.textAlignLeft}
                      mainContainer={[
                        stylesInternal?.commonButtonContainer,
                        {
                          backgroundColor: item.isSelected
                            ? colors?.polishedPine
                            : colors?.transparent,
                        },
                      ]}
                    />
                  )}
                </>
              );
            }}
            ListFooterComponent={
              !isNewAddedSpec ? (
                renderFooter()
              ) : (
                <>
                  {isError3 ? (
                    <View style={stylesInternal?.addTop}>
                      <Text style={stylesInternal?.addOrangeColor}>
                        {
                          "Pick at least one way you enjoy learning—we’ll keep it doable."
                        }
                      </Text>
                    </View>
                  ) : null}
                </>
              )
            }
          />

          {isNewAddedSpec && (
            <TextInput
              style={stylesInternal?.addSpecView}
              placeholder={strings?.Specify_others}
              placeholderTextColor={colors?.SurfCrest}
              value={currentInputValue}
              onChangeText={onChangeNewSpec}
            />
          )}

          <View style={{ marginBottom: moderateScale(10) }}>
            <CommonButton
              btnName={"Continue"}
              mainContainer={styles.buttonContainer}
              onPress={() => {
                if (!fieldsData[0]?.value) {
                  setisError1(true);
                } else if (!fieldsData[1]?.value) {
                  setisError2(true);
                } else if (
                  !allData.filter((val: any) => val?.isSelected).length
                ) {
                  setisError3(true);
                  return;
                } else {
                  onPress(fieldsData);
                  setNextSection(true);
                }
              }}
            />
          </View>
        </>
      ) : (
        <View style={stylesInternal?.addJustifyCenter}>
          <TitleHeader title={"What level are you aiming for?"} />
          <Text
            style={{
              fontSize: textScale(12),
              fontWeight: "600",
              color: colors?.SurfCrest,
              marginTop: moderateScale(0),
              marginBottom: moderateScale(20),
            }}
          >
            {
              "Choose where you want to be—we’ll help you build the path to get there."
            }
          </Text>
          <DevelopingSkills
            onPress={() => {}}
            item={ProficiencyData}
            selectedData={handleSelectedData}
          />
          {isError ? (
            <View style={stylesInternal?.addTop}>
              <Text style={stylesInternal?.addOrangeColor}>
                {"Pick a level so we can tailor your journey."}
              </Text>
            </View>
          ) : null}
          <View style={{ marginTop: moderateScale(15) }} />
          <CustomDatePicker
            showDatePicker={showDatePicker}
            innerTitle={"Select a date that feels doable"}
            selectedDate={selectedDate}
            setShowDatePicker={setShowDatePicker}
            setSelectedDate={(date: any) => {
              setShowDatePicker(false);
              setSelectedDate(date);
            }}
            title={
              "By when would you like to reach this level?" //
            }
          />
          {isError ? (
            <View style={stylesInternal?.addTop}>
              <Text style={stylesInternal?.addOrangeColor}>
                {
                  "Let’s set a timeline that works for you—even if it’s flexible."
                }
              </Text>
            </View>
          ) : null}
          <View style={{ marginTop: moderateScale(20) }} />
          <MultiButton
            buttonContainerStyle={{}}
            onPress={() => saveDevelopingData()}
            navigation={navigation}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            setNextSection={() => {
              setNextSection(false);
            }}
          />
        </View>
      )}
      {isLoading && <CommonLoader />}

      <CommonAlert
        isVisible={isAlert}
        alertMessage={strings?.You_have_successfully_set_your_goal}
        alertLeftButtonOnPress={() => {
          setNextSection(false);
          setScreenIndex(screenIndex - 1);
        }}
        alertLeftButtonText={strings?.Set_more_goals}
        alertRightButtonOnPress={() => {
          setNextSection(false);
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

export default StepThree;

const stylesInternal = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addGap: {
    gap: moderateScale(15),
  },
  addTop: {
    marginTop: 10,
  },
  addTop20: {
    marginTop: moderateScale(20),
  },
  addVertical: {
    marginVertical: 5,
  },
  textAlignLeft: {
    textAlign: "left",
  },
  commonButtonContainer: {
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(15),
    justifyContent: "flex-start",
    width: "100%",
  },
  addSpecView: {
    height: moderateScale(60),
    width: "100%",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: 1,
    padding: moderateScale(20),
    color: colors?.SurfCrest,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    paddingTop: 20,
  },
  addJustifyCenter: {
    justifyContent: "center",
  },
  addOrangeColor: {
    color: colors.royalOrange,
  },
});
