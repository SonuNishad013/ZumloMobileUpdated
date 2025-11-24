import React from "react";
import { View, StyleSheet } from "react-native";
import ProductTour from "../ProductTour";

interface Props {
  navigation?: any;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProductTour navigation={navigation} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
