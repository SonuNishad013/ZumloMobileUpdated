import React, { ReactElement } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SeeAllHeader from "../Planner/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import {
  HalfMoonIcon,
  PersonOnbedIcon,
  PotWithTable,
  SleepGroupIcon1,
  SleepGroupIcon2,
  SleepGroupIcon3,
} from "../../../assets";

interface Props {
  navigation?: any;
  SleepData?: any;
}

const Sleep: React.FC<Props> = ({ navigation, SleepData }): ReactElement => {
  const renderSleep = (item: any, index: any) => {
    return (
      <View style={styles.SleepContainer}>
        <View style={{}}>
          <View style={styles.upperContainer}>
            <Text style={styles.textStyle}>{item?.title}</Text>
            <View style={styles.group1Style}>
              <View style={styles.group2Style}>
                <HalfMoonIcon />
              </View>
              <View style={styles.group3Style}>
                <SleepGroupIcon3 />
                <View style={styles.sleepIconGroup3}>
                  <SleepGroupIcon3 />
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={{ flexDirection: "row" }}>
              <View>
                <PersonOnbedIcon />
                <SleepGroupIcon1 />
                <View style={styles.sleepIconGroup2}>
                  <SleepGroupIcon2 />
                </View>
              </View>
              <View style={styles.potIconStyle}>
                <PotWithTable />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {SeeAllHeader("Sleep", "")}
      <View style={styles.flatListContainer}>
        <FlatList
          data={SleepData}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => renderSleep(item, index)}
        />
      </View>
    </View>
  );
};
export default Sleep;
const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
  },
  flatListContainer: {
    marginHorizontal: moderateScale(15),
  },
  SleepContainer: {
    borderRadius: moderateScale(10),
    // backgroundColor: colors.rgbaSilverChalice,
    backgroundColor: colors.themeColor,
  },
  upperContainer: {
    margin: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  group1Style: { height: moderateScale(50) },
  group2Style: { justifyContent: "center", alignItems: "center" },
  group3Style: { flexDirection: "row", height: moderateScale(40) },
  sleepIconGroup3: { justifyContent: "flex-end" },
  sleepIconGroup2: {
    width: width / 1.4,
    justifyContent: "center",
    alignItems: "center",
  },
  potIconStyle: {
    width: moderateScale(width - width / 1.1),
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
