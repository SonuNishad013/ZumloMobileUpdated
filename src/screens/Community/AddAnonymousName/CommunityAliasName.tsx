import {
  Image,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import CommonInput from "../../../components/Inputs/commonInput";
import { strings } from "../../../constant/strings";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import { moderateScale, width } from "../../../constant/responsiveStyle";

interface Props {
  value?: any;
  isError?: any;
  errorMsg?: any;
  onChangeText?: any;
  handleDefaultNameToggle?: () => void;
  isNameCheck?: any;
  isTitle?: any;
  agreementText?: TextStyle;
  checkbox?: ViewStyle;
  checkboxImage?: ImageStyle;
  isEdit?: boolean;
  hideQuestion?: boolean;
}
const CommunityAliasName: React.FC<Props> = ({
  value,
  isError,
  errorMsg,
  onChangeText,
  handleDefaultNameToggle,
  isNameCheck,
  isTitle = true,
  agreementText,
  checkbox,
  checkboxImage,
  isEdit,
  hideQuestion,
}) => {
  return (
    <View style={styles.mainContent}>
      {isTitle && (
        <>
          <Text style={styles.Headerdescription}>
            {"Welcome to the Zumlo community"}
          </Text>
          <Text style={styles.description}>
            {
              "Let’s set up how you’ll show up in the community. Pick a name and a picture that feels right for you "
            }
          </Text>
          <View
            style={[
              styles.headerContainerLine,
              { marginLeft: 0, height: "auto", marginTop: moderateScale(40) },
            ]}
          >
            <Text style={styles.headerText}>{"Your display name"}</Text>
          </View>
        </>
      )}

      {!hideQuestion && (
        <>
          <Text
            style={[
              styles.agreementText,
              {
                marginLeft: 0,
                marginTop: moderateScale(9),
                marginBottom: moderateScale(10),
              },
              agreementText,
            ]}
          >
            {
              "Would you like to use your current profile name, or create a new one just for the community?"
            }
          </Text>

          <View
            style={{
              width: width * 0.5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.footerContainer}
              activeOpacity={0.8}
              onPress={handleDefaultNameToggle}
            >
              <View style={[styles.checkbox, checkbox]}>
                {isNameCheck && (
                  <Image
                    source={imagePath.check}
                    style={[styles.checkboxImage, checkboxImage]}
                  />
                )}
              </View>
              <Text style={[styles.agreementText, agreementText]}>{"Yes"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerContainer}
              activeOpacity={0.8}
              onPress={handleDefaultNameToggle}
            >
              <View style={[styles.checkbox, checkbox]}>
                {!isNameCheck && (
                  <Image
                    source={imagePath.check}
                    style={[styles.checkboxImage, checkboxImage]}
                  />
                )}
              </View>
              <Text style={[styles.agreementText, agreementText]}>{"No"}</Text>
            </TouchableOpacity>
          </View>

          {isNameCheck ? null : (
            <CommonInput
              placeholder={"Type in your name here"}
              value={value}
              placeholderTextColor={colors.minGray}
              mainContainer={styles.inputContainer}
              inputText={
                !isEdit ? styles.inputText : { color: colors?.prussianBlue }
              }
              maxLength={20}
              selectionColor={colors.SurfCrest}
              isError={isError}
              errorMsg={errorMsg}
              onChangeText={onChangeText}
            />
          )}
          {isNameCheck && (
            <Text
              style={[
                styles.agreementText,
                {
                  marginLeft: 0,
                  marginTop: moderateScale(19),
                  marginBottom: moderateScale(15),
                },
                agreementText,
              ]}
            >
              {isNameCheck && (
                <Text>{`The name you are using in the app is `}</Text>
              )}
              {isNameCheck && (
                <Text
                  style={{ color: colors?.royalOrangeDark }}
                >{`${value}`}</Text>
              )}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default CommunityAliasName;
