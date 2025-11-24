import { Text } from "react-native";
import React from "react";
import { styles } from "./styles";

const AnswerTitle = ({ title }: any) => {
  return <Text style={styles.subHeading}>{title}</Text>;
};

export default AnswerTitle;
