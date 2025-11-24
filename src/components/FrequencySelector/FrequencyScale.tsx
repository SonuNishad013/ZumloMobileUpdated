import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  data?: any;
  onChangeFrequency?: any;
}

const FrequencyScale: React.FC<Props> = ({ data, onChangeFrequency }) => {
  const [selected, setSelected] = useState(
    data ? data.findIndex((itm: any) => itm?.isSelected) ?? 0 : 0
  );
  const [frequencyData, setFrequencyData] = useState<any>([]);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (data == undefined) return;
    setFrequencyData(data);
  }, [data]);

  useEffect(() => {
    onChangeFrequency(selected);
  }, [selected]);

  const getWidth = () => {
    switch (selected) {
      case 0:
        return "15%";
      case 1:
        return "33%";
      case 2:
        return "48%";
      case 3:
        return "73%";
      case 4:
        return "97%";
      default:
        return "97%";
    }
  };

  let arr: any = [];
  const an = () => {
    for (let i = 0; i < 80; i++) {
      arr.push(i);
    }
  };
  an();

  const getColor = () => {
    switch (selected) {
      case 0:
        return 12;
      case 1:
        return 28;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const generateRandomNumbers = () => {
      const numbers = [];
      for (let i = 0; i < 80; i++) {
        const randomNumber = Math?.floor(Math.random() * (55 - 12 + 1)) + 12;
        numbers.push(randomNumber);
      }
      numbers.sort((a, b) => a - b);
      setRandomNumbers(numbers);
    };

    generateRandomNumbers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sticksContainer}>
        {arr?.map((item: any) => (
          <View
            key={item}
            style={[
              styles.stick,
              {
                height: randomNumbers[item],
                backgroundColor: getColor() > item ? "white" : "gray",
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: getWidth(),
            },
          ]}
        />
        {selected >= 0 && (
          <View style={styles.selectedCircle}>
            <View style={styles.selectedInnerCircle} />
          </View>
        )}
      </View>
      <FlatList
        data={frequencyData}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(index)}
              style={styles.touchableContainer}
            >
              <Text
                style={[
                  styles?.optionText,
                  {
                    color:
                      index == selected
                        ? colors?.royalOrangeDark
                        : colors?.SurfCrest,
                  },
                ]}
              >
                {item?.optionValue}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FrequencyScale;

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(20),
    marginLeft: moderateScale(5),
  },
  sticksContainer: {
    height: 50,
    width: "98%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  stick: {
    width: 2,
    marginRight: 1,
  },
  progressBarContainer: {
    width: "98%",
    height: 6,
    backgroundColor: colors?.SurfCrest,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 3,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors?.royalOrangeDark,
    borderRadius: 3,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  selectedCircle: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(20),
    backgroundColor: "rgba(255, 157, 72, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    left: -5,
  },
  selectedInnerCircle: {
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: moderateScale(14),
    backgroundColor: colors?.royalOrangeDark,
  },
  flatListContainer: {
    justifyContent: "space-evenly",
    backgroundColor: colors?.transparent,
    width: "97%",
  },
  touchableContainer: {
    backgroundColor: colors?.transparent,
  },
  optionText: {
    fontSize: textScale(10),
    fontWeight: "400",
    padding: moderateScale(10),
  },
});
