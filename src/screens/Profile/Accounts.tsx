import React, { ReactElement, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { ForwordArrow } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import SeeAllHeaderWellness from "../Dashboard/Wellness/commonHeader";
import { formatSentenceCase } from "../../helper/sentenceCase";
import { strings } from "../../constant/strings";
import { SUBSCRIPTION_NAVIGATION_FROM } from "../../constant/ENUM";

interface Props {
  navigation?: any;
  AccountData?: any;
  userLoginType?: any;
  userData?: any;
  seekerLoginType?: any;
}
const Account: React.FC<Props> = ({
  navigation,
  AccountData,
  userLoginType,
  userData,
  seekerLoginType,
}): ReactElement => {
  const [seekerType, setSeekerType] = useState<any>(seekerLoginType);
  useEffect(() => {
    if (!seekerLoginType) return;
    setSeekerType(seekerLoginType);
  }, []);
  const renderAccount = (item: any, idx: any) => {
    return (
      <>
        {[2, 3, 4]?.includes(seekerType) &&
        item?.name == "Change Password" ? null : (
          <TouchableOpacity
            style={styles.accountContainer}
            onPress={() => {
              navigation.navigate(item?.nav, {
                categoryData: item,
                userLoginType: userLoginType,
                userData: userData,
                from: "profile",
                isGoback: true,
                type:
                  item?.name === "Journal Tracking"
                    ? strings.moodJournaling_
                    : strings.moodTracking_,
                fromScreen: SUBSCRIPTION_NAVIGATION_FROM?.PROFILE,
                isPlanner: "",
              });
            }}
          >
            <View style={styles.accountInfo}>
              <View style={styles.iconContainer}>
                <item.icon />
              </View>
              <Text style={styles.accountName}>
                {formatSentenceCase(item?.name)}
              </Text>
            </View>
            <ForwordArrow />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <SeeAllHeaderWellness
        name={"Account information"}
        nameText={styles.headerText}
        container={styles.headerContainer}
      />
      <FlatList
        data={AccountData}
        renderItem={({ item, index }) => renderAccount(item, index)}
        keyExtractor={(item, index) => "key" + index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(15),
    backgroundColor: colors.themeColor,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
  },
  accountInfo: {
    flexDirection: "row",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(22),
    width: moderateScale(22),
    backgroundColor: colors.darkthemeColor,
    borderRadius: moderateScale(4),
  },
  accountName: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },
  headerText: {
    color: colors.SurfCrest,
  },
  headerContainer: {
    marginHorizontal: moderateScale(1),
  },
});

export default Account;
