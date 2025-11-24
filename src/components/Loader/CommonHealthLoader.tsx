import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";
import { BlurView } from "@react-native-community/blur";
import colors from "../../constant/colors";

interface CommonHealthLoaderProps {}

const CommonHealthLoader: FunctionComponent<CommonHealthLoaderProps> = () => {
  const messages = [
    "Just a few seconds while I reflect on what might help you best. Hang tight, I am almost there!",
    "Thank you for your patience. I’m making sure your insights feel right—for you.",
    "Hold tight—I’ll be back with something that fits you just right. ",
    "Reading through your story so I can show up with care.",
    "Understanding your responses, your results will be available shortly",
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const firstString =
    "Taking a moment to understand you better… I'll have some insights ready for you shortly.";
  const [isFristString, setIsFristString] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Change message
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        );
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
      setIsFristString(false);
    }, 20000); // Change message every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    console.log("messages[currentMessageIndex]", isFristString),
    (
      <BlurView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        blurType="light"
        blurAmount={1}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <View style={{ zIndex: -10 }} />
          <View style={styles.loaderContainer}>
            <Image
              style={{ height: moderateScale(150), width: moderateScale(150) }}
              source={imagePath.LoaderSalt}
            />
            {isFristString && (
              <Animated.Text style={styles.messageText}>
                {firstString}
              </Animated.Text>
            )}
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.messageText}>
                {messages[currentMessageIndex]}
              </Text>
            </Animated.View>
          </View>
        </View>
      </BlurView>
    )
  );
};

export default CommonHealthLoader;

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
  messageText: {
    textAlign: "center",
    marginTop: moderateScale(20),
    fontSize: moderateScale(18),
    paddingHorizontal: moderateScale(20),
    color: colors.darkPrussianBlue,
    fontWeight: "600",
  },
});
