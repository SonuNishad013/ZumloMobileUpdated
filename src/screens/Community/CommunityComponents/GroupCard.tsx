import {
  Alert,
  Image,
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
import { formatNumberTitle } from "../../../helper/CommunityHelper";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { textLabelSize } from "../../../utils/TextConfig";

interface Props {
  mainContainer?: ViewStyle;
  onCardPress?: () => void;
  groupName?: any;
  onJoinPress?: () => void;
  status?: any;
}

const GroupCard: React.FC<Props> = ({
  mainContainer,
  onCardPress,
  groupName,
  onJoinPress,
  status,
}) => {
  return (
    <TouchableOpacity
      onPress={onCardPress}
      style={[styles.cardContainer, mainContainer]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={imagePath.Chakras}
          style={styles.image}
          resizeMode={APPLY_STATUS?.stretch}
        />
      </View>
      <Text numberOfLines={1} style={styles.nameText}>
        {groupName}
      </Text>
      <Text style={styles.followersText}>
        {formatNumberTitle(200, strings?.followers)}
      </Text>
      <CommonButton
        onPress={onJoinPress}
        mainContainer={styles.buttonContainer}
        btnName={status}
      />
    </TouchableOpacity>
  );
};

export default GroupCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: moderateScale(160),
    height: moderateScale(189),
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(15),
    alignItems: "center",
    paddingHorizontal: moderateScale(5),
  },
  imageContainer: {
    height: moderateScale(64),
    width: moderateScale(64),
    borderRadius: moderateScale(32),
    backgroundColor: colors.SurfCrest,
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(15),
  },
  image: {
    height: moderateScale(62),
    width: moderateScale(62),
    borderRadius: moderateScale(32),
  },
  nameText: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: textLabelSize?.titleFont,
    marginTop: moderateScale(10),
  },
  followersText: {
    color: colors.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    marginTop: moderateScale(3),
  },
  buttonContainer: {
    width: moderateScale(104),
    height: moderateScale(30),
    marginTop: moderateScale(15),
    backgroundColor: colors.transparent,
    borderColor: colors.SurfCrest,
    borderWidth: moderateScale(1),
  },
});
