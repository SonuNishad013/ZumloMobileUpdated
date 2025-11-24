import React, { useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 40; // Each unit width
const TOTAL_MINUTES = 24 * 12; // Full day (5-min intervals for 24 hours)
const TIMES = [];

// Generate Time Labels (12 AM - 11 PM with 5-minute intervals)
for (let i = 0; i < TOTAL_MINUTES; i++) {
  const hour = Math.floor(i / 12);
  const minutes = (i % 12) * 5;
  const label =
    minutes === 0
      ? `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour} ${
          hour < 12 ? "AM" : "PM"
        }`
      : "";

  TIMES.push({ label, value: i });
}

const TimeSelector = () => {
  const flatListRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState("12 AM");
  const [sliderValue, setSliderValue] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    setSelectedTime(TIMES[index].label || selectedTime);
    setSliderValue(index);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setSelectedTime(TIMES[value].label || selectedTime);
    flatListRef.current?.scrollToOffset({
      offset: value * ITEM_WIDTH,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Time</Text>

      {/* Slider Component */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={TOTAL_MINUTES - 1}
        step={1}
        minimumTrackTintColor="#FFA500"
        maximumTrackTintColor="#FFFFFF"
        thumbTintColor="#FFA500"
        value={sliderValue}
        onValueChange={handleSliderChange}
      />

      {/* Time Picker UI */}
      <View style={styles.scrollContainer}>
        <View style={styles.highlightIndicator} />
        <FlatList
          ref={flatListRef}
          horizontal
          keyExtractor={(item, index) => "key" + index}
          data={TIMES}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingHorizontal: width / 2 - ITEM_WIDTH / 2,
          }}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <Svg height="50" width="100%">
                <Line
                  x1="20"
                  y1="0"
                  x2="20"
                  y2={index % 12 === 0 ? "50" : index % 6 === 0 ? "35" : "20"}
                  stroke="white"
                  strokeWidth="2"
                />
              </Svg>
              <Text
                style={[styles.timeLabel, !item.label && styles.smallLabel]}
              >
                {item.label}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Selected Time Display */}
      <Text style={styles.selectedTime}>Selected: {selectedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#5B4670",
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollContainer: {
    position: "relative",
    height: 80,
    overflow: "hidden",
  },
  highlightIndicator: {
    position: "absolute",
    width: 3,
    height: 50,
    backgroundColor: "#FFA500",
    left: width / 2 - 1.5,
    top: 0,
    zIndex: 1,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: "center",
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
  },
  smallLabel: {
    fontSize: 10,
    fontWeight: "400",
  },
  selectedTime: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginBottom: 20,
  },
});

export default TimeSelector;
