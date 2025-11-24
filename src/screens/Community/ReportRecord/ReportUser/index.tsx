import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { strings } from "../../../../constant/strings";

interface Props {}
const ReportUser: React.FC<Props> = () => {
  return (
    <View>
      <Text>{strings?.ReportUser}</Text>
    </View>
  );
};

export default ReportUser;

const styles = StyleSheet.create({});
