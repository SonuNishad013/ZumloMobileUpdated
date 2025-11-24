import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import moment from "moment";

interface Props {
  heartRateVitalData?: any;
}

const HeartRate: React.FC<Props> = ({ heartRateVitalData }) => {
  const getTimeGap = (passingTime: any) => {
    // Parse the passing time into a Date object
    const passedDate: any = new Date(passingTime);
    const currentDate: any = new Date(); // Get the current time

    // Calculate the difference in milliseconds
    const difference = currentDate - passedDate;

    // Convert the difference into a readable format
    const seconds = Math?.floor(difference / 1000) % 60;
    const minutes = Math?.floor(difference / (1000 * 60)) % 60;
    const hours = Math?.floor(difference / (1000 * 60 * 60)) % 24;
    const days = Math?.floor(difference / (1000 * 60 * 60 * 24));
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else if (seconds > 0) {
      return `${seconds} seconds ago`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {heartRateVitalData?.title || "Blood Pressure"}
      </Text>
      <View style={styles.row}>
        <View style={styles.vitalContainer}>
          <Text style={styles.label}>{"Systolic"}</Text>
          <Text style={styles.value}>
            {(heartRateVitalData?.systolic || "--") + " mmHg"}
          </Text>
        </View>

        <View style={styles.vitalContainer}>
          <Text style={styles.label}>{"Diastolic"}</Text>
          <Text style={styles.value}>
            {(heartRateVitalData?.diastolic || "--") + " mmHg"}
          </Text>
        </View>

        <View style={styles.vitalContainer}>
          <Text style={styles.label}>{"Heart rate"}</Text>
          <Text style={styles.value}>
            {(heartRateVitalData?.heartRate || "--") + " bpm"}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.label,
          { marginTop: moderateScale(5), fontSize: textScale(10) },
        ]}
      >
        {"Last update "} {getTimeGap(heartRateVitalData?.createdDate)}
      </Text>
    </View>
  );
};

export default HeartRate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.polishedPine,
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(60),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  vitalContainer: {
    alignItems: "flex-start",
  },
  label: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  value: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
