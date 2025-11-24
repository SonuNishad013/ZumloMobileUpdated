import React, { ReactElement } from "react";
import { ImageBackground, Text, View } from "react-native";
import colors from "../../constant/colors";
import { SessionCompleteIcon, YogaIcon3 } from "../../assets";
import { height, moderateScale, textScale, width } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";
import LinearGradient from "react-native-linear-gradient";
import CommonButton from "../../components/Buttons/commonButton";

interface Props {
    navigation?: any;
}
const CommonCompleteSessionCommp: React.FC<Props> = ({
    navigation,
}): ReactElement => {
    return (
        <LinearGradient colors={[colors.prussianBlue, colors.darkthemColor]} style={{ flex: 1 }}>

            <SessionCompleteIcon width={`${width}`} />
            <View style={{ marginTop: moderateScale(20), justifyContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(15) }}>
                <Text style={{ fontSize: textScale(24), fontWeight: '700', color: colors.extraLightSurfCrest }}>
                    {"Congratulations"}
                </Text>
                <Text style={{ marginTop: moderateScale(10), textAlign: 'center', fontSize: textScale(14), fontWeight: '400', color: colors.extraLightSurfCrest }}>
                    {"Meditation for the mindfulness has been done successfully"}
                </Text>
                <CommonButton
                    btnName={"EXPLORE MORE"}
                    mainContainer={{ width: moderateScale(242), marginTop: moderateScale(10), }}
                />
            </View>
            <ImageBackground source={imagePath.SessoinCompletegrp2} style={{
                justifyContent: 'flex-end', alignItems: 'center', height: height / 2.2
                , width: width, position: 'absolute', bottom: 1,
            }}
                resizeMode='contain'
            >
                <YogaIcon3 />
            </ImageBackground>
        </LinearGradient>
    )
}
export default CommonCompleteSessionCommp;