import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import WelcomeScreen from "./WelcomeScreen";
import RenderExploereCards from "./RenderExploereCards";
import StartNow from "./StartNow";
import { event } from "../../navigation/emitter";
import * as AsyncStorageUtils from "../../../src/utils/Storage/AsyncStorage";
import ToastApiResponse from "../../components/Toast/ToastApiResponse";

const IndexScreen = ({ navigation }: any) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [lastActivity, setLastActivity] = useState<any>(null);
  const [toasterDetails, setToasterDetails] = useState<any>({
    showToast: false,
    code: null,
    message: "",
  });
  useEffect(() => {
    getLoginUserTyep();
  }, []);

  const [userType, setUserType] = useState<any>();
  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorageUtils.getItem(
      AsyncStorageUtils?.ISPLANNER_USER
    );
    setUserType(JSON.parse(loginType));
  };

  console.log("----->>UserType-->", userType);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSelectedIndex(1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleNextPress = (index: number) => {
    setSelectedIndex(index);
  };

  const handleActivityData = (data: any) => {
    setLastActivity(data);
  };

  const handleStartNowPress = () => {
    event.emit("login");

    AsyncStorageUtils.storeItemKey(
      AsyncStorageUtils.ISPLANNER_USER,
      JSON.stringify({ isPlanner: false, isSelected: true })
    );
  };

  const renderScreen = () => {
    switch (selectedIndex) {
      case 0:
        return <WelcomeScreen />;
      case 1:
        return (
          <RenderExploereCards
            onNextPress={() => handleNextPress(2)}
            lastActivityData={handleActivityData}
            showToasterDetails={(val: any) => {
              setToasterDetails(val);
            }}
          />
        );
      case 2:
        return (
          <StartNow
            onNextPress={handleStartNowPress}
            navigation={navigation}
            activitData={lastActivity}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenWrapper
      statusBarColor={
        selectedIndex === 0 || selectedIndex === 3
          ? colors.prussianBlue
          : colors.backgroundTheme
      }
    >
      <View style={styles.container}>{renderScreen()}</View>
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

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
