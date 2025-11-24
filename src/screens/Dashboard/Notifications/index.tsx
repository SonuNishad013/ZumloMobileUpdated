import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  height,
  moderateScale,
  textScale,
} from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { NoDataIcon } from "../../../assets";
import NotificationCard from "./NotificationCard";
import allActions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ToastMsg from "../../../components/Hooks/useToast";
import { useFocusEffect } from "@react-navigation/native";
import CommonLoader from "../../../components/Loader";
import { getSeekerDetailsData } from "../../../redux/selector";
import CustomToast from "../../../components/Toast";
import navigationString from "../../../navigation/navigationString";
import { communityCode } from "../../../constant/CommunityConstant";
import CommunityGroupInvitation from "./NotificationCardUI/CommunityGroupInvitation";
import {
  notifictionUITypeList,
  notifictionUITypeList2,
} from "../../../constant/notificationFormName";
import LikeCommentCard from "./NotificationCardUI/LikeCommentCard";
import { textLabelSize } from "../../../utils/TextConfig";
import { imagePath } from "../../../assets/png/imagePath";

const renderEmptyList = () => {
  return (
    <View
      style={{
        height: height * 0.7,
        justifyContent: "center",
      }}
    >
      <Image
        source={imagePath?.no_data_notification}
        style={{
          height: moderateScale(200),
          width: moderateScale(300),
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />

      <Text
        style={{
          fontSize: textLabelSize?.titleFont,
          fontWeight: "600",
          color: colors?.SaltBox,
          textAlign: "center",
        }}
      >
        {"All clear for now "}
      </Text>
      <Text
        style={{
          fontSize: textLabelSize?.subtTitleFont,
          fontWeight: "400",
          color: colors?.prussianBlue,
          textAlign: "center",
          marginTop: moderateScale(10),
          marginBottom: moderateScale(20),
          fontStyle: "italic",
        }}
      >
        {
          "You’re all caught up. I’ll nudge you if anything\nneeds your attention."
        }
      </Text>
    </View>
  );
};

const NotificationScreen: React.FC = ({ navigation, route }: any) => {
  const { from } = route.params;
  let userData = useSelector(getSeekerDetailsData());
  const dispatch: any = useDispatch();
  const [notificationListData, setNotificationListData] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const toasterFunction = (code: any, message: any) => {
    setToasterDetails({
      showToast: true,
      code: code,
      message: message,
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllNotifications();
    }, [])
  );
  const getAllNotifications = async () => {
    setLoading(true);
    let requestbody = {
      pageIndex: 0, // Pagination index
      pageSize: 10, //Page size
      deviceType: 1, //for mobile its 1 on both server either its dev or stagging
    };
    try {
      const response = await allActions.notificationAction.getAllNotifications(
        dispatch,
        requestbody,
        "GetAllNotifications"
      );

      if (response.statusCode === 200) {
        setNotificationListData(response?.data?.notifications);
        setLoading(false);
      } else {
        setLoading(false);
        toasterFunction(0, response?.message);
      }
    } catch (error: any) {
      setLoading(false);
      toasterFunction(0, error?.message);
    } finally {
      setLoading(false);
    }
  };
  const updateNotification = async (item: any) => {
    const extDataFromItem = JSON.parse(item?.data);
    setLoading(true);
    let requestBody = {
      ids: [item?.id],
      userId: userData?.data?.userId,
      isRead: true,
    };
    try {
      const response =
        await allActions.notificationAction.UpdateNotificationStatus(
          dispatch,
          requestBody,
          "saveNotification"
        );
      if (response.statusCode === 200) {
        if (item?.notificationType === 4) {
          navigation.navigate(navigationString?.ActivitesDetails, {
            // id: 100,//for testing to check if get any wrong activity ID then what will be the response
            id: extDataFromItem?.Id, //later on uncomment this
            from: "NotificationClick",
          });
          navigation.pop(1);
        }
        setLoading(false);
      } else {
        setLoading(false);
        toasterFunction(0, response?.message);
      }
    } catch (error: any) {
      setLoading(false);
      toasterFunction(0, error?.message);
    } finally {
      setLoading(false);
    }
  };

  //DeleteNotificationByIdAPI
  const Call_DeleteNotificationByIdAPI = async (item: any) => {
    setLoading(true);
    let requestBody = null;
    let param = item?.id;
    try {
      const response =
        await allActions.notificationAction.DeleteNotificationByIdAPI(
          dispatch,
          requestBody,
          "saveNotification",
          param
        );
      if (response.statusCode === 200) {
        //Call Get All notification API to get list updated and inside that loader will be false
        getAllNotifications();
      } else {
        setLoading(false);
        toasterFunction(0, response?.message);
      }
    } catch (error: any) {
      setLoading(false);
      toasterFunction(0, error?.message);
    } finally {
      setLoading(false);
    }
  };

  const renderNotificationCard = (item: any, idx: any) => {
    if (notifictionUITypeList?.includes(item?.notificationType)) {
      return (
        <CommunityGroupInvitation
          item={item}
          index={idx}
          dispatch={dispatch}
          notificationListData={notificationListData}
          setNotificationListData={setNotificationListData}
          toasterFunction={toasterFunction}
        />
      );
    } else if (notifictionUITypeList2?.includes(item?.notificationType)) {
      return (
        <LikeCommentCard item={item} index={idx} renderIn={"Notification"} />
      );
    } else {
      return (
        <NotificationCard
          type={item?.notificationType}
          item={item}
          onPress={() => {
            if (item?.notificationState === 1) {
              updateNotification(item);
            }
          }}
          onDeletePress={() => {
            //call Delete API here
            Call_DeleteNotificationByIdAPI(item);
          }}
        />
      );
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={{ flex: 1, paddingHorizontal: moderateScale(19) }}>
        <CommonHeader
          headerName={"Notifications"}
          textStyle={{
            color: colors?.prussianBlue,
            fontSize: textScale(14),
            fontWeight: "600",
          }}
          onBackPress={() => {
            // if (from == communityCode?.community) {
            //   navigation?.navigate(navigationString?.Community);
            // } else
            {
              navigation?.goBack();
            }
          }}
          iconContainer={{ backgroundColor: "#00000033" }}
          mainContainer={{
            marginBottom: moderateScale(10),
            marginTop: moderateScale(15),
          }}
        />

        {loading ? (
          <View style={{ flex: 1 }}>
            <CommonLoader />
          </View>
        ) : (
          <>
            <View style={{ gap: moderateScale(20) }}></View>

            <FlatList
              data={notificationListData}
              bounces={false}
              keyExtractor={(item, index) => "key" + index}
              contentContainerStyle={{
                marginTop: moderateScale(30),
                gap: 10,
                paddingBottom: moderateScale(65),
              }}
              ListEmptyComponent={renderEmptyList}
              renderItem={({ item, index }: any) =>
                renderNotificationCard(item, index)
              }
            />
          </>
        )}
      </View>
      {toasterDetails?.showToast && (
        <CustomToast
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
