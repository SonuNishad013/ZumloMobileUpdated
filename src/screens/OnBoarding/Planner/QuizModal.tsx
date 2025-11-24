import { FunctionComponent } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { QuizInternalImage } from "../../../assets";
import { formatSentenceCase } from "../../../helper/sentenceCase";

interface QuizProps {
  onPressYes?: () => void;
  onPressSkip?: () => void;
}
const QuizModal: FunctionComponent<QuizProps> = ({
  onPressYes,
  onPressSkip,
}) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={imagePath.QuizModal}
        resizeMode="contain"
        style={styles.backgroundImage}
      >
        <View style={styles.questionContainer}>
          <Text style={styles.quizQuestion}>{"Quiz"}</Text>
        </View>
        <QuizInternalImage
          width={`${moderateScale(220)}`}
          height={`${moderateScale(220)}`}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={onPressSkip}>
            <Text style={styles.textStyle}>
              {formatSentenceCase(strings?.skip)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onPressYes}
          >
            <Text style={styles.textStyle}>
              {formatSentenceCase("Get options")}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default QuizModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: moderateScale(15),
  },
  backgroundImage: {
    minHeight: height / 1.9,
    width: width - moderateScale(60),
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionContainer: {
    margin: moderateScale(30),
  },
  quizQuestion: {
    textAlign: "center",
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
  buttonView: {
    flexDirection: "row",
    gap: moderateScale(20),
    marginBottom: moderateScale(50),
  },
  button: {
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
    height: moderateScale(43),
    width: moderateScale(110),
    backgroundColor: colors.polishedPine,
  },
  buttonClose: {
    backgroundColor: colors.backgroundTheme,
  },
  textStyle: {
    color: colors.SurfCrest,
    fontWeight: "500",
    fontSize: textScale(14),
  },
});
