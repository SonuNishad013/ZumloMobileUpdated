import React from 'react';
import {
    Platform,
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
    // Check if device is Android and version is 15 (API 35) or higher
    // Platform.Version on Android returns the API level
    const isAndroid15OrHigher = Platform.OS === 'android' && Platform.Version >= 35;

    // Determine bottom position based on OS and version
    const getBottomPosition = () => {
        if (Platform.OS === 'android') {
            return isAndroid15OrHigher ? moderateScale(90) : moderateScale(10);
        }
        return moderateScale(10); // iOS and others
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={[
                styles.container,
                { bottom: getBottomPosition() },
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
