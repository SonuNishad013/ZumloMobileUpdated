import { View, FlatList } from "react-native";
import React, { ReactElement, useMemo, useState } from "react";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../navigation/navigationString";
import HeaderHealthScore from "./HeaderHealthScore";
import YourStatistics from "./YourStatistics";
import UserhealthData from "./UserhealthData";
import { MMMM_D } from "../../../constant/dateFormatConstants";
import moment from "moment";

interface Props {
  navigation?: any;
}
const YourGoals: React.FC<Props> = ({ navigation }): ReactElement => {
  const currentDate = moment(new Date()).format(MMMM_D);
  const [healthScore, setHealthScore] = useState("57");
  const [userData, setUserData] = useState([
    {
      title: "CALORIES",
      value: "500",
      meter: "Cal",
      lastUpdate: " 3m",
      graphName: "circleChart",
      graphData: [50, 10, 40, 95, 85, 91, 35, 53, 24, 50],
    },
    {
      title: "CALORIES",
      value: "500",
      meter: "Cal",
      lastUpdate: " 3m",
      graphName: "lineChart",
      graphData: [50, 10, 40, 95, 85, 91, 35, 53, 24, 50],
    },
    {
      title: "CALORIES",
      value: "500",
      meter: "Cal",
      lastUpdate: " 3m",
      graphName: "Chart",
      graphData: [50, 55, 60, 75, 70, 50, 53, 24, 50],
    },
    {
      title: "STEPS",
      value: "500",
      meter: "Cal",
      lastUpdate: " 3m",
      graphName: "Bar",
      graphData: [50, 10, 40, 95, 85, 0, 35, 53, 24, 50],
    },
  ]);

  const memorizedUserHealth = useMemo(
    () => <UserhealthData data={userData} navigation={navigation} />,
    [userData]
  );
  const memorizedHeaderHealthScore = useMemo(
    () => <HeaderHealthScore score={healthScore} navigation={navigation} />,
    [healthScore]
  );
  const memorizedYourStatistics = useMemo(
    () => <YourStatistics currentDate={currentDate} navigation={navigation} />,
    [currentDate]
  );

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ backgroundColor: colors?.SurfCrest, flex: 1 }}>
        {memorizedHeaderHealthScore}
        <FlatList
          data={["1"]}
          keyExtractor={(item, index) => "key" + index}
          renderItem={() => {
            return (
              <>
                {memorizedYourStatistics}
                {memorizedUserHealth}
              </>
            );
          }}
          contentContainerStyle={{ paddingBottom: moderateScale(30) }}
        />
      </View>
    </ScreenWrapper>
  );
};
export default YourGoals;
