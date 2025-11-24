import React from 'react';
import { View, Text } from 'react-native';
import { Successmark, CloseIcon } from '../../../../assets';
import { moderateScale, textScale } from '../../../../constant/responsiveStyle';
import colors from '../../../../constant/colors';

const ValidationRow = ({ condition, text }: { condition: boolean, text: string }) => {
    return (
        <View style={{ marginTop: moderateScale(5), flexDirection: 'row', alignItems: 'center' }}>
            {condition ? (
                <Successmark width={`${moderateScale(20)}`} height={`${moderateScale(20)}`} />
            ) : (
                <CloseIcon width={`${moderateScale(20)}`} height={`${moderateScale(20)}`} />
            )}
            <Text
                style={{
                    fontSize: condition ? textScale(12) : textScale(10),
                    color: condition ? colors.darkPrussianBlue : colors.lightprussianBlue,
                    fontWeight: condition ? '600' : '400',
                    marginLeft: moderateScale(5), // Add some space between the icon and text
                }}
            >
                {text}
            </Text>
        </View>
    );
};

export default ValidationRow;
