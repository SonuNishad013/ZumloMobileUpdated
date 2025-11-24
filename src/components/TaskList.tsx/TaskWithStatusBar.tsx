import { View, FlatList } from "react-native";
import React, { ReactElement } from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import TaskCard from "../Cards/TaskCard";
import SeeAllHeaderWellness from "../../screens/Dashboard/Wellness/commonHeader";
import colors from "../../constant/colors";

interface Props {
  navigation?: any;
  morningTasks?: any;
  Headername?: string;
}
const TaskWithStatusBar: React.FC<Props> = ({
  navigation,
  morningTasks,
  Headername,
}): ReactElement => {
  return (
    <View style={{ marginTop: moderateScale(19) }}>
      <SeeAllHeaderWellness
        name={Headername}
        msg={"See All"}
        container={{ marginHorizontal: moderateScale(0) }}
      />
      <FlatList
        keyExtractor={(item, index) => "key" + index}
        data={morningTasks}
        renderItem={({ item, index }) => {
          return (
            <TaskCard
              separatorLineTop={{ opacity: index == 0 ? 0 : 1 }}
              separatorLineBottom={{
                opacity: index + 1 !== morningTasks.length ? 1 : 0,
              }}
              circle={{
                backgroundColor: item?.status
                  ? colors?.polishedPine
                  : "transparent",
                borderColor: item?.status ? colors?.white : colors?.darkBlack,
              }}
              title={item?.name}
              startFrom={item?.from}
              endTo={item?.to}
              length={item?.length}
              icon={item?.icon}
            />
          );
        }}
      />
    </View>
  );
};
export default TaskWithStatusBar;
