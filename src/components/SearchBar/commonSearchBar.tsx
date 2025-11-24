import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { SearchIcon } from "../../assets";

interface Props {
  mainContainer?: ViewStyle;
  iconInputContainer?: ViewStyle;
  textInputStyle?: TextStyle;
  placeholder?: string;
  onChangeText?: any;
  value?: any;
  iconSize?: any;
  isiconSize?: boolean;
  OtherIcon?: any;
  isOtherIcon?: boolean;
  placeholderTextColor?: any;
}
const CommonSearchBar: React.FC<Props> = ({
  mainContainer,
  iconInputContainer,
  textInputStyle,
  placeholder,
  onChangeText,
  value,
  iconSize,
  isiconSize,
  OtherIcon,
  isOtherIcon,
  placeholderTextColor,
}) => {
  return (
    <View style={[styles?.mainContainer, mainContainer]}>
      <View style={[styles?.iconInputContainer, iconInputContainer]}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {isOtherIcon ? (
            <OtherIcon
              height={isiconSize ? `${iconSize}` : `${moderateScale(16)}`}
              width={isiconSize ? `${iconSize}` : `${moderateScale(16)}`}
            />
          ) : (
            <SearchIcon
              height={isiconSize ? `${iconSize}` : `${moderateScale(16)}`}
              width={isiconSize ? `${iconSize}` : `${moderateScale(16)}`}
            />
          )}
        </View>
        <TextInput
          style={[styles?.textInputStyle, textInputStyle]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || colors?.SaltBox}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(55),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: colors?.polishedPine,
    justifyContent: "center",
  },
  iconInputContainer: {
    flexDirection: "row",
    marginHorizontal: moderateScale(10),
    width: moderateScale(290),
  },
  textInputStyle: {
    color: colors?.SaltBox,
    marginLeft: moderateScale(10),
  },
});

export default CommonSearchBar;
