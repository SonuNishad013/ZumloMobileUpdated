import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React from "react";
import AnswerTitle from "./AnswerTitle";
import { styles } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";

const ActivityPreferences = ({ title, onPress }: any) => {
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={styles.titleHeader}>{title}</Text>
      <TextInput
        multiline
        style={{
          height: moderateScale(150),
          width: "100%",
          fontSize: textScale(14),
          fontWeight: "400",
          borderWidth: 1,
          padding: moderateScale(20),
          color: colors?.SurfCrest,
          borderColor: colors?.SurfCrest,
          borderRadius: moderateScale(10),
          paddingTop: 20,
        }}
        placeholder="Describe here"
        placeholderTextColor={colors?.SurfCrest}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: moderateScale(15),
          alignItems: "flex-start",
        }}
      >
        <Image
          source={imagePath?.infoCircle}
          style={{ width: moderateScale(15), height: moderateScale(15) }}
        />
        <Text
          style={{
            fontSize: textScale(14),
            fontWeight: "400",
            color: colors?.royalOrangeDark,
          }}
        >
          Please describe any activities or suggestions you would prefer to
          increase or decrease.
        </Text>
      </View>
      <View style={{ marginBottom: moderateScale(10) }}>
        <CommonButton
          btnName={"NEXT"}
          mainContainer={styles.buttonContainer}
          onPress={() => {
            onPress();
          }}
        />
      </View>
    </View>
  );
};

export default ActivityPreferences;
