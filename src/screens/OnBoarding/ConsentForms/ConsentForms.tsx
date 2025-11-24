import { BackHandler, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonCard from "./CommonCard";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
}

const ConsentForms: React.FC<Props> = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View>
        <CommonHeader
          headerName={"Consent Forms"}
          textStyle={styles.headerText}
          iconContainer={styles.headerIconContainer}
        />
      </View>
    );
  };

  const data = [
    {
      title: "General Consent Form",
      contents:
        "This form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.This form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.",
    },
    {
      title: "General Consent Form",
      contents:
        "This form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.",
    },
    {
      title: "General Consent Form",
      contents:
        "This form grants permission for routine medical procedures, examinations, his form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.his form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.his form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.and treatments that may be necesical care. It typically covers routine.his form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.his form grants permission for routine medical procedures, examinations, and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers routine.and treatments that may be necessary during a patient's hospital stay or medical care. It typically covers rosary during a patient's hospital stay or medical care. It typically covers routine.",
    },
  ];

  const [selected, setSelected] = useState<any>([]);
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      backAction
    );
    return () => backHandler.remove();
  }, []);
  const renderItems = ({ item, index }: any) => {
    const isSelected = selected.includes(index);
    const renderIndex = (indexValue: any, item: any) => {
      if (isSelected) {
        setSelected(selected.filter((itm: any) => itm !== indexValue));
      } else {
        setSelected([...selected, indexValue]);
      }
    };
    return (
      <View style={styles.itemContainer}>
        <CommonCard
          onItemChecked={() => renderIndex(index, item)}
          title={item?.title}
          content={item?.contents}
          addIcon={isSelected}
        />
      </View>
    );
  };
  const renderList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          scrollEnabled
          keyExtractor={(item, index) => "key" + index}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    );
  };

  const renderBtn = () => {
    return (
      <View style={styles.buttonContainer}>
        <CommonButton btnName={"Confirm Consents"} />
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={styles.container}>
        {renderHeader()}
        {renderList()}
        {renderBtn()}
      </View>
    </ScreenWrapper>
  );
};

export default ConsentForms;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(19.5),
    paddingTop: moderateScale(15),
    flex: 1,
  },
  headerText: {
    color: colors?.Daintree,
  },
  headerIconContainer: {
    backgroundColor: colors?.grey,
  },
  itemContainer: {
    marginTop: moderateScale(20),
  },
  listContainer: {
    marginTop: moderateScale(30),
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: moderateScale(130),
  },
  buttonContainer: {
    position: "absolute",
    bottom: moderateScale(25),
    alignSelf: "center",
  },
});
