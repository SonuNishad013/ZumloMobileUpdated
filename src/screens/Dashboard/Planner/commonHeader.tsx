import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { ReactElement } from "react";
interface Props {
  name?: string;
  msg?: string;
  color?: any;
  onPress?: () => void;
  mainContainer?: any;
}
const SeeAllHeader: React.FC<Props> = ({
  name,
  msg,
  color,
  onPress,
  mainContainer,
}): ReactElement => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: moderateScale(10),
        justifyContent: "space-between",
        marginHorizontal: moderateScale(15),
        ...mainContainer,
      }}
    >
      <Text
        style={[
          styles?.nameText,
          { color: color ? color : colors.prussianBlue },
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text
          style={[
            styles?.messageText,
            { color: color ? color : colors.polishedPine },
          ]}
        >
          {msg}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SeeAllHeader;

const styles = StyleSheet.create({
  nameText: {
    fontSize: textScale(14),
    fontWeight: "700",
  },
  messageText: {
    fontSize: textScale(14),
    fontWeight: "400",
  },
});
