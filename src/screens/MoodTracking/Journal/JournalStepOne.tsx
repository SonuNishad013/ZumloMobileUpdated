import React, { useCallback, useState } from "react";
import colors from "../../../constant/colors";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PlusOrangeIcon } from "../../../assets";
import { moderateScale } from "../../../constant/responsiveStyle";
import Header from "./Header";
import { imagePath } from "../../../assets/png/imagePath";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import navigationString from "../../../navigation/navigationString";
import { StringConstant } from "./StringConstant";
import { textLabelSize } from "../../../utils/TextConfig";
import { useFocusEffect } from "@react-navigation/native";
import { API_FUN_NAMES } from "../../../constant/APIsFunctionNames";
import { aiProvider } from "../../../constant/appConstant";
import allActions from "../../../redux/actions";
import CommonLoader from "../../../components/Loader";
interface Props {
  navigation?: any;
  route?: any;
}

const JournalStepOne: React.FC<Props> = ({ navigation, route }) => {
  const { isFrom } = route?.params;
  const insets = useSafeAreaInsets();

  const { title, description, from } = route?.params?.data;

  const [moodJournalData, setMoodJournalData] = React.useState<any>({});
  const [isLoader, setIsLoader] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!title || from === "NotificationClick") {
        fetchMoodJournalingAPI();
      } else {
        setIsLoader(false);
      }
    }, [])
  );
  const answerClick = () => {
    navigation?.navigate(navigationString?.JournalStepThree, {
      title: title || moodJournalData?.title,
      isFrom: !title || from === "NotificationClick" ? "Home" : isFrom,
    });
  };

  const fetchMoodJournalingAPI = async () => {
    try {
      let requestbody = {
        aiProvider: aiProvider?.MoodJournaling,
      };
      const response = await allActions.dashboardAction.getMoodJournaling(
        requestbody,
        API_FUN_NAMES?.MoodJournalAiQuestion
      );

      if (response?.statusCode === 200) {
        setIsLoader(false);
        setMoodJournalData(response?.data);
      }
    } catch (err) {
      setIsLoader(false);
      console.error("Error fetching dynamic prompting question:", err);
    }
  };
  const customAnswerClick = () => {
    navigation?.navigate(navigationString?.JournalStepTwo, {
      isFrom: !title || from === "NotificationClick" ? "Home" : isFrom,
    });
  };
  return (
    <ImageBackground
      style={[styles?.container, { paddingTop: insets.top }]}
      source={imagePath?.journal_2}
    >
      <Header navigation={navigation} title={StringConstant?.Journal} />

      {isLoader ? (
        <CommonLoader />
      ) : (
        <View style={styles?.mainView}>
          <Text style={styles?.headerText}>
            {"Your space to process and feel"}
          </Text>
          <Text style={styles?.subsubheaderText}>
            {"Write freely or use a prompt to\nguide your thoughts."}
          </Text>
          <Text style={styles?.subheaderText}>{"Your daily prompt"}</Text>
          <Text style={styles?.planNameView}>
            {title || moodJournalData?.title}
          </Text>
          <TouchableOpacity
            style={styles.anserButton}
            onPress={() => answerClick()}
          >
            <Text style={styles?.answerText}>{StringConstant?.Answer}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles?.customBox}
            onPress={() => customAnswerClick()}
          >
            <PlusOrangeIcon
              height={moderateScale(25)}
              width={moderateScale(25)}
            />
            <Text style={styles?.desctext}>
              {StringConstant?.I_want_to_journal}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default JournalStepOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(100),
  },
  planNameView: {
    color: colors?.SurfCrest,
    fontSize: textLabelSize?.titleFont,
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(15),
  },
  headerText: {
    color: colors?.royalOrangeDark,
    fontSize: moderateScale(20),
    fontWeight: "700",
    textAlign: "center",
    // marginBottom: moderateScale(100),
  },
  subsubheaderText: {
    color: colors?.SurfCrest,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: moderateScale(100),
    marginTop: moderateScale(20),
    fontStyle: "italic",
  },
  subheaderText: {
    color: colors?.polishedPine,
    fontSize: textLabelSize?.mainTitle,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: moderateScale(5),
  },
  anserButton: {
    backgroundColor: colors.polishedPine,
    marginTop: moderateScale(25),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(30),
  },
  answerText: {
    color: colors?.SurfCrest,
    fontSize: moderateScale(14),
    fontWeight: "600",
    textAlign: "center",
  },
  desctext: {
    color: colors?.SurfCrest,
    fontSize: textLabelSize?.subtTitleFont,
    fontWeight: "400",
    textAlign: "center",
    marginTop: moderateScale(15),
  },
  customBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors?.SurfCrest,
    alignItems: "center",
    borderRadius: moderateScale(20),
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(20),
    marginTop: moderateScale(25),
  },
});
