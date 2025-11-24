import React from "react";
import { StyleSheet, View } from "react-native";
import StepThree from "./StepThree";
import StepFive from "./StepFive";
import ProfessionalGoals from "./ProfessionalGoals";
import FinancialGoals from "./FinancialGoals";
import MentalHealthGoals from "./MentalHealthGoals";
import EducationalGoals from "./EducationalGoals";
import PhysicalHealthGoals from "./PhysicalHealthGoals";
import EmotionalWellBiengGoals from "./EmotionalWellBiengGoals";
import { codeName } from "../../../constant/AllGlobalNameConstant";
import { strings } from "../../../constant/strings";
const RenderGoalsScreen = ({
  data,
  setScreenIndex,
  screenIndex,
  setData,
  nextSection,
  setNextSection,
  globalData,
  navigation,
  userData,
  onSwiperClick,
  setToasterDetails,
  from,
}: any) => {
  const renderScreen = () => {
    switch (data?.goalType) {
      case codeName?.developing_New_Skill:
        return (
          <StepThree
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            item={globalData?.filter(
              (item: any) =>
                item.categoryName == strings?.LearningResourcesNeeded
            )}
            ProficiencyData={
              globalData?.filter(
                (item: any) => item.categoryName == strings?.ProficiencyLevel
              )?.[0]?.globalCodeOptions
            }
            nextSection={nextSection}
            setNextSection={setNextSection}
            onPress={() => {}}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
          />
        );
      case codeName?.enhancing_Existing_Skill:
        return (
          <StepFive
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            nextSection={nextSection}
            setNextSection={setNextSection}
            item={globalData.filter(
              (item: any) => item.categoryName == strings?.ProficiencyLevel
            )}
            onPress={() => {}}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
          />
        );
      case codeName?.professional_Goals:
        return (
          <ProfessionalGoals
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            data={data}
            item={globalData.filter(
              (item: any) =>
                item.categoryName == strings?.ProfessionalDevelopmentActivities
            )}
            setData={setData}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            onPress={() => {}}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            from={from}
            setNextSection={setNextSection}
          />
        );
      case codeName?.financial_Goals:
        return (
          <FinancialGoals
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            data={globalData.filter(
              (item: any) => item.categoryName == strings?.Timeframe
            )}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
            setNextSection={setNextSection}
          />
        );
      case codeName?.mental_Health_Goals:
        return (
          <MentalHealthGoals
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            data={globalData?.filter(
              (item: any) => item.categoryName == strings?.MentalHealthObjective
            )}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
            setNextSection={setNextSection}
          />
        );
      case codeName?.educational_Goals:
        return (
          <EducationalGoals
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            data={globalData.filter(
              (item: any) => item.categoryName == strings?.FieldOfStudy
            )}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
            setNextSection={setNextSection}
          />
        );
      case codeName?.physical_Health_Goals:
        return (
          <PhysicalHealthGoals
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            data={globalData.filter(
              (item: any) =>
                item.categoryName == strings?.PhysicalHealthObjective
            )}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
            setNextSection={setNextSection}
          />
        );
      case codeName?.emotional_Well_Being_Goals:
        return (
          <EmotionalWellBiengGoals
            setToasterDetails={(value: any) => {
              setToasterDetails(value);
            }}
            data={globalData.filter(
              (item: any) =>
                item.categoryName == strings?.EmotionalWellBeingObjective
            )}
            navigation={navigation}
            goalID={data?.selectedGoal?.globalCodeId}
            short_longID={data?.selectedGoal?.globalCodeId}
            userData={userData}
            onSwiperClick={onSwiperClick}
            screenIndex={screenIndex}
            setScreenIndex={setScreenIndex}
            from={from}
            setNextSection={setNextSection}
          />
        );
    }
  };
  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};
export default RenderGoalsScreen;

const styles = StyleSheet.create({});
