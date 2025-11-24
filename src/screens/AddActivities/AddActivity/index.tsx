import React, { useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import StepsInput from "./StepsInput";
import DateTimePickerInput from "./DateTimePickerInput";
import CommonButton from "../../../components/Buttons/commonButton";
import navigationString from "../../../navigation/navigationString";

interface Props {
  navigation?: any;
}

const AddActivity: React.FC<Props> = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <CommonHeader
          headerName="Add Activity"
          textStyle={styles.headerText}
          onBackPress={() => navigation?.goBack()}
          mainContainer={styles.headerMainContainer}
          iconContainer={styles.headerIconContainer}
        />
      </View>
    );
  };
  const onhandlesetBtnState = (data: any) => {
    console.log("cehck data===>", data);
  };
  const memorizedSetSteps = useMemo(() => <StepsInput />, []);
  const memorizedDateTimePickerInput = useMemo(
    () => <DateTimePickerInput setBtnState={onhandlesetBtnState} />,
    []
  );

  const renderBtmBtn = () => (
    <View style={styles.buttonContainer}>
      <CommonButton
        onPress={() => navigation.navigate(navigationString?.NewActivityDone)}
        mainContainer={styles.buttonMainContainer}
        btnName="Add Activities"
      />
    </View>
  );

  return (
    <ScreenWrapper statusBarColor={colors.SurfCrest}>
      <View style={styles.container}>
        {renderHeader()}
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          showsHorizontalScrollIndicator={false}
          data={["1"]}
          renderItem={() => (
            <View>
              {memorizedSetSteps}
              {memorizedDateTimePickerInput}
              {renderBtmBtn()}
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: moderateScale(15),
  },
  headerText: {
    color: colors.prussianBlue,
  },
  headerMainContainer: {
    marginHorizontal: moderateScale(19),
  },
  headerIconContainer: {
    backgroundColor: colors.RegentGray,
  },
  buttonContainer: {
    marginTop: moderateScale(20),
    alignSelf: "center",
  },
  buttonMainContainer: {},
});

export default AddActivity;
