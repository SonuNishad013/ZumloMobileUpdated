import React, { ReactElement, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
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
import CommonHeader from "../../../components/Header/commonHeader";

import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
interface Props {
  navigation?: any;
  BasicInfoData?: any;
  route?: any;
}

const InviteduserBasicDetails: React.FC<Props> = ({
  route,
  navigation,
  BasicInfoData,
}): ReactElement => {
  const { email, data, SeekerID } = route?.params;
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  //fullName
  const [fullName, setfullName] = useState(
    data?.[0]?.value !== null ? data?.[0]?.value : ""
  );
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

  const [AgeType, setAgeType] = useState(
    data?.[2]?.value !== null ? data?.[2]?.value : ""
  );
  const [AgeTypeError, setAgeTypeError] = useState("");
  const [ApplicantAgeTypeCode, setApplicantAgeTypeCode] = useState("");
  const [AgeTypeData, setAgeTypeData] = useState(generateAgeTypeData());
  const [SelectedAgeData, setSelectedAgeData] = useState<any>({});

  const [GenderType, setGenderType] = useState(
    data?.[1]?.value !== null ? data?.[1]?.value : ""
  );
  const [GenderTypeError, setGenderTypeError] = useState("");
  const [ApplicantGenderTypeCode, setApplicantGenderTypeCode] = useState("");
  const [GenderTypeData, setGenderTypeData] = useState([
    {
      GenderType: "Male",
    },
    {
      GenderType: "Female",
    },
    {
      GenderType: "Other",
    },
  ]);
  const [SelectedGenderData, setSelectedGenderData] = useState<any>({});

  const [About, setAbout] = useState(data?.[3]?.value ? data?.[3]?.value : "");
  const [AboutErrMsg, setAboutErrMsg] = useState("");
  const [isAboutComplete, setisAboutComplete] = useState(false);
  const [isAboutError, setisAboutError] = useState(false);
  // const [isAllCompleted,setisAllCompleted]=useState("")

  const onfullNameChange = (fullName: any) => {
    if (fullName.trim() !== null && validateName(fullName)) {
      setfullName(fullName);
      setisfullNameError(false);
      setisfullNameComplete(true);
    } else {
      setisfullNameComplete(false);
      setisfullNameError(true);
      setfullNameErrMsg("Please enter name.");
    }
  };
  const onAboutChange = (About: any) => {
    // if (About.trim() !== null && validateName(About)) {
    setAbout(About);
    //   setisAboutError(false);
    //   setisAboutComplete(true);
    // } else {
    //   setisAboutComplete(false);
    //   setisAboutError(true);
    //   setAboutErrMsg("Please enter about.");
    // }
  };

  const [imageData, setimageData] = useState<any>({});
  const [imageErrMsg, setimageErrMsg] = useState("");
  const [isImageSelected, setisImageSelected] = useState(false);
  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    }).then((image) => {
      setimageData(image);
      setisImageSelected(true);
      setimageErrMsg("");
    });
  };
  const onNext = () => {
    // Define validation rules for each field
    const validationRules = [
      // { state: AgeType, errorState: setAgeTypeError, errorMessage: "Please select an age." },
      // { state: GenderType, errorState: setGenderTypeError, errorMessage: "Please select a gender." },
      {
        state: fullName.trim() !== "",
        errorState: setfullNameErrMsg,
        errorMessage: "Please enter a name.",
      },
      { state: isfullNameComplete, errorState: setisfullNameError },
      // { state: About.trim() !== '', errorState: setAboutErrMsg, errorMessage: "Please enter a description." },
      // { state: isAboutComplete, errorState: setisAboutError },
      // { state: isImageSelected, errorState: setimageErrMsg, errorMessage: "Please select an image." },
    ];
    // Reset all error messages and error states
    validationRules.forEach(({ errorState }) => errorState(""));
    // Validate each field
    validationRules.forEach(({ state, errorState, errorMessage }) => {
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

    // Check if any error message is set
    const hasErrors = validationRules.some(({ state }) => !state);

    if (!hasErrors) {
      // setisAllCompleted(true);
      SaveOrUpdateSeekerInfoASync();
    }
  };
  const SaveOrUpdateSeekerInfoASync = async () => {
    setisLoading(true);
    try {
      let requestbody = {
        seekerDetails: {
          username: `${fullName}`,
          email: `${email}`,
          firstName: `${fullName}`,
          lastName: `${fullName}`,
          age:
            SelectedAgeData?.AgeType !== undefined
              ? SelectedAgeData?.AgeType
              : data?.[2]?.value,
          seekerId: `${SeekerID}`,
          description: `${About}`,
        },
      };
      console.log("SelectedAgeData", _.isEmpty(SelectedAgeData), requestbody);

      allActions.Auth.SaveOrUpdateSeekerInfo(
        dispatch,
        requestbody,
        "SaveOrUpdateSeekerInfoASync"
      )
        .then((response: any) => {
          console.log("check resp for SaveOrUpdateSeekerInfoASync", response);
          if (response.statusCode == 200) {
            setisLoading(false);
            navigation.goBack();
          } else {
            setisLoading(false);
          }
        })
        .catch((err) => {
          setisLoading(false);
          console.log("check error==>", err);
        });
    } catch (error) {
      setisLoading(false);
    }
  };
  const ImageView = () => {
    return (
      <View
        style={{
          height: moderateScale(150),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.polishedPine,
            borderRadius: moderateScale(120),
            height: moderateScale(120),
            width: moderateScale(120),
          }}
          onPress={() => onSelectImage()}
        >
          <Image
            source={
              _.isEmpty(imageData)
                ? imagePath.dummyProfileIcon
                : { uri: imageData.path }
            }
            style={{
              height: moderateScale(120),
              width: moderateScale(120),
              borderRadius: moderateScale(120),
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={{ color: colors.royalOrange, fontSize: textScale(12) }}>
          {imageErrMsg}
        </Text>
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
          placeholder={"Full name"}
          value={fullName}
          onChangeText={onfullNameChange}
          errorMsg={fullNameErrMsg}
          isError={isfullNameError}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <BottomDropDown
          mainContainerStyle={{ backgroundColor: colors.lightSurfCrest }}
          textStyle={{
            fontSize: textScale(14),
            color: colors.lightprussianBlue,
          }}
          inputLabelStyle={{ fontSize: textScale(14) }}
          SelectedTextViewStyle={{ marginTop: moderateScale(-5) }}
          inputLabel={AgeType ? "Age" : "Select Age"}
          isPopupTextNeed={false}
          // isError={false}
          errMsg={AgeTypeError}
          value={AgeType}
          setCodeForSelectedItem={setApplicantAgeTypeCode}
          keyForSelectedItem="AgeType"
          toSetState={setAgeType}
          onChange={() => {
            setTimeout(() => {
              switchDescriptionKeyBoard(0);
            }, 500);
          }}
          dropDownListData={AgeTypeData}
          renderItemComponent={AgeTypeElement}
          selectedItemData={setSelectedAgeData}
          keyToSelect="AgeType"
        />
        <BottomDropDown
          mainContainerStyle={{ backgroundColor: colors.lightSurfCrest }}
          textStyle={{
            fontSize: textScale(14),
            color: colors.lightprussianBlue,
          }}
          inputLabelStyle={{ fontSize: textScale(14) }}
          SelectedTextViewStyle={{ marginTop: moderateScale(-5) }}
          inputLabel={GenderType ? "Gender" : "Select Gender"}
          isPopupTextNeed={false}
          errMsg={GenderTypeError}
          value={GenderType}
          setCodeForSelectedItem={setApplicantGenderTypeCode}
          keyForSelectedItem="GenderType"
          toSetState={setGenderType}
          onChange={() => {
            setTimeout(() => {
              switchDescriptionKeyBoard(0);
            }, 500);
          }}
          dropDownListData={GenderTypeData}
          renderItemComponent={GenderTypeElement}
          selectedItemData={setSelectedGenderData}
          keyToSelect="GenderType"
        />
        <CommonInput
          mainContainer={{
            height: moderateScale(120),
            borderColor: colors.lightSurfCrest2,
            borderWidth: 1,
            marginVertical: moderateScale(10),
            backgroundColor: colors.lightSurfCrest,
            alignItems: "center",
          }}
          placeholder={"About patient"}
          value={About}
          onChangeText={onAboutChange}
          inputText={styles.commontextStyle}
          textAlignVertical={"Top"}
          multiline
          errorMsg={AboutErrMsg}
          isError={isAboutError}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <View style={{ marginVertical: moderateScale(20) }}>
          <CommonButton
            btnName={"Next"}
            onPress={onNext}
            // onPress={SaveOrUpdateSeekerInfoASync}
          />
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CommonHeader
            headerName={"Basic Info"}
            mainContainer={styles.headerMainContainer}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView>
          {ImageView()}
          {inputFields()}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default InviteduserBasicDetails;
