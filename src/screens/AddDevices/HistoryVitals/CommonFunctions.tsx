import { Text, View, StyleSheet } from "react-native";
import colors from "../../../constant/colors";
import { textScale } from "../../../constant/responsiveStyle";

export const UniqueText = (props: any) => {
  const { name, data, unit } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.dataText}>{data + " " + unit}</Text>
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dataText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  nameText: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(10),
  },
});
