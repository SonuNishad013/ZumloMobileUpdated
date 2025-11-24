import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../constant/colors";
import { useState } from "react";

interface TabSelectorProps {
  onChangeTab?: (tab: "Day" | "Week" | "Overall") => void;
}

const TabSelector = ({ onChangeTab }: TabSelectorProps) => {
  const graphFilterMap = {
    Day: "1",
    Week: "2",
    // Month: "3",
    Overall: "4",
  };
  const [selectedTab, setSelectedTab] =
    useState<keyof typeof graphFilterMap>("Day");

  const handleTabChange = (tab: keyof typeof graphFilterMap) => {
    setSelectedTab(tab);
    onChangeTab?.(tab);
  };

  return (
    <View style={Tabstyles.container}>
      <View style={Tabstyles.tabContainer}>
        {["Day", "Week", "Overall"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={Tabstyles.tab}
            onPress={() => handleTabChange(tab)}
          >
            <Text
              style={[
                Tabstyles.tabText,
                { color: `rgba(160, 160, 160, 1)` },
                selectedTab === tab && Tabstyles.selectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={Tabstyles.indicatorContainer}>
        <View
          style={[
            Tabstyles.indicator,
            {
              left:
                selectedTab === "Day"
                  ? "0%"
                  : selectedTab === "Week"
                  ? "33%"
                  : "66%",
            },
          ]}
        />
      </View>
    </View>
  );
};

const Tabstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.SurfCrest, // Light greenish background
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#A0A0A0", // Default text color
  },
  selectedTabText: {
    color: `rgba(4, 58, 78, 1)`,
    // Darker color for selected tab
    fontWeight: "bold",
  },
  indicatorContainer: {
    height: 2,
    backgroundColor: `rgba(163, 191, 171, 1)`,
    marginTop: 5,
    position: "relative",
  },
  indicator: {
    width: "33%",
    height: 2,
    backgroundColor: "#4B4B4B", // Highlight color
    position: "absolute",
  },
});
export default TabSelector;
