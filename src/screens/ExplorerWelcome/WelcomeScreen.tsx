import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { imagePath } from "../../assets/png/imagePath";
import { Infinite } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { textLabelSize } from "../../utils/TextConfig";

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={imagePath?.ThreadedFaceBG}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: moderateScale(40),
        paddingHorizontal: moderateScale(29),
      }}
    >
      {/* <Infinite /> */}
      <View style={{ gap: moderateScale(10) }}>
        <Text
          style={{
            color: colors?.royalOrangeDark,
            fontSize: textLabelSize?.screenHeader,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: moderateScale(20),
          }}
        >
          {"Welcome to Zumlo\n"}
          <Text
            style={{
              color: colors?.SurfCrest,
              fontSize: textLabelSize?.mainTitle,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: moderateScale(20),
              // fontStyle: "italic",
            }}
          >
            {"Your space, your pace"}
          </Text>
        </Text>

        <Text
          style={{
            color: colors?.SurfCrest,
            fontSize: textScale(14),
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          {
            "No pressure. No routines. Just you, exploring what feels right. Let’s take a quick spin through what I can do. "
          }
        </Text>
      </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
