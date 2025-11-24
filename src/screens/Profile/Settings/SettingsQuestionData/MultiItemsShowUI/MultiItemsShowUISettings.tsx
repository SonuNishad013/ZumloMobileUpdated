import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import { imagePath } from "../../../../../assets/png/imagePath";
import CommonButton from "../../../../../components/Buttons/commonButton";
import { strings } from "../../../../../constant/strings";
import TextInputStretch from "../../../../../components/OnBoardiingComponents/TextInputStretch";
import { validateName } from "../../../../../validations/validation";
import {
  allStepName,
  fieldType,
} from "../../../../../constant/AllGlobalNameConstant";
import { showSettingHeader } from "../../../../../constant/ProfileConstant";
import BoxButtonIcon from "../../../../../components/OnBoardiingComponents/BoxButtonIcon";
import AddButton from "../../../../OnBoarding/WellnessPlan/ReGenerateWellnessPlan/AddButton";
import IconTextButtonWidthDynamic from "../../../../../components/OnBoardiingComponents/IconTextButtonWidthDynamic";
import LineSeclectionButton from "../../../../../components/OnBoardiingComponents/LineSeclectionButton";
import {
  renderUpdatedStepOptions,
  renderUpdatedStepOptionsSingle,
  updateAnswerRequest,
  UpdatedStepOtherShow,
} from "../../../../../helper/FormHelpers";
import { styles } from "./styles";
import MainHeading from "../../../UserFormData/ExtraComponet/MainHeading";
import LineHeading from "../../../UserFormData/ExtraComponet/LineHeading";
import CustomToggle from "../../../../../components/CustomToggle/CustomToggle";
import CheckBoxSelect from "../../../../../components/CustomToggle/CheckBoxSelect";
import { formatSentenceCase } from "../../../../../helper/sentenceCase";
import navigationString from "../../../../../navigation/navigationString";
import { useDispatch } from "react-redux";
import allActions from "../../../../../redux/actions";
import * as AsyncStorageUtils from "../../../../../utils/Storage/AsyncStorage";
import logger from "../../../../../constant/logger";
import { textLabelSize } from "../../../../../utils/TextConfig";
import { capitalizeFirstLetter } from "../../../../../validations/capitalizeFirstLetter";

interface Props {
  questions?: any;
  updatedAnswer?: any;
  type?: any;
  isLoading?: boolean;
  navigation?: any;
}
const MultiItemsShowUISettings: React.FC<Props> = ({
  questions,
  updatedAnswer,
  type,
  isLoading,
  navigation,
}) => {
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();
  console.log("-00-0-->data", data);
  useEffect(() => {
    if (questions !== data) {
      setData(questions);
    }
  }, [questions]);
  const handleInputChange = (val: string, idx: number) => {
    console.log("first--0--->", val, idx);
    const updateAnswer = [...data];
    updateAnswer[idx].otherAnswer = val;
    setData(updateAnswer);
  };
  const handleAddSpecifications = (idx: number, data: any) => {
    let changesData = [...data];
    const addSpecIndex = changesData[idx]?.stepOptions.findIndex(
      (option: any) => option?.optionValue === strings?.addSpecifications
    );
    if (addSpecIndex !== -1) {
      setData(UpdatedStepOtherShow(idx, addSpecIndex, changesData));
    }
  };

  const CallSessionTimeouApi = async (data: boolean, data_: any) => {
    let bearerToken = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.ACCESS_TOKEN
    );
    try {
      let requestbody = {
        token: `${bearerToken}`,
        sessionTimeOutInMinutes: data ? 30 : 0,
      };
      console.log("requestbody in session timeout", requestbody);
      allActions.seekerDetails
        .SessionTimeOutAPI(dispatch, requestbody, "SessionTimeOutAPI")
        .then((resp: any) => {
          console.log(
            "response in sessiontimeout===>>>",
            resp,
            bearerToken,
            "resp?.data?.newToken",
            resp?.data?.newToken
          );
          if (resp?.data?.newToken) {
            AsyncStorageUtils.storeItemKey(
              AsyncStorageUtils.ACCESS_TOKEN,
              resp?.data?.newToken
            );
            updatedAnswer(updateAnswerRequest(data_)); //updating the setting screen's UI.
          }
        });
    } catch (error) {}
  };
  const iCircle = () => {
    return (
      <View
        style={{
          height: moderateScale(16),
          width: moderateScale(16),
          borderRadius: moderateScale(16),
          backgroundColor: colors?.prussianBlue,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors?.SurfCrest,
            fontSize: textScale(10),
            fontWeight: "900",
          }}
        >
          {"i"}
        </Text>
      </View>
    );
  };

  const mainHeaderText = (type: any) => {
    switch (type) {
      case "For password":
        return {
          MainHeader: "Your safety, your settings",
          CTAButton: "Update & save",
        };
      case "For Health data":
        return {
          MainHeader: "Informed care starts with you",
          subTitle:
            "When you share your health info, I can show up for you better. Nothing shared without your okay—always.",
          CTAButton: strings?.save,
        };
      case "Notification Settings":
        return {
          MainHeader: "Let’s stay in touch—your way ",
          subTitle:
            "Pick how and when you want to hear from me. Just the good stuff—no spam, promise.",
          CTAButton: "Save my choices",
        };
      default:
        return { MainHeader: type, CTAButton: strings?.save };
    }
  };
  const forSubTittleCheckType: string[] = [
    "For Health data",
    "Notification Settings",
  ];

  const lineHeaderText = (stepDescription: any) => {
    switch (stepDescription) {
      case "Password":
        return "Keep things secure by updating your password anytime you like.";
      case "Consent to use Health data":
        return "Health data sharing";
      case "I agree to the terms and conditions":
        return "Agreement";

      default:
        return stepDescription;
    }
  };

  const textBelowLineHeader = (stepDescription: any) => {
    switch (stepDescription) {
      case "Consent to use Health data":
        return "Allow use of health data for personalization";
      case "I agree to the terms and conditions":
        return "I agree to Zumlo's terms & conditions";

      default:
        return stepDescription;
    }
  };

  logger("type_data____", { data, type });
  return (
    <View style={{ marginTop: moderateScale(15) }}>
      {type ? (
        <MainHeading
          heading={formatSentenceCase(mainHeaderText(type)?.MainHeader)}
        />
      ) : null}
      {type && forSubTittleCheckType.includes(type) ? (
        <MainHeading
          textStyle={{
            fontSize: textLabelSize?.subHeaderTextSize,
            marginBottom: moderateScale(25),
          }}
          heading={mainHeaderText(type)?.subTitle}
        />
      ) : null}
      {data?.map((itemsData: any, idx: any) => {
        return (
          <View key={idx}>
            {showSettingHeader?.includes(itemsData?.stepName) ? (
              <LineHeading
                questionHeading={formatSentenceCase(
                  lineHeaderText(itemsData?.stepDescription)
                )}
              />
            ) : null}

            {[fieldType?.singleSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  numColumns={3}
                  keyExtractor={(item, index) => "key" + index}
                  columnWrapperStyle={styles.columnWrapper}
                  scrollEnabled={false}
                  contentContainerStyle={styles.flatListContentContainer}
                  style={styles.flatList}
                  renderItem={({ item, index }: any) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <BoxButtonIcon
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                          title={item?.optionValue}
                          source={
                            item.logo ? { uri: item.logo } : imagePath?.PlusIcon
                          }
                          button={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.toggleSelect].includes(itemsData?.fieldType) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: moderateScale(19),
                  justifyContent: "space-between",
                  marginTop: moderateScale(20),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: moderateScale(10),
                  }}
                >
                  <BoxButtonIcon
                    isIcon={true}
                    source={
                      itemsData?.logo
                        ? { uri: itemsData?.logo }
                        : imagePath?.PlusIcon
                    }
                    button={{
                      height: moderateScale(22),
                      width: moderateScale(22),
                      borderRadius: moderateScale(5),
                      backgroundColor: colors?.SurfCrest,
                      padding: 0,
                      // alignItems: "center",
                    }}
                    width={moderateScale(18)}
                    height={moderateScale(18)}
                    imageStyleOut={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    isTintColor={false}
                    forToggle={true}
                  />
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "600",
                      color: colors?.SurfCrest,
                      width: moderateScale(250),
                    }}
                  >
                    {capitalizeFirstLetter(
                      textBelowLineHeader(itemsData?.stepDescription)
                    )}
                  </Text>

                  {itemsData?.stepName === "Anonimity preferences 2" &&
                    iCircle()}
                </View>
                <CustomToggle
                  isYes={itemsData?.answer ? itemsData?.answer : "No"}
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                />
              </View>
            )}
            {[fieldType?.checkBoxSelect].includes(itemsData?.fieldType) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: moderateScale(19),
                  justifyContent: "space-between",
                  marginTop: moderateScale(20),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: moderateScale(10),
                  }}
                >
                  <BoxButtonIcon
                    isIcon={true}
                    source={
                      itemsData?.logo
                        ? { uri: itemsData?.logo }
                        : imagePath?.PlusIcon
                    }
                    button={{
                      height: moderateScale(22),
                      width: moderateScale(22),
                      borderRadius: moderateScale(5),
                      backgroundColor: colors?.SurfCrest,
                      padding: 0,
                    }}
                    image={{
                      height: moderateScale(10),
                      width: moderateScale(10),
                      tintColor: colors?.SaltBox,
                    }}
                    isTintColor={false}
                    width={moderateScale(18)}
                    height={moderateScale(18)}
                    imageStyleOut={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "600",
                      color: colors?.SurfCrest,
                      width: moderateScale(250),
                    }}
                  >
                    {capitalizeFirstLetter(
                      textBelowLineHeader(itemsData?.stepDescription)
                    )}
                  </Text>
                </View>
                <CheckBoxSelect
                  isYes={itemsData?.answer ? itemsData?.answer : "No"}
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                />
              </View>
            )}
            {[fieldType?.passwordChange].includes(itemsData?.fieldType) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: moderateScale(19),
                  justifyContent: "space-between",
                  marginTop: moderateScale(20),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: moderateScale(10),
                  }}
                >
                  <BoxButtonIcon
                    isIcon={true}
                    source={
                      itemsData?.logo
                        ? { uri: itemsData?.logo }
                        : imagePath?.PlusIcon
                    }
                    button={{
                      height: moderateScale(22),
                      width: moderateScale(22),
                      borderRadius: moderateScale(5),
                      backgroundColor: colors?.SurfCrest,
                      padding: 0,
                    }}
                    image={{
                      height: moderateScale(14),
                      width: moderateScale(14),
                      tintColor: colors?.SaltBox,
                    }}
                    isTintColor={false}
                  />
                  <Text
                    style={{
                      fontSize: textScale(14),
                      fontWeight: "600",
                      color: colors?.SurfCrest,
                    }}
                  >
                    {formatSentenceCase(itemsData?.stepDescription)}
                  </Text>
                </View>
                <CommonButton
                  onPress={() =>
                    navigation?.navigate(navigationString?.ChangePassword)
                  }
                  mainContainer={{
                    width: moderateScale(145),
                    height: moderateScale(27),
                    borderRadius: moderateScale(15),
                    backgroundColor: colors?.transparent,
                    borderColor: colors?.polishedPine,
                    borderWidth: moderateScale(1),
                    borderStyle: "dashed",
                  }}
                  btnName={"Change Password"}
                  btnNameStyle={{
                    color: colors?.polishedPine,
                    fontSize: textScale(14),
                    fontWeight: "400",
                  }}
                />
              </View>
            )}
            {[fieldType?.singleSelectLine].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  style={styles.flatList}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptionsSingle(idx, index, data)
                            );
                          }}
                          isImage={
                            [
                              allStepName?.notification_Preferences,
                              allStepName?.types_of_notifications_and_reminders,
                            ]?.includes(data[idx]?.stepName)
                              ? false
                              : true
                          }
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          title={item?.optionValue}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                          isRightIcon={false}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
            {[fieldType?.miniBoxSingleSelect].includes(
              itemsData?.fieldType
            ) && (
              <FlatList
                data={itemsData?.stepOptions}
                columnWrapperStyle={{ flexWrap: "wrap" }}
                numColumns={20}
                keyExtractor={(item, index) => "key" + index}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContentContainer}
                style={styles.flatList}
                renderItem={({ item, index }: any) => (
                  <>
                    {item?.optionValue !== strings?.addSpecifications && (
                      <IconTextButtonWidthDynamic
                        onPress={() => {
                          setData(
                            renderUpdatedStepOptionsSingle(idx, index, data)
                          );
                          // const sessionTimeoutData: any[] = [...data];
                          // const filteredSessionData =
                          //   sessionTimeoutData?.filter(
                          //     (item: any) =>
                          //       item?.stepDescription === "Session timeout"
                          //   );
                          // console.log(
                          //   "filteredSessionDatafilteredSessionData",
                          //   filteredSessionData
                          // );
                          // if (filteredSessionData.length !== 0) {
                          //   CallSessionTimeouApi(
                          //     filteredSessionData[0]?.stepOptions[0]
                          //       ?.isSelected,
                          //     data
                          //   );
                          // }
                        }}
                        title={item?.optionValue}
                        isImage={
                          [
                            allStepName?.frequency_of_notifications,
                            allStepName?.session_Timeout,
                          ]?.includes(data[idx]?.stepName)
                            ? false
                            : true
                        }
                        iconSource={
                          item?.logo ? { uri: item?.logo } : imagePath?.DumbIcon
                        }
                        containerStyle={{
                          backgroundColor: item?.isSelected
                            ? colors?.royalOrange
                            : colors?.transparent,
                        }}
                        textStyle={{
                          marginRight: moderateScale(15),
                          marginLeft: moderateScale(15),
                          color: item?.isSelected
                            ? colors?.prussianBlue
                            : colors?.SurfCrest,
                        }}
                      />
                    )}
                  </>
                )}
              />
            )}
            {[fieldType?.miniBoxMultiSelect].includes(itemsData?.fieldType) && (
              <FlatList
                data={itemsData?.stepOptions}
                columnWrapperStyle={{ flexWrap: "wrap" }}
                numColumns={20}
                keyExtractor={(item, index) => "key" + index}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContentContainer}
                style={styles.flatList}
                renderItem={({ item, index }: any) => (
                  <>
                    {item?.optionValue !== strings?.addSpecifications && (
                      <IconTextButtonWidthDynamic
                        onPress={() => {
                          setData(
                            renderUpdatedStepOptions(
                              idx,
                              index,
                              data,
                              item?.optionValue
                            )
                          );
                        }}
                        title={item?.optionValue}
                        isImage={
                          [
                            allStepName?.frequency_of_notifications,
                            allStepName?.session_Timeout,
                            allStepName?.specify_shared_data,
                          ]?.includes(data[idx]?.stepName)
                            ? false
                            : true
                        }
                        iconSource={
                          item?.logo ? { uri: item?.logo } : imagePath?.DumbIcon
                        }
                        containerStyle={{
                          backgroundColor: item?.isSelected
                            ? colors?.royalOrange
                            : colors?.transparent,
                        }}
                        textStyle={{
                          marginRight: moderateScale(15),
                          marginLeft: moderateScale(15),
                          color: item?.isSelected
                            ? colors?.prussianBlue
                            : colors?.SurfCrest,
                        }}
                      />
                    )}
                  </>
                )}
              />
            )}
            {/* For Multi selector */}

            {[fieldType?.multiSelectLine].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  style={styles.flatList}
                  keyExtractor={(item, index) => "key" + index}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
                          onPress={() => {
                            setData(
                              renderUpdatedStepOptions(
                                idx,
                                index,
                                data,
                                item?.optionValue
                              )
                            );
                          }}
                          isImage={
                            [
                              allStepName?.notification_Preferences,
                              allStepName?.types_of_notifications_and_reminders,
                            ]?.includes(data[idx]?.stepName)
                              ? false
                              : true
                          }
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          title={item?.optionValue}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                          isRightIcon={false}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}

            {/* Normal Answer TextArea */}
            {[fieldType?.textArea].includes(itemsData?.fieldType) && (
              <>
                {itemsData?.placeholder && (
                  <Text
                    style={{
                      color: colors?.SurfCrest,
                      fontSize: moderateScale(14),
                      fontWeight: "400",
                      marginTop: moderateScale(10),
                      marginHorizontal: moderateScale(19),
                    }}
                  >
                    {itemsData?.placeholder}
                  </Text>
                )}
                <TextInputStretch
                  newSpecInputView={styles.textInputStretch}
                  value={data[idx]?.otherAnswer}
                  onChangeText={(val: any) => handleInputChange(val, idx)}
                  newSpecInput={styles.newSpecInput}
                  placeholder={"Type here..."}
                />
              </>
            )}
            {/* Other Button and Other Input */}
            {itemsData?.addOther && (
              <>
                <AddButton
                  containerStyle={[
                    styles.addButtonContainer,
                    {
                      backgroundColor: itemsData?.isOther
                        ? colors?.polishedPine
                        : colors?.transparent,
                      borderColor: itemsData?.isOther
                        ? colors?.SurfCrest
                        : colors?.royalOrange,
                      height: moderateScale(50),
                      justifyContent: "center",
                    },
                  ]}
                  txt={strings?.other}
                  textStyle={{
                    color: itemsData?.isOther
                      ? colors?.SurfCrest
                      : colors?.royalOrange,
                    marginVertical: moderateScale(0),
                  }}
                  tintColor={
                    itemsData?.isOther ? colors?.SurfCrest : colors?.royalOrange
                  }
                  onPress={() => handleAddSpecifications(idx, data)}
                />
              </>
            )}
            {itemsData?.otherFieldCondition && (
              <TextInputStretch
                newSpecInputView={styles.textInputStretch}
                value={data[idx]?.otherAnswer}
                onChangeText={(val: any) => {
                  if (validateName(val)) {
                    const updateAnswer = [...data];
                    updateAnswer[idx].otherAnswer = val;
                    setData(updateAnswer);
                  }
                }}
              />
            )}
          </View>
        );
      })}
      {data?.length > 0 && ( //in for password we don't need to show button
        // type !== "For password" &&
        <CommonButton
          mainContainer={styles.commonButtonContainer}
          isLoading={isLoading}
          btnName={mainHeaderText(type)?.CTAButton}
          onPress={() =>
            !isLoading ? updatedAnswer(updateAnswerRequest(data)) : null
          }
        />
      )}
    </View>
  );
};

export default MultiItemsShowUISettings;
