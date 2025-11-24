import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { PlusIcon } from "../../assets";
import colors from "../../constant/colors";

interface Props {}
const HealthInsigthsEmpty: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <PlusIcon
        width={`${moderateScale(28)}`}
        height={`${moderateScale(28)}`}
      />
      <Text style={styles.text}>{"Add Device"}</Text>
    </View>
  );
};

export default HealthInsigthsEmpty;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(126),
    marginHorizontal: moderateScale(15),
    borderWidth: moderateScale(1),
    borderStyle: "dashed",
    borderRadius: moderateScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: textScale(10),
    fontWeight: "600",
    marginTop: moderateScale(5),
    color: colors?.SaltBox,
  },
});
