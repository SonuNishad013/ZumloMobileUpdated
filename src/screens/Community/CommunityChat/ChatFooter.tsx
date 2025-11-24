import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { strings } from "../../../constant/strings";
import { SendIconPP } from "../../../assets";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";

interface Props {
  currentMessage?: any;
  setCurrentMessage?: any;
  sendMessage?: any;
}
const ChatFooter: React.FC<Props> = ({
  currentMessage,
  setCurrentMessage,
  sendMessage,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputSubContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder={strings.typeAmsg}
            value={currentMessage}
            onChangeText={setCurrentMessage}
            placeholderTextColor={colors.SilverChalice}
            multiline={true}
            selectionColor={colors?.SurfCrest}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={sendMessage}
        disabled={!currentMessage?.trim()?.length}
        style={{
          opacity: currentMessage?.trim()?.length > 0 ? 1 : 0.5,
        }}
      >
        <SendIconPP />
      </TouchableOpacity>
    </View>
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(10),
    gap: moderateScale(15),
    marginBottom: moderateScale(9),
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(35),
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(14),
    justifyContent: "space-between",
    borderColor: colors.polishedPine,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    maxHeight: moderateScale(75),
    color: colors.SurfCrest,
    paddingHorizontal: moderateScale(10),
    marginRight: moderateScale(10),
    minHeight: moderateScale(30),
  },
  typingIndicatorContainer: {
    padding: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
