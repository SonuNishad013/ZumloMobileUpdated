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
import { CrossIcon, RightArrowWithBackgrpoundIcon } from "../../../assets";
import { APPLY_STATUS } from "../../../constant/ENUM";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import { StringConstant } from "./StringConstant";
import { textLabelSize } from "../../../utils/TextConfig";

const JournalModal = ({
  navigation,
  visible,
  setShowModal,
  data,
  isFrom = "Home",
}: any) => {
  const successClick = () => {
    setShowModal(false);
    navigation?.navigate(navigationString?.JournalStepOne, {
      data: data,
      isFrom,
    });
  };

  const remindMeLaterClick = () => {
    setShowModal(false);
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
          source={imagePath?.journal_1}
        >
          <TouchableOpacity
            style={styles?.crossView}
            onPress={() => setShowModal(false)}
          >
            <CrossIcon />
          </TouchableOpacity>
          <View style={styles?.mainView}>
            <View style={styles?.topSpace}>
              <Text style={styles?.descText}>{"Pause. Reflect. Release."}</Text>

              <Text style={styles?.dailyPromptText}>{"Your daily prompt"}</Text>
              <Text style={styles?.planNameView}>{data?.title}</Text>
            </View>
            <View style={styles?.bottomSpace}>
              <TouchableOpacity
                style={styles?.upgradeButton}
                onPress={() => successClick()}
              >
                <View style={styles?.extraSpaceCover} />
                <Text style={styles?.upgradeText}>
                  {StringConstant?.Journal_now}
                </Text>
                <RightArrowWithBackgrpoundIcon
                  height={moderateScale(30)}
                  width={moderateScale(30)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remindMeLaterClick()}>
                <Text style={styles?.featureText}>
                  {StringConstant?.Remind_me_later}
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
    marginTop: moderateScale((Dimensions?.get("screen").height * 2) / 100),
  },
  bottomSpace: {
    marginBottom: moderateScale(40),
  },
  dailyPromptText: {
    color: colors?.royalOrangeDark,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(35),
  },
  planNameView: {
    color: colors?.SurfCrest,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(10),
    fontStyle: "italic",
  },
  descText: {
    color: colors?.royalOrangeDark,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
  },
  featureText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "400",
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
    fontSize: moderateScale(14),
    fontWeight: "500",
    textAlign: "center",
  },
  extraSpaceCover: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  crossView: {
    alignSelf: "flex-end",
    marginTop: moderateScale(40),
    marginRight: moderateScale(-10),
  },
});

export default JournalModal;
