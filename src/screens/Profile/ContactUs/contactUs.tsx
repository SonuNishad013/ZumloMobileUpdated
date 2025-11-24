import React, { ReactElement, useState } from "react";
import { Text, View, StyleSheet, FlatList, Platform } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { ContactUsIcon } from "../../../assets";
import CommonInput from "../../../components/Inputs/commonInput";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { strings } from "../../../constant/strings";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";

interface Props {
  navigation?: any;
  ContactUsData?: any;
}

const ContactUs: React.FC<Props> = ({
  navigation,
  ContactUsData,
}): ReactElement => {
  const dispatch = useDispatch();
  const [Message, setMessage] = useState("");
  const [MessageErrMsg, setMessageErrMsg] = useState("");
  const [isMessageError, setisMessageError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const onMessageChange = (Message: any) => {
    if (Message.trim() !== null) {
      setMessage(Message);
      setisMessageError(false);
    } else {
      setisMessageError(true);
      setMessageErrMsg(strings?.Please_enter_name);
    }
  };

  const onSend = async () => {
    if (Message?.trim()?.length > 0) {
      setMessageErrMsg("");
      setisMessageError(false);
      setisLoading(true);
      try {
        let requestbody = {
          message: Message,
        };
        await allActions.seekerDetails
          .SendContactForm(dispatch, requestbody, API_FUN_NAMES?.seekerDetails)
          .then((response: any) => {
            setisLoading(false);
            if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
              setToasterDetails({
                showToast: true,
                code: 1,
                message:
                  response?.message || strings?.Request_completed_successfully,
              });
              navigation.goBack();
            } else {
              setToasterDetails({
                showToast: true,
                code: 0,
                message: response?.message || strings?.somethingWrong,
              });
            }
          })
          .catch((err) => {
            setToasterDetails({
              showToast: true,
              code: 0,
              message: err?.message || strings?.somethingWrong,
            });
          });
      } catch (error) {
        setisLoading(false);
      }
    } else {
      setMessageErrMsg("Please enter your message here");
      setisMessageError(true);
    }
  };

  const renderForm = () => {
    return (
      <View>
        <View style={{ paddingHorizontal: moderateScale(20) }}>
          <Text style={styles?.fieldText}>{"Reach out anytime "}</Text>
          <View style={styles?.passMargin}>
            <CommonInput
              mainContainer={styles?.commonInputStyle}
              placeholder={
                "Got a question, concern, or suggestion? Just type it in—we’re always listening."
              }
              value={Message}
              onChangeText={onMessageChange}
              inputText={styles.commontextStyle}
              textAlignVertical={strings?.Top}
              multiline
              errorMsg={MessageErrMsg}
              isError={isMessageError}
              placeholderTextColor={colors.lightprussianBlue}
              isWidth={false}
            />
            <View style={styles?.passverticalMargin}>
              <CommonButton
                btnName={strings?.SEND}
                onPress={() => onSend()}
                mainContainer={styles?.setAutoWidth}
              />
            </View>
          </View>
        </View>
        <View style={styles?.mainContainer}>
          <ContactUsIcon />
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CommonHeader
            headerName={strings?.Contact_Us}
            mainContainer={styles.headerMainContainer}
            iconContainer={{ backgroundColor: colors.darkPrussianBlue }}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={moderateScale(50)}
          keyboardShouldPersistTaps="handled"
        >
          <FlatList
            data={["1"]}
            renderItem={() => renderForm()}
            keyExtractor={(item, index) => "key" + index}
          />
        </KeyboardAwareScrollView>
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
      {isLoading && <CommonLoader />}
    </ScreenWrapper>
  );
};
export default ContactUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(15),
  },
  fieldView: {
    marginVertical: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  fieldText: {
    fontSize: textScale(24),
    color: colors.darkPrussianBlue,
    fontWeight: "700",
    marginHorizontal: moderateScale(15),
    textAlign: "center",
    textTransform: "none",
    marginTop: moderateScale(40),
  },
  passMargin: {
    marginTop: moderateScale(20),
  },
  setAutoWidth: {
    width: "auto",
  },
  commonInputStyle: {
    height: moderateScale(360),
    borderColor: colors.lightSurfCrest2,
    borderWidth: moderateScale(1),
    marginVertical: moderateScale(10),
    backgroundColor: colors.lightSurfCrest,
    paddingHorizontal: moderateScale(Platform?.OS === "ios" ? 20 : 5),
    paddingVertical: moderateScale(10),
  },
  passverticalMargin: {
    marginTop: moderateScale(20),
  },
  headerContainer: {
    backgroundColor: colors.prussianBlue,
    height: moderateScale(75),
    borderBottomLeftRadius: moderateScale(25),
    borderBottomRightRadius: moderateScale(25),
  },
  headerMainContainer: {
    backgroundColor: colors.prussianBlue,
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(15),
  },
  inputContainer: {
    borderWidth: 1,
    marginVertical: moderateScale(10),
  },
  commontextStyle: {
    fontSize: textScale(14),
    color: colors.lightprussianBlue,
    textAlignVertical: "top",
  },
});
