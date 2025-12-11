import React, { useEffect } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    useDerivedValue,
    interpolate,
    Extrapolation,
    runOnJS,
    withDecay,
    withTiming,
    cancelAnimation,
} from 'react-native-reanimated';
import colors from '../../constant/colors';

interface WheelPickerProps {
    data: any[];
    itemHeight: number;
    visibleItems?: number;
    initialIndex?: number;
    onSelected?: (item: any, index: number) => void;
    textStyle?: any;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
    data,
    itemHeight,
    visibleItems = 5,
    initialIndex = 0,
    onSelected,
    textStyle,
}) => {
    const translateY = useSharedValue(-initialIndex * itemHeight);
    const containerHeight = itemHeight * visibleItems;
    const maxTranslateY = 0;
    const minTranslateY = -(data.length - 1) * itemHeight;
    const context = useSharedValue({ y: 0 });

    useEffect(() => {
        translateY.value = -initialIndex * itemHeight;
    }, [initialIndex, itemHeight]);

    const gesture = Gesture.Pan()
        .onStart(() => {
            cancelAnimation(translateY);
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = context.value.y + event.translationY;
        })
        .onEnd((event) => {
            const snapPoint = (val: number) => {
                'worklet';
                const index = Math.round(-val / itemHeight);
                const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
                return -clampedIndex * itemHeight;
            };

            const targetY = withDecay({
                velocity: event.velocityY,
                deceleration: 0.998,
                clamp: [minTranslateY, maxTranslateY],
            });

            // Calculate intended snap point manually for better control
            const visualTargetY = translateY.value + event.velocityY * 0.2;
            const snappedY = snapPoint(visualTargetY);

            translateY.value = withTiming(snappedY, { duration: 500 }, (finished) => {
                if (finished && onSelected) {
                    const finalIndex = Math.round(-snappedY / itemHeight);
                    runOnJS(onSelected)(data[finalIndex], finalIndex);
                }
            });
        });

    const initialOffset = (containerHeight - itemHeight) / 2;

    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value + initialOffset }],
        };
    });

    return (
        <GestureHandlerRootView style={[styles.container, { height: containerHeight }]}>
            <View style={[styles.overlay, { height: itemHeight, top: (containerHeight - itemHeight) / 2 }]} pointerEvents="none" />
            <GestureDetector gesture={gesture}>
                <View style={styles.maskContainer}>
                    <Animated.View style={[styles.contentContainer, animatedContainerStyle]}>
                        {data.map((item, index) => {
                            return (
                                <WheelPickerItem
                                    key={index}
                                    index={index}
                                    item={item}
                                    itemHeight={itemHeight}
                                    translateY={translateY}
                                    textStyle={textStyle}
                                    visibleItems={visibleItems}
                                />
                            );
                        })}
                    </Animated.View>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

const WheelPickerItem = ({ index, item, itemHeight, translateY, textStyle, visibleItems }: any) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 2) * itemHeight, // Top
            (index - 1) * itemHeight,
            index * itemHeight,       // Center
            (index + 1) * itemHeight,
            (index + 2) * itemHeight, // Bottom
        ].map((val) => -val); // Invert because translateY is negative

        const scale = interpolate(
            translateY.value,
            inputRange,
            [0.8, 0.9, 1.1, 0.9, 0.8],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            translateY.value,
            inputRange,
            [0.3, 0.5, 1, 0.5, 0.3],
            Extrapolation.CLAMP
        );

        const rotateX = interpolate(
            translateY.value,
            inputRange,
            [45, 25, 0, -25, -45],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { scale },
                { perspective: 1000 },
                { rotateX: `${rotateX}deg` }
            ],
            opacity,
            height: itemHeight,
        };
    });

    return (
        <Animated.View style={[styles.itemContainer, { height: itemHeight }, animatedStyle]}>
            <Text style={[styles.text, textStyle]}>{item.title || item}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskContainer: {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        alignItems: 'center',
        // paddingTop handled by transform logic
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 18,
        color: colors?.SurfCrest,
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        // backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle highlight
        zIndex: 10,
    },
});

export default WheelPicker;
