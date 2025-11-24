import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import MultiselectedUI from "./../MultiselectedUI";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import navigationString from "../../../../navigation/navigationString";
import { EditIconSalt } from "../../../../assets";
import colors from "../../../../constant/colors";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { cardHeaderNameAddOtherCTAButtonText } from "../../ProfileSectionLabels/OuterCardLabelAddMoreCTA";

interface Props {
  item?: any;
  navigation?: any;
  index?: any;
  globalCodeIdCat?: any;
  headerName?: any;
}
const EditView: React.FC<Props> = ({
  item,
  navigation,
  index,
  globalCodeIdCat,
  headerName,
}: any) => {
  const colorArray = [
    colors?.polishedPine,
    colors?.SaltBox,
    colors?.prussianBlue,
  ];
  const [globalCodeId, setGlobalCodeId] = useState(null);
  useEffect(() => {
    if (globalCodeIdCat == undefined) return;
    setGlobalCodeId(globalCodeIdCat);
  }, [globalCodeIdCat]);
  const setScreen = async (type: any, categoryId: any) => {
    navigation?.navigate(navigationString?.PreferencesRender, {
      uiType: type,
      categoryId,
      globalCodeId: globalCodeId,
      prevData: item?.subCategory,
      item: headerName,
    });
  };

  return (
    <View style={styles?.container}>
      <View style={styles?.mainContainer}>
        <Text style={styles?.titleStyle}>
          {formatSentenceCase(
            cardHeaderNameAddOtherCTAButtonText(item?.stepName)?.headerText
          ) || formatSentenceCase(item?.stepName)}
        </Text>
        <TouchableOpacity
          onPress={() => setScreen(item?.stepName, item?.categoryId)}
        >
          <EditIconSalt
            height={`${moderateScale(20)}`}
            width={`${moderateScale(20)}`}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.containerBox,
          {
            backgroundColor: colorArray[index % colorArray?.length],
          },
        ]}
      >
        <MultiselectedUI data={item} />
      </View>
    </View>
  );
};

export default EditView;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(10),
  },
  titleStyle: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginRight: moderateScale(10),
  },
  containerBox: {
    width: "auto",
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  container: {
    marginTop: moderateScale(10),
  },
});
