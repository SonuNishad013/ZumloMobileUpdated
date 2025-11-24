import {
  Animated,
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BlurCircledIcon, DynamicPromptsFaceIcon } from "../../../assets";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import LinearGradient from "react-native-linear-gradient";
import { imagePath } from "../../../assets/png/imagePath";
import { formatSentenceCase } from "../../../helper/sentenceCase";

// Get screen height
const { height: screenHeight } = Dimensions.get("window");

const Index = () => {
  // Animation values
  const redScaleAnim = useRef(new Animated.Value(1)).current;
  const redTranslateYAnim = useRef(new Animated.Value(0)).current;
  const key1OpacityAnim = useRef(new Animated.Value(0)).current; // Opacity for key={1} view
  const key2OpacityAnim = useRef(new Animated.Value(0)).current; // Opacity for key={1} view

  const firstSlidesColor = ["#3C839D", "#043A4E"];
  const secondSlidesColor = [colors?.backgroundTheme, colors?.backgroundTheme];
  const [showFirstSlide, setShowFirstSlide] = useState(true);

  useEffect(() => {
    // Animate the first slide and then the key={1} view sequentially
    Animated.parallel([
      // First slide animations
      Animated.timing(redScaleAnim, {
        toValue: 0.7, // Target scale for red view
        duration: 1500, // Duration in ms
        useNativeDriver: true, // Use native driver for performance
      }),
      Animated.timing(redTranslateYAnim, {
        toValue: -screenHeight * 0.25, // Move upwards by 25% of screen height
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Execute callback after first animation
      setShowFirstSlide(false);

      // Start the opacity animation after updating the state
      Animated.timing(key1OpacityAnim, {
        toValue: 1, // Final opacity
        duration: 1000, // Duration in ms
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(key2OpacityAnim, {
          toValue: 1, // Final opacity
          duration: 1000, // Duration in ms
          useNativeDriver: true,
        }).start();
      });
    });
  }, []);

  return (
    <LinearGradient
      colors={showFirstSlide ? firstSlidesColor : secondSlidesColor}
      style={styles.gradientContainer}
    >
      <Animated.View
        style={[
          styles.redBox,
          {
            transform: [
              { scale: redScaleAnim },
              { translateY: redTranslateYAnim },
            ],
          },
        ]}
      >
        <BlurCircledIcon />
        <BlurCircledIcon width={150} height={150} />
        <DynamicPromptsFaceIcon />
        <Text style={styles.firstSlideText}>{`Hi...It's me Zumlo`}</Text>
      </Animated.View>
      <Animated.View
        key={1}
        style={{
          width: width,
          height: height,
          justifyContent: "flex-end",
          position: "absolute",
          opacity: key1OpacityAnim, // Bind opacity to animation
        }}
      >
        <View
          style={{
            width: width,
            height: height * 0.5,
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              top: -moderateScale(30),
            }}
          >
            <BlurCircledIcon width={150} height={150} />
          </View>
          <ImageBackground
            source={imagePath?.D_P_FlowerText}
            resizeMode={"contain"}
            style={{
              width: width * 0.8,
              height: height * 0.4,
              justifyContent: "center",
              paddingHorizontal: moderateScale(19),
            }}
          >
            <Text
              style={{
                fontSize: textScale(24),
                fontWeight: "700",
                color: colors?.prussianBlue,
                width: "70%",
              }}
            >
              {formatSentenceCase("Let's Get to Know You! ")}
            </Text>
            <Text
              style={{
                fontSize: textScale(13),
                fontWeight: "400",
                color: colors?.prussianBlue,
              }}
            >
              {formatSentenceCase(
                "We’d love to remind you that it’s important for zumlo to know that how frequently you are going to school."
              )}
            </Text>
          </ImageBackground>
          <TouchableOpacity
            style={{
              width: "78%",
              backgroundColor: colors?.polishedPine,
              marginTop: moderateScale(15),
              alignItems: "center",
              borderRadius: moderateScale(30),
            }}
          >
            <Animated.View style={{ opacity: key1OpacityAnim }}>
              <Text
                style={{
                  fontSize: textScale(14),
                  fontWeight: "500",
                  color: colors?.SurfCrest,
                  paddingVertical: moderateScale(15),
                }}
              >
                Next
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  redBox: {
    width: width,
    height: screenHeight * 0.9,
    alignItems: "center",
    justifyContent: "center",
  },
  firstSlideText: {
    color: colors?.SurfCrest,
    fontSize: textScale(24),
    fontWeight: "bold",
    marginTop: moderateScale(30),
  },
});
