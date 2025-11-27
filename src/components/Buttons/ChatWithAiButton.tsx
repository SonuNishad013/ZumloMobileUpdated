import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { ChatWithAi } from '../../assets';
import { moderateScale } from '../../constant/responsiveStyle';

interface Props {
    onPress: () => void;
    style?: ViewStyle;
}

const ChatWithAiButton: React.FC<Props> = ({ onPress, style }) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[
                styles.container,
                { bottom: moderateScale(90) },
                style,
            ]}
        >
            <ChatWithAi height={moderateScale(56)} width={moderateScale(57)} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: moderateScale(15),
        alignItems: 'center',
        borderRadius: 100,
        zIndex: 100, // Ensure it's above other elements
    },
});

export default ChatWithAiButton;
