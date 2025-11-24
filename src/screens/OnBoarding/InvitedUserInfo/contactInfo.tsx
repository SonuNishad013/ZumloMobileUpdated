import React, { ReactElement, useRef, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import CommonInput from "../../../components/Inputs/commonInput";
import {
  PinCodeCheck,
  emailCheck,
  validatePhoneNumber,
} from "../../../validations/validation";
import { listItemStyles, styles } from "./styles";
import colors from "../../../constant/colors";
import CountryPicker from "react-native-country-picker-modal";
import BottomDropDown from "../../../components/BottomSheet/CommonBottomSheet";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../components/Header/commonHeader";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";

import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
  route?: any;
}

const InviteduserContactDetails: React.FC<Props> = ({
  navigation,
  route,
}): ReactElement => {
  console.log("route==-=>", route);

  const { email, data, SeekerID } = route?.params;
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [phonNumber, setphonNumber] = useState(
    data?.[0]?.value !== null ? data?.[0]?.value : ""
  );
  const [phonNumberErrMsg, setphonNumberErrMsg] = useState("");
  const [isphonNumberComplete, setisphonNumberComplete] = useState(false);
  const [isphonNumberError, setisphonNumberError] = useState(false);

  const [mail, setmail] = useState(email);
  const [mailErrMsg, setmailErrMsg] = useState("");
  const [ismailComplete, setismailComplete] = useState(false);
  const [ismailError, setismailError] = useState(false);

  const [city, setcity] = useState(
    data?.[3]?.value !== null ? data?.[3]?.value : ""
  );
  const [cityError, setcityError] = useState("");
  const [ApplicantcityCode, setApplicantcityCode] = useState("");
  const [cityData, setcityData] = useState([
    {
      id: 1,
      cityName: "San Francisco",
    },
    {
      id: 2,
      cityName: "Detroit",
    },
    {
      id: 3,
      cityName: "Albuquerque",
    },
    {
      id: 4,
      cityName: "New York",
    },
    {
      id: 5,
      cityName: "Kansas City",
    },
    {
      id: 6,
      cityName: "Oklahoma City",
    },
    {
      id: 7,
      cityName: "Salt Lake City",
    },
    {
      id: 8,
      cityName: "Los Vegas",
    },
  ]);
  const [SelectedAgeData, setSelectedAgeData] = useState<any>({});

  const [address1, setaddress1] = useState(
    data?.[3]?.value !== null ? data?.[3]?.value : ""
  );
  const [address1ErrMsg, setaddress1ErrMsg] = useState("");
  const [isaddress1Complete, setisaddress1Complete] = useState(false);
  const [isaddress1Error, setisaddress1Error] = useState(false);

  const [address2, setaddress2] = useState(
    data?.[3]?.value !== null ? data?.[3]?.value : ""
  );
  const [address2ErrMsg, setaddress2ErrMsg] = useState("");
  const [isaddress2Complete, setisaddress2Complete] = useState(false);
  const [isaddress2Error, setisaddress2Error] = useState(false);

  const [zipCode, setzipCode] = useState(
    data?.[4]?.value !== null ? data?.[4]?.value : ""
  );
  const [zipCodeErrMsg, setzipCodeErrMsg] = useState("");
  const [iszipCodeComplete, setiszipCodeComplete] = useState(false);
  const [iszipCodeError, setiszipCodeError] = useState(false);

  const [countryCode, setCountryCode] = useState("US");
  const [countryData, setCountryData] = useState<any>();
  const [CountryName, setCountryName] = useState("America");
  const [countryCodeError, setcountryCodeError] = useState("");
  const [iscountryCodeError, setiscountryCodeError] = useState(false);
  const [iscountryOff, setiscountryOff] = useState(false);

  const onSelect = (country: any) => {
    setiscountryOff(true);
    console.log("country", country);
    setCountryData(country);
    setCountryName(country.name);
    setCountryCode(country.cca2);
    setcountryCodeError("");
    setiscountryCodeError(false);
  };
  const onphonNumberChange = (phonNumber: any) => {
    var pattern = /^[0-9]+$/;
    if (pattern.test(phonNumber) || phonNumber == "") {
      setphonNumber(phonNumber);
    }
    if (phonNumber.trim() !== null && validatePhoneNumber(phonNumber)) {
      setisphonNumberError(false);
      setisphonNumberComplete(true);
    } else {
      setisphonNumberComplete(false);
      setisphonNumberError(true);
      setphonNumberErrMsg("Please enter valid number.");
    }
  };

  const onmailChange = (mail: any) => {
    var pattern = /[`!#$%^&*()_\s+\=\[\]{};':"\\|,<>\/?~]/;
    if (!pattern.test(mail) || mail == "") {
      setmail(mail);
    }
    if (mail.trim() !== null && emailCheck(mail)) {
      setismailError(false);
      setismailComplete(true);
    } else {
      setismailComplete(false);
      setismailError(true);
      setmailErrMsg("Please enter valid mail.");
    }
  };

  const onaddress1Change = (address1: any) => {
    setaddress1(address1);
  };
  const onaddress2Change = (address2: any) => {
    setaddress2(address2);
  };
  const onzipCodeChange = (zipCode: any) => {
    var pattern = /^[0-9]+$/;
    if (pattern.test(zipCode) || zipCode == "") {
      setzipCode(zipCode);
    }
    if (zipCode.trim() !== null && PinCodeCheck(zipCode)) {
      setiszipCodeError(false);
      setiszipCodeComplete(true);
    } else {
      setiszipCodeComplete(false);
      setiszipCodeError(true);
      setzipCodeErrMsg("Please enter valid zip code.");
    }
  };
  const descriptionInputRefs = useRef<any[]>([]);

  const switchDescriptionKeyBoard = (index: number) => {
    if (descriptionInputRefs.current[index]) {
      descriptionInputRefs.current[index]?.focus();
    }
  };
  const SaveOrUpdateSeekerInfoASync = async () => {
    setisLoading(true);
    try {
      let requestbody = {
        seekerDetails: {
          phoneNumber: phonNumber,
          email: `${email}`,
          seekerId: `${SeekerID}`,
          country: `${CountryName}`,
          addressLine1: `${address1}`,
          addressLine2: `${address2}`,
          zipCode: `${zipCode}`,
          city: `${
            SelectedAgeData?.cityName !== undefined
              ? SelectedAgeData?.cityName
              : data?.[2]?.value
          }`,
          countryCode:
            countryData !== undefined
              ? `${countryData?.callingCode?.[0]}`
              : "1",
          countryShortName: `${countryData?.callingCode?.[0]}`,
        },
      };
      console.log("check req==>", requestbody, data);

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
  function cityElement(props: { itemData: any }): JSX.Element {
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
          {itemData?.cityName}
        </Text>
      </>
    );
  }
  const inputFieldView = () => {
    return (
      <View style={[styles.container2, { marginTop: 20 }]}>
        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={"Email"}
          value={mail}
          onChangeText={onmailChange}
          errorMsg={mailErrMsg}
          isError={ismailError}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
          iseditable={false}
        />
        <View
          style={[
            styles.phnView,
            {
              borderWidth: 1,
              marginVertical: moderateScale(10),
            },
          ]}
        >
          <CountryPicker
            countryCode={countryCode}
            withFlagButton={true}
            withCallingCodeButton={true}
            withFilter={true}
            withAlphaFilter={true}
            withCallingCode={true}
            onSelect={onSelect}
            theme={{
              onBackgroundTextColor: colors.lightprussianBlue,
              backgroundColor: colors.SurfCrest,
              primaryColorVariant: colors?.themeColor,
              filterPlaceholderTextColor: colors.lightprussianBlue,
            }}
          />
          <TextInput
            placeholder={strings?.enterPhone}
            value={phonNumber}
            onChangeText={onphonNumberChange}
            placeholderTextColor={colors.lightprussianBlue}
            maxLength={11}
            keyboardType={"numeric"}
            style={{
              color: colors.lightprussianBlue,
              flex: 1,
              marginHorizontal: moderateScale(10),
            }}
          />
        </View>
        <BottomDropDown
          mainContainerStyle={{}}
          textStyle={{
            fontSize: textScale(14),
            color: colors.lightprussianBlue,
          }}
          inputLabelStyle={{ fontSize: textScale(14) }}
          SelectedTextViewStyle={{ marginTop: moderateScale(-5) }}
          inputLabel={city ? "City" : "Select City"}
          isPopupTextNeed={false}
          errMsg={cityError}
          value={city}
          setCodeForSelectedItem={setApplicantcityCode}
          keyForSelectedItem="cityName"
          toSetState={setcity}
          onChange={() => {
            setTimeout(() => {
              switchDescriptionKeyBoard(0);
            }, 500);
          }}
          dropDownListData={cityData}
          renderItemComponent={cityElement}
          selectedItemData={setSelectedAgeData}
          keyToSelect="cityName"
        />
        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={"Address 1"}
          value={address1}
          onChangeText={onaddress1Change}
          errorMsg={address1ErrMsg}
          isError={isaddress1Error}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
        />

        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={"Address 2"}
          value={address2}
          onChangeText={onaddress2Change}
          errorMsg={address2ErrMsg}
          isError={isaddress2Error}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
        />
        <CommonInput
          mainContainer={styles.inputContainer}
          placeholder={"Zip Code"}
          value={zipCode}
          onChangeText={onzipCodeChange}
          errorMsg={zipCodeErrMsg}
          isError={iszipCodeError}
          inputText={styles.commontextStyle}
          placeholderTextColor={colors.lightprussianBlue}
          maxLength={6}
        />
        <View style={{ marginVertical: moderateScale(20) }}>
          <CommonButton
            btnName={"Next"}
            onPress={() => SaveOrUpdateSeekerInfoASync()}
            isLoading={isLoading}
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
            headerName={"Contact Info"}
            mainContainer={styles.headerMainContainer}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView>{inputFieldView()}</ScrollView>
      </View>
    </ScreenWrapper>
  );
};
export default InviteduserContactDetails;
