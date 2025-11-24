import React, { useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { strings } from "../../../constant/strings";
import CommonInput from "../../../components/Inputs/commonInput";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { validateName } from "../../../validations/validation";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import navigationString from "../../../navigation/navigationString";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { BackIcon, WelcomeZumlo, Zumlo, ZumloPersona } from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  navigation?: any;
}

const SeekerName: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState("");
  // let name = useSelector(getSeekerName());
  const onSaveName = () => {
    allActions.Auth.saveName(dispatch, firstName.trim().replace(/\s+/g, " "));
    navigation?.navigate(navigationString?.Register);
  };
  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.questionText}>{"Welcome to Zumlo!"}</Text>
            <Text style={styles.subquestionText}>
              {"Let’s start with something simple — your name. "}
            </Text>
          </View>
        </View>
        <CommonInput
          placeholder={"First name, nickname ..."}
          placeholderTextColor={colors.SurfCrest}
          mainContainer={styles.inputContainer}
          value={firstName}
          isError={firstNameErr}
          errorMsg={firstNameErrMsg}
          onChangeText={(val: any) => {
            setFirstNameErr(false);
            // if (validateName(val)) {
            //   setFirstName(val);
            // }
            const partialRegex = /^[A-Za-z][A-Za-z ]*$/;

            if (val === "" || partialRegex.test(val)) {
              setFirstName(val);
            }
          }}
          backGroundColor={colors.SaltBox}
          borderColor={colors.royalOrange}
          inputText={styles.inputText}
          isWidth={false}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles?.container}>
        <TouchableOpacity
          style={styles?.iconContainer}
          onPress={() => navigation?.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <KeyboardAwareScrollView>
          <View style={styles.imageView}>
            <ZumloPersona
              height={moderateScale(210)}
              width={moderateScale(210)}
            />
          </View>
          {renderQuestion()}
          <CommonButton
            mainContainer={styles?.cmnBtnM}
            btnName={"Next"}
            onPress={() => {
              if (firstName) {
                onSaveName();
              } else {
                setFirstNameErr(true);
                setFirstNameErrMsg("Enter a name that works for you");
              }
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </ScreenWrapper>
  );
};
export default SeekerName;

const getTitle = (value: any) => {
  if (!value) return "";
  let string = value?.split(",");
  return `${string[0]}, \n${string[1] ? string[1]?.trim() : ""}`;
};
