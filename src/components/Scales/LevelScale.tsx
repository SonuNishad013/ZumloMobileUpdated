import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  data?: any;
  onChangeslevel?: any;
  isShowLogo?: any;
}
const renderItemSeperator = () => {
  return <View style={styles.separator} />;
};
const LevelScale: React.FC<Props> = ({ data, onChangeslevel, isShowLogo }) => {
  console.log("levelIndex-data>", data);
  const initialIndex = data ? data.findIndex((itm: any) => itm.isSelected) : -1;
  const [levelIndex, setLevelIndex] = useState<number>(
    initialIndex === -1 ? data?.length ?? 0 : initialIndex
  );

  const [levelData, setLevelData] = useState<any>([]);

  console.log("levelIndex-levelIndex->", levelIndex);

  useEffect(() => {
    if (data == undefined) return;
    setLevelData(data);
  }, [data]);

  useEffect(() => {
    onChangeslevel(levelIndex);
  }, [levelIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.levelContainer}>
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          data={levelData}
          scrollEnabled={false}
          renderItem={({ item, index }: any) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setLevelIndex(index);
                }}
              >
                <View
                  style={[
                    styles.levelItem,
                    {
                      borderRadius: moderateScale(15),
                      backgroundColor:
                        index === levelIndex
                          ? colors?.royalOrange
                          : colors?.transparent,
                    },
                  ]}
                >
                  {isShowLogo && (
                    <>
                      {item?.logo !== null && (
                        <Image
                          source={{ uri: item?.logo }}
                          style={[
                            styles.logo,
                            {
                              tintColor:
                                index >= levelIndex
                                  ? colors?.prussianBlue
                                  : colors?.lightSurfCrest,
                            },
                          ]}
                          resizeMode={"contain"}
                        />
                      )}
                    </>
                  )}
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          index == levelIndex
                            ? colors?.prussianBlue
                            : colors?.SurfCrest,
                      },
                    ]}
                  >
                    {formatSentenceCase(item?.optionValue)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={renderItemSeperator}
        />
      </View>
    </View>
  );
};

export default LevelScale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: moderateScale(20),
  },
  levelContainer: {
    backgroundColor: colors?.lightSurfCrest02,
    width: moderateScale(180),
    alignItems: "center",
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    borderColor: colors?.SurfCrest,
    paddingVertical: moderateScale(2),
    marginVertical: moderateScale(20),
  },
  levelItem: {
    height: moderateScale(90),
    width: moderateScale(175),
    borderColor: colors?.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  optionText: {
    fontSize: textScale(14),
    fontWeight: "600",
    marginTop: moderateScale(10),
  },
  separator: {
    flex: 1,
    height: moderateScale(0.9),
    backgroundColor: colors?.surfCrustOp,
    marginHorizontal: moderateScale(20),
  },
});
