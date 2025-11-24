import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { strings } from "../../../constant/strings";
import LineSeclectionButton from "../../OnBoardiingComponents/LineSeclectionButton";
import { moderateScale } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import { allStepName } from "../../../constant/AllGlobalNameConstant";

interface Props {
  itemData?: any;
  itemIdx?: any;
  onPress?: any;
}
const MultiSelectLine: React.FC<Props> = ({ onPress, itemIdx, itemData }) => {
  return (
    <FlatList
      data={itemData[itemIdx]?.stepOptions}
      style={{
        marginHorizontal: moderateScale(19),
        marginTop: moderateScale(25),
      }}
      scrollEnabled={false}
      keyExtractor={(item, index) => "key" + index}
      renderItem={({ item, index }) => (
        <>
          {item?.optionValue !== strings?.addSpecifications && (
            <LineSeclectionButton
              // onPress={() => {
              //   setData(
              //     renderUpdatedStepOptions(
              //       itemIdx,
              //       index,
              //       itemData,
              //       item?.optionValue
              //     )
              //   );
              // }}
              onPress={() => onPress(index, item?.optionValue)}
              isImage={true}
              source={item?.logo ? { uri: item?.logo } : imagePath?.People}
              title={item?.optionValue}
              touchStyle={{
                backgroundColor: item?.isSelected
                  ? colors?.polishedPine
                  : colors?.transparent,
              }}
              textStyle={{ flex: 1 }}
              isRightIcon={item?.isSelected || false}
              imageStyle={{
                height: [allStepName?.sleep_Quality]?.includes(
                  itemData[itemIdx]?.stepName
                )
                  ? moderateScale(40)
                  : moderateScale(22),
                width: true ? moderateScale(40) : moderateScale(22),
              }}
            />
          )}
        </>
      )}
    />
  );
};

export default MultiSelectLine;

const styles = StyleSheet.create({});
