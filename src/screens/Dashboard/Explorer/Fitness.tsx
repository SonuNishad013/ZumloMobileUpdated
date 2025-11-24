import React, { ReactElement } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import SeeAllHeader from "../Planner/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { FitnessGroupIcon1, PersonWithCycle, PotIcon } from "../../../assets";

interface Props {
  navigation?: any;
  FitnessData?: any;
}

const Fitness: React.FC<Props> = ({
  navigation,
  FitnessData,
}): ReactElement => {
  const renderFitness = (item: any, index: any) => {
    return (
      <View style={styles.FitnessContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: width / 3, padding: moderateScale(15) }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: moderateScale(2),
                  backgroundColor: colors.grey,
                  borderRadius: moderateScale(10),
                }}
              />
              <View style={{ marginHorizontal: moderateScale(10) }}>
                <Text
                  style={{
                    fontSize: textScale(15),
                    fontWeight: "700",
                    color: colors.prussianBlue,
                  }}
                >
                  {item?.title}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: moderateScale(30) }}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.grey,
                  height: moderateScale(27),
                  borderWidth: moderateScale(1),
                  borderRadius: moderateScale(10),
                  borderColor: colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: textScale(15),
                    fontWeight: "700",
                    color: colors.white,
                  }}
                >
                  {"Learn More!"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                marginTop: moderateScale(10),
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <FitnessGroupIcon1 />
            </View>
            <View
              style={{ flexDirection: "column", justifyContent: "flex-end" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ justifyContent: "flex-end" }}>
                  <PersonWithCycle />
                </View>
                <View style={{ justifyContent: "flex-end" }}>
                  <PotIcon />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {SeeAllHeader("Fitness", "")}
      <View style={styles.flatListContainer}>
        <FlatList
          data={FitnessData}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => renderFitness(item, index)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
  },
  flatListContainer: {
    marginHorizontal: moderateScale(15),
  },
  FitnessContainer: {
    borderRadius: moderateScale(10),
    backgroundColor: colors.rgbaSilverChalice,
  },
});

export default Fitness;
