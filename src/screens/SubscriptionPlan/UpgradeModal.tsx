import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale, width } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import {
  APPLY_STATUS,
  SUBSCRIPTION_NAVIGATION_FROM,
} from "../../constant/ENUM";
import { CrossIcon, RightArrowWithBackgrpoundIcon } from "../../assets";
import { strings } from "../../constant/strings";
import navigationString from "../../navigation/navigationString";

const UpgradeModal = ({
  navigation,
  visible,
  setShowModal,
  fromScreen,
  isPlanner,
  title,
  description,
}: any) => {
  const upgradeClick = () => {
    setShowModal(false);
    navigation?.navigate(navigationString?.SubscriptionPlan, {
      fromScreen: fromScreen,
      isPlanner: isPlanner,
    });
  };

  const featureClick = () => {
    setShowModal(false);
    navigation?.navigate(navigationString?.SubscriptionPlan, {
      fromScreen: fromScreen,
      isPlanner: isPlanner,
    });
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles.overlay}>
        <ImageBackground
          style={styles?.bgImage}
          resizeMode={APPLY_STATUS?.contain}
          source={imagePath?.modal}
        >
          <TouchableOpacity
            style={styles?.crossView}
            onPress={() => setShowModal(false)}
          >
            <CrossIcon />
          </TouchableOpacity>

          <View style={styles?.mainView}>
            <View style={styles?.topSpace}>
              <Text style={styles?.planNameView}>{title}</Text>
              <Text style={styles?.descText}>{description}</Text>
            </View>

            <View style={styles?.bottomSpace}>
              <TouchableOpacity
                style={styles?.upgradeButton}
                onPress={() => upgradeClick()}
              >
                <View style={styles?.extraSpaceCover} />
                <Text style={styles?.upgradeText}>{strings?.Upgrade}</Text>
                <RightArrowWithBackgrpoundIcon
                  height={moderateScale(30)}
                  width={moderateScale(30)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => featureClick()}>
                <Text style={styles?.featureText}>
                  {strings?.See_all_premium_features}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    height: (Dimensions?.get("screen").height * 58) / 100,
    width: (Dimensions?.get("screen").width * 80) / 100,
    paddingHorizontal: moderateScale(30),
  },
  mainView: {
    justifyContent: "space-between",
    flex: 1,
  },
  topSpace: {
    marginTop: moderateScale((Dimensions?.get("screen").height * 13) / 100),
  },
  bottomSpace: {
    marginBottom: moderateScale(20),
  },
  planNameView: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(24),
    fontWeight: "700",
    textAlign: "center",
  },
  descText: {
    color: colors?.royalOrangeDark,
    fontSize: moderateScale(15),
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  featureText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(15),
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  upgradeButton: {
    backgroundColor: colors?.polishedPine,
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(15),
  },
  upgradeText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(15),
    fontWeight: "500",
    textAlign: "center",
  },
  extraSpaceCover: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  crossView: {
    alignSelf: "flex-end",
    top: moderateScale(60),
    right: moderateScale(20),
    position: "absolute",
  },
});

export default UpgradeModal;
