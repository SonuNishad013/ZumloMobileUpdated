import {
  Image,
  ImageStyle,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { ColorableplusIcon, PenBlueIcon } from "../../../assets";
import { moderateScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { APPLY_STATUS } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";

interface Props {
  categoryItem?: ViewStyle;
  onPress?: any;
  categoryImageContainer?: ViewStyle;
  source?: any;
  categoryImage?: ImageStyle;
  rightWhiteCondition?: any;
  activeOpacity?: any;
  cornerEditCondition?: any;
  onEditIconPress?: any;
  rbSheetRef?: any;
}
const CommunityPicture: React.FC<Props> = ({
  categoryItem,
  onPress,
  categoryImageContainer,
  source,
  categoryImage,
  rightWhiteCondition,
  activeOpacity,
  cornerEditCondition,
  onEditIconPress,
  rbSheetRef,
}) => {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, categoryItem]}
      onPress={onPress}
      activeOpacity={activeOpacity || 0.5}
    >
      <View style={[styles.categoryImageContainer, categoryImageContainer]}>
        {rightWhiteCondition ? (
          source?.uri?.includes(APPLY_STATUS?.https) ? null : (
            <Image
              source={source}
              style={[styles.categoryImage, categoryImage]}
              resizeMode={APPLY_STATUS?.cover}
            />
          )
        ) : (
          <Image
            source={source}
            style={[styles.categoryImage, categoryImage]}
            resizeMode={APPLY_STATUS?.cover}
          />
        )}
      </View>
      {rightWhiteCondition && source?.uri?.includes(APPLY_STATUS?.https) ? (
        <View style={styles?.rightWhiteCondition}>
          <ColorableplusIcon stroke={colors?.polishedPineOP3} />

          <Text style={styles.uploadPictureText}>{strings?.uploadPicture}</Text>
        </View>
      ) : null}
      {cornerEditCondition && (
        <View>
          <TouchableOpacity
            style={styles.editIconView}
            onPress={onEditIconPress}
          >
            <PenBlueIcon
              height={`${moderateScale(14)}`}
              width={`${moderateScale(14)}`}
            />
          </TouchableOpacity>
        </View>
      )}

      {rightWhiteCondition && !source?.uri?.includes(APPLY_STATUS?.https) && (
        <View>
          <TouchableOpacity style={styles.penBlueIconView} onPress={onPress}>
            <PenBlueIcon
              height={`${moderateScale(14)}`}
              width={`${moderateScale(14)}`}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CommunityPicture;
