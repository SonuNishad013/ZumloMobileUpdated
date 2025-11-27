import React, { useRef, useEffect } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
import {
  JournlingIcon,
  MoodJournalIcon,
  SmileCircleIcon,
} from "../../../assets";

interface Props {
  isOpen: any;
  setOpened: any;
  onPressMood: () => void;
  onMoodJournalingPress: () => void;
  mainButton?: ViewStyle;
}
const AiAnimatedButton: React.FC<Props> = ({
  isOpen,
  setOpened,
  onPressMood,
  onMoodJournalingPress,
  mainButton,
}) => {
  const translateAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];
  const opacityAnims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = [
      Animated.timing(translateAnims[0], {
        toValue: isOpen ? -70 : 0,
        duration: isOpen ? 950 : 650,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnims[1], {
        toValue: isOpen ? -140 : 0,
        duration: isOpen ? 950 : 650,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnims[2], {
        toValue: isOpen ? -210 : 0,
        duration: isOpen ? 950 : 650,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnims[0], {
        toValue: isOpen ? 1 : 0,
        duration: isOpen ? 950 : 650,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnims[1], {
        toValue: isOpen ? 1 : 0,
        duration: isOpen ? 950 : 650,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnims[2], {
        toValue: isOpen ? 1 : 0,
        duration: isOpen ? 950 : 650,
        useNativeDriver: true,
      }),
    ];

    Animated.parallel(animations).start();
  }, [isOpen]);

  return (
    <>
      <View style={[styles.container, mainButton]}>
        <Animated.View style={[styles.mainButton]}>
          <TouchableOpacity onPress={setOpened}>
            <MoodJournalIcon
              height={moderateScale(56)}
              width={moderateScale(57)}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.subButton,
            {
              transform: [{ translateY: translateAnims[0] }],
              opacity: opacityAnims[0],
              zIndex: 1,
            },
          ]}
        >
          <TouchableOpacity onPress={onPressMood}>
            <SmileCircleIcon />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.subButton,
            {
              transform: [{ translateY: translateAnims[1] }],
              opacity: opacityAnims[1],
              zIndex: 1,
            },
          ]}
        >
          <TouchableOpacity onPress={onMoodJournalingPress}>
            <JournlingIcon
              height={moderateScale(47)}
              width={moderateScale(47)}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

export default AiAnimatedButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform?.OS === "android" ? moderateScale(150) : moderateScale(10),
    right: moderateScale(15),
    alignItems: "center",
  },
  mainButton: {
    zIndex: 10,
  },
  subButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "flex-end",
    right: moderateScale(5),
  },
});
