import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import { imagePath } from "../../../assets/png/imagePath";
import { strings } from "../../../constant/strings";
import { style } from "./style";
import { formatSentenceCase } from "../../../helper/sentenceCase";

interface Props {
  navigation?: any;
}
const GoalsCreated: React.FC<Props> = ({ navigation }) => {
  return (
    <ImageBackground source={imagePath.dmeBg} style={style.backgroundImage}>
      <View style={style.viewMainContainer}>
        <Text style={style.txtTitle}>{formatSentenceCase(strings.done)}</Text>
        <Text style={style.txtdes}>{strings.successfull}</Text>
        <CommonButton
          onPress={() => navigation.goBack()}
          mainContainer={style.buttonContainer}
          btnName={strings.continue}
        />
      </View>
    </ImageBackground>
  );
};

export default GoalsCreated;
