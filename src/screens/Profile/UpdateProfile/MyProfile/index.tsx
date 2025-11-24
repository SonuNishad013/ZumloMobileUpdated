import {
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import PersonalInfo from "./PersonalInfo";
import EducationOccupation from "./EducationOccupation";
import ContactInfo from "./ContactInfo";
import { strings } from "../../../../constant/strings";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import {
  getAllGlobalCodesWithCategoryProfile,
  setBodyWithGlobalCodes,
} from "./PersonalInfo/helper";
import * as AsyncStorage from "../../../../utils/Storage/AsyncStorage";
import CommonLoader from "../../../../components/Loader";
import { styles } from "./styles";
import { moderateScale } from "../../../../constant/responsiveStyle";
import CommonAlert from "../../../../components/CommonAlert/CommonAlert";
import ToastApiResponse from "../../../../components/Toast/ToastApiResponse";
import { event } from "../../../../navigation/emitter";

interface Props {
  navigation?: any;
  route?: any;
}
const MyProfile: React.FC<Props> = ({ navigation, route }) => {
  console.log("route in Myprofile", route?.params?.from);
  const dispatch = useDispatch();
  const [toggleIdx, setToggleIdx] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [userId1, setUserId1] = useState<any>();
  const [isAlert, setIsAlert] = useState(false);
  const [userLoginType, setUserLoginType] = useState<any>();
  const [backPress, setBackPress] = useState(true);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    getLoginDetail();
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);

  const getLoginDetail = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    let loginType = await AsyncStorage.getItem(AsyncStorage.LOGIN_TYPE);
    setUserLoginType(loginType);
    setUserId1(JSON.parse(loginUserData).userId);
  };
  useEffect(() => {
    getAllGlobalCodesWithCategoryProfile();
    getSeekerPersonalInfo();
  }, [userId1]);

  const getSeekerPersonalInfo = async () => {
    let userId = userId1 !== undefined ? userId1 : 0;
    setIsLoading(true);

    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        "getSeekerPersonalInfo",
        userId
      )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setIsLoading(false);
          setUserData(response.data);
        } else {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err.message,
        });
      });
  };
  const updateSeekerPersonalInfo = async (key: string, body: any) => {
    let a = body;
    a.map((itm: any, index: any) => {
      if (itm.title === "Number of Children" && itm.value === "") {
        a[index].value = 0;
      }
    });
    console.log("setBodyWithGlobalCodes", a);
    setIsLoading(true);

    let userId = userId1 !== undefined ? userId1 : 0;
    let requestbody = {
      userId,
      [key]: {
        ...setBodyWithGlobalCodes(a),
      },
    };
    allActions.seekerDetails
      .UpdateSeekerPersonalInfo(
        dispatch,
        requestbody,
        "UpdateSeekerPersonalInfo"
      )
      .then((response: any) => {
        console.log(
          "requestbody in update of profile data",
          requestbody,
          key,
          body,
          "response",
          response
        );
        if (response.statusCode == 200) {
          setIsLoading(false);
          setIsEdited(false);
          getSeekerPersonalInfo();
          setToasterDetails({
            showToast: true,
            code: 1,
            message: response?.message,
          });
        } else {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: response?.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setToasterDetails({
          showToast: true,
          code: 0,
          message: err?.message,
        });
      });
  };

  const RenderHeader = () => {
    return (
      <CommonHeader
        onBackPress={() => {
          if (route?.params?.from === "ProductGuide") {
            navigation.goBack();
            console.log("mynavihgjh0");
            return;
          }
          if (
            ["AIGeneratedSkipped", "fromExplorer"].includes(
              route?.params?.from
            ) ||
            backPress
          ) {
            console.log("mynavihgjh1");
            // const isPlanner = route?.params?.from === "AIGeneratedSkipped";
            // event.emit("login");
            // AsyncStorage.storeItemKey(
            //   AsyncStorage.ISPLANNER_USER,
            //   JSON.stringify({ isPlanner: isPlanner, isSelected: true })
            // );
            // return;
            navigation.goBack();
          }
          // if (backPress) {
          //   console.log("mynavihgjh2");
          //   navigation.goBack();
          // }
          else {
            console.log("mynavihgjh3");
            setBackPress(true);
          }
        }}
        headerName={strings?.myProfile}
        iconContainer={styles?.iconContainer}
        textStyle={{
          color: colors?.SurfCrest,
        }}
        mainContainer={styles?.headerContainer}
      />
    );
  };
  const renderTabScreens = () => {
    switch (toggleIdx) {
      case 0:
        return (
          <PersonalInfo
            userData={userData}
            setIsEdited={setIsEdited}
            isEdited={isEdited}
            updateProfile={(key: string, updateProfile: any) =>
              updateSeekerPersonalInfo(key, updateProfile)
            }
            onImageChange={(value: boolean) => {
              if (value) {
                getSeekerPersonalInfo();
              }
            }}
            backPress={backPress}
            setBackPress={setBackPress}
            setToasterDetails={setToasterDetails}
          />
        );
      case 1:
        return (
          <EducationOccupation
            backPress={backPress}
            setBackPress={setBackPress}
            userData={userData}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
            updateProfile={(key: string, updateProfile: any) =>
              updateSeekerPersonalInfo(key, updateProfile)
            }
          />
        );
      case 2:
        return (
          <ContactInfo
            backPress={backPress}
            setBackPress={setBackPress}
            userData={userData}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
            updateProfile={(key: string, updateProfile: any) =>
              updateSeekerPersonalInfo(key, updateProfile)
            }
            userLoginType={userLoginType}
            setToasterDetails={setToasterDetails}
          />
        );
    }
  };

  const [okIdx, setOkIdx] = useState<any>(null);

  const changeToggle = (idx: any) => {
    if (isEdited) {
      setOkIdx(idx);
      setIsAlert(true);
      return;
    }
    setToggleIdx(idx);
  };
  const profileTabData = [
    {
      title: "Personal Info",
      containerStyle: {
        flex: 0.7,
      },
    },
    {
      title: "Education & Occupation",
      containerStyle: {
        flex: 1,
      },
    },
    {
      title: "Contact",
      containerStyle: {
        flex: 0.7,
      },
    },
  ];
  return (
    console.log("isEditedisEdited", isEdited, backPress),
    (
      <ScreenWrapper statusBarColor={colors?.SaltBox}>
        <View style={styles?.mainContainer}>
          <RenderHeader />
          <ScrollView
            style={styles?.scrollViewContainer}
            contentContainerStyle={styles?.contentContainerStyleCobtainer}
          >
            <View style={styles.container}>
              {profileTabData?.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.touchableOpacity,
                      {
                        flex: index == 1 ? 1 : 0.6,
                      },
                    ]}
                    activeOpacity={0.8}
                    onPress={() => changeToggle(index)}
                    key={index}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          color:
                            index == toggleIdx ? colors?.SaltBox : colors?.grey,
                        },
                      ]}
                    >
                      {item?.title}
                    </Text>
                    <View
                      style={[
                        styles.divider,
                        {
                          backgroundColor:
                            index == toggleIdx
                              ? colors?.royalOrange
                              : colors?.lightSurfCrest4,
                        },
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {isLoading ? null : renderTabScreens()}
            {isAlert && (
              <CommonAlert
                alertMessage="Are you sure you want to discard all the changes?"
                isVisible={true}
                alertLeftButtonText="No"
                alertRightButtonText="Yes"
                customAlertTxtStyles={{
                  textAlign: "center",
                  marginBottom: moderateScale(10),
                }}
                alertLeftButtonOnPress={() => setIsAlert(false)}
                alertRightButtonOnPress={() => {
                  setIsEdited(false);
                  setIsAlert(false);
                  setToggleIdx(okIdx);
                }}
                isAlertIcon
              />
            )}
          </ScrollView>
        </View>
        {isLoading ? <CommonLoader /> : null}
        {toasterDetails?.showToast && (
          <ToastApiResponse
            data={toasterDetails}
            setToasterDetails={setToasterDetails}
            code={toasterDetails?.code}
            message={toasterDetails?.message}
          />
        )}
      </ScreenWrapper>
    )
  );
};

export default MyProfile;
