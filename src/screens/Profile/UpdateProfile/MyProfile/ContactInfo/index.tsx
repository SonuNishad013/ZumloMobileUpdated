import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "../../../../../constant/responsiveStyle";
import colors from "../../../../../constant/colors";
import { InfoView } from "../InfoView";
import EditContactInfo from "./EditContactInfo";

const ContactInfo = ({
  userData,
  updateProfile,
  setIsEdited,
  userLoginType,
  setToasterDetails,
  backPress,
  setBackPress,
}: any) => {
  const [contactInfoDetail, setContactInfoDetail] = useState([
    { title: "Email Address", value: "NA", key: "email" },
    { title: "Phone Number", value: "NA", key: "phoneNumber" },
  ]);

  const [showEditContactInfo, setShowEditContactInfo] = useState(false);

  useEffect(() => {
    console.log("userData PersonalInfo --> ", JSON.stringify(userData));
    if (userData?.contactInformation) {
      let data = [...contactInfoDetail];
      setContactInfoDetail(
        data.map((elem) => {
          return {
            ...elem,
            value: getKeyByValue(userData?.contactInformation, elem.key),
          };
        })
      );
    }
  }, [userData]);
  useEffect(() => {
    if (backPress) {
      setShowEditContactInfo(false);
    }
  }, [backPress]);

  if (showEditContactInfo)
    return (
      <EditContactInfo
        // onPressUpdate={() => setShowEditContactInfo(false)}
        userData={userData?.contactInformation}
        setIsEdited={setIsEdited}
        onPressUpdate={(formData: any) => {
          updateProfile("contactInformation", formData);
          // setShowEditBasicInfo(false);
        }}
        setToasterDetails={(data: any) => setToasterDetails(data)}
        onPresCancel={() => {
          setShowEditContactInfo(false);
          setBackPress(true);
        }}
        userLoginType={userLoginType}
      />
    );
  return (
    <View style={{ flex: 1, paddingHorizontal: moderateScale(19) }}>
      <InfoView
        data={contactInfoDetail}
        title="How to reach you"
        onPressEdit={() => {
          setShowEditContactInfo(true);
          setBackPress(false);
        }}
        containerStyle={styles.contactInfoInfoContainer}
      />
    </View>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  contactInfoInfoContainer: {
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
  },
});

function getKeyByValue(object: any, value: any) {
  let string = "";
  for (const property in object) {
    // console.log(`${property}: ${object[property]}`);
    if (property == value) string = object[property];
  }
  return string;

  // return Object.keys(object).find((key) => {
  //   console.log(" key getKeyByValue --> ", key);
  //   console.log(" value getKeyByValue --> ", value);
  //   let value = ""
  //   return object[key] === value ?  ;
  // });
}
