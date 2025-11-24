import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
  isYes?: any;
  onChangeText?: any;
}

const CheckBoxSelect: React.FC<Props> = ({ isYes, onChangeText }) => {
  const [value, setValue] = useState(isYes !== "Yes");
  const toggleSelector = () => {
    setValue(!value);
  };
  useEffect(() => {
    onChangeText(value ? "No" : "Yes");
  }, [value]);

  return (
    <>
      {value ? (
        <TouchableOpacity style={styles?.checkedBox} onPress={toggleSelector} />
      ) : (
        <TouchableOpacity style={styles?.checkedBox} onPress={toggleSelector}>
          <Image source={imagePath?.check} style={styles.checkImage} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  checkedBox: {
    height: moderateScale(18),
    width: moderateScale(18),
    borderWidth: moderateScale(1),
    borderColor: colors.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(3),
  },
  checkImage: {
    tintColor: colors.SurfCrest,
    height: moderateScale(13),
    width: moderateScale(13),
  },
});

export default CheckBoxSelect;
