import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

const { width } = Dimensions.get("window"); // Get screen width

type MaterialTopTabs = {
  renderSelectedUI?: any;
};
const MaterialTopTabs: React.FC<MaterialTopTabs> = ({ renderSelectedUI }) => {
  const tabs = ["Day", "Week", "Month"];
  const [activeTab, setActiveTab] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(0)).current;

  // Function to switch tabs with animation
  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.timing(indicatorPosition, {
      toValue: index * (width / tabs.length),
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Tab Bar */}

      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => handleTabPress(index)}
          >
            <Text
              style={[styles.tabText, activeTab === index && styles.activeText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        {/* Animated Indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: width / tabs.length,
              transform: [{ translateX: indicatorPosition }],
            },
          ]}
        />
      </View>

      <View style={styles.content}>{renderSelectedUI(activeTab)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    position: "relative",
    elevation: 2, // For Android shadow effect
    shadowColor: colors.SurfCrest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: colors.brightGray,
  },
  tabText: {
    fontSize: 16,
    color: colors.themeColor,
  },
  activeText: {
    color: colors.themeColor,
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    height: 3,
    backgroundColor: colors.themeColor,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  screenText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MaterialTopTabs;
