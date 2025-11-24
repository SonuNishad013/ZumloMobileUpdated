import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import Header from "../../UserGoals/zUserGoalscomponents/Header";
import { moderateScale } from "../../../constant/responsiveStyle";
import AssessmentListData from "./AssessmentListData";

interface Props {
  navigation?: any;
}
const AssessmentList: React.FC<Props> = ({ navigation }) => {
  const [assessmentData, setAssessmentData] = useState([
    {
      id: 1,
      type: "Scoring",
      suggestion: "How to make yourself Mindfulness and Relaxation",
      questionCoutn: 9,
      status: "Completed",
    },
    {
      id: 2,
      type: "Scoring",
      suggestion: "How to make yourself Mindfulness and Relaxation",
      questionCoutn: 10,
      status: "In-progress",
    },
    {
      id: 3,
      type: "Scoring",
      suggestion: "How to make yourself Mindfulness and Relaxation",
      questionCoutn: 5,
      status: "To be started",
    },
    {
      id: 4,
      type: "Scoring",
      suggestion: "How to make yourself Mindfulness and Relaxation",
      questionCoutn: 9,
      status: "Completed",
    },
  ]);

  const renderItems = () => {
    return (
      <View style={style?.mainContainerList}>
        <AssessmentListData data={assessmentData} />
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={style?.mainContainer}>
        <Header
          headerContainer={{ backgroundColor: colors?.SaltBox }}
          iconContainer={{ backgroundColor: colors?.LividBrown }}
          navigation={navigation}
          headerName={"Assessments"}
        />

        <FlatList
          data={["1"]}
          renderItem={renderItems}
          keyExtractor={(item, index) => "key" + index}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AssessmentList;

const style = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: colors?.SurfCrest },
  mainContainerList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
});
