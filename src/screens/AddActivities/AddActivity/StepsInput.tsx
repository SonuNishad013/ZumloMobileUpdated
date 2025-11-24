import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {}
const StepsInput: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"Add the steps"}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            maxLength={5}
            keyboardType="numeric"
            style={styles.inputText}
            placeholder="Steps"
          />
          <View>
            <Text style={styles.inputLabel}>{"Steps"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepsInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(30),
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  inputContainer: {
    backgroundColor: colors?.ShadowGreen,
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: moderateScale(25),
    marginTop: moderateScale(5),
    paddingVertical: moderateScale(20),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inputText: {
    fontSize: textScale(58),
    color: colors?.prussianBlue,
    fontWeight: "600",
    height: moderateScale(110),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    marginLeft: moderateScale(5),
    paddingBottom: moderateScale(30),
  },
});
