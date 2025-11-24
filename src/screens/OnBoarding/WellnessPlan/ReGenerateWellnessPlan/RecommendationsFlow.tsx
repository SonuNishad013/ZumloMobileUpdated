// import { View, Text, Alert } from "react-native";
// import React, { useEffect, useState } from "react";

// import colors from "../../../../constant/colors";
// import Header from "../../../UserGoals/MyActivity/Header";

// import { strings } from "../../../../constant/strings";
// import CommonHeader from "../../../../components/Header/commonHeader";
// import { moderateScale } from "../../../../constant/responsiveStyle";
// import InitialFeedback from "./InitialFeedback";
// import { QUESTIONS_RECOMMENDATIONS, QUESTIONS_STRINGS } from "./DataString";
// import SpecificDislikes from "./SpecificDislikes";
// import DifficultyLevel from "./DifficultyLevel";
// import ActivityPreferences from "./ActivityPreferences";
// import TimeCommitment from "./TimeCommitment";
// import RelevanceToGoals from "./RelevanceToGoals";
// import TherapyMethod from "./TherapyMethod";
// import CustomizationNeeds from "./CustomizationNeeds";
// import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
// import QueWithInput from "./QueWithInput";
// import navigationString from "../../../../navigation/navigationString";

// const Recommendations = ({ navigation,route }: any) => {
//   const [data, setData] = useState({});
//   const [screenIndex, setScreenIndex] = useState(0);
//   const [nextSection, setNextSection] = useState(false);
//   useEffect(() => {
//     console.log("check==>title", route);

//   }, [])
//   const renderScreens = () => {
//     switch (screenIndex) {
//       case 0:
//         return (
//           <QueWithInput
//             title={QUESTIONS_RECOMMENDATIONS[screenIndex].title}
//             onPress={() => {
//               setScreenIndex(screenIndex + 1);
//             }}
//           />
//         ); 
//       case 1:
//         return (
//           <QueWithInput
//             title={QUESTIONS_RECOMMENDATIONS[screenIndex].title}
//             onPress={() => {
//               setScreenIndex(screenIndex + 1);
//             }}
//           />
//         );
//       case 2:
//         return (
//           <QueWithInput
//             title={QUESTIONS_RECOMMENDATIONS[screenIndex].title}
//             onPress={() => {
//               // setScreenIndex(screenIndex + 1);
//               navigation.navigate(navigationString.WellnessPlan)
//             }}
//           />
//         );
//       //   case 3:
//       //   return (
//       //     <ActivityPreferences
//       //       title={QUESTIONS_STRINGS[screenIndex].title}
//       //       onPress={() => {
//       //         setScreenIndex(screenIndex + 1);
//       //       }}
//       //     />
//       //   );
//       // case 4:
//       //   return (
//       //     <TimeCommitment
//       //       title={QUESTIONS_STRINGS[screenIndex].title}
//       //       onPress={() => {
//       //         setScreenIndex(screenIndex + 1);
//       //       }}
//       //     />
//       //   );
//       // case 3:
//       //   return (
//       //     <RelevanceToGoals
//       //       title={QUESTIONS_RECOMMENDATIONS[screenIndex].title}
//       //       onPress={() => {
//       //         setScreenIndex(screenIndex + 1);
//       //       }}
//       //     />
//       //   );
//       // case 4:
//       //   return (
//       //     <TherapyMethod
//       //       title={QUESTIONS_STRINGS[screenIndex].title}
//       //       onPress={() => {
//       //         setScreenIndex(screenIndex + 1);
//       //         //   Alert.alert("Completed")
//       //       }}
//       //     />
//       //   );
//       // case 5:
//       //   return (
//       //     <CustomizationNeeds
//       //       title={QUESTIONS_STRINGS[screenIndex].title}
//       //       onPress={() => {
//       //         setScreenIndex(screenIndex + 1);
//       //       }}
//       //     />
//       //   );
//     }
//   };
//   const handleBack = () => {
//     if (screenIndex == 0) {
//       return navigation?.goBack();
//     } else {
//       setScreenIndex(screenIndex - 1);
//       setNextSection(false);
//     }
//   };
//   console.log("data data --> ", JSON.stringify(data));
//   return (
//     <ScreenWrapper statusBarColor={colors.SaltBox}>
//       {/* <View style={{ flex: 1, backgroundColor: colors?.SaltBox, marginTop: 60 }}> */}
//       <CommonHeader
//         onBackPress={() => handleBack()}
//         headerName={"Give Feedback"}
//         iconContainer={{
//           backgroundColor: "rgba(0, 0, 0, 0.2)",
//         }}
//         textStyle={{
//           color: colors?.SurfCrest,
//         }}
//         mainContainer={{
//           paddingBottom: moderateScale(15),
//           paddingTop: moderateScale(10),
//           paddingHorizontal: moderateScale(17),
//         }}
//       />
//       {renderScreens()}
//       {/* </View> */}
//     </ScreenWrapper>
//   );
// };

// export default Recommendations;
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import { moderateScale } from "../../../../constant/responsiveStyle";
import InitialFeedback from "./InitialFeedback";
import SpecificDislikes from "./SpecificDislikes";
import RelevanceToGoals from "./RelevanceToGoals";
import CustomizationNeeds from "./CustomizationNeeds";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../../navigation/navigationString";
import { useDispatch } from "react-redux";

const Recommendations = ({ navigation, route }: any) => {
  const [allQueData, setAllQueData] = useState(route?.params?.data);
  const [screenIndex, setScreenIndex] = useState(0);
  const dispatch = useDispatch();

  const renderScreens = () => {
    const currentStep = allQueData?.[screenIndex];
    console.log("currentStep", currentStep);

    if (!currentStep) {
      return null;
    }

    switch (currentStep.fieldType) {
      case "Dropdown":
        return (
          <InitialFeedback
            title={currentStep.stepName}
            quesData={currentStep.stepFieldOptions}
            onPress={() => {
              setScreenIndex(screenIndex + 1);
            }}
            isNewScreen={true}
          />
        );

      case "Multi-select Dropdown":
        return (
          <SpecificDislikes
            title={currentStep.stepName}
            quesData={currentStep.stepFieldOptions}
            onPress={() => {
              setScreenIndex(screenIndex + 1);
            }}
          />
        );

      case "Slider (1-10 scale)":
        return (
          <RelevanceToGoals
            title={currentStep.stepName}
            onPress={() => {
              setScreenIndex(screenIndex + 1);
            }}
          />
        );

      case "TextArea":
        return (
          <CustomizationNeeds
            title={currentStep.stepName}
            data={currentStep}
            onPress={() => {
              // navigation.navigate(navigationString.WellnessPlan);
              setScreenIndex(screenIndex + 1);
            }}
          />
        );

      default:
        return (
          <View>
            <Text>Unsupported field type</Text>
          </View>
        );
    }
  };

  const handleBack = () => {
    if (screenIndex === 0) {
      navigation?.goBack();
    } else {
      setScreenIndex(screenIndex - 1);
    }
  };

  return (
    console.log("allQueData======>",allQueData),
    
    <ScreenWrapper statusBarColor={colors.SaltBox}>
      <CommonHeader
        onBackPress={handleBack}
        headerName={"Give Feedback"}
        iconContainer={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        textStyle={{ color: colors?.SurfCrest }}
        mainContainer={{
          paddingBottom: moderateScale(15),
          paddingTop: moderateScale(10),
          paddingHorizontal: moderateScale(17),
        }}
      />
      <ScrollView>
        {renderScreens()}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Recommendations;