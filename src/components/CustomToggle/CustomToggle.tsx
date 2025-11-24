import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
interface Props {
  isYes?: any;
  onChangeText?: any;
}
const CustomToggle: React.FC<Props> = ({ isYes, onChangeText }: any) => {
  const [value, setValue] = useState(isYes !== "Yes");
  const toggleSelceter = () => {
    setValue(!value);
  };

  useEffect(() => {
    onChangeText(value ? "No" : "Yes");
  }, [value]);

  return (
    <>
      {value ? (
        <TouchableOpacity
          onPress={toggleSelceter}
          style={styles.toggleContainer}
        >
          <View style={[styles.toggleButton]} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={toggleSelceter}
          style={styles.toggleContainer2}
        >
          <View style={[styles.toggleButton2]} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: colors?.transparent,
    borderRadius: moderateScale(20),
    padding: moderateScale(2),
    width: moderateScale(44),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
  },
  toggleButton: {
    borderRadius: moderateScale(7),
    width: moderateScale(14),
    height: moderateScale(14),
    backgroundColor: colors?.SurfCrest,
  },
  toggleContainer2: {
    flexDirection: "row",
    backgroundColor: colors?.polishedPine,
    borderRadius: moderateScale(20),
    padding: moderateScale(2),
    width: moderateScale(44),
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    justifyContent: "flex-end",
  },
  toggleButton2: {
    borderRadius: moderateScale(7),
    width: moderateScale(14),
    height: moderateScale(14),
    backgroundColor: colors?.SurfCrest,
  },
});

export default CustomToggle;
