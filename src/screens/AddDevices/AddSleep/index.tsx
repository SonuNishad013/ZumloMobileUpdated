import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import SelectMinDuration from "../../../components/Inputs";
import CommonButton from "../../../components/Buttons/commonButton";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import moment from "moment";
import { sleepData } from "../../../constant/dashboardConstant";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";

interface Props {
  navigation?: any;
  SvgIcon?: any;
  route?: any;
}
let maxSleepingHours = 24;
const AddSleep: React.FC<Props> = ({ navigation, SvgIcon, route }) => {
  const { userData } = route.params;
  const dispatch: any = useDispatch();
  const [hrsValue, setHrsValue] = useState<number>(2);
  const [feeling, setFeeling] = useState<string>("Excellent");
  const [isLoading, setIsLoading] = useState(false);
  const [moodOptions, setMoodOptions] = useState<any>(sleepData);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  const createVitalsManually = () => {
    setIsLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        vitalType: 83,
        sleepVitalData: {
          sleepDuration: `${hrsValue.toFixed(0)}`,
          sleepType: feeling,
          sleepIcon: `${feeling}`,
          awakeTime: `${moment(new Date()).toISOString()}`,
          vitalUnit: "hrs",
        },
        timestamp: moment(new Date()).utc().format(),
        healthDataTypeId: 83,
      };

      allActions.addDevice
        .createVitalsManually(dispatch, requestbody, "createVitalsManually")
        .then((response: any) => {
          console.log("hrsValue.toFixed(0)", hrsValue.toFixed(0), response);
          if (response.statusCode == 200) {
            setIsLoading(false);
            // navigation?.goBack();
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });
            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          } else {
            setIsLoading(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setIsLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={styles.container}>
        <CommonHeader
          headerName={strings?.addSleep}
          textStyle={styles.headerText}
          iconContainer={styles.headerIcon}
          mainContainer={styles.headerContainer}
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View
            style={{
              alignItems: "center",
              paddingHorizontal: moderateScale(10),
              gap: moderateScale(10),
              paddingVertical: moderateScale(20),
            }}
          >
            <Text
              style={{
                fontSize: textScale(20),
                fontWeight: "600",
                color: colors.SurfCrest,
                marginBottom: moderateScale(4),
              }}
            >
              {"Log your sleep"}
            </Text>
            <Text
              style={{
                fontSize: textScale(14),
                color: colors.SurfCrest,
                textAlign: "center",
              }}
            >
              {
                "How you rest shapes how you feel. Just a quick check-in to help you stay in tune."
              }
            </Text>
          </View>
          <SelectMinDuration
            selectDuration={"Select how long you slept"}
            value={hrsValue}
            title="Hrs"
            steps={0.5}
            onValueChange={setHrsValue}
            Duration={hrsValue}
            onAssendingStepCount={() =>
              setHrsValue(hrsValue > 0 ? hrsValue - 0.5 : 0)
            }
            onDessendingStepCount={() =>
              setHrsValue(hrsValue < 12 ? hrsValue + 0.5 : 12)
            }
            maximumValue={maxSleepingHours}
          />

          <Text style={styles.moodTitle}>{"How did your sleep feel?"}</Text>

          <View style={styles.moodContainer}>
            {moodOptions.map((item: any) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setFeeling(item?.feeling)}
              >
                <View style={styles.moodItem}>
                  {item?.feeling === feeling ? (
                    <item.iconOrg
                      height={moderateScale(44)}
                      width={moderateScale(44)}
                    />
                  ) : (
                    <item.normalIcon
                      height={moderateScale(44)}
                      width={moderateScale(44)}
                    />
                  )}
                  <Text
                    style={[
                      styles?.moodText,
                      {
                        color:
                          item.feeling === feeling
                            ? colors?.royalOrange
                            : colors?.SurfCrest,
                      },
                    ]}
                  >
                    {item?.feeling}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <CommonButton
            mainContainer={styles.submitButton}
            btnName={"Log my sleep"}
            onPress={createVitalsManually}
          />
        </ScrollView>
        {isLoading && <CommonLoader />}
      </View>
      {toasterDetails?.showToast && (
        <ToastApiResponse
          data={toasterDetails}
          setToasterDetails={setToasterDetails}
          code={toasterDetails?.code}
          message={toasterDetails?.message}
        />
      )}
    </ScreenWrapper>
  );
};

export default AddSleep;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(19),
    flex: 1,
  },
  headerContainer: {
    marginBottom: moderateScale(15),
    marginTop: moderateScale(15),
  },
  headerIcon: {
    backgroundColor: colors?.backIconBg,
  },
  headerText: {
    color: colors?.SurfCrest,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: moderateScale(30),
  },
  moodTitle: {
    fontSize: textScale(14),
    color: colors?.SurfCrest,
    fontWeight: "400",
    marginTop: moderateScale(20),
  },
  moodContainer: {
    height: moderateScale(88),
    backgroundColor: colors?.surfCrustOp3,
    borderRadius: moderateScale(15),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(5),
  },
  moodItem: {
    borderRadius: moderateScale(22),
    justifyContent: "center",
    alignItems: "center",
  },
  moodText: {
    fontSize: textScale(12),
    marginTop: moderateScale(5),
  },
  submitButton: {
    width: "auto",
    marginTop: moderateScale(30),
  },
});
