import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import CommonHeader from "../../../components/Header/commonHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { moderateScale } from "../../../constant/responsiveStyle";
import VitalsCategory from "./VitalsCategory";
import navigationString from "../../../navigation/navigationString";
import { formatSentenceCase } from "../../../helper/sentenceCase";
import { Blood_Pressure, Heart_Rate, Sleep, StepsAdd } from "../../../assets";

interface Props {
  navigation?: any;
  route?: any;
}
const AddManualReading: React.FC<Props> = ({ navigation, route }) => {
  const { userData, from }: any = route.params;

  const data = [
    {
      id: 1,
      title: "Blood Pressure",
      image: Blood_Pressure,
    },
    {
      id: 2,
      title: "Steps",
      image: StepsAdd,
    },
    {
      id: 3,
      title: "Sleep",
      image: Sleep,
    },
    {
      id: 4,
      title: "Heart Rate",
      image: Heart_Rate,
    },
  ];

  const renderNavigation = (idx: any) => {
    if (idx == 0) {
      navigation.navigate(navigationString.AddBloodPressureVitals, {
        userData,
      });
    } else if (idx == 1) {
      navigation.navigate(navigationString.AddSteps, { userData });
    } else if (idx == 2) {
      navigation.navigate(navigationString.AddSleep, { userData });
    } else if (idx == 3) {
      navigation.navigate(navigationString.AddHeartRate, { userData });
    }
  };
  const handleBackPress = () => {
    if (from === "SummaryTab") {
      navigation?.pop(1);
    } else {
      navigation.goBack();
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={styles?.mainContainer}>
        <CommonHeader
          headerName={strings?.addManualReading}
          textStyle={{ color: colors?.prussianBlue }}
          iconContainer={styles?.headerICon}
          mainContainer={styles?.headerMCon}
          onBackPress={handleBackPress}
        />
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => {
            return (
              <VitalsCategory
                onPress={() => renderNavigation(index)}
                isSvg={true}
                mainContainer={{
                  marginLeft:
                    index % 2 == moderateScale(0) ? 0 : moderateScale(15),
                }}
                title={formatSentenceCase(item?.title)}
                SvgIcon={item?.image}
              />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddManualReading;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(15),
  },
  headerMCon: { marginBottom: moderateScale(15) },
  headerICon: { backgroundColor: colors?.SaltBox },
});
