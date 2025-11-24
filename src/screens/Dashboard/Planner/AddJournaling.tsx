import { FunctionComponent, useState } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import { RightArrowWithBackgrpoundIcon } from "../../../assets";
import { APPLY_STATUS } from "../../../constant/ENUM";
import JournalModal from "../../MoodTracking/Journal/JournalModal";
import { textLabelSize } from "../../../utils/TextConfig";
interface AddProfileDetailsProps {
  navigation: any;
  data: any;
}
const AddJournaling: FunctionComponent<AddProfileDetailsProps> = ({
  navigation,
  data,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <ImageBackground
      source={imagePath?.journal_4}
      resizeMode={APPLY_STATUS?.cover}
      style={styles.imageBackground}
    >
      <Text style={styles.titleText}>{"Your today's prompt"}</Text>
      <Text style={styles?.descText}>{data?.title}</Text>
      <TouchableOpacity
        style={styles?.footerButton}
        onPress={() => setShowModal(true)}
      >
        <View style={{ width: moderateScale(30), height: moderateScale(30) }} />
        <Text style={styles.buttonText}>{"Start journaling"}</Text>
        <RightArrowWithBackgrpoundIcon
          height={moderateScale(30)}
          width={moderateScale(30)}
        />
      </TouchableOpacity>

      <JournalModal
        navigation={navigation}
        visible={showModal}
        setShowModal={setShowModal}
        data={data}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: moderateScale(140),
    borderRadius: moderateScale(25),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(5),
    paddingVertical: moderateScale(5),
  },
  titleText: {
    color: colors.royalOrangeDark,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
    textAlign: "center",
  },
  descText: {
    color: colors.SurfCrest,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "600",
    fontStyle: "italic",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(15),
    textAlign: "center",
  },
  buttonText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: moderateScale(25),
  },

  innerContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },

  textContainer: {
    width: width / 2.2,
    height: moderateScale(140),
    justifyContent: "center",
  },
  textWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    height: moderateScale(90),
  },
  text: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  button: {
    justifyContent: "flex-end",
    width: width / 2.2,
    flexDirection: "row",
    alignItems: "center",
  },
  button_style_setYourGoals: {
    color: colors?.SurfCrest,
    fontWeight: "700",
    fontSize: textScale(12),
    minWidth: moderateScale(120),
    textAlign: "center",
  },
});

export default AddJournaling;
