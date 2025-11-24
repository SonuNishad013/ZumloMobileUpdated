import { Text, View } from "react-native";
import React from "react";
import styles from "./styles";

const TitleHeader = ({ title, style, isLineNeeded = true, textTitle }: any) => {
  return (
    <View style={[styles?.titleHeader, style]}>
      <Text style={[styles.textTitle, textTitle]}>{title}</Text>
      {isLineNeeded && <View style={styles?.titleHeaderView} />}
    </View>
  );
};

export default TitleHeader;
