import React, { FunctionComponent, useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonHeader from "../../../../components/Header/commonHeader";
import {
  height,
  moderateScale,
  textScale,
} from "../../../../constant/responsiveStyle";
import { strings } from "../../../../constant/strings";
import { NoDataIcon } from "../../../../assets";
import { APPLY_STATUS } from "../../../../constant/ENUM";
import allActions from "../../../../redux/actions";
import { aiProvider, STATUS_CODES } from "../../../../constant/appConstant";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import { API_FUN_NAMES } from "../../../../constant/APIsFunctionNames";
import { fontFamilies } from "../../../../utils/fontFamilies";
interface AffirmationsProps {
  route: any;
  navigation?: any;
}
const Affirmations: FunctionComponent<AffirmationsProps> = ({
  route,
  navigation,
}) => {
  const { data } = route.params || [];
  const [result, setResult] = useState<any>({});
  const [isLoader, setisLoader] = useState(false);

  useEffect(() => {
    getAffirmationData();
  }, []);
  const getAffirmationData = () => {
    setisLoader(true);
    let queryParams = `?${strings?.aiProvider}=${aiProvider?.DailyAffirmation}`;
    allActions.dashboardAction
      .GetDailyAffirmations(queryParams, API_FUN_NAMES?.GetDailyAffirmations)
      .then((response: any) => {
        setisLoader(false);
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setResult(response?.data[0]);
        }
      })
      .catch((err) => {
        setisLoader(false);
      });
  };

  const renderAffirmationItem = ({ item }: any) => {
    return (
      <View style={styles.AffirmationsMainContainer}>
        <Text style={styles.AffirmationMainItalicText}>
          {"What You Think,\nYou Become"}
        </Text>

        <View
          style={{
            height: moderateScale(0.7),
            backgroundColor: colors.SurfCrest,
            width: "30%",
          }}
        />
        <Text style={styles.AffirmationMainDescriptionText}>
          {
            "Affirmations are powerful statements that reshape your mindset, build confidence, and inspire positive change"
          }
        </Text>
        <ImageBackground
          source={imagePath.AffermationCard}
          style={styles.AffiremationMainBGImage}
          resizeMode={APPLY_STATUS?.contain}
        >
          <View style={styles.todayAffirmationContainer}>
            <View style={styles.todayTextContainer}>
              <Text style={styles.todayText}>{strings.TodayAffirmations}</Text>
            </View>
            <Text style={styles.todayAfiirmationText}>
              {result?.affirmation}
            </Text>
          </View>
        </ImageBackground>
        <TouchableOpacity
          style={styles.closedButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.todayText}>{"Affirmed"}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ImageBackground
      source={imagePath.MindfulnessDetails}
      style={styles.bgContainer}
    >
      <ScreenWrapper
        statusBarColor={colors?.transparent}
        isFlexNeeded={true}
        barStyle="dark-content"
      >
        <CommonHeader
          iconContainer={{
            backgroundColor: colors.prussianBlue,
          }}
          onBackPress={() => navigation?.goBack()}
        />

        {!isLoader ? (
          <View style={styles.mainContainer}>
            <FlatList
              data={data}
              renderItem={renderAffirmationItem}
              keyExtractor={(item, index) => "key" + index}
              ListEmptyComponent={() => (
                <View style={styles.AffirmationsMainContainer}>
                  <NoDataIcon
                    width={`${moderateScale(200)}`}
                    height={`${moderateScale(200)}`}
                  />
                  <Text style={styles.nodataText}>
                    {strings.NoAffirmationsAvailable}
                  </Text>
                </View>
              )}
            />
          </View>
        ) : (
          <CommonLoader />
        )}
      </ScreenWrapper>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  mainContainer: {
    flex: 1,
  },
  AffirmationsMainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  AffirmationMainItalicText: {
    color: colors.royalOrange,
    fontStyle: "italic",
    fontSize: textScale(22),
    fontWeight: "600",
    textAlign: "center",
    padding: moderateScale(20),
  },
  AffirmationMainDescriptionText: {
    color: colors.SurfCrest,
    fontSize: textScale(16),
    textAlign: "center",
    padding: moderateScale(20),
  },
  AffiremationMainBGImage: {
    width: "100%",
    height: height / 2.0,
    alignItems: "center",
    marginTop: moderateScale(40),
  },
  todayAffirmationContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: moderateScale(height / 3.5),
  },
  todayTextContainer: {
    backgroundColor: colors.darkbackgroundTheme,
    padding: moderateScale(10),
    borderRadius: moderateScale(30),
    marginTop: moderateScale(50),
  },
  todayText: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
    textAlign: "center",
  },
  todayAfiirmationText: {
    color: colors.prussianBlue,
    fontSize: textScale(24),
    fontWeight: "700",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  nodataText: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(16),
  },
  closedButton: {
    backgroundColor: colors.darkbackgroundTheme,
    padding: moderateScale(10),
    borderRadius: moderateScale(30),
    marginBottom: moderateScale(30),
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
});
export default Affirmations;
