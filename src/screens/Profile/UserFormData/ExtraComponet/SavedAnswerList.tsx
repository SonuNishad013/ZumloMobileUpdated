import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { strings } from "../../../../constant/strings";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import GetFamilyJSON_UI from "./GetFamilyJSON_UI";
interface Props {
  data?: any;
}
const SavedAnswerList: React.FC<Props> = ({ data }) => {
  const [answerList, setAnswerList] = useState<any>([]);
  useEffect(() => {
    if (answerList == undefined) return;
    setAnswerList(data);
  }, [data]);
  // console.log("first-answerList-->", answerList);

  const isAddYourSpecificationsSelected = (data: any) => {
    return data?.stepOptions?.some(
      (item: any) =>
        item?.optionValue === strings?.addSpecifications &&
        item.isSelected === true
    );
  };

  return (
    <>
      {answerList?.steps?.length > 0 ? (
        <FlatList
          data={answerList?.steps}
          ItemSeparatorComponent={() => <View style={styles?.itemSeparator} />}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }: any) => {
            let isOther = isAddYourSpecificationsSelected(item);
            return (
              <>
                {!item?.isJsonStructure && (
                  <Text style={styles.titleText}>
                    {formatSentenceCase(item?.stepName)}
                  </Text>
                )}
                {!item?.isJsonStructure && (
                  <>
                    <View style={styles?.containerStyel}>
                      {item?.stepOptions?.length > 0 && (
                        <>
                          {item?.stepOptions?.map((itms: any) => {
                            return (
                              <>
                                {itms?.isSelected &&
                                  itms?.optionValue !=
                                    strings?.addSpecifications && (
                                    <Text style={styles?.itemText}>
                                      {formatSentenceCase(itms?.optionValue)}
                                    </Text>
                                  )}
                              </>
                            );
                          })}
                        </>
                      )}
                    </View>
                  </>
                )}
                {item?.answer && !item?.isJsonStructure && (
                  <Text style={styles.itemText}>
                    {isOther ? "Other: " : ""}
                    {formatSentenceCase(item?.answer)}
                  </Text>
                )}
                {item?.isJsonStructure &&
                  item?.fieldType == fieldType?.jsonText && (
                    <GetFamilyJSON_UI familyData={item?.other} />
                  )}
              </>
            );
          }}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            {formatSentenceCase(strings?.noData)}
          </Text>
        </View>
      )}
    </>
  );
};

export default SavedAnswerList;

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
