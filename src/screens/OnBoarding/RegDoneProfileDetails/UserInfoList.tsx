import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import UserInfoCnt from "./UserInfoCnt";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import { NextAryD } from "../../../assets";
import Toast from "react-native-toast-message";
import navigationString from "../../../navigation/navigationString";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
interface Props {
  userInfo?: any;
  navigation?: any;
  SeekerID?: any;
  medicalHiostoryData?: any;
  isMedicalDetailsEditable?: any;
}
const UserInfoList: React.FC<Props> = ({
  medicalHiostoryData,
  userInfo,
  navigation,
  SeekerID,
  isMedicalDetailsEditable,
}) => {
  const onSkip = () => {
    event.emit("login");

    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.ISPLANNER_USER,
      JSON.stringify({ isPlanner: false, isSelected: true })
    );
  };
  const GetSeekerWellnessPlanDetailsAsync = () => {
    navigation?.navigate(navigationString.WellnessGoal);
  };

  return (
    <View
      style={{
        marginTop: moderateScale(10),
        marginHorizontal: moderateScale(19),
      }}
    >
      <FlatList
        data={userInfo}
        keyExtractor={(item, index) => "key" + index}
        ListHeaderComponent={() => {
          return (
            <>
              <Text
                style={{
                  fontSize: textScale(14),
                  fontWeight: "600",
                  color: colors?.SurfCrest,
                  paddingBottom: moderateScale(20),
                }}
              >
                {"No. of Steps Covered "}
              </Text>
            </>
          );
        }}
        renderItem={({ item, index }) => {
          console.log("check item===-==>", item);

          return (
            <>
              <UserInfoCnt
                headerText={item?.headerText}
                infomation={item?.infomation}
                userInfo={userInfo}
                index={index}
                isData={item?.data}
                navigation={navigation}
                SeekerID={SeekerID}
                medicalHiostoryData={medicalHiostoryData}
                isMedicalDetailsEditable={isMedicalDetailsEditable}
              />
            </>
          );
        }}
        ListFooterComponent={() => {
          return (
            <>
              <CommonButton
                mainContainer={{
                  height: moderateScale(52),
                  alignSelf: "center",
                  // width: moderateScale(350),
                  marginTop: moderateScale(50),
                }}
                btnName={"Continue"}
                onPress={() => GetSeekerWellnessPlanDetailsAsync()}
              />

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: moderateScale(20),
                  paddingBottom: moderateScale(20),
                }}
                onPress={() => onSkip()}
              >
                <Text
                  style={{
                    fontSize: textScale(14),
                    fontWeight: "400",
                    color: colors?.SurfCrest,
                  }}
                >
                  Skip
                </Text>
                <NextAryD />
              </TouchableOpacity>
            </>
          );
        }}
      />
      <Toast />
    </View>
  );
};

export default UserInfoList;

const style = StyleSheet.create({});
