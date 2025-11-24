import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AIAssistanceIcon, BackIcon, Online } from "../../assets";
import styles from "./Style";
import { strings } from "../../constant/strings";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";

const ChatHeader = ({ onPress, isBackIcon, isLoadingAIResponse }: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {isBackIcon && (
          <TouchableOpacity
            onPress={onPress}
            style={[
              styles.iconContainer,
              { opacity: isLoadingAIResponse ? 0.3 : 1 },
            ]}
          >
            <BackIcon />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.profileContainer,
            {
              marginHorizontal: isBackIcon
                ? moderateScale(5)
                : moderateScale(10),
            },
          ]}
        >
          {/* <Image
            source={imagePath.AIAssistanceIcon}
            style={{ width: moderateScale(30), height: moderateScale(30) }}
          /> */}
          <AIAssistanceIcon />
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <Text style={styles.profileName}>{strings.Zumlo_Assistant}</Text>
            <View style={styles.statusContainer}>
              <Online />
              <Text style={styles.profileStatus}>{"Always available"}</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <CircleMenu /> */}
    </View>
  );
};

export default ChatHeader;
