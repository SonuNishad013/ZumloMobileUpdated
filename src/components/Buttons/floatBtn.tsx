import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { textScale } from "../../constant/responsiveStyle";
interface Props {
  firstBtnStyle?: object;
  secondBtnStyle?: object;
}
const FloatingButtons: React.FC<Props> = ({
  firstBtnStyle,
  secondBtnStyle,
}) => {
  return (
    <View style={styles.container}>
      {/* Left Floating Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          styles.fabLeft,
          ...(firstBtnStyle ? [firstBtnStyle] : []),
        ]}
        onPress={() => alert("Button 1 Pressed")}
      >
        <Text style={styles.fabText}>{"Replace"}</Text>
      </TouchableOpacity>

      {/* Right Floating Button */}
      <TouchableOpacity
        style={[
          styles.fab,
          styles.fabRight,
          ...(secondBtnStyle ? [secondBtnStyle] : []),
        ]}
        onPress={() => alert("Button 2 Pressed")}
      >
        <Text style={styles.fabText}>{"Discard"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  fabLeft: {
    backgroundColor: "#ff5733", // Orange-red
  },
  fabRight: {
    backgroundColor: "#3498db", // Blue
  },
  fabText: {
    fontSize: textScale(16),
    color: "#fff",
    // fontWeight: "bold",
  },
});

export default FloatingButtons;
