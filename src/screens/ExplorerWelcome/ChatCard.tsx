import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  height,
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";

interface Props {
  onPress?: any;
}
const ChatCard: React.FC<Props> = ({ onPress }) => {
  return (
    <View>
      <ImageBackground
        source={imagePath.NewChatModal}
        resizeMode={"contain"}
        style={{
          minHeight: height / 1.3,
          width: width - moderateScale(60),
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginHorizontal: moderateScale(15),
            height: height / 3,
            width: width - moderateScale(80),
            marginTop: moderateScale(70),
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: textScale(24),
              fontWeight: "bold",
              color: colors.polishedPine,
              textAlign: "center",
              marginTop: moderateScale(50),
            }}
          >
            {strings.chatGreeting}
          </Text>
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "400",
              color: colors.SaltBox,
              textAlign: "center",
              margin: moderateScale(20),
            }}
          >
            {strings.chatModalDescription}
          </Text>
          <Text
            style={{
              fontSize: textScale(16),
              fontWeight: "700",
              color: colors.SaltBox,
              textAlign: "center",
              marginTop: moderateScale(0),
            }}
          >
            {"Tap the bubble below -\nI’m all ears. "}
          </Text>
        </View>
        <View
          style={{
            minHeight: moderateScale(height / 3.6),
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></View>
          <TouchableOpacity
            onPress={onPress}
            style={{
              position: "absolute",
              bottom:
                Platform.OS === "ios" ? moderateScale(-30) : moderateScale(-10),
              alignSelf: "center",
              backgroundColor: colors?.transparent,
              height: moderateScale(150),
              width: moderateScale(170),
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({});
