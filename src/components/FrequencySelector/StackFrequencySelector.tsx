import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";

const ItemSeparator = () => {
  return <View style={styles.itemSeparator} />;
};

const StackFrequencySelector = ({ selected, data, setSelected }: any) => {
  const getIndexForBG = (index: any) => {
    if (index >= selected) {
      return colors?.royalOrange;
    } else {
      return;
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors?.lightSurfCrest02,
        width: moderateScale(180),
        alignItems: "center",
        borderRadius: moderateScale(15),
        borderWidth: moderateScale(1),
        borderColor: colors?.SurfCrest,
        paddingVertical: moderateScale(2),
        marginVertical: moderateScale(20),
        alignSelf: "center",
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        scrollEnabled={false}
        renderItem={({ item, index }: any) => {
          let lastIndex = data?.length - 1;

          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(index);
              }}
            >
              <View
                style={{
                  height: moderateScale(90),
                  width: moderateScale(175),
                  borderColor: colors?.SurfCrest,
                  borderTopLeftRadius:
                    index === selected ? moderateScale(15) : 0,
                  borderTopRightRadius:
                    index === selected ? moderateScale(15) : 0,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: getIndexForBG(index),
                  borderBottomRightRadius:
                    index === lastIndex ? moderateScale(15) : 0,
                  borderBottomLeftRadius:
                    index === lastIndex ? moderateScale(15) : 0,
                }}
              >
                {item?.logo !== null && (
                  <Image
                    source={{ uri: item?.logo }}
                    style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                      tintColor:
                        index >= selected
                          ? colors?.prussianBlue
                          : colors?.lightSurfCrest,
                    }}
                    resizeMode={"contain"}
                  />
                )}
                <Text
                  style={{
                    fontSize: textScale(14),
                    color:
                      index >= selected
                        ? colors?.prussianBlue
                        : colors?.SurfCrest,
                    fontWeight: "600",
                    marginTop: moderateScale(10),
                  }}
                >
                  {item?.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => ItemSeparator()}
      />
    </View>
  );
};

export default StackFrequencySelector;

const styles = StyleSheet.create({
  itemSeparator: {
    flex: 1,
    height: moderateScale(0.9),
    backgroundColor: colors?.surfCrustOp,
    marginHorizontal: moderateScale(20),
  },
});
