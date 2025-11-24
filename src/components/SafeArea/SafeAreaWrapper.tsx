import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { height, moderateScale } from "../../constant/responsiveStyle";

type LoginProps = {
  children?: React.ReactNode;
  statusBarColor?: string;
  isFlexNeeded?: boolean;
};

const ScreenWrapper: React.FC<LoginProps> = ({
  children,
  statusBarColor,
  isFlexNeeded = false,
}) => {
  const insets = useSafeAreaInsets();
  const STATUSBAR_HEIGHT = Platform.OS === "ios" ? insets?.top : 0;

  const setTopbarSizeForAndroidOnly = () => {
    if (Platform.OS !== "android") return STATUSBAR_HEIGHT;
    return Platform.Version >= 35
      ? STATUSBAR_HEIGHT + moderateScale(30)
      : STATUSBAR_HEIGHT;
  };
  return (
    <View style={isFlexNeeded ? { flex: 1 } : screenWrapperStyles.container}>
      <View
        style={{
          backgroundColor: statusBarColor,
          paddingTop: setTopbarSizeForAndroidOnly(),
        }}
      />
      <View style={{ backgroundColor: statusBarColor, flex: 1 }}>
        <StatusBar backgroundColor={statusBarColor} barStyle={"dark-content"} />
        {children}
      </View>
    </View>
  );
};

export default ScreenWrapper;

export const screenWrapperStyles = StyleSheet.create({
  container: {
    height: height,
  },
});
