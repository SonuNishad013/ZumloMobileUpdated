import { ImageBackground, Text, View } from "react-native";
import {
  height,
  moderateScale,
  textScale,
} from "../../../../constant/responsiveStyle";

const toolTip = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        height: height / 9,
        padding: 10,
        zIndex: 1,
        position: focusCurrPass ? "relative" : "absolute",
        bottom: focusCurrPass ? null : "90%",
      }}
    >
      <ImageBackground
        style={{
          height: height / 8,
          width: moderateScale(350),
          justifyContent: "center",
          alignItems: "center",
        }}
        resizeMode="stretch"
        source={icon.passwordPopupIcon}
      >
        <View
          style={{
            width: "88%",
            height: "55%",
            marginVertical: moderateScale(5),
            justifyContent: "space-between",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: textScale(12) }}>
            Your password must have atleast 8 characters and meet the following
            criteria:
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
            }}
          >
            <Text
              style={{
                fontSize: textScale(12),
                color: newPassError ? "grey" : "green",
              }}
            >
              1 Capital Letter
            </Text>
            <Text style={{ fontSize: textScale(12) }}>|</Text>
            <Text
              style={{
                fontSize: 12,
                //  color: currPassLowercaseError ? "grey" : "green",
                color: newLowercasePassError ? "grey" : "green",
              }}
            >
              1 Small Letter
            </Text>
            <Text style={{ fontSize: textScale(12) }}>|</Text>
            <Text
              style={{
                fontSize: 12,
                // color: currPassNumberError ? "grey" : "green",
                color: newNumberError ? "grey" : "green",
              }}
            >
              1 Number
            </Text>
            <Text style={{ fontSize: textScale(12) }}>|</Text>
            <Text
              style={{
                fontSize: textScale(12),
                // color: currPassSymbolError ? "grey" : "green",
                color: newSymbolError ? "grey" : "green",
              }}
            >
              1 Symbol
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
