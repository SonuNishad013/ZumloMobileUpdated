import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

interface BPData {
  title: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  status: string;
  vitalUnit: string;
  weeklyAverageSystolic: number;
  monthlyAverageSystolic: number;
  overallAverageSystolic: number;
}

const BloodPressureCard = ({ data }: { data: BPData }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.status}>
        Today’s status is <Text style={styles.statusBold}>{data.status}</Text>
      </Text>

      <Text style={styles.bpReading}>
        {data.systolic} / {data.diastolic}{" "}
        <Text style={styles.unit}>{data.vitalUnit}</Text>
      </Text>

      <Text style={styles.heartRate}>❤️ {data.heartRate} bpm</Text>

      <View style={styles.averagesRow}>
        <View style={styles.avgBlock}>
          <Text style={styles.avgLabel}>Weekly</Text>
          <Text style={styles.avgValue}>{data.weeklyAverageSystolic}</Text>
        </View>
        <View style={styles.avgBlock}>
          <Text style={styles.avgLabel}>Monthly</Text>
          <Text style={styles.avgValue}>{data.monthlyAverageSystolic}</Text>
        </View>
        <View style={styles.avgBlock}>
          <Text style={styles.avgLabel}>Overall</Text>
          <Text style={styles.avgValue}>{data.overallAverageSystolic}</Text>
        </View>
      </View>
    </View>
  );
};

export default BloodPressureCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0D2A39",
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    alignSelf: "center",
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    color: "#E0F2F1",
    fontWeight: "600",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: "#B2DFDB",
    marginBottom: 12,
  },
  statusBold: {
    fontWeight: "600",
    color: "#7BE495",
  },
  bpReading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FF9D42",
    marginBottom: 8,
  },
  unit: {
    fontSize: 16,
    color: "#B2DFDB",
  },
  heartRate: {
    fontSize: 14,
    color: "#D0F0EB",
    marginBottom: 16,
  },
  averagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avgBlock: {
    backgroundColor: "#12394A",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    width: (width - 80) / 3,
  },
  avgLabel: {
    fontSize: 12,
    color: "#A5D6A7",
    marginBottom: 4,
  },
  avgValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
