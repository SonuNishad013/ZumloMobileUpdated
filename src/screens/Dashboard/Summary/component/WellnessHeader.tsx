import React from "react";
import { View, Text, StyleSheet, TextStyle } from "react-native";
import colors from "../../../../constant/colors";

interface WellnessHeaderProps {
  title: string;
  subtitle: string;
  subtitleStyle?: TextStyle;
}

const WellnessHeader: React.FC<WellnessHeaderProps> = ({
  title,
  subtitle,
  subtitleStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={[styles.subtitleText, subtitleStyle]}>
        {`\n` + subtitle}
      </Text>
    </View>
  );
};

export default WellnessHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#12394A", // Adjust based on theme
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors?.royalOrangeDark,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: "#B2DFDB",
  },
});
