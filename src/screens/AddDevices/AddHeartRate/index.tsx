import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import SelectMinDuration from "../../../components/Inputs";
import SimpleSlider from "../../../components/Sliders";
import { OrgDown, RightCircleIcon } from "../../../assets";
import ActivityDropDown from "../../../components/DropDown/ActivityDropDown";
import CommonButton from "../../../components/Buttons/commonButton";
import HeartRateActivity from "./HeartRateActivity";
import Picker from "react-native-animated-wheel-picker";
import allActions from "../../../redux/actions";
import ToastMsg from "../../../components/Hooks/useToast";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../components/Loader";
import moment from "moment";
import ToastApiResponse from "../../../components/Toast/ToastApiResponse";
// import Toast from "react-native-toast-message";

interface Props {
  navigation?: any;
  SvgIcon?: any;
  route?: any;
}
const AddHeartRate: React.FC<Props> = ({ navigation, SvgIcon, route }) => {
  const { userData } = route.params;
  const [minValue, setMinValue] = useState<number>(0);
  const [steps, setSteps] = useState<any>(0);
  const [distance, setDistance] = useState<any>(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [bpmValue, setBpmValue] = useState(80);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });

  const dispatch = useDispatch();

  // const [pickerData, setPickerData] = useState<any>([
  //   {
  //     value: 1,
  //     title: "18",
  //   },
  //   {
  //     value: 2,
  //     title: "19",
  //   },
  //   {
  //     value: 3,
  //     title: "20",
  //   },
  //   {
  //     value: 1,
  //     title: "18",
  //   },
  //   {
  //     value: 2,
  //     title: "19",
  //   },
  //   {
  //     value: 3,
  //     title: "20",
  //   },
  //   {
  //     value: 1,
  //     title: "18",
  //   },
  //   {
  //     value: 2,
  //     title: "19",
  //   },
  //   {
  //     value: 3,
  //     title: "20",
  //   },
  //   {
  //     value: 1,
  //     title: "18",
  //   },
  //   {
  //     value: 2,
  //     title: "19",
  //   },
  //   {
  //     value: 3,
  //     title: "20",
  //   },
  //   {
  //     value: 1,
  //     title: "18",
  //   },
  //   {
  //     value: 2,
  //     title: "19",
  //   },
  //   {
  //     value: 3,
  //     title: "20",
  //   },
  // ]);

  const bpm = [];
  for (let i = 1; i <= 200; i++) {
    bpm.push({ title: `${i}`, value: i });
  }

  const [activity, setactivity] = useState([
    {
      id: 1,
      isSelected: true,
      name: "Resting",
    },
    {
      id: 2,
      name: "Active",
    },
    {
      id: 3,
      name: "Maximum",
    },
    {
      id: 4,
      name: "Variability",
    },
  ]);
  const onActivitySelection = (
    ARRAY: any,
    setArray: any,
    item: any,
    selectedIndex: any
  ) => {
    //for single selection
    ARRAY.map((val: any) => {
      val.isSelected = false;
      return { ...val };
    });
    let newArr = ARRAY.map((val: any) => {
      if (item.id == val.id) {
        if (item.isSelected == false) {
          item.isSelected = true;
        } else {
          item.isSelected = false;
        }
      }
      return { ...val };
    });
    setArray(newArr);
  };

  const [isLoading, setisLoading] = useState(false);

  const createVitalsManually = () => {
    setisLoading(true);
    try {
      let requestbody = {
        userId: userData?.userId,
        vitalType: 80,
        heartRateVitalData: {
          heartRateCount: bpmValue,
          heartActivity: selectedActivity,
          vitalUnit: "bpm",
        },
        timestamp: moment(new Date()).utc().format(),
        healthDataTypeId: 80,
      };

      allActions.addDevice
        .createVitalsManually(dispatch, requestbody, "createVitalsManually")
        .then((response: any) => {
          if (response.statusCode == 200) {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 1,
              message: response.message,
            });

            setTimeout(() => {
              navigation?.goBack();
            }, 1000);
          } else {
            setisLoading(false);
            setToasterDetails({
              showToast: true,
              code: 0,
              message: response.message,
            });
          }
        })
        .catch((err) => {
          setisLoading(false);
          setToasterDetails({
            showToast: true,
            code: 0,
            message: err.message,
          });
        });
    } catch (error) {
      setisLoading(false);
      setToasterDetails({
        showToast: true,
        code: 0,
        message: error,
      });
    }
  };

  const onSelected = (itm: any) => {
    console.log("====><><>>", itm);
    setBpmValue(itm?.value);
  };

  console.log("first=0089>>>>", bpmValue);

  const [selectedActivity, setSelectedActivity] = useState<any>("Resting");

  const onSelectedActivity = (itm: any) => {
    setSelectedActivity(itm?.name);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <View style={{ marginHorizontal: moderateScale(19), flex: 1 }}>
        <CommonHeader
          headerName={strings?.addHeartRate}
          textStyle={{ color: colors?.SurfCrest }}
          iconContainer={styles?.headerICon}
          mainContainer={styles?.headerMCon}
          onBackPress={() => navigation.goBack()}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: moderateScale(30),
          }}
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
              {"Track your heartbeat"}
            </Text>
            <Text
              style={{
                fontSize: textScale(14),
                color: colors.SurfCrest,
                textAlign: "center",
              }}
            >
              {
                "Whether you’re resting or active, logging your BPM helps you tune into your body’s rhythm."
              }
            </Text>
          </View>
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "400",
              color: colors?.SurfCrest,
              marginTop: moderateScale(20),
            }}
          >
            {"Select your activity state"}
          </Text>
          <FlatList
            data={activity}
            numColumns={3}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => onSelectedActivity(item)}>
                  <View
                    style={{
                      backgroundColor:
                        item?.name == selectedActivity
                          ? colors?.royalOrange
                          : colors?.SurfCrest,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: moderateScale(15),
                      paddingHorizontal: moderateScale(2),
                      height: moderateScale(30),
                      marginRight: moderateScale(10),
                      marginTop: moderateScale(10),
                    }}
                  >
                    {item?.name == selectedActivity && <RightCircleIcon />}
                    <Text
                      style={{
                        paddingHorizontal: moderateScale(10),
                        color: colors.prussianBlue,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "400",
              color: colors?.SurfCrest,
              marginTop: moderateScale(20),
            }}
          >
            {"Add your heart rate"}
          </Text>
          <View style={styles.pickerContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{"BPM"}</Text>
            </View>
            <Picker
              initialIndex={bpmValue + 1}
              pickerData={bpm}
              itemHeight={moderateScale(65)}
              textStyle={styles.pickerText}
              onSelected={(item: any) => {
                onSelected(item);
              }}
              visible={5}
            />
          </View>

          <CommonButton
            mainContainer={{
              width: "auto",
              marginTop: moderateScale(30),
            }}
            btnName={"Save my heart rate"}
            onPress={() => createVitalsManually()}
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

export default AddHeartRate;

const styles = StyleSheet.create({
  headerMCon: { marginBottom: moderateScale(15), marginTop: moderateScale(15) },
  headerICon: { backgroundColor: colors?.backIconBg },
  pickerText: {
    fontSize: textScale(32),
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingTop: moderateScale(30),
  },
  headingText: {
    fontWeight: "700",
    color: colors.SurfCrest,
    fontSize: textScale(24),
    borderColor: colors.royalOrange,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: moderateScale(40),
    marginTop: moderateScale(25),
  },
  pickerContainer: {
    height: moderateScale(330),
    width: moderateScale(100),
    alignSelf: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderColor: colors.royalOrange,
    borderRadius: moderateScale(53),
    height: moderateScale(56),
    justifyContent: "flex-end",
    position: "absolute",
    width: moderateScale(275),
    alignSelf: "center",
    top: moderateScale(135),
  },
  inputLabel: {
    fontSize: textScale(14),
    fontWeight: "500",
    color: colors.SurfCrest,
    width: moderateScale(50),
    position: "absolute",
    right: moderateScale(55),
    bottom: moderateScale(10),
  },
});
