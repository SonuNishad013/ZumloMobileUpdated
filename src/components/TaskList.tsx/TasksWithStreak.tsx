import { FlatList, StyleSheet } from "react-native";
import React from "react";
import HeaderWithNameSeeAll from "../Header/HeaderWithNameSeeAll";
import colors from "../../constant/colors";
import TaskDetails from "../../screens/AddActivities/DailyRoutine/TaskDetails";

interface Props {
  taskData?: any;
  msg?: any;
  name?: any;
}
const TasksWithStreak: React.FC<Props> = ({ taskData, name, msg }) => {
  return (
    <>
      <HeaderWithNameSeeAll name={name} msg={msg} />
      <FlatList
        keyExtractor={(item, index) => "key" + index}
        data={taskData}
        renderItem={({ item }) => {
          return (
            <TaskDetails
              time={item?.time}
              streakDays={item?.streak}
              icon={item?.icon}
              title={item?.title}
              percent={item?.progress}
              btnNameStatus={item?.status}
              mainBoxContainer={{ backgroundColor: colors?.polishedPine }}
              percentShow={true}
            />
          );
        }}
      />
    </>
  );
};

export default TasksWithStreak;

const styles = StyleSheet.create({});
