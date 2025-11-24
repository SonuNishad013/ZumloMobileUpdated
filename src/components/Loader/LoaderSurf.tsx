import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";
interface Props {
  color?: any;
  size?: any;
}

const LoaderSurf = ({ color = "#6056C2", size = 45 }: Props) => {
  return (
    // <View style={{flex:1,width:'100%',height:'100%',position:'absolute',zIndex:1}}>
    // <View style={{flex:1,
    // zIndex:-10}}>
    // </View>
    // <View style={styles.loaderContainer}>
    //   <Image style={{height: moderateScale(200), width: moderateScale(200)}} source={imagePath.LoaderSurf} tintColor={'#fff'}/>
    //   {/* {ifconditionaltext? null  : <Text style={{color:"#3688F9",textAlign:'center',fontSize:textScale(13),fontWeight:'bold'}}>Loading please wait...</Text>} */}
    // </View>
    // </View>
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
  );
};

export default LoaderSurf;

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
