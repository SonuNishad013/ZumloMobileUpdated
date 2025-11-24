import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../constant/colors";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import { useDispatch } from "react-redux";
import allActions from "../../redux/actions";
import appConstant from "../../constant/appConstant";
import navigationString from "../../navigation/navigationString";
import CustomToast from "../../components/Toast";
import { textLabelSize } from "../../utils/TextConfig";

const StartNow = ({ onNextPress, navigation, activitData }: any) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<any>();
  const [activityData, setActivityData] = useState<any>([]);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  useEffect(() => {
    getSeekersData();
    GetActivitiesTemplates();
  }, []);
  const getSeekersData = async () => {
    let seekerData = await AsyncStorageUtils?.getItem(
      AsyncStorageUtils?.SEEKERS_PROFILE_DATA
    );
    setUserData(JSON?.parse(seekerData));
  };

  const GetActivitiesTemplates = () => {
    // try {
    let requestbody = 1;
    // let requestbody = 3; old code

    allActions.OnBoarding.GetActivitiesTemplates(
      dispatch,
      requestbody,
      "GetActivitiesTemplates"
    )
      .then(async (response: any) => {
        console.log("response for GetActivitiesTemplates==>", response);

        if (response.statusCode == 200) {
          setActivityData(response?.data?.[0]);
        } else {
          setToasterDetails({
            showToast: true,
            code: 0,
            message: "Oops something went wrong!",
          });
        }
      })
      .catch((err: any) => {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Oops something went wrong!",
        });
      });
  };
  const SaveUserActivitiesFromTemplate = async (ActivityDetails: any) => {
    onSelectExplorer_();
    navigation.navigate(navigationString?.ExplorerActivityPreferences, {
      from: "ExplorerActivity",
      data: ActivityDetails,
      userData,
    });
  };
  const onSelectExplorer_ = () => {
    let req = {
      userId: userData?.userId !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.explorer,
    };

    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "saveQuestion"
    )
      .then((response: any) => {
        console.log(
          "response in explorer flow user data saved as explorer",
          response
        );
      })
      .catch((err) => {
        setToasterDetails({
          showToast: true,
          code: 0,
          message: "Oops something went wrong!",
        });
      });
  };

  const onSaveuserType = () => {
    onSelectExplorer_();
    navigation.navigate(navigationString?.ProductGuideMain, {
      from: "fromExplorer",
    });
  };
  return (
    console.log("activityData", activityData, activitData),
    (
      <ImageBackground
        source={imagePath?.journal_4}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            padding: moderateScale(25),
            justifyContent: "center",
            marginBottom: moderateScale(30),
          }}
        >
          <Text
            style={{
              fontSize: textScale(24),
              fontWeight: "700",
              color: colors?.royalOrange,
              textAlign: "center",
              // paddingVertical: moderateScale(),
            }}
          >
            {"Did you know?"}
          </Text>

          <Text
            style={{
              fontSize: textScale(16),
              fontWeight: "400",
              color: colors?.SurfCrest,
              textAlign: "center",

              marginHorizontal: moderateScale(20),
              paddingVertical: moderateScale(25),
            }}
          >
            {/* {activitData?.description} */}
            {
              "Just a few deep breaths can calm your nervous system and clear your mind."
            }
          </Text>
          <Text
            style={{
              fontSize: textLabelSize?.subHeaderTextSize,
              fontWeight: "600",
              color: colors?.SurfCrest,
              textAlign: "center",
              marginBottom: moderateScale(20),
              marginTop: moderateScale(80),
            }}
          >
            {" Want to try it with me?"}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              SaveUserActivitiesFromTemplate(activityData);
            }}
            style={[
              styles.detailsContainer,
              { backgroundColor: colors?.polishedPine },
            ]}
          >
            <Text style={styles.detailsText}>{"Yes I do"}</Text>
            <Image style={styles.arrow} source={imagePath?.CirArrow} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignContent: "center",
              width: width,
              flexDirection: "row",
              marginBottom: moderateScale(30),
            }}
            onPress={() => onSaveuserType()}
          >
            <Text
              style={{
                color: colors.SurfCrest,
                marginTop: moderateScale(25),
                fontSize: textScale(14),
              }}
            >
              {"Maybe later"}
            </Text>
          </TouchableOpacity>
        </View>
        <>
          {toasterDetails?.showToast && (
            <CustomToast
              data={toasterDetails}
              setToasterDetails={setToasterDetails}
              code={toasterDetails?.code}
              message={toasterDetails?.message}
            />
          )}
        </>
      </ImageBackground>
    )
  );
};

export default StartNow;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(30),
    padding: moderateScale(10),
    width: moderateScale(260),
    alignSelf: "center",
    paddingVertical: moderateScale(15),
  },
  detailsText: {
    color: colors.SurfCrest,
    fontSize: textScale(16),
    fontWeight: "500",
    alignSelf: "center",
  },
  arrow: {
    height: moderateScale(35),
    width: moderateScale(35),
    position: "absolute",
    right: moderateScale(10),
  },
});
