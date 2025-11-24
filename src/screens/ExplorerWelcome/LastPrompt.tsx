import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  onPress?: any;
}
const LastPrompt: React.FC<Props> = ({ onPress }) => {
  return (
    <ImageBackground
      source={imagePath?.BlessingReceiveBG}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: moderateScale(25),
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: textScale(24),
            fontWeight: "700",
            color: colors?.SurfCrest,
            textAlign: "center",
            paddingVertical: moderateScale(25),
          }}
        >
          {"Did you know? "}
        </Text>

        <Text
          style={{
            fontSize: textScale(14),
            fontWeight: "400",
            color: colors?.SurfCrest,
            textAlign: "center",
            marginBottom: moderateScale(50),
          }}
        >
          {
            "Just a few deep breaths can calm your nervous system and clear your mind.\nWant to try it with me? "
          }
        </Text>

        <TouchableOpacity
          //   onPress={async () => {
          //     onNextPress();
          //     await onSelectExplorer(
          //       userData,
          //       dispatch,
          //       allActions,
          //       "fromExplorer",
          //       navigation,
          //       { nav: "", emitEvent: true }
          //     );
          //   }}
          onPress={onPress}
          style={[
            styles.detailsContainer,
            { backgroundColor: colors?.polishedPine },
          ]}
        >
          <Text style={styles.detailsText}>{"Start Now"}</Text>
          <Image style={styles.arrow} source={imagePath?.CirArrow} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LastPrompt;

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(30),
    padding: moderateScale(10),
    width: moderateScale(260),
    alignSelf: "center",
    paddingVertical: moderateScale(15),
  },
  detailsText: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "500",
    alignSelf: "center",
  },
  arrow: {
    height: moderateScale(35),
    width: moderateScale(35),
    position: "absolute",
    right: moderateScale(10),
  },
});
