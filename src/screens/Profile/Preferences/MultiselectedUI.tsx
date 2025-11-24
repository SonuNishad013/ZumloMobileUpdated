import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { strings } from "../../../constant/strings";
import { formatSentenceCase } from "../../../helper/sentenceCase";

interface Props {
  data?: any;
  where?: any;
}

const MultiselectedUI: React.FC<Props> = ({ data, where }) => {
  const [userPreferences, setUserPreferences] = useState<any>([]);
  useEffect(() => {
    if (userPreferences == undefined) return;
    setUserPreferences(data);
  }, [data]);

  const isAddYourSpecificationsSelected = (optionValue: any) => {
    if (optionValue === strings?.addSpecifications) {
      return strings?.other;
    }
    return optionValue;
  };

  return (
    <>
      {userPreferences?.subCategory?.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          data={userPreferences?.subCategory}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          renderItem={({ item, index }: any) => {
            // console.log("first---------````--->,-->", item);
            return (
              <>
                <Text style={styles.titleText}>
                  {formatSentenceCase(item?.stepName)}
                </Text>
                {item?.stepOption?.length > 0 && (
                  <View style={styles.itemContainer}>
                    {item?.stepOption?.map((itms: any, index: any) => {
                      return (
                        <>
                          {itms?.optionValue != 0 && (
                            <Text style={styles.itemText}>
                              {formatSentenceCase(
                                isAddYourSpecificationsSelected(
                                  itms?.optionValue
                                )
                              )}
                              {itms?.answer != "" &&
                                itms?.answer != undefined && (
                                  <>
                                    {formatSentenceCase(" : " + itms?.answer)}
                                  </>
                                )}
                              {/* {index == item?.stepOption.length - 1
                                ? "."
                                : ", "} */}
                            </Text>
                          )}
                          {itms?.optionValue == 0 && itms?.answer != "" && (
                            <>
                              {itms?.optionId == 0 &&
                                itms?.optionValue == "" &&
                                itms?.answer && (
                                  <Text style={styles.itemText}>
                                    {/* {itms?.answer + "."} */}
                                    {formatSentenceCase(itms?.answer)}
                                    {/* {itms?.answer ? itms?.answer + "." : ""} */}
                                  </Text>
                                )}

                              <>
                                {itms?.optionValue == "" &&
                                  itms?.answer?.trim() !== "" &&
                                  where == "MedicalHistory" && (
                                    <Text style={styles.itemText}>
                                      {/* {itms?.answer + "."} */}
                                      {formatSentenceCase(itms?.answer)}
                                      {/* {itms?.answer ? itms?.answer + "." : ""} */}
                                    </Text>
                                  )}
                              </>
                            </>
                          )}
                        </>
                      );
                    })}
                  </View>
                )}
              </>
            );
          }}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{strings?.noData}</Text>
        </View>
      )}
    </>
  );
};

export default MultiselectedUI;

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
  itemContainer: {
    marginTop: moderateScale(7),
  },
});
