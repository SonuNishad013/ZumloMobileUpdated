import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";
interface Props {
  color?: any;
  size?: any;
}

const LoaderSalt = ({ color = "#6056C2", size = 45 }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          zIndex: -10,
        }}
      ></View>
      <View style={styles.loaderContainer}>
        <Image
          style={{ height: moderateScale(150), width: moderateScale(150) }}
          source={imagePath.LoaderSalt}
        />
      </View>
    </View>
  );
};

export default LoaderSalt;

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
