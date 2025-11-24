import React from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { height, textScale, width } from '../../constant/responsiveStyle';

export interface Props {
    TextStyle?: any;
    mainContainer?: any;
    innerContainer?: any;
    ImageView?: any;
    ButtonName: string;
    onPress?: () => void;
}

const ButtonWithIcon: React.FC<Props> = ({
    TextStyle, mainContainer, innerContainer, ImageView,
    ButtonName, onPress
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#2145A4', flexDirection: 'row',
                height: height / 15, justifyContent: 'center', alignItems: 'center', width: width, ...mainContainer
            }}
        >
            {
                ImageView
            }
            <View style={{ marginHorizontal: 10, justifyContent: 'center', alignItems: 'center', ...innerContainer }}>
                <Text style={{ ...TextStyle, fontSize: textScale(12) }}>{ButtonName}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default ButtonWithIcon