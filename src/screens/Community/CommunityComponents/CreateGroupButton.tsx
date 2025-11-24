import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import BoxButtonIcon from "../../../components/OnBoardiingComponents/BoxButtonIcon";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";

interface Props {
  onCreateGroupPress?: () => void;
}
const CreateGroupButton: React.FC<Props> = ({ onCreateGroupPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.border} />
        <Text style={styles.text}>
          {"Tap + to create a space where others can connect with you. "}
        </Text>
      </View>
      <BoxButtonIcon
        button={styles.button}
        onPress={onCreateGroupPress}
        source={imagePath?.PlusIcon}
        tintIconColor={colors?.prussianBlue}
        width={moderateScale(13)}
        height={moderateScale(13)}
        imageStyleOut={styles.imageStyleOut}
      />
    </View>
  );
};

export default CreateGroupButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.green02,
    height: moderateScale(71),
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
  },
  textContainer: {
    width: "75%",
    flexDirection: "row",
    alignItems: "center",
  },
  border: {
    borderLeftWidth: moderateScale(3),
    borderLeftColor: colors?.SaltBox,
    width: moderateScale(10),
    height: moderateScale(40),
  },
  text: {
    color: colors?.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  button: {
    height: moderateScale(34),
    width: moderateScale(34),
    borderRadius: moderateScale(7),
    borderColor: colors?.prussianBlue,
  },
  imageStyleOut: {
    marginTop: moderateScale(7),
  },
});
