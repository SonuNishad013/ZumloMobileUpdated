import React, { ReactElement, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import CommonInput from "../../../components/Inputs/commonInput";
import CommonButton from "../../../components/Buttons/commonButton";
import { validateName } from "../../../validations/validation";
import BottomDropDown from "../../../components/BottomSheet/CommonBottomSheet";
import { listItemStyles, styles } from "./styles";
import ImagePicker from "react-native-image-crop-picker";
import _ from "underscore";
import { APPLY_STATUS, GENDER } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
import { imageLimit } from "../../../constant/appConstant";
interface Props {
  navigation?: any;
  BasicInfoData?: any;
  setisAllCompleted?: any;
}

const BasicInfo: React.FC<Props> = ({
  navigation,
  BasicInfoData,
  setisAllCompleted,
}): ReactElement => {
  const [fullName, setfullName] = useState("");
  const [fullNameErrMsg, setfullNameErrMsg] = useState("");
  const [isfullNameComplete, setisfullNameComplete] = useState(false);
  const [isfullNameError, setisfullNameError] = useState(false);

  const generateAgeTypeData = () => {
    const ageTypeData = [];
    for (let i = 16; i <= 100; i++) {
      ageTypeData.push({
        AgeType: i,
      });
    }
    return ageTypeData;
  };
  const [AgeType, setAgeType] = useState("");
  const [AgeTypeError, setAgeTypeError] = useState("");
  const [ApplicantAgeTypeCode, setApplicantAgeTypeCode] = useState("");
  const [AgeTypeData, setAgeTypeData] = useState(generateAgeTypeData());
  const [SelectedAgeData, setSelectedAgeData] = useState<any>({});
  const [GenderType, setGenderType] = useState("");
  const [GenderTypeError, setGenderTypeError] = useState("");
  const [ApplicantGenderTypeCode, setApplicantGenderTypeCode] = useState("");
  const [GenderTypeData, setGenderTypeData] = useState([
    {
      GenderType: GENDER?.Male,
    },
    {
      GenderType: GENDER?.Female,
    },
    {
      GenderType: GENDER?.Other,
    },
  ]);
  const [SelectedGenderData, setSelectedGenderData] = useState<any>({});
  const [About, setAbout] = useState("");
  const [AboutErrMsg, setAboutErrMsg] = useState("");
  const [isAboutComplete, setisAboutComplete] = useState(false);
  const [isAboutError, setisAboutError] = useState(false);
  const onfullNameChange = (fullName: any) => {
    if (fullName.trim() !== null && validateName(fullName)) {
      setfullName(fullName);
      setisfullNameError(false);
      setisfullNameComplete(true);
    } else {
      setisfullNameComplete(false);
      setisfullNameError(true);
      setfullNameErrMsg(strings?.Please_enter_name);
    }
  };
  const onAboutChange = (About: any) => {
    if (About.trim() !== null && validateName(About)) {
      setAbout(About);
      setisAboutError(false);
      setisAboutComplete(true);
    } else {
      setisAboutComplete(false);
      setisAboutError(true);
      setAboutErrMsg(strings?.Please_enter_name);
    }
  };
  const [imageData, setimageData] = useState<any>({});
  const [imageErrMsg, setimageErrMsg] = useState("");
  const [isImageSelected, setisImageSelected] = useState(false);
  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: imageLimit?.IMAGE_WIDTH,
      height: imageLimit?.IMAGE_HEIGHT,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image) => {
      setimageData(image);
      setisImageSelected(true);
      setimageErrMsg("");
    });
  };
  const onNext = () => {
    const validationRules = [
      {
        state: AgeType,
        errorState: setAgeTypeError,
        errorMessage: strings?.Please_select_an_age,
      },
      {
        state: GenderType,
        errorState: setGenderTypeError,
        errorMessage: strings?.Please_select_a_gender,
      },
      {
        state: fullName.trim() !== "",
        errorState: setfullNameErrMsg,
        errorMessage: strings?.enterNameP,
      },
      { state: isfullNameComplete, errorState: setisfullNameError },
      {
        state: About.trim() !== "",
        errorState: setAboutErrMsg,
        errorMessage: strings?.Please_enter_a_description,
      },
      { state: isAboutComplete, errorState: setisAboutError },
      {
        state: isImageSelected,
        errorState: setimageErrMsg,
        errorMessage: strings?.Please_select_an_image,
      },
    ];

    validationRules.forEach(({ errorState }: any) => errorState(""));
    validationRules.forEach(({ state, errorState, errorMessage }: any) => {
      if (typeof state === "boolean") {
        if (!state) {
          errorState(true);
          if (errorMessage) errorState(errorMessage);
        }
      } else if (!state) {
        errorState(true);
        if (errorMessage) errorState(errorMessage);
      }
    });

    const hasErrors = validationRules.some(({ state }) => !state);
    if (!hasErrors) {
      setisAllCompleted(true);
    }
  };

  const ImageView = () => {
    return (
      <View style={styles?.imageContainer}>
        <TouchableOpacity
          style={styles?.ImageTouchView}
          onPress={() => onSelectImage()}
        >
          <Image
            source={
              _.isEmpty(imageData)
                ? imagePath.dummyProfileIcon
                : { uri: imageData.path }
            }
            style={styles?.imageStyle}
            resizeMode={APPLY_STATUS?.stretch}
          />
        </TouchableOpacity>
        <Text style={styles?.imageErrorText}>{imageErrMsg}</Text>
      </View>
    );
  };
  const descriptionInputRefs = useRef<any[]>([]);

  const switchDescriptionKeyBoard = (index: number) => {
    if (descriptionInputRefs.current[index]) {
      descriptionInputRefs.current[index]?.focus();
    }
  };
  function AgeTypeElement(props: { itemData: any }): JSX.Element {
    const { itemData } = props;
    return (
      <>
        <Text
          style={
            itemData?.selected
              ? listItemStyles.selectedMainText
              : listItemStyles.notSelectedFolioTxt
          }
        >
          {itemData?.AgeType}
        </Text>
      </>
    );
  }
  function GenderTypeElement(props: { itemData: any }): JSX.Element {
    const { itemData } = props;
    return (
      <>
        <Text
          style={
            itemData?.selected
              ? listItemStyles.selectedMainText
              : listItemStyles.notSelectedFolioTxt
          }
        >
          {itemData?.GenderType}
        </Text>
      </>
    );
  }

  const inputFields = () => {
    return (
      <View style={styles.container2}>
        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={strings?.Full_name}
          value={fullName}
          onChangeText={onfullNameChange}
          errorMsg={fullNameErrMsg}
          isError={isfullNameError}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <BottomDropDown
          mainContainerStyle={{}}
          textStyle={styles?.dropDownBottomStyle}
          inputLabelStyle={{ fontSize: textScale(14) }}
          SelectedTextViewStyle={{ marginTop: moderateScale(-5) }}
          inputLabel={AgeType ? strings?.Age : strings?.Select_Age}
          isPopupTextNeed={false}
          errMsg={AgeTypeError}
          value={AgeType}
          setCodeForSelectedItem={setApplicantAgeTypeCode}
          keyForSelectedItem={strings?.AgeType}
          toSetState={setAgeType}
          onChange={() => {
            setTimeout(() => {
              switchDescriptionKeyBoard(0);
            }, 500);
          }}
          dropDownListData={AgeTypeData}
          renderItemComponent={AgeTypeElement}
          selectedItemData={setSelectedAgeData}
          keyToSelect={strings?.AgeType}
        />
        <BottomDropDown
          mainContainerStyle={{}}
          textStyle={styles?.dropDownTextStyle}
          inputLabelStyle={{ fontSize: textScale(14) }}
          SelectedTextViewStyle={{ marginTop: moderateScale(-5) }}
          inputLabel={GenderType ? strings?.Gender : strings?.Select_Gender}
          isPopupTextNeed={false}
          errMsg={GenderTypeError}
          value={GenderType}
          setCodeForSelectedItem={setApplicantGenderTypeCode}
          keyForSelectedItem={strings?.GenderType}
          toSetState={setGenderType}
          onChange={() => {
            setTimeout(() => {
              switchDescriptionKeyBoard(0);
            }, 500);
          }}
          dropDownListData={GenderTypeData}
          renderItemComponent={GenderTypeElement}
          selectedItemData={setSelectedGenderData}
          keyToSelect={strings?.GenderType}
        />
        <CommonInput
          mainContainer={styles?.commonIputView}
          placeholder={strings?.About_patient}
          value={About}
          onChangeText={onAboutChange}
          inputText={styles.commontextStyle}
          textAlignVertical={strings?.Top}
          multiline
          errorMsg={AboutErrMsg}
          isError={isAboutError}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <View style={{ marginVertical: moderateScale(20) }}>
          <CommonButton btnName={strings?.next} onPress={onNext} />
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles.container}>
        {ImageView()}
        {inputFields()}
      </View>
    </ScreenWrapper>
  );
};

export default BasicInfo;
