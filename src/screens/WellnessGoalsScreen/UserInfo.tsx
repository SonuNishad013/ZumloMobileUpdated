import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";

interface Props {
  BasicInfoData?: any;
}

const UserInfo: React.FC<Props> = ({ BasicInfoData }) => {
  const BasicInfoColors = [colors.royalOrange, colors.SurfCrest];

  const renderBasicinfoData = ({ item, index }: any) => {
    return (
      <View
        style={[
          styles.basicInfoItem,
          {
            backgroundColor: BasicInfoColors[index % BasicInfoColors.length],
          },
        ]}
      >
        <Text style={styles.basicInfoText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.userName}>
        {strings.userText}
        {"Selena"}
      </Text>
      <Text style={styles.treatmentPlanText}>{strings.treatmentPlanText}</Text>
      <FlatList
        data={BasicInfoData}
        renderItem={renderBasicinfoData}
        keyExtractor={(item: any) => item.id}
        horizontal
        style={styles.basicInfoList}
      />

      <View style={styles.dateContainer}>
        {/* <Text style={styles.dateText}>{"Mar 31st to Dec 31, 2025"}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors.SurfCrest,
    fontFamily: "Poppins-Regular",
    marginTop: moderateScale(20),
  },
  treatmentPlanText: {
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(5),
  },
  basicInfoItem: {
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(15),
  },
  basicInfoText: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
    fontWeight: "400",
    paddingHorizontal: moderateScale(25),
  },
  basicInfoList: {
    marginTop: moderateScale(20),
  },
  dateContainer: {
    backgroundColor: colors.SaltBox,
    width: moderateScale(215),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(10),
    alignItems: "center",
  },
  dateText: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
});

export default UserInfo;
