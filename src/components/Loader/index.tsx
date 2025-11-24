import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
  color?: any;
  size?: any;
  isLoading?: any;
}

const CommonLoader = ({ color = "#6056C2", size = 45, isLoading }: Props) => {
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
          source={imagePath.LoaderSurf}
        />
      </View>
    </View>
    // <BlurView
    //   style={{
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    //     backgroundColor: 'transparent'
    //   }}
    //   blurType='light'
    //   blurAmount={2}
    //   reducedTransparencyFallbackColor="white"
    // >
    //   <Modal transparent visible={true}>
    //     <View style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
    //       <View style={{ flex: 1, backgroundColor: '#000000aa', opacity: 0.5, zIndex: -10 }}>
    //       </View>
    //       <View style={styles.loaderContainer}>
    //         <Image source={imagePath.LoaderSurf} style={{ height: moderateScale(150), width: moderateScale(150) }} />
    //       </View>
    //     </View>
    //   </Modal>
    // </BlurView>
  );
};

export default CommonLoader;

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
