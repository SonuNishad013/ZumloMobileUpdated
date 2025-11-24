import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import AssessmentsDetalis from "./AssessmentsDetalis";

interface Props {
  navigation?: any;
  data?: any;
}

const AssessmentListData: React.FC<Props> = ({ data }) => {
  const renderColorBg = (itm: any) => {
    switch (itm?.status) {
      case "Completed":
        return colors?.sutfCrestOp;

      case "In-progress":
        return colors?.grayOp;

      case "To be started":
        return colors?.orangeOp;

      default:
        break;
    }
  };
  const renderColorScolingBg = (itm: any) => {
    switch (itm?.status) {
      case "Completed":
        return colors?.polishedPine;

      case "In-progress":
        return colors?.grey;

      case "To be started":
        return colors?.royalOrange;

      default:
        break;
    }
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        ListHeaderComponent={() => {
          return (
            <>
              <Text
                style={style.headerText}
              >{`${data.length} Total Assessments`}</Text>
            </>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <AssessmentsDetalis
              type={item?.type}
              suggestion={item?.suggestion}
              questionCoutn={item?.questionCoutn}
              status={item?.status}
              planContainer={{
                backgroundColor: renderColorBg(item),
              }}
              typeContainer={{
                backgroundColor: renderColorScolingBg(item),
              }}
              statusContainer={{
                backgroundColor: renderColorScolingBg(item),
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default AssessmentListData;
const style = StyleSheet.create({
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
});
