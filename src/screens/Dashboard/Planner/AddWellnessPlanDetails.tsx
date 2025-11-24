import { FunctionComponent } from "react";
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
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import { APPLY_STATUS, dashboardClickENUM } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
import { textLabelSize } from "../../../utils/TextConfig";
import navigationString from "../../../navigation/navigationString";

interface AddWellnessPlanDetails {
  onAddWellnessPlanDetails?: () => void;
  isLoading?: any;
  navigation?: any;
}
const AddWellnessPlanDetails: FunctionComponent<AddWellnessPlanDetails> = ({
  onAddWellnessPlanDetails,
  isLoading,
  navigation,
}: any) => {
  return (
    <>
      {isLoading ? (
        <ShimmerPlaceHolder
          width={width - moderateScale(50)}
          height={moderateScale(200)}
          backgroundColor={colors.darkthemeColor}
        />
      ) : (
        <ImageBackground
          source={imagePath.d_purple_6}
          style={styles.backgroundImage}
          resizeMode={APPLY_STATUS?.stretch}
        >
          <View style={styles.textView}>
            <View
              style={{ gap: moderateScale(10), marginTop: moderateScale(15) }}
            >
              <Text style={styles.titleText}>
                {formatSentenceCase("Shape your support system ")}
              </Text>
              <Text style={styles.descriptionText}>
                {formatSentenceCase(
                  "Choose what feels right, skip what doesn’t. Your preferences help me work the way you want it to."
                )}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.upgradeButtonContainer}
              onPress={onAddWellnessPlanDetails}
            >
              <View
                style={{
                  width: moderateScale(25),
                  height: moderateScale(25),
                }}
              />
              <Text style={styles.upgradeText}>{"Set preferences"}</Text>
              <RightArrowWithBackgrpoundIcon
                width={`${moderateScale(25)}`}
                height={`${moderateScale(25)}`}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: moderateScale(200),
    width: "auto",
  },
  textView: {
    margin: moderateScale(10),
    width: width / 1.8,
    height: moderateScale(140),
    justifyContent: "space-between",

    // backgroundColor: "gray",
  },
  titleText: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "600",
    color: colors.royalOrangeDark,
  },
  descriptionText: {
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    color: colors.SurfCrest,
    fontStyle: "italic",
  },
  button: {
    justifyContent: "flex-start",
    width: width / 2.2,
    flexDirection: "row",
    alignItems: "center",
  },
  upgradeButtonContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingRight: moderateScale(5),
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(20),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: moderateScale(0),
  },
  upgradeText: {
    color: colors.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "600",
    marginHorizontal: moderateScale(25),
    textAlign: "center",
  },
  contain: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  position: {
    // position: "absolute",
    alignSelf: "center",
  },
  flatlistStyle: {
    gap: moderateScale(10),
  },
  Affirmations_bg: {
    height: moderateScale(140),

    justifyContent: "center",
  },
  headerView: {
    paddingHorizontal: moderateScale(19),
    marginTop: moderateScale(10),
  },
});

export default AddWellnessPlanDetails;
