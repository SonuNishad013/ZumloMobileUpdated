import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { moderateScale, textScale } from "../constant/responsiveStyle";
import colors from "../constant/colors";
import { imagePath } from "../assets/png/imagePath";
import { strings } from "../constant/strings";
const NoRecordTxtComponent = ({
  title = strings?.No_Records_Found,
  txtColor = colors.SurfCrest,
  imageHeight = moderateScale(200),
}: any) => {
  return (
    <View style={styles.noRecordContainer}>
      <Image
        source={imagePath.NodataIcon}
        style={{ height: imageHeight, width: moderateScale(200) }}
      />
      <Text style={[styles?.titleStyle, { color: txtColor }]}>{title}</Text>
    </View>
  );
};

export default NoRecordTxtComponent;

const styles = StyleSheet.create({
  noRecordContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: textScale(18),
    fontWeight: "600",
    marginTop: moderateScale(10),
  },
});
