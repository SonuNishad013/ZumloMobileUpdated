import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import CommonHeader from "./commonHeader";

interface Props {
    navigation?: any;
    onBackPress?: () => void;
    headerName?: any;
    mainContainer?: any
    iconContainer?: any
}
const CurvedHeader: React.FC<Props> = ({ iconContainer, mainContainer, navigation, onBackPress, headerName }) => {
    return (
        <View style={[style?.headerContainer, mainContainer]}>
            <CommonHeader
                onBackPress={onBackPress}
                headerName={headerName}
                iconContainer={[style.iconContainerStyle, iconContainer]}
                textStyle={{
                    color: colors?.SurfCrest,
                }}
                mainContainer={{
                    marginHorizontal: moderateScale(0),
                }}
            />
        </View>
    );
};

export default CurvedHeader;

const style = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors?.prussianBlue,
        height: moderateScale(70),
        paddingTop: moderateScale(10),
        borderBottomLeftRadius: moderateScale(30),
        borderBottomRightRadius: moderateScale(30),
        paddingHorizontal: moderateScale(17),
    },
    iconContainerStyle: {
        backgroundColor: colors?.Daintree,
    }
});
