import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { strings } from "../../../../constant/strings";

interface Props {}
const ReportGroup: React.FC<Props> = () => {
  return (
    <View>
      <Text>{strings?.ReportGroup}</Text>
    </View>
  );
};

export default ReportGroup;

const styles = StyleSheet.create({});
