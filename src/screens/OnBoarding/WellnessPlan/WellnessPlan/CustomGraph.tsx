import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import colors from '../../../../constant/colors';
import { moderateScale, textScale } from '../../../../constant/responsiveStyle';

const segments = Array.from({ length: 10 }, (_, index) => index + 1);
const CustomGraph = ({ level, getSelectedData }: any) => {
    const [selectedLevel, setSelectedLevel] = React.useState(getSelectedData !== undefined ? getSelectedData : 1);
    const rotateValue = useRef(new Animated.Value(0)).current;
    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const startRotation = () => {
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true, // Add this line
        }).start(() => {
            rotateValue.setValue(0); // Reset the value to 0 after the animation completes
        });
    };
    useEffect(() => {

        level(selectedLevel)
    }, [selectedLevel])

    useEffect(() => {
        startRotation(); // Start rotation on mount
    }, []);
    const calculatePath = (index, totalSegments, radius, innerRadius) => {
        const angle = Math.PI / totalSegments;
        const startAngle = index * angle - Math.PI / 2;
        const endAngle = startAngle + angle;

        const startX = radius * Math.cos(startAngle);
        const startY = radius * Math.sin(startAngle);
        const endX = radius * Math.cos(endAngle);
        const endY = radius * Math.sin(endAngle);

        const largeArcFlag = angle > Math.PI ? 1 : 0;

        const startXInner = innerRadius * Math.cos(endAngle);
        const startYInner = innerRadius * Math.sin(endAngle);
        const endXInner = innerRadius * Math.cos(startAngle);
        const endYInner = innerRadius * Math.sin(startAngle);

        return `
    M ${startX},${startY}
    A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}
    L ${startXInner},${startYInner}
    A ${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${endXInner},${endYInner}
    Z
  `;
    };
    const SemiCircularGraph = ({ selectedLevel, onSelect }: any) => {
        return (
            <View style={styles.container}>
                <View style={{
                    transform: [{ rotate: '-90deg' }]
                }}>
                    <Svg height="280" width="280" viewBox="0 0 200 200" style={{

                    }}>
                        <G x={100} y={100}>
                            {segments.map((segment, index) => (
                                <Path
                                    key={index}
                                    d={calculatePath(index, segments.length, 60, 100)}
                                    fill={selectedLevel >= segment ? colors.royalOrange : colors.SurfCrest}
                                    stroke="black"
                                    strokeWidth="1"
                                    onPress={() => onSelect(segment)}

                                />
                            ))}
                        </G>
                    </Svg>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>Level</Text>
                </View>
                <Text style={styles.levelText}>{selectedLevel}</Text>
            </View>
        );
    };

    return (
        <View style={styles.appContainer}>
            <SemiCircularGraph selectedLevel={selectedLevel} onSelect={setSelectedLevel} />
        </View>
    );
};

export default CustomGraph;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    labelContainer: {
        position: 'absolute',
        top: '45%',
        backgroundColor: colors?.SurfCrest,
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(15),
        borderRadius: moderateScale(15),
    },
    labelText: {
        fontSize: textScale(14),
        fontWeight: '500',
        color: colors.prussianBlue,
    },
    levelText: {
        position: 'absolute',
        top: '55%',
        fontSize: textScale(36),
        fontWeight: '700',
        color: colors.SurfCrest,
    },
    appContainer: {
        marginTop: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateScale(-80)
    },
});