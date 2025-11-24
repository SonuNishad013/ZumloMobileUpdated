import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";

const tabs = [
  "Wellbeing",
  "Goals",
  "Activities",
  "Vitals",
  "Journals",
  "Habits",
];

interface SegmentedTabsProps {
  selectedIndex: number;
  onTabPress: (index: number) => void;
}

const SegmentedTabs = ({ selectedIndex, onTabPress }: SegmentedTabsProps) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = selectedIndex === index;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(index)}
          >
            <Text
              style={[
                styles.tabText,
                isActive && styles.activeTabText,
                tab === "Wellbeing" && Platform?.OS === "android"
                  ? {
                      marginHorizontal: moderateScale(15),
                      width: moderateScale(70),
                      textAlign: "center",
                    }
                  : {},
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginRight: moderateScale(25),
  },
  tab: {
    borderWidth: 1,
    borderColor: colors.SurfCrest,
    borderRadius: 25,
    paddingHorizontal: 20,
    height: moderateScale(30),
    justifyContent: "center",
  },
  activeTab: {
    borderWidth: 1,
    borderColor: colors.SurfCrest,
    backgroundColor: colors.polishedPine,
    borderRadius: 25,
    paddingHorizontal: 20,
    height: moderateScale(30),
    justifyContent: "center",
  },
  tabText: {
    color: "#AAB7BC",
    fontSize: 14,
    marginHorizontal: moderateScale(15),
  },
  activeTabText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default SegmentedTabs;
