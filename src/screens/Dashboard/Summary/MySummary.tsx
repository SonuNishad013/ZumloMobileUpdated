import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StatsCard from "../../../components/Cards/StatsCard";
import { summaryBackgroundColors } from "../../../constant/summaryConstant";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { HeartDrop } from "../../../assets";
import colors from "../../../constant/colors";

interface Props {
  vitalSummaryData?: any;
  currentStats?: (val: any) => void;
  selectedVital: string;
}

const MySummary: React.FC<Props> = ({
  vitalSummaryData,
  currentStats,
  selectedVital,
}) => {
  const [selectedStat, setSelectedStat] = useState<string>(
    selectedVital !== "" ? selectedVital : "Blood Pressure"
  );
  return (
    <>
      <FlatList
        data={vitalSummaryData}
        keyExtractor={(item, index) => "key" + index}
        numColumns={2}
        style={{
          marginTop: moderateScale(30),
          // gap: moderateScale(10),
          marginBottom: 100,
        }}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => {
          let countOrValue =
            item?.title === "Heart Rate"
              ? item?.heartRateCount
              : item?.title === "Sleep"
              ? item?.sleepDuration
              : item?.title === "Steps"
              ? item?.stepCount
              : item?.heartRate;
          console.log("countOrValue", countOrValue);
          return (
            <StatsCard
              currentStats={() => {
                currentStats(item?.title);
                setSelectedStat(item?.title);
              }}
              selectedStat={selectedStat}
              title={item?.title}
              count={countOrValue}
              unit={item?.vitalUnit}
              update={item?.createdDate}
              container={{
                backgroundColor:
                  summaryBackgroundColors[
                    index % summaryBackgroundColors?.length
                  ],
                marginLeft: index % 2 == 0 ? 0 : moderateScale(5),
                marginRight:
                  index % 2 != 0
                    ? 0
                    : index == vitalSummaryData?.length - 1
                    ? 0
                    : moderateScale(5),
                marginBottom: moderateScale(10),
              }}
            />
          );
        }}
      />
    </>
  );
};

export default MySummary;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors?.polishedPine,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(80),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartRateText: {
    fontSize: 43,
    fontWeight: "600",
    color: colors?.SurfCrest,
    paddingHorizontal: moderateScale(10),
  },
  unitText: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16.8,
    fontFamily: "Poppins-Regular",
  },
  bloodPressureTextContainer: {
    paddingLeft: moderateScale(40),
  },
  bloodPressureText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: 10,
  },

  columnWrapper: {
    justifyContent: "space-between",
  },
});
