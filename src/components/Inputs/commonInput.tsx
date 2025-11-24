import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { ReactElement } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  placeholder?: string;
  value?: any;
  onChangeText?: any;
  mainContainer?: ViewStyle;
  inputText?: TextStyle;
  eyeIcon?: any;
  SVGImage?: any;
  isError?: any;
  errorMsg?: any;
  secureTextEntry?: boolean;
  onPressIcon?: () => void;
  maxLength?: any;
  multiline?: boolean;
  textAlignVertical?: any;
  wordCount?: boolean;
  maxWords?: any;
  writeWords?: any;
  returnKeyType?: any;
  onSubmitEditing?: () => void;
  placeholderTextColor?: any;
  writeWordsStyle?: any;
  keyboardType?: any;
  errorTxtStyle?: TextStyle;
  backGroundColor?: any;
  borderColor?: any;
  isWidth?: boolean;
  onFocus?: any;
  onBlur?: any;
  iseditable?: boolean;
  isfocusedRequired?: any;
  pop_upTextStyle?: any;
  pop_upText?: any;
  focusView?: any;
  isDrop?: any;
  selectionColor?: any;
}
const CommonInput: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  mainContainer,
  inputText,
  eyeIcon,
  SVGImage,
  isError,
  errorMsg,
  secureTextEntry,
  onPressIcon,
  maxLength,
  textAlignVertical,
  multiline,
  wordCount,
  writeWords,
  writeWordsStyle,
  maxWords,
  returnKeyType,
  onSubmitEditing,
  placeholderTextColor,
  keyboardType,
  errorTxtStyle,
  backGroundColor,
  borderColor,
  isWidth = true,
  onFocus,
  onBlur,
  iseditable,
  isfocusedRequired = false,
  pop_upTextStyle,
  pop_upText,
  focusView,
  isDrop = false,
  selectionColor,
}): ReactElement => {
  return (
    <View>
      <View
        style={[
          style?.mainContainer,
          { width: isWidth ? moderateScale(331) : "auto" },
          {
            borderColor: !isError
              ? borderColor || colors.lightSurfCrest2
              : colors.royalOrange,
            backgroundColor: !isError
              ? backGroundColor || colors.lightSurfCrest
              : "transparent",
            ...mainContainer,
          },
        ]}
      >
        {isDrop ? (
          <View>
            {isfocusedRequired && (
              <>
                {isfocusedRequired && value?.length !== 0 ? (
                  <View
                    style={{
                      height: moderateScale(22),
                      justifyContent: "center",
                      marginBottom:
                        Platform.OS === "ios"
                          ? moderateScale(1)
                          : moderateScale(-15),
                      ...focusView,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.grey,
                        fontSize: textScale(10),
                        ...pop_upTextStyle,
                      }}
                    >
                      {pop_upText}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      marginVertical:
                        Platform.OS === "ios"
                          ? moderateScale(10)
                          : moderateScale(2),
                    }}
                  />
                )}
              </>
            )}
            <TextInput
              textAlignVertical={textAlignVertical}
              multiline={multiline}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              // style={[style?.inputText, inputText]}
              style={[
                style.inputText,
                {
                  width: isWidth ? moderateScale(130) : moderateScale(325),
                  ...inputText,

                  // backgroundColor: "red",
                },
              ]}
              value={value}
              onChangeText={onChangeText}
              maxLength={maxLength}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              keyboardType={keyboardType}
              onFocus={onFocus}
              onBlur={onBlur}
              editable={iseditable}
            />
          </View>
        ) : (
          <TextInput
            textAlignVertical={textAlignVertical}
            multiline={multiline}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            // style={[style?.inputText, inputText]}
            style={[
              style.inputText,
              {
                ...inputText,
                width: isWidth ? moderateScale(180) : moderateScale(325),
                ...inputText,
                // backgroundColor: "yellow",
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={iseditable}
            selectionColor={selectionColor}
          />
        )}
        {eyeIcon && (
          <View
            style={{ alignSelf: "center", position: "absolute", right: 15 }}
          >
            <TouchableOpacity onPress={onPressIcon}>
              <SVGImage
                height={`${moderateScale(20)}`}
                width={`${moderateScale(20)}`}
              />
            </TouchableOpacity>
          </View>
        )}
        {wordCount && (
          <Text style={[style?.writeWordsStyle, writeWordsStyle]}>
            {`(${writeWords}/${maxWords} Words)`}
          </Text>
        )}
      </View>
      {isError && (
        <Text style={[style?.errorTxtStyle, errorTxtStyle]}>{errorMsg}</Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    borderWidth: moderateScale(1),
    // width: moderateScale(331),
    height: moderateScale(56),
    justifyContent: "space-between",
    borderColor: colors?.polishedPine,
    borderRadius: moderateScale(15),
    flexDirection: "row",
    paddingHorizontal: moderateScale(9),
    marginVertical: moderateScale(5),
  },
  inputText: {
    fontSize: textScale(14),
    fontWeight: "400",
    width: "100%",
    // backgroundColor: "red",
  },
  writeWordsStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: colors?.prussianBlue,
  },
  errorTxtStyle: {
    color: colors.royalOrange,
    paddingLeft: moderateScale(8),
    // paddingTop: moderateScale(2),
  },
});
export default CommonInput;
