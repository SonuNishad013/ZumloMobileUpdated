import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { RightCircleIcon } from "../../../assets";

interface Props {
  activityData?: any;
}
const HeartRateActivity: React.FC<Props> = ({ activityData }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: textScale(14),
          fontWeight: "400",
          color: colors?.SurfCrest,
        }}
      >
        {"Select the activity of your heart."}
      </Text>
      <FlatList
        data={activityData}
        keyExtractor={(item, index) => "key" + index}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: colors?.white,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: moderateScale(15),
                  paddingHorizontal: moderateScale(2),
                  height: moderateScale(30),
                }}
              >
                {item?.isSelected && <RightCircleIcon />}
                <Text
                  style={{
                    paddingHorizontal: moderateScale(10),
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HeartRateActivity;

const styles = StyleSheet.create({});
