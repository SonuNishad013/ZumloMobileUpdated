import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import {
  Alarm,
  CountDownIcon,
  FrequencyIcon,
  MeditatingPerson,
} from "../../assets";
import moment from "moment";
import navigationString from "../../navigation/navigationString";

const DailyActivitiesCard = ({
  item,
  title,
  description,
  minutes,
  count,
  frequency,
  index,
  navigation,
}: any) => {
  const result = item?.activityHistory?.filter((item: any) => {
    const newDate = moment(item?.modifiedDate + "Z").toLocaleString();
    return moment(newDate).isSame(new Date(), "day");
  });

  const currentProgressOfActivities = (result?.length / count) * 100;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigationString.ActivitesDetails, {
          activitesData: item,
          from: "WellnessOverview",
          mainTab: "WellnessOverview",
        });
      }}
      style={[
        styles.cardContainer,
        {
          backgroundColor:
            currentProgressOfActivities === 1
              ? colors?.polishedPine
              : colors?.backgroundTheme,
        },
      ]}
    >
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title || "--"}</Text>
          <Text style={styles.infoText}>{description || "--"}</Text>
        </View>
        <MeditatingPerson />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Alarm />
          <Text style={styles.infoText}>{minutes || "--"}</Text>
        </View>
        <View style={styles.infoItem}>
          <FrequencyIcon />
          <Text style={styles.infoText}>{frequency || "--"}</Text>
        </View>
        <View style={styles.infoItem}>
          <CountDownIcon />
          <Text style={styles.infoText}>{count ? `${count} Times` : "--"}</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.traitSliderBar,
          height: 5,
          borderRadius: 5,
        }}
      >
        <View
          style={{
            width:
              currentProgressOfActivities < 100
                ? `${currentProgressOfActivities}%`
                : "100%",
            backgroundColor: colors.SurfCrest,
            height: 5,
            borderRadius: 5,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default DailyActivitiesCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    paddingHorizontal: moderateScale(19),
    paddingVertical: moderateScale(15),
    gap: 10,
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(19),
  },
  headerContainer: {
    flexDirection: "row",
    gap: moderateScale(15),
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    gap: 5,
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  infoContainer: {
    gap: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
