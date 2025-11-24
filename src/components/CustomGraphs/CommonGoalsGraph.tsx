import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import { DownArrow } from "../../assets";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
  goalName?: string;
  goalProgress?: string;
  selectableList?: string[];
  data_?: { progress: number }[];
  setSelectedTimePeriod?: (period: string) => void;
  dates?: string[];
  isWeeklySelected?: any;
}
const CommonGoalsGraph: React.FC<Props> = ({
  goalName,
  goalProgress,
  selectableList,
  data_,
  setSelectedTimePeriod,
  dates = [],
  isWeeklySelected,
}) => {
  const [data, setData] = useState(data_);
  const [selectedPeriod, setSelectedPeriod] = useState("Week");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (data_ !== data) setData(data_);
  }, [data_]);

  const calculateAverage = () => {
    if (!data || data.length === 0) return 0;
    return (
      data.reduce((sum, item) => sum + item.progress, 0) / data.length
    ).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.chartTitle}>{goalName}</Text>
            <Text style={styles.tagText}>
              {goalProgress || calculateAverage()}%
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setDropdownVisible(!dropdownVisible)}
            style={styles.dropdownButton}
          >
            <View style={styles.dropdownButtonContent}>
              <Text style={styles.dropdownButtonText}>{selectedPeriod}</Text>
              <DownArrow />
            </View>
          </TouchableOpacity>
        </View>

        {/* Dropdown Menu */}
        {dropdownVisible && (
          <View style={styles.dropdown}>
            {selectableList &&
              selectableList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedPeriod(item);
                    setDropdownVisible(false);
                    setSelectedTimePeriod && setSelectedTimePeriod(item);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
          </View>
        )}

        {/* Progress Bars */}
        <View style={styles.progressContainer}>
          {data &&
            data.map((item, index) => (
              <View key={index} style={{ alignItems: "center" }}>
                <View style={{ height: 100, justifyContent: "flex-end" }}>
                  {item.progress > 0 ? (
                    <>
                      <Text style={styles.progressText}>
                        {item.progress.toFixed()}%
                      </Text>
                      <View
                        style={[styles.progressBar, { height: item.progress }]}
                      />
                    </>
                  ) : (
                    <View style={styles.emptyProgressBar} />
                  )}
                </View>
              </View>
            ))}
        </View>

        {/* Footer Section */}
        <View style={styles.chartFooter}>
          <View style={styles.footerLineContainer}>
            <View style={styles.footerDot} />
            <View style={styles.footerLine} />
            <View style={styles.footerDot} />
          </View>
          <View style={styles.dateLabels}>
            {dates.map((day, index) => (
              <Text key={index} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>
        </View>

        {/* Note */}
        <Text style={styles.note}>* All data in percentage.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  chartContainer: {
    backgroundColor: colors.lightprussianBlue,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  chartTitle: {
    fontSize: 18,
    color: colors.SurfCrest,
    fontWeight: "600",
  },
  tagText: {
    color: colors.SurfCrest,
    fontSize: 14,
  },
  dropdownButton: {
    borderWidth: 1,
    height: moderateScale(30),
    backgroundColor: colors.SurfCrest,
    width: moderateScale(100),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    borderColor: colors.lightprussianBlue,
  },
  dropdownButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(10),
  },
  dropdownButtonText: {
    color: colors.lightprussianBlue,
  },
  dropdown: {
    position: "absolute",
    top: moderateScale(50),
    right: 10,
    backgroundColor: colors.lightprussianBlue,
    borderRadius: 8,
    width: moderateScale(100),
    zIndex: 1,
    elevation: 5,
  },
  dropdownItem: {
    padding: moderateScale(10),
  },
  dropdownItemText: {
    fontSize: 16,
    color: colors.SurfCrest,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  progressText: {
    marginBottom: 2,
    textAlign: "center",
    fontSize: textScale(10),
    color: colors.SurfCrest,
  },
  progressBar: {
    width: moderateScale(35),
    borderTopEndRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    backgroundColor: colors.SurfCrest,
  },
  emptyProgressBar: {
    height: 0.6,
    width: moderateScale(35),
    backgroundColor: colors.lightSurfCrest,
    borderTopEndRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
  chartFooter: {
    marginTop: 10,
  },
  footerLineContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerDot: {
    width: moderateScale(5),
    height: moderateScale(5),
    borderRadius: moderateScale(5),
    backgroundColor: colors.lightSurfCrest,
  },
  footerLine: {
    width: width - 80,
    height: moderateScale(1),
    backgroundColor: colors.lightSurfCrest,
  },
  dateLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayLabel: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
  },
  note: {
    color: colors.SurfCrest,
    fontSize: textScale(13),
    marginTop: moderateScale(10),
  },
});

export default CommonGoalsGraph;
