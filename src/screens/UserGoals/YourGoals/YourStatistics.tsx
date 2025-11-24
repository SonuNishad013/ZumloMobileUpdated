import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import CreateGoalButton from "../zUserGoalscomponents/createGoalButton";
import navigationString from "../../../navigation/navigationString";

interface Props {
  navigation?: any;
  currentDate?: any;
}

const YourStatistics: React.FC<Props> = ({
  navigation,
  currentDate,
}) => {
  return (
    <View style={style?.statisticsMainContainer}>
      <View style={style?.titleBtnContainer}>
        <Text style={style?.titleTxtStyle}>{strings?.YourStatistics}</Text>
        <TouchableOpacity>
          <Text style={style?.btnTxtSyle}>{strings?.seeAll}</Text>
        </TouchableOpacity>
      </View>
      <View style={style?.dateContainer}>
        <Text style={style?.todayTxtStyle}>{strings?.toDay} </Text>
        <Text style={style?.dateTxtStyle}>{currentDate}</Text>
      </View>
      <CreateGoalButton
        onPress={() => navigation.navigate(navigationString?.MyGoals)}
        title={strings?.customGoal}
        mainContainer={{ marginTop: moderateScale(15) }}
      />
    </View>
  );
};

export default YourStatistics;

const style = StyleSheet.create({
  statisticsMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(30),
  },
  titleBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTxtStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
  },
  btnTxtSyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
  },
  dateContainer: {
    flexDirection: "row",
  },
  todayTxtStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SilverChalice,
  },
  dateTxtStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SaltBox,
  },
});
