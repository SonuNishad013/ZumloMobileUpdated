import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface ConsentItemProps {
  id: number;
  label: string;
  type: "switch" | "checkbox";
  value: boolean;
  icon: React.ReactNode;
  onToggle: (id: number) => void;
}

const ConsentItem: React.FC<ConsentItemProps> = ({
  id,
  label,
  type,
  value,
  icon,
  onToggle,
}) => {
  return (
    <View style={styles.row}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: moderateScale(40),
          }}
        >
          {type === "switch" ? (
            <Switch
              value={value}
              onValueChange={() => onToggle(id)}
              trackColor={{
                false: colors.lightSurfCrest15,
                true: colors.royalOrange,
              }}
              thumbColor={value ? colors.prussianBlue : colors.royalOrange}
              style={switchstyles.switch}
            />
          ) : (
            <TouchableOpacity
              onPress={() => onToggle(id)}
              style={[styles.checkbox]}
            >
              {value && (
                <Text style={styles.checkmark}>✓</Text> // showing checkmark only if selected
              )}
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.label}>{label}.</Text>
      </View>
    </View>
  );
};

export default ConsentItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrapper: {
    width: moderateScale(20),
    height: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SurfCrest,
    borderRadius: moderateScale(3),
  },
  label: {
    flex: 1,

    // marginLeft: 10,
    color: colors.royalOrange,
    fontSize: moderateScale(14),
    marginLeft: moderateScale(10),
  },
  // checkbox: {
  //   width: 24,
  //   height: 24,
  //   borderWidth: 1,
  //   borderColor: "#C8D8D4",
  //   borderRadius: 4,
  // },
  checkbox: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderWidth: 1,
    borderColor: colors.royalOrange,
    // borderRadius: 4,
    marginLeft: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: colors.royalOrange, // white checkmark inside red box
    fontSize: textScale(12),
    fontWeight: "bold",
  },
});

const switchstyles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Increase size
  },
});
