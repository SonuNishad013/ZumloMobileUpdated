import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";

import { InfoView } from "../InfoView";
import EditOccupationInfo from "./EditOccupationInfo";
import EditEducationInfo from "./EditEducationInfo";
import { getKeyByValue } from "../PersonalInfo/helper";
import {
  educationInfoDetailData,
  occupationInfoDetailData,
} from "../../../../../constant/ProfileConstant";

const PersonalInfo = ({
  userData,
  globaleCodeList,
  updateProfile,
  setIsEdited,
  backPress,
  setBackPress,
}: any) => {
  const [showEditOccupation, setShowEditOccupation] = useState(false);
  const [showEditEducation, setShowEditEducation] = useState(false);
  const [occupationInfoDetail, setOccupationInfoDetail] = useState(
    occupationInfoDetailData
  );
  const [educationInfoDetail, setEducationInfoDetail] = useState(
    educationInfoDetailData
  );
  useEffect(() => {
    if (userData?.occupationInfo) {
      let data = [...occupationInfoDetail];
      setOccupationInfoDetail(
        data.map((elem) => {
          return {
            ...elem,
            value: getKeyByValue(userData?.occupationInfo, elem),
          };
        })
      );
    }
    if (userData?.educationInfo) {
      let data = [...educationInfoDetail];
      setEducationInfoDetail(
        data.map((elem) => {
          return {
            ...elem,
            value: getKeyByValue(userData?.educationInfo, elem),
          };
        })
      );
    }
  }, [userData]);
  useEffect(() => {
    if (backPress) {
      setShowEditOccupation(false);
      setShowEditEducation(false);
    }
  }, [backPress]);

  if (showEditOccupation)
    return (
      <EditOccupationInfo
        userData={userData?.occupationInfo}
        globaleCodeList={globaleCodeList}
        setIsEdited={setIsEdited}
        onPressUpdate={(formData: any) => {
          updateProfile("occupationInfo", formData);
          setShowEditOccupation(false);
          setBackPress(true);
        }}
        onPresCancel={() => {
          setShowEditOccupation(false);
          setBackPress(true);
        }}
      />
    );
  if (showEditEducation)
    return (
      <EditEducationInfo
        userData={userData?.educationInfo}
        globaleCodeList={globaleCodeList}
        setIsEdited={setIsEdited}
        onPressUpdate={(formData: any) => {
          updateProfile("educationInfo", formData);
          setShowEditEducation(false);
        }}
        onPresCancel={() => {
          setShowEditEducation(false);
          setBackPress(true);
        }}
      />
    );

  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(19) }}>
      <InfoView
        data={occupationInfoDetail}
        title="Your Work"
        onPressEdit={() => {
          setShowEditOccupation(true);
          setBackPress(false);
        }}
        containerStyle={styles.occupationInfoInfoContainer}
      />
      <InfoView
        data={educationInfoDetail}
        onPressEdit={() => {
          setShowEditEducation(true);
          setBackPress(false);
        }}
        title="Your Education"
        containerStyle={styles.educationInfoContainer}
      />
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  occupationInfoInfoContainer: {
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
  },
  educationInfoContainer: {
    backgroundColor: colors?.prussianBlue,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  infoLabel: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    flex: 1,
  },
  infoText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    maxWidth: moderateScale(200),
    textAlign: "right",
  },
});
