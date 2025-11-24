import React, { ReactElement, useRef, useState } from "react";
import { Text, View } from "react-native";
import CommonInput from "../../../components/Inputs/commonInput";
import {
  AddressCheck,
  PinCodeCheck,
  emailCheck,
  validatePhoneNumber,
} from "../../../validations/validation";
import { listItemStyles, styles } from "./styles";
import colors from "../../../constant/colors";
import CountryPicker from "react-native-country-picker-modal";
import BottomDropDown from "../../../components/BottomSheet/CommonBottomSheet";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import { PATTERNS } from "../../../constant/Patterns";
import { APPLY_STATUS } from "../../../constant/ENUM";

interface Props {
  navigation?: any;
  ContactInfoData?: any;
  setisContactCompleted?: any;
}

const ContactInfo: React.FC<Props> = ({
  navigation,
  ContactInfoData,
  setisContactCompleted,
}): ReactElement => {
  const [phonNumber, setphonNumber] = useState("");
  const [phonNumberErrMsg, setphonNumberErrMsg] = useState("");
  const [isphonNumberComplete, setisphonNumberComplete] = useState(false);
  const [isphonNumberError, setisphonNumberError] = useState(false);
  const [email, setemail] = useState("");
  const [emailErrMsg, setemailErrMsg] = useState("");
  const [isemailComplete, setisemailComplete] = useState(false);
  const [isemailError, setisemailError] = useState(false);
  const [city, setcity] = useState("");
  const [cityError, setcityError] = useState("");
  const [ApplicantcityCode, setApplicantcityCode] = useState("");
  const cityData = [
    {
      id: 1,
      cityName: strings?.Mohali,
    },
    {
      id: 2,
      cityName: strings?.Chandigarh,
    },
  ];

  const [SelectedAgeData, setSelectedAgeData] = useState<any>({});

  const [address1, setaddress1] = useState("");
  const [address1ErrMsg, setaddress1ErrMsg] = useState("");
  const [isaddress1Complete, setisaddress1Complete] = useState(false);
  const [isaddress1Error, setisaddress1Error] = useState(false);

  const [address2, setaddress2] = useState("");
  const [address2ErrMsg, setaddress2ErrMsg] = useState("");
  const [isaddress2Complete, setisaddress2Complete] = useState(false);
  const [isaddress2Error, setisaddress2Error] = useState(false);

  const [zipCode, setzipCode] = useState("");
  const [zipCodeErrMsg, setzipCodeErrMsg] = useState("");
  const [iszipCodeComplete, setiszipCodeComplete] = useState(false);
  const [iszipCodeError, setiszipCodeError] = useState(false);

  const [countryCode, setCountryCode] = useState("US");
  const [countryCodeError, setcountryCodeError] = useState("");
  const [iscountryCodeError, setiscountryCodeError] = useState(false);

  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setcountryCodeError("");
    setiscountryCodeError(false);
  };
  const onphonNumberChange = (phonNumber: any) => {
    let pattern = PATTERNS?.check_numberic;
    if (pattern.test(phonNumber) || phonNumber == "") {
      setphonNumber(phonNumber);
    }
    if (phonNumber.trim() !== null && validatePhoneNumber(phonNumber)) {
      setisphonNumberError(false);
      setisphonNumberComplete(true);
    } else {
      setisphonNumberComplete(false);
      setisphonNumberError(true);
      setphonNumberErrMsg(strings?.Please_enter_valid_number);
    }
  };

  const onemailChange = (email: any) => {
    let pattern = PATTERNS?.email;
    if (!pattern.test(email) || email == "") {
      setemail(email);
    }
    if (email.trim() !== null && emailCheck(email)) {
      setisemailError(false);
      setisemailComplete(true);
    } else {
      setisemailComplete(false);
      setisemailError(true);
      setemailErrMsg(strings?.emailvalidError);
    }
  };

  const onaddress1Change = (address1: any) => {
    setaddress1(address1);
    if (address1.trim() !== null && AddressCheck(address1)) {
      setisaddress1Error(false);
      setisaddress1Complete(true);
    } else {
      setisaddress1Complete(false);
      setisaddress1Error(true);
      setaddress1ErrMsg(strings?.Please_enter_valid_address);
    }
  };
  const onaddress2Change = (address2: any) => {
    setaddress2(address2);
    if (address2.trim() !== null && AddressCheck(address2)) {
      setisaddress2Error(false);
      setisaddress2Complete(true);
    } else {
      setisaddress2Complete(false);
      setisaddress2Error(true);
      setaddress2ErrMsg(strings?.Please_enter_valid_address);
    }
  };
  const onzipCodeChange = (zipCode: any) => {
    let pattern = PATTERNS?.check_numberic;
    if (pattern.test(zipCode) || zipCode == "") {
      setzipCode(zipCode);
    }
    if (zipCode.trim() !== null && PinCodeCheck(zipCode)) {
      setiszipCodeError(false);
      setiszipCodeComplete(true);
    } else {
      setiszipCodeComplete(false);
      setiszipCodeError(true);
      setzipCodeErrMsg(strings?.Please_enter_valid_zip_code);
    }
  };
  const descriptionInputRefs = useRef<any[]>([]);
  const switchDescriptionKeyBoard = (index: number) => {
    if (descriptionInputRefs.current[index]) {
      descriptionInputRefs.current[index]?.focus();
    }
  };

  const onNext = () => {
    const validationRules = [
      {
        state: city,
        errorState: setcityError,
        errorMessage: strings?.Please_select_a_city,
      },
      {
        state: phonNumber.trim() !== "",
        errorState: setphonNumberErrMsg,
        errorMessage: strings?.Please_enter_a_phone_number,
      },
      { state: isphonNumberComplete, errorState: setisphonNumberError },
      {
        state: email.trim() !== "",
        errorState: setemailErrMsg,
        errorMessage: strings?.emailError,
      },
      { state: isemailComplete, errorState: setisemailError },
      {
        state: address1.trim() !== "",
        errorState: setaddress1ErrMsg,
        errorMessage: strings?.Please_enter_a_address1,
      },
      { state: isaddress1Complete, errorState: setisaddress1Error },
      {
        state: address2.trim() !== "",
        errorState: setaddress2ErrMsg,
        errorMessage: strings?.Please_enter_a_address2,
      },
      { state: isaddress2Complete, errorState: setisaddress2Error },
      {
        state: zipCode.trim() !== "",
        errorState: setzipCodeErrMsg,
        errorMessage: strings?.Please_enter_a_zip_code,
      },
      { state: iszipCodeComplete, errorState: setiszipCodeError },
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
    if (!hasErrors && !iscountryCodeError) {
      setisContactCompleted(true);
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
  const renderCountyMoal = () => {
    return (
      <>
        <View
          style={[
            styles?.modelView,
            {
              backgroundColor: countryCodeError
                ? colors?.red
                : colors.lightSurfCrest,
            },
          ]}
        >
          <View style={styles?.centerView}>
            <CountryPicker
              countryCode={countryCode}
              withFlagButton={true}
              withCallingCodeButton={true}
              withFilter={true}
              withAlphaFilter={true}
              withCallingCode={true}
              onSelect={onSelect}
            />
          </View>
        </View>
        <Text style={styles?.redColor}>{countryCodeError}</Text>
      </>
    );
  };
  return (
    <View style={[styles.container2, { marginTop: 20 }]}>
      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Phone_no}
        value={phonNumber}
        onChangeText={onphonNumberChange}
        errorMsg={phonNumberErrMsg}
        isError={isphonNumberError}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
        keyboardType={APPLY_STATUS?.number_pad}
      />
      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Email_}
        value={email}
        onChangeText={onemailChange}
        errorMsg={emailErrMsg}
        isError={isemailError}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
      />
      <View>{renderCountyMoal()}</View>
      <BottomDropDown
        mainContainerStyle={{}}
        textStyle={styles?.buttonView}
        inputLabelStyle={styles?.fontStyle}
        SelectedTextViewStyle={styles?.AddTop}
        inputLabel={city ? strings?.City : strings?.Select_City}
        isPopupTextNeed={false}
        errMsg={cityError}
        value={city}
        setCodeForSelectedItem={setApplicantcityCode}
        keyForSelectedItem={strings?.cityName}
        toSetState={setcity}
        onChange={() => {
          setTimeout(() => {
            switchDescriptionKeyBoard(0);
          }, 500);
        }}
        dropDownListData={cityData}
        renderItemComponent={cityElement}
        selectedItemData={setSelectedAgeData}
        keyToSelect={strings?.cityName}
      />
      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Address_one}
        value={address1}
        onChangeText={onaddress1Change}
        errorMsg={address1ErrMsg}
        isError={isaddress1Error}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
      />

      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Address_two}
        value={address2}
        onChangeText={onaddress2Change}
        errorMsg={address2ErrMsg}
        isError={isaddress2Error}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
      />
      <CommonInput
        mainContainer={styles.inputContainer}
        placeholder={strings?.Zip_Code}
        value={zipCode}
        onChangeText={onzipCodeChange}
        errorMsg={zipCodeErrMsg}
        isError={iszipCodeError}
        inputText={styles.commontextStyle}
        placeholderTextColor={colors.lightprussianBlue}
      />
      <View style={{ marginVertical: moderateScale(20) }}>
        <CommonButton btnName={strings?.next} onPress={onNext} />
      </View>
    </View>
  );
};
export default ContactInfo;
