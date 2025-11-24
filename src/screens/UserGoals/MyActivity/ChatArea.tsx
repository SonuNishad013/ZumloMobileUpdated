import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {}
const ChatArea: React.FC<Props> = () => {
  const ChatTimePeriod = [
    {
      key: 1,
      title: "Day",
    },
    {
      key: 2,
      title: "Week",
    },
    {
      key: 3,
      title: "Month",
    },
  ];
  const [chatIndex, setChatIndex] = useState(0);
  const renderPrd = (idx: any) => {
    setChatIndex(idx);
  };
  return (
    <>
      <View style={style.rowContainer}>
        {ChatTimePeriod?.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                style.timePeriod,
                index === 0 ? style.firstTimePeriod : null,
              ]}
            >
              <TouchableOpacity onPress={() => renderPrd(index)}>
                <Text
                  style={[
                    style.timePeriodText,
                    index === chatIndex ? style.selectedTimePeriod : null,
                  ]}
                >
                  {item?.title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={style.chartContainer}></View>
    </>
  );
};

export default ChatArea;

const style = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginTop: moderateScale(35),
  },
  timePeriod: {
    marginLeft: moderateScale(50),
  },
  firstTimePeriod: {
    marginLeft: 0,
  },
  timePeriodText: {
    fontWeight: "400",
    fontSize: moderateScale(14),
    color:colors?.SilverChalice
  },
  selectedTimePeriod: {
    color: colors.SurfCrest,
  },
  chartContainer: {
    height: moderateScale(200),
    backgroundColor: "green",
    marginTop: moderateScale(35),
  },
});
