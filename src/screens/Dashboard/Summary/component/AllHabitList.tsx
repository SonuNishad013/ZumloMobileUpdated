import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../../components/Header/commonHeader";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import HabitItem from "../../Planner/HabitItem";
import moment from "moment";
import { YYYY_MM_DD } from "../../../../constant/dateFormatConstants";
import {
  Enum_HabitItemIsFrom,
  HabitListOpenFrom_ENUM,
} from "../../../../constant/ENUM";
interface AllHabbitListProps {
  navigation?: any;
}
const AllHabitList: React.FC<AllHabbitListProps> = ({ navigation }) => {
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ flex: 1 }}>
        <View style={styles?.backButtonHeaderContainer}>
          <CommonHeader
            headerName={`Habits`}
            onBackPress={() => navigation.goBack()}
            iconContainer={styles?.iconContainer}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: moderateScale(20),
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: moderateScale(10),
              gap: moderateScale(10),
              paddingVertical: moderateScale(20),
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: textScale(20),
                fontWeight: "600",
                color: colors.royalOrangeDark,
                marginBottom: moderateScale(4),
              }}
            >
              {"Your Habit Tracker"}
            </Text>
            <Text
              style={{
                fontSize: textScale(14),
                color: colors.SurfCrest,
                textAlign: "center",
              }}
            >
              {"Tap a habit to view your progress, history, and streaks."}
            </Text>
          </View>
          <HabitItem
            navigation={navigation}
            date={moment().format(YYYY_MM_DD)}
            isFrom={Enum_HabitItemIsFrom?.HABITPROGRESS}
            comeFrom={HabitListOpenFrom_ENUM?.ACTIVITY_LIST}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AllHabitList;

const styles = StyleSheet.create({
  iconContainer: { backgroundColor: "#00000033" },
  backButtonHeaderContainer: {
    paddingHorizontal: moderateScale(19),
    marginBottom: moderateScale(9),
  },
  innerContainer: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
  },
});
