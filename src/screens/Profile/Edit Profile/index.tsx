import React, { ReactElement, useState, useEffect } from "react";
import { Text, View, FlatList, Platform } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import { styles } from "./styles";
import BasicInfo from "./basicInfo";
import ContactInfo from "./contactInfo";
import MedicalHistory from "./medicalHistory";
import { strings } from "../../../constant/strings";
import { APPLY_STATUS, PLATEFORM } from "../../../constant/ENUM";
interface Props {
  navigation?: any;
  ProfileData?: any;
  route?: any;
}
const Profile: React.FC<Props> = ({
  navigation,
  ProfileData,
  route,
}): ReactElement => {
  const { from } = route?.params;

  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [isContactCompleted, setisContactCompleted] = useState<boolean>(false);
  const [isMedicalHistoryCompleted, setisMedicalHistoryCompleted] =
    useState<boolean>(false);

  const getBorderBottomColor = (index: number): string => {
    if (isAllCompleted && isContactCompleted && isMedicalHistoryCompleted) {
      return colors.royalOrange;
    } else if (isAllCompleted && isContactCompleted) {
      return index === 0 || index === 1
        ? colors.royalOrange
        : colors.lightOceanGreen;
    } else if (isAllCompleted) {
      return index === 0 ? colors.royalOrange : colors.lightOceanGreen;
    } else {
      return colors.lightOceanGreen;
    }
  };

  const TabBarView = () => {
    return (
      <View style={styles.tabBarView}>
        <View style={styles.tabBarContainer}>
          {[
            strings?.Basic_Info,
            strings?.Contact_Info,
            strings?.Medical_History,
          ].map((tabName, index) => (
            <View
              key={index}
              style={[
                styles.tabBarItem,
                { borderBottomColor: getBorderBottomColor(index) },
              ]}
            >
              <Text
                style={[
                  styles.tabBarItemText,
                  {
                    color:
                      (index === 0 && !isAllCompleted) ||
                      (index === 1 && isAllCompleted && !isContactCompleted)
                        ? colors.prussianBlue
                        : colors.SilverChalice,
                  },
                ]}
              >
                {tabName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const setisAllCompletedHandler = () => {
    setIsAllCompleted(true);
  };

  const setisContactCompletedHandler = () => {
    setisContactCompleted(true);
  };
  const setsetisMedicalHistoryCompletedHandler = () => {
    setisMedicalHistoryCompleted(true);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CommonHeader
            headerName={
              from == strings?.invited_SignUP
                ? strings?.Basic_Info
                : strings?.myProfile
            }
            mainContainer={styles.headerMainContainer}
            onBackPress={() => navigation.goBack()}
          />
        </View>
        {TabBarView()}
        <FlatList
          bounces={true}
          data={["1"]}
          keyExtractor={(item, index) => "key" + index}
          showsVerticalScrollIndicator={false}
          decelerationRate={APPLY_STATUS?.fast}
          snapToAlignment={APPLY_STATUS?.start}
          renderItem={() => (
            <>
              <View>
                {!isAllCompleted ? (
                  <BasicInfo setisAllCompleted={setisAllCompletedHandler} />
                ) : !isContactCompleted ? (
                  <ContactInfo
                    setisContactCompleted={setisContactCompletedHandler}
                    navigation={navigation}
                  />
                ) : (
                  <MedicalHistory
                    setisMedicalHistoryCompleted={
                      setsetisMedicalHistoryCompletedHandler
                    }
                  />
                )}
              </View>
            </>
          )}
          contentContainerStyle={{
            paddingBottom: moderateScale(100),
            marginTop:
              Platform.OS === PLATEFORM?.ios
                ? moderateScale(-20)
                : moderateScale(2),
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
export default Profile;
