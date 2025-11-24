import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import colors from "../../../constant/colors";
import { UniqueText } from "./CommonFunctions";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";

interface Props {
  item?: any;
}

const SleepDataHistory: React.FC<Props> = ({ item }) => {
  const [data, setData] = useState(item);
  useEffect(() => {
    if (!item) return;
    setData(item);
  }, [item]);

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment(data?.createdDate)?.format("DD")}
          </Text>
          <Text style={styles.monthText}>
            {moment(data?.createdDate)?.format("MMM")}
          </Text>
        </View>
        <UniqueText
          data={moment(moment(data?.createdDate + "Z").toLocaleString()).format(
            "hh:mm A"
          )}
          name={"Time"}
          unit={""}
        />
      </View>

      <UniqueText
        data={data?.sleepType || "--"}
        name={"Sleep Type"}
        unit={""}
      />
      <UniqueText
        data={data?.sleepDuration || "--"}
        name={"Sleep Duration"}
        unit={"Hrs"}
      />
    </View>
  );
};

export default SleepDataHistory;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
    padding: moderateScale(15),
    alignItems: "center",
    borderRadius: moderateScale(8),
    backgroundColor: "rgba(255, 255, 255, 0.09)",
  },
  dateTimeContainer: {
    flexDirection: "row",
    gap: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    padding: moderateScale(5),
    borderWidth: moderateScale(1),
    borderColor: "#4A717F",
    borderRadius: moderateScale(4),
  },
  dateText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  monthText: {
    color: colors.SurfCrest,
    fontSize: textScale(10),
  },
});
