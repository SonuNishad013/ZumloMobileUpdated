import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  handleInputChange?: any;
  value?: any;
}

const BoxInputWithTitle: React.FC<Props> = ({ handleInputChange, value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        selectionColor={colors?.SurfCrest}
        value={value}
        onChangeText={handleInputChange}
      />
      <Text style={styles.label}>Hours</Text>
    </View>
  );
};

export default BoxInputWithTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(50),
  },
  input: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderColor: colors?.royalOrange,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(9),
    justifyContent: "center",
    alignItems: "center",
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "500",
    paddingHorizontal: moderateScale(15),
  },
  label: {
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "500",
    marginLeft: moderateScale(20),
  },
});
