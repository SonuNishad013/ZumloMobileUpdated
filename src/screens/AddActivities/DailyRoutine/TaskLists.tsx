import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AfternoonIcon, SonIcon } from "../../../assets";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import TaskDetails from "./TaskDetails";

interface Props {
  morningTaskData?: any;
  afternoonTaskData?: any;
}
const TaskLists: React.FC<Props> = ({ morningTaskData, afternoonTaskData }) => {
  const bgColor = (status: any) => {
    switch (status) {
      case "COMPLETED":
        return colors?.Daintree;

      case "SKIPPED":
        return colors?.red;

      case "IN PROGRESS":
        return colors?.SaltBox;

      default:
        return colors?.SaltBox;
    }
  };
  const renderMorningTask = ({ item, index }: any) => {
    return (
      <TaskDetails
        percentShow={true}
        time={item?.time}
        streakDays={item?.streak}
        icon={item?.icon}
        title={item?.title}
        percent={item?.progress}
        btnNameStatus={item?.status}
        commomBtnMainContainer={{
          backgroundColor: bgColor(item?.status),
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer1}>
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          scrollEnabled={false}
          ListHeaderComponent={() => {
            return (
              <View style={styles.listHeader}>
                <SonIcon />
                <Text style={styles.listHeaderText}>Morning (3)</Text>
                <View style={styles.listHeaderDivider} />
              </View>
            );
          }}
          data={morningTaskData}
          renderItem={renderMorningTask}
        />
      </View>
    </View>
  );
};

export default TaskLists;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(20),
  },
  flatListContainer1: {
    // marginTop: moderateScale(30),
  },
  flatListContainer2: {
    marginTop: moderateScale(30),
  },
  taskContainer: {
    // Add task container styles here
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  listHeaderText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.white,
    marginHorizontal: moderateScale(10),
  },
  listHeaderDivider: {
    flex: moderateScale(1),
    borderWidth: moderateScale(1),
    borderColor: colors.grey,
    opacity: 0.1,
  },
});
