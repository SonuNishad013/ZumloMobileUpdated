import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../../constant/colors";
import { strings } from "../../../../../constant/strings";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";

interface Props {
  BasicInfoData?: any;
  name?: any;
  subTitle?: any;
  healthStatusSummary?: any;
  subTitle2?: any;
}

const UserInfoWithHealthStatusSummary: React.FC<Props> = ({
  name,
  subTitle,
  subTitle2,
  healthStatusSummary,
}) => {
  return (
    <>
      <Text numberOfLines={1} style={styles.userName}>
        {strings.userText}
        {name}
      </Text>
      <Text style={styles.treatmentPlanText}>{subTitle}</Text>
      <Text style={styles.treatmentPlanText}>{subTitle2}</Text>

      <View style={styles.diagnosesContainer}>
        {/* {healthStatusSummary?.currentDiagnoses.length > 0 && (
          <FlatList
            data={healthStatusSummary?.currentDiagnoses}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item, index }) => (
              <DiseaseBox
                mainContainer={{
                  backgroundColor:
                    index % 2 === 0 ? colors.royalOrange : colors.SurfCrest,
                }}
                mainText={styles.diseaseBoxText}
                data={"Manage better"}
              />
            )}
          />
        )}
        {healthStatusSummary?.majorHealthConditions.length > 0 && (
          <FlatList
            data={healthStatusSummary?.majorHealthConditions}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item, index }) => (
              <DiseaseBox
                mainContainer={{
                  backgroundColor:
                    index % 2 === 0 ? colors.SaltBox : colors.polishedPine,
                }}
                mainText={styles.diseaseBoxText}
                data={"Manage better"}
              />
            )}
          />
        )} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors.SurfCrest,
    fontFamily: "Poppins-Regular",
    marginTop: moderateScale(20),
  },
  treatmentPlanText: {
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(5),
  },
  diagnosesContainer: {
    alignItems: "flex-start",
    gap: moderateScale(10),
  },
  columnWrapper: {
    flexWrap: "wrap",
    gap: moderateScale(10),
  },
  diseaseBoxContainer: {
    // Other styles specific to DiseaseBox container if any
  },
  diseaseBoxText: {
    color: colors.prussianBlue,
    // Other styles specific to DiseaseBox text if any
  },
});

export default UserInfoWithHealthStatusSummary;
