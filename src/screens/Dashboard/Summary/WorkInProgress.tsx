import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlackTab } from "../../../assets";
import { strings } from "../../../constant/strings";
import { styles } from "./Styles";
interface Props {}
const WorkInProgress: React.FC<Props> = ({}) => {
  return (
    <View style={styles?.blankScreenContainer}>
      <BlackTab />
      <Text style={styles?.blankScreenText}>
        {strings?.Your_wellness_journey}
      </Text>
    </View>
  );
};

export default WorkInProgress;
