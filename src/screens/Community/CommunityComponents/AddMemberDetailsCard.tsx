import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import { APPLY_STATUS } from "../../../constant/ENUM";

interface Props {
  checkButton?: ViewStyle;
  checkIcon?: ImageStyle;
  userName?: any;
  status?: any;
  source?: any;
  onPress?: () => void;
  onCardPress?: () => void;
  isSelector?: any;
  isStatus?: any;
}
const AddMemberDetailsCard: React.FC<Props> = ({
  checkButton,
  checkIcon,
  userName,
  status,
  source,
  onPress,
  onCardPress,
  isSelector = true,
  isStatus = true,
}) => {
  return (
    <TouchableOpacity onPress={onCardPress} style={styles.listItemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={source}
          style={styles.listItemImage}
          resizeMode={APPLY_STATUS?.stretch}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.usernameText}>{userName}</Text>
        {isStatus && (
          <Text style={styles.ageText}>
            {strings?.status} : {status}
          </Text>
        )}
      </View>
      {isSelector && (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.checkButton, checkButton]}
        >
          <Image
            source={imagePath?.check}
            style={[styles.checkIcon, checkIcon]}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default AddMemberDetailsCard;

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: colors?.white05,
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    flexDirection: "row",
    gap: moderateScale(10),
  },
  imageContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemImage: {
    height: moderateScale(38),
    width: moderateScale(38),
    borderRadius: moderateScale(20),
  },
  textContainer: {
    gap: moderateScale(4),
  },
  usernameText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  ageText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SaltBox,
  },
  checkButton: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    borderColor: colors?.polishedPine,
    borderWidth: moderateScale(1),
    position: "absolute",
    top: moderateScale(15),
    right: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors?.polishedPine,
  },
  checkIcon: {
    height: moderateScale(12),
    width: moderateScale(12),
    tintColor: colors?.SurfCrest,
  },
});
