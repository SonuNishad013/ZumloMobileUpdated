import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";
interface Props {
  index?: any;
}
const TrainingSpeed: React.FC<Props> = ({ index }) => {
  console.log("first", index);
  const data = [
    {
      key: 1,
    },
    {
      key: 2,
    },
    {
      key: 3,
    },
    {
      key: 4,
    },
    {
      key: 5,
    },
  ];
  const [selectedIndx, setSelectedIndx] = useState(1);
  const onSelection = (item: any) => {
    console.log("check item", item);

    setSelectedIndx(item?.key);
  };
  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: moderateScale(10),
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedIndx === item.key ? colors?.polishedPine : "transparent",
            borderRadius: moderateScale(10),
          }}
          onPress={() => onSelection(item)}
        >
          <Text
            style={{
              fontSize: textScale(14),
              fontWeight: "600",
              color:
                selectedIndx === item.key
                  ? colors?.prussianBlue
                  : colors?.polishedPine,
              padding: 15,
            }}
          >
            {item?.key}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSpeed = () => {
    return (
      <View style={styles?.mainContainer}>
        {/* <View style={styles?.subContainer}>
          <Text style={styles?.speedText}>{selectedIndx} </Text>
          <Text style={styles?.speedX}>X</Text>
        </View> */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              alignItems: "flex-end",
              // backgroundColor: "red",
            }}
          >
            <Text style={styles?.speedText}>{selectedIndx}</Text>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              marginHorizontal: moderateScale(5),
            }}
          >
            <Text style={styles?.speedX}>{"X"}</Text>
          </View>
        </View>
      </View>
    );
  };
  const renderBar = () => {
    return (
      <View style={styles?.barView}>
        <FlatList
          horizontal
          keyExtractor={(item, index) => "key" + index}
          data={data}
          renderItem={renderItem}
        />
      </View>
    );
  };
  const renderTraining = () => {
    return (
      <View>
        <Text style={styles?.trainingText}>
          {strings?.userInfo?.startTraining}
        </Text>
      </View>
    );
  };
  return (
    <View>
      {renderSpeed()}
      {renderBar()}
      {renderTraining()}
    </View>
  );
};

export default TrainingSpeed;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    // width: moderateScale(200),
    flexDirection: "row",
    alignSelf: "center",
    // backgroundColor: "red",
    justifyContent: "center",
  },
  speedText: {
    fontSize: textScale(180),
    color: colors?.royalOrange,
    fontWeight: "700",
  },
  speedX: {
    fontSize: textScale(106),
    color: colors?.SurfCrest,
    fontWeight: "700",
    marginTop: moderateScale(51),
  },
  barView: {
    borderWidth: 1,
    // width: moderateScale(314),
    height: moderateScale(80),
    borderRadius: 35,
    borderColor: colors?.royalOrange,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  trainingText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    alignSelf: "center",
    marginTop: moderateScale(10),
  },
});
