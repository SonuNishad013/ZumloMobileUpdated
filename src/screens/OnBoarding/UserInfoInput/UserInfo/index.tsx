import { View, StyleSheet, FlatList, BackHandler } from "react-native";
import React, { ReactElement, useEffect, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale } from "../../../../constant/responsiveStyle";
import RoundButton from "../../../../components/Buttons/roundButton";
import CommonButton from "../../../../components/Buttons/commonButton";
import navigationString from "../../../../navigation/navigationString";
import NameSection from "./UserInfoComponents/NameSection";
import AgeSection from "./UserInfoComponents/AgeSection";
import SelectAspirationSection from "./UserInfoComponents/SelectAspirationsSection/SelectAspirationsSection";
import WellBeingSection from "./UserInfoComponents/WellBeingSection/WellBeingSection";
import AspirationSection from "./UserInfoComponents/AspirationSection/AspirationSection";
import Global from "../../../../global";
import { BackIconGrey } from "../../../../assets";
import { useDispatch } from "react-redux";
import allActions from "../../../../redux/actions";
import { strings } from "../../../../constant/strings";

interface Props {
  navigation?: any;
}
const UserInfo: React.FC<Props> = ({ navigation }): ReactElement => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);

  const [index, setIndex] = useState<any>(0);
  const [internalError, setInternalError] = useState(false);
  const [internalErrorText, setInternalErrorText] = useState("");
  const [name, setName] = useState("");
  const [AspirationSectionData, setAspirationSectionData] = useState([]);
  const [intersetsList, setIntersetsList] = useState([]);
  const [wellBeingSection, setWellBeingSection] = useState([]);
  const [allVlaue, setAllValue] = useState([
    {
      stepID: 2,
      organizationId: 0,
      stepName: "Good Name",
      stepDescription: "Ok firstly, How can I call you?",
      isRequired: true,
      allowsNewEntries: false,
      dataSource: "DataSource",
      nextStep: 1,
      stepNumber: 0,
      logo: "https://picsum.photos/200/300",
      backgroundColor: null,
      isActive: true,
      createdDate: "2024-05-09T13:18:14.6566667",
      isDeleted: false,
      stepFields: [
        {
          fieldID: 1,
          fieldName: "Enter you good name",
          fieldType: "Input",
          isRequired: true,
          stepFieldOptions: [],
        },
      ],
    },
    {
      stepID: 3,
      organizationId: 0,
      stepName: "Age",
      stepDescription: "Which age group are you in?",
      isRequired: true,
      allowsNewEntries: false,
      dataSource: "DataSource",
      nextStep: 2,
      stepNumber: 1,
      logo: "https://picsum.photos/200/300",
      backgroundColor: null,
      isActive: true,
      createdDate: "2024-05-09T13:21:51.4933333",
      isDeleted: false,
      stepFields: [
        {
          fieldID: 2,
          fieldName: "Age",
          fieldType: "Select",
          isRequired: true,
          stepFieldOptions: [
            {
              optionID: 1,
              title: "18",
            },
            {
              optionID: 2,
              title: "19",
            },
            {
              optionID: 3,
              title: "20",
            },
          ],
        },
      ],
    },
    {
      stepID: 4,
      organizationId: 0,
      stepName: "Aspirations",
      stepDescription: "What aspirations do you aim to achieve through Zumlo?",
      isRequired: true,
      allowsNewEntries: false,
      dataSource: "DataSource",
      nextStep: 3,
      stepNumber: 2,
      logo: "https://picsum.photos/200/300",
      backgroundColor: null,
      isActive: true,
      createdDate: "2024-05-09T13:23:13.88",
      isDeleted: false,
      stepFields: [
        {
          fieldID: 3,
          fieldName: "Aspirations",
          fieldType: "List",
          isRequired: true,
          stepFieldOptions: [],
        },
      ],
    },
    {
      stepID: 5,
      organizationId: 0,
      stepName: "Interests",
      stepDescription: "Areas of interests",
      isRequired: true,
      allowsNewEntries: true,
      dataSource: "DataSource",
      nextStep: 4,
      stepNumber: 3,
      logo: "https://picsum.photos/200/300",
      backgroundColor: null,
      isActive: true,
      createdDate: "2024-05-09T13:24:16.7633333",
      isDeleted: false,
      stepFields: [
        {
          fieldID: 4,
          fieldName: "Areas of Interest",
          fieldType: "Multiselect",
          isRequired: true,
          stepFieldOptions: [],
        },
      ],
    },
    {
      stepID: 6,
      organizationId: 0,
      stepName: "Well-being",
      stepDescription:
        "Elevate your well-being: Set your Goals, Achieve Success",
      isRequired: true,
      allowsNewEntries: true,
      dataSource: "DataSource",
      nextStep: 5,
      stepNumber: 4,
      logo: "https://picsum.photos/200/300",
      backgroundColor: null,
      isActive: true,
      createdDate: "2024-05-09T13:26:33.86",
      isDeleted: false,
      stepFields: [
        {
          fieldID: 5,
          fieldName: "Well-being",
          fieldType: "List",
          isRequired: true,
          stepFieldOptions: [],
        },
      ],
    },
  ]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        // Do nothing to prevent the default back button behavior
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getOnboardingStepsApi();
    getAspirationsApi();
    getAreaOfInterestsApi();
    getWellnessPlanApi();
  }, []);
  const getOnboardingStepsApi = async () => {
    setisLoading(true);

    let requestbody = {};
    allActions.OnBoarding.OnboardingSteps(
      dispatch,
      requestbody,
      "getOnboardingStepsApi"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
        } else {
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const getAspirationsApi = async () => {
    setisLoading(true);

    let requestbody = {};

    allActions.OnBoarding.AspirationsList(
      dispatch,
      requestbody,
      "getAspirationsApi"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
          setAspirationSectionData(response?.data);
        } else {
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const getAreaOfInterestsApi = async () => {
    setisLoading(true);

    let requestbody = {};
    allActions.OnBoarding.AreaOfInterests(
      dispatch,
      requestbody,
      "getAreaOfInterestsApi"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
          setIntersetsList(response?.data);
        } else {
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const getWellnessPlanApi = async () => {
    setisLoading(true);

    let requestbody = {};
    allActions.OnBoarding.GetWellnessPlan(
      dispatch,
      requestbody,
      "getWellnessPlanApi"
    )
      .then((response: any) => {
        if (response.statusCode == 200) {
          setisLoading(false);
          setWellBeingSection(response?.data);
        } else {
          setisLoading(false);
        }
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const renderComponentUI = (idx: any) => {
    switch (idx) {
      case 0:
        return (
          <NameSection
            allData={allVlaue[0]}
            onChangeText={(e: any) => {
              setName(e);
              setInternalError(false);
            }}
            value={name}
            isError={internalError}
            errorMsg={internalErrorText}
          />
        );
      case 1:
        return <AgeSection allData={allVlaue[1]} />;
      case 2:
        return (
          <AspirationSection
            allData={allVlaue[2]}
            AspirationSectionData={AspirationSectionData}
          />
        );
      case 3:
        return (
          <SelectAspirationSection
            allData={allVlaue[3]}
            intersetsList={intersetsList}
          />
        );
      case 4:
        return (
          <WellBeingSection
            allData={allVlaue[4]}
            navigation={navigation}
            wellBeingSection={wellBeingSection}
          />
        );
      // case 5:
      //   return (
      //     <GoalDetailsSection
      //       allData={allVlaue[5]}
      //       // navigation={navigation}
      //       // wellBeingSection={wellBeingSection}
      //     />
      //   );
      // case 6:
      //   return <TrainingSpeedSection allData={allVlaue[6]} />;
      case 5:
        navigation?.navigate(navigationString?.ProfileCompletion);
      default:
        // Global.GlobalIndex
        // return getCurrentIndex(Global.GlobalIndex-1)

        break;
    }
  };

  const validate = () => {
    if (!name) {
      setInternalError(true);
      setInternalErrorText("Enter Your Name");
    } else {
      setIndex(index + 1);
      Global.GlobalIndex = index + 1;
    }
  };
  const backFunction = () => {
    if (index > 0) {
      setIndex(index - 1);
      Global.GlobalIndex = index - 1;
    } else navigation?.goBack();
  };
  const nextFunction = () => {
    if (index === 0) {
      validate();
    }
    if (index) {
      setIndex(index + 1);
      Global.GlobalIndex = index + 1;
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <FlatList
        data={["1"]}
        keyExtractor={(item, index) => "key" + index}
        style={styles?.subContainer}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return <>{renderComponentUI(index)}</>;
        }}
      />
      <View style={styles?.buttonView}>
        <RoundButton
          SvgIcon={BackIconGrey}
          onPress={() => {
            backFunction();
          }}
        />
        <CommonButton
          onPress={() => nextFunction()}
          btnName={index == allVlaue.length - 1 ? "Start now" : "Continue"}
          mainContainer={{ width: moderateScale(221) }}
        />
      </View>
    </ScreenWrapper>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: moderateScale(19),
    marginBottom: moderateScale(20),
    paddingTop: moderateScale(10),
  },
  subContainer: {
    flex: 1,
  },
});
export default UserInfo;
