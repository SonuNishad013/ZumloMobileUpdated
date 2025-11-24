import {
  View,
  Text,
  TouchableOpacity,
  type GestureResponderEvent,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React, { type ReactElement } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { ButtonSentencecase } from "../../../../helper/sentenceCase";

interface myProps {
  title?: string;
  content?: string;
  onPress?: (event: GestureResponderEvent) => void;
  mainContainer?: ViewStyle;
}
const ChangeBtmScreen: React.FC<myProps> = ({
  title,
  content,
  onPress,
  mainContainer,
}: myProps): ReactElement => {
  return (
    <View style={[style?.mainContainer, mainContainer]}>
      <Text style={style?.contentTxtStyle}>{content} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={style?.titleTxtStyle}>{ButtonSentencecase(title)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeBtmScreen;

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  contentTxtStyle: {
    color: colors?.grey,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  titleTxtStyle: {
    color: colors?.royalOrange,
    fontSize: textScale(14),
    fontWeight: "400",
    marginHorizontal: moderateScale(5),
  },
});
