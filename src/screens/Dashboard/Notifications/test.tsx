import React, { useRef, useState } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import Svg, { Line } from "react-native-svg";
import Slider from "@react-native-community/slider";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = 40; // Each unit width
const TOTAL_MINUTES = 24 * 12; // Full day (5-min intervals for 24 hours)
const TIMES = [];

// Generate Time Labels (12 AM - 11:55 PM with 5-minute intervals)
for (let i = 0; i < TOTAL_MINUTES; i++) {
  const hour = Math.floor(i / 12);
  const minutes = (i % 12) * 5;
  const period = hour < 12 ? "AM" : "PM";
  const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const formattedMinutes = minutes === 0 ? "00" : minutes; // Ensure 5, 10, 15 appear as "05", "10", "15"

  const label = `${formattedHour}:${formattedMinutes} ${period}`;
  TIMES.push({ label, value: i });
}

const TimeSelector = () => {
  const flatListRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState("12:00 AM");
  const [sliderValue, setSliderValue] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
    if (TIMES[index]) {
      setSelectedTime(TIMES[index].label);
      setSliderValue(index);
    }
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setSelectedTime(TIMES[value].label);
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
          data={TIMES}
          keyExtractor={(item, index) => "key" + index}
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            console.log("item.label", item.label),
            (
              <View style={styles.itemContainer}>
                <Svg height="50" width="100%">
                  <Line
                    x1="20"
                    y1="0"
                    x2="20"
                    y2={index % 12 === 0 ? "50" : index % 6 === 0 ? "35" : "20"}
                    stroke="white"
                    strokeWidth="1"
                  />
                </Svg>
                <Text style={styles.timeLabel}>{item.label}</Text>
              </View>
            )
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
