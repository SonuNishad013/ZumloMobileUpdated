import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import LineSeclectionButton from "../../../../components/OnBoardiingComponents/LineSeclectionButton";
import { imagePath } from "../../../../assets/png/imagePath";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import {
  renderUpdatedStepOptions,
  updateAnswerRequest,
} from "../Helpers/HelperFun";
import LineHeading from "../LineHeading";
import MainHeading from "../MainHeading";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import { removedPreferresSubHeading } from "../../../../constant/ProfileConstant";

interface Props {
  questions?: any;
  parentObject?: any;
  updatedAnswer?: any;
  isLoading?: any;
}
const AccessibilityNeeds: React.FC<Props> = ({
  questions,
  parentObject,
  updatedAnswer,
  isLoading,
}) => {
  const [data, setData] = useState<any>(questions);
  const [parentObj, setParentObj] = useState<any>(parentObject);
  useEffect(() => {
    if (questions !== data || parentObject !== parentObj) {
      setData(questions);
      setParentObj(parentObject);
    }
  }, [questions, parentObject, data]);

  return (
    <View>
      <MainHeading heading={parentObj?.stepName} />
      {data?.map((itemsData: any, idx: any) => {
        return (
          <View key={idx}>
            {removedPreferresSubHeading?.includes(
              itemsData?.stepName
            ) ? null : (
              <LineHeading questionHeading={itemsData?.stepDescription} />
            )}
            {[fieldType?.multiSelect].includes(itemsData?.fieldType) && (
              <>
                <FlatList
                  data={itemsData?.stepOptions}
                  keyExtractor={(item, index) => "key" + index}
                  style={styles.flatList}
                  renderItem={({ item, index }) => (
                    <>
                      {item?.optionValue !== strings?.addSpecifications && (
                        <LineSeclectionButton
                          onPress={() => {
                            setData(renderUpdatedStepOptions(idx, index, data));
                          }}
                          source={
                            item?.logo ? { uri: item?.logo } : imagePath?.People
                          }
                          title={item?.optionValue}
                          touchStyle={{
                            backgroundColor: item?.isSelected
                              ? colors?.polishedPine
                              : colors?.transparent,
                          }}
                          textStyle={styles.lineSelectionText}
                        />
                      )}
                    </>
                  )}
                />
              </>
            )}
          </View>
        );
      })}
      <CommonButton
        mainContainer={styles.commonButtonContainer}
        btnName={strings?.save}
        isLoading={isLoading}
        onPress={() =>
          isLoading ? null : updatedAnswer(updateAnswerRequest(data))
        }
      />
    </View>
  );
};

export default AccessibilityNeeds;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(25),
    gap: moderateScale(10),
  },
  lineSelectionText: {
    flex: 1,
  },
  textInputStretch: {
    marginHorizontal: moderateScale(19),
    borderRadius: moderateScale(15),
    marginTop: moderateScale(15),
  },
  commonButtonContainer: {
    width: "auto",
    marginHorizontal: moderateScale(19),
    marginTop: moderateScale(20),
  },
});
