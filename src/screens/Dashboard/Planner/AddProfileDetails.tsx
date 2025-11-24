import { FunctionComponent } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
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
import { strings } from "../../../constant/strings";
import { APPLY_STATUS } from "../../../constant/ENUM";
interface AddProfileDetailsProps {
  onAddProfileDetails?: () => void;
  isLoading?: boolean;
  forIndependentGoals: boolean;
  isSetYourGoals?: boolean;
  buttonStyle?: ViewStyle;
}
const AddProfileDetails: FunctionComponent<AddProfileDetailsProps> = ({
  onAddProfileDetails,
  isLoading,
  forIndependentGoals,
  isSetYourGoals,
  buttonStyle,
}) => {
  return (
    <>
      {isLoading ? (
        <ShimmerPlaceHolder
          width={width - moderateScale(50)}
          height={moderateScale(140)}
          backgroundColor={colors.darkthemeColor}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <ImageBackground
              source={
                forIndependentGoals
                  ? imagePath?.IndependentGoalsImage
                  : isSetYourGoals
                  ? imagePath?.SetYourGoals
                  : imagePath.PersonalisedBackground
              }
              resizeMode={APPLY_STATUS?.contain}
              style={styles.imageBackground}
            />
            <View style={styles.textContainer}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>
                  {forIndependentGoals
                    ? strings?.Lets_check_the_status_progress_of_your_goals_activities
                    : isSetYourGoals
                    ? strings?.Take_a_step_toward_your_better_self
                    : strings?.The_more_I_know_you_the_better_I_can_care_for_you}
                </Text>
                <TouchableOpacity
                  style={[styles.button, buttonStyle]}
                  onPress={onAddProfileDetails}
                >
                  {isSetYourGoals && (
                    <Text style={styles?.button_style_setYourGoals}>
                      {strings?.setGoalsButton}
                    </Text>
                  )}
                  <RightArrowWithBackgrpoundIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: moderateScale(140),
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(25),
  },
  innerContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  imageBackground: {
    width: width / 2.5,
    height: moderateScale(140),
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

export default AddProfileDetails;
