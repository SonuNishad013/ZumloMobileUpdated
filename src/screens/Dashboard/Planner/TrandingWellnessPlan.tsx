import React, { ReactElement } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import moment from "moment";
import { DD_MMM_YY } from "../../../constant/dateFormatConstants";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
  trandingWellnessData?: any;
}

const TrandingWellnessPlan: React.FC<Props> = ({
  navigation,
  trandingWellnessData,
}): ReactElement => {
  const renderDiseases = (disease: string, index: number) => (
    <View key={index} style={styles.diseaseContainer}>
      <Text style={styles.diseaseText}>{disease}</Text>
    </View>
  );

  const renderPlan = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.planContainer}>
      <View style={styles.planContent}>
        <View style={styles.textContainer}>
          <Text style={styles?.planView}>{item?.name}</Text>
          <Text style={styles.description}>{item?.description}</Text>
        </View>
        <View style={styles.tagContainer}>
          {item?.disease.map(renderDiseases)}
          <View style={styles.generatedByContainer}>
            <Text
              style={styles.tagText}
            >{`${strings?.Generated_by} ${item.owner}`}</Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.tagText}>{`${strings?.Till_Date} ${moment(
            item.endDate
          ).format(DD_MMM_YY)}`}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={trandingWellnessData}
      ListHeaderComponent={() => (
        <HeaderWithNameSeeAll
          name={strings?.Trending_wellness_plan}
          msg={strings?.seeAll}
        />
      )}
      renderItem={renderPlan}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: colors.SaltBox,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
  },
  planContent: {
    justifyContent: "space-between",
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(15),
  },
  textContainer: {
    justifyContent: "space-between",
  },
  description: {
    marginTop: moderateScale(5),
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.white,
  },
  tagContainer: {
    flexDirection: "row",
    marginTop: moderateScale(20),
  },
  tagText: {
    marginHorizontal: moderateScale(10),
    color: colors.lightblue,
  },
  diseaseContainer: {
    marginHorizontal: moderateScale(5),
    borderRadius: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(27),
    backgroundColor: colors.royalOrange,
  },
  diseaseText: {
    marginHorizontal: moderateScale(10),
    color: colors.lightblue,
  },
  generatedByContainer: {
    backgroundColor: colors.polishedPine,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(15),
  },
  dateContainer: {
    backgroundColor: colors.polishedPine,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(15),
    marginTop: moderateScale(10),
    width: moderateScale(150),
  },
  planView: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.white,
  },
});

export default TrandingWellnessPlan;
