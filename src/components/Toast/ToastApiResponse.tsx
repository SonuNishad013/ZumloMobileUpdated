import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

interface Props {
  setToasterDetails?: any;
  code?: any;
  message?: string;
  data?: any;
}

const ToastApiResponse: React.FC<Props> = ({
  setToasterDetails,
  code,
  message,
  data,
}) => {
  const top = React.useRef(new Animated.Value(-80)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const progress = React.useRef(new Animated.Value(0)).current;

  function animate() {
    Animated.timing(top, {
      toValue: 20,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(progress, {
        toValue: 100,
        duration: 3000,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        delay: 3000,
        useNativeDriver: false,
      }).start(() => {
        setToasterDetails({ ...data, showToast: false });
      });
    });
  }

  React.useEffect(() => {
    animate();
  }, []);

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const handleClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setToasterDetails({ ...data, showToast: false });
    });
  };

  const getTitle = (key: number) => {
    switch (key) {
      case 0:
        return "Error";
      case 1:
        return "Success";
      default:
        return "Error";
    }
  };
  return (
    <Animated.View style={[styles.container, { top, opacity }]}>
      <View style={styles.messageWrapper}>
        <Text
          style={[
            styles.titleText,
            {
              color: colors.royalOrange,
            },
          ]}
        >
          {getTitle(code)}
        </Text>
        <Text style={styles.messageText}>
          {message ?? "Somthing went wrong"}
        </Text>
      </View>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>✖</Text>
      </TouchableOpacity>
      <Animated.View
        style={[styles.progressBar, { width: progressBarWidth }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    backgroundColor: "#004B63",
    position: "absolute",
    left: 10,
    right: 10,
    top: -80,
    borderRadius: 10,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageWrapper: {
    flex: 1,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: textScale(14),
  },
  messageText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    marginTop: moderateScale(5),
  },
  closeButton: {
    marginLeft: moderateScale(12),
    padding: moderateScale(5),
  },
  closeButtonText: {
    fontSize: textScale(18),
    color: colors?.SurfCrest,
  },
  progressBar: {
    height: moderateScale(5),
    backgroundColor: "#F4A261",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
});

export default ToastApiResponse;
