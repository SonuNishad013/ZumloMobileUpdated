import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { parseJSONString } from "../../../../helper/FormHelpers";

interface Props {
  familyData?: any;
}
const GetFamilyJSON_UI: React.FC<Props> = ({ familyData }) => {
  const parsedData = parseJSONString(familyData);

  const renderKeyValuePair = ({ item }: any) => {
    return (
      <View>
        <Text style={[styles.titleText, { marginTop: moderateScale(10) }]}>
          {formatSentenceCase(item[0])}
        </Text>
        <Text style={[styles.itemText, { marginTop: moderateScale(5) }]}>
          {formatSentenceCase(item[1])}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ marginBottom: moderateScale(5) }}>
        <FlatList
          data={Object.entries(item)}
          renderItem={renderKeyValuePair}
          keyExtractor={(item, index) => `${item[0]}-${index}`}
        />
      </View>
    );
  };
  console.log("parsedData-->", parsedData);
  return (
    <View style={{ marginTop: moderateScale(-10) }}>
      {parsedData?.length == 0 ? (
        <View>
          <Text
            style={{
              color: colors?.SurfCrest,
              fontSize: textScale(14),
              fontWeight: "600",
              marginTop: moderateScale(10),
            }}
          >
            {"Please add family member"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={parsedData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `item-${index}`}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      )}
    </View>
  );
};

export default GetFamilyJSON_UI;

const styles = StyleSheet.create({
  titleText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  itemSeparator: {
    height: moderateScale(0.5),
    backgroundColor: colors?.SurfCrest,
    flex: 1,
    marginVertical: moderateScale(10),
  },
  itemText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  noDataContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  noDataText: {
    fontSize: textScale(14),
    color: colors?.SurfCrest,
  },
  containerStyel: { marginTop: moderateScale(10) },
});
