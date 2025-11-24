import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../constant/colors";
import { CircleMinIcon, IconClock, IconsNext, NextAryD } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CreateGoalButton from "../../UserGoals/zUserGoalscomponents/createGoalButton";
import RoundButton from "../../../components/Buttons/roundButton";
import navigationString from "../../../navigation/navigationString";
import CommonAlert from "../../../components/CommonAlert/CommonAlert";

interface Props {
  headerText?: string;
  infomation?: any;
  userInfo?: any;
  index?: any;
  isData?: any;
  navigation?: any;
  SeekerID?: any;
  medicalHiostoryData?: any;
  isMedicalDetailsEditable?: any;
}

const UserInfoCnt: React.FC<Props> = ({
  headerText,
  infomation,
  userInfo,
  index,
  isData,
  navigation,
  SeekerID,
  medicalHiostoryData,
  isMedicalDetailsEditable,
}) => {
  console.log(
    "userIn for=-=-=-=-=>",
    headerText,
    infomation,
    userInfo,
    index,
    isData,
    navigation,
    SeekerID
  );

  const [isAlertVisible, setisAlertVisible] = useState(false);
  const onViewDetails = (index: any) => {
    switch (index) {
      case 0:
        setisAlertVisible(false);
        return navigation.navigate(navigationString.InviteduserBasicDetails, {
          from: "invited_SignUP",
          email: userInfo?.[1]?.infomation?.[1]?.value,
          data: infomation,
          SeekerID: SeekerID,
        });
      case 1:
        setisAlertVisible(false);
        return navigation.navigate(navigationString.InviteduserContactDetails, {
          from: "invited_SignUP",
          email: userInfo?.[1]?.infomation?.[1]?.value,
          data: infomation,
          SeekerID: SeekerID,
        });

      case 2:
        if (isMedicalDetailsEditable) {
          return navigation.navigate(
            navigationString.InviteduserMedicalDetails,
            {
              from: "invited_SignUP",
              email: userInfo?.[1]?.infomation?.[1]?.value,
              data: infomation,
              SeekerID: SeekerID,
              medicalHiostoryData: medicalHiostoryData,
            }
          );
        } else {
          setisAlertVisible(true);
        }

        break;
      default:
        break;
    }
  };
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          marginTop: moderateScale(10),
          marginRight: moderateScale(12),
        }}
      >
        <RoundButton
          mainContainer={{
            height: moderateScale(24),
            width: moderateScale(24),
          }}
          SvgIcon={infomation.length > 0 ? IconClock : IconsNext}
        />

        {index + 1 !== userInfo.length && (
          <View
            style={{
              width: moderateScale(0.1),
              flex: 1,
              borderColor: colors?.SurfCrest,
              borderWidth: moderateScale(0.3),
              borderStyle: "dashed",
              marginTop: moderateScale(5),
            }}
          />
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.circleIcon}>
          <CircleMinIcon />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>{headerText}</Text>

          {infomation.length > 0 ? (
            <TouchableOpacity
              style={styles?.detailsContainer}
              onPress={() => onViewDetails(index)}
            >
              <Text style={styles.detailsText}>{"View Details"}</Text>
              <NextAryD />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.separator} />
        <View style={styles.infoItem}>
          {isData ? (
            <View>
              {infomation?.map((item: any, index: any) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginTop:
                        index === 0 ? moderateScale(9) : moderateScale(4),
                    }}
                  >
                    {item?.value !== null && (
                      <Text style={styles.infoText}>
                        {item?.title}
                        {" : "}
                        {item?.title == "Phone Number"
                          ? `+${item?.countryCode}` + item?.value
                          : item?.value !== "Invalid date"
                          ? item?.value
                          : ""}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ) : (
            <CreateGoalButton
              mainContainer={{
                borderColor: colors?.royalOrange,
                marginTop: moderateScale(15),
              }}
              title={
                index == 0
                  ? "Complete your basic details"
                  : index == 1
                  ? "Complete you contact details"
                  : "Complete your medical history"
              }
              titleStyle={{ color: colors?.royalOrange }}
              iconStyle={{ tintColor: colors?.royalOrange }}
              onPress={() => onViewDetails(index)}
            />
          )}
        </View>
      </View>
      <CommonAlert
        alertMessage="Fill the basic details."
        isVisible={isAlertVisible}
        alertLeftButtonText="OK"
        alertLeftButtonOnPress={() => setisAlertVisible(false)}
        hideAlert={() => setisAlertVisible(false)}
        isAlertIcon
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SaltBox,
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    overflow: "hidden",
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(15),
    flex: 1,
    // height:moderateScale(156)
  },
  circleIcon: {
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: moderateScale(10),
    marginLeft: moderateScale(20),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  detailsContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  detailsText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginRight: moderateScale(5),
  },
  separator: {
    height: moderateScale(0.5),
    backgroundColor: colors?.surfCrustOp,
    marginTop: moderateScale(8),
  },
  infoItem: {
    paddingHorizontal: moderateScale(20),
  },
  infoText: {
    fontSize: textScale(10),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
});

export default UserInfoCnt;
