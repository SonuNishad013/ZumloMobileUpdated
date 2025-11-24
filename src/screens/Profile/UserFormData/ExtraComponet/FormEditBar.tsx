import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import navigationString from "../../../../navigation/navigationString";
import { EditIconSalt } from "../../../../assets";
import colors from "../../../../constant/colors";
import SavedAnswerList from "./SavedAnswerList";
import { formatSentenceCase } from "../../../../helper/sentenceCase";

interface Props {
  item?: any;
  navigation?: any;
  index?: any;
  codeId?: any;
  categoryId?: any;
  headerName?: any;
  editLabel?: string;
  editSubtext?: string;
}
const FormEditBar: React.FC<Props> = ({
  item,
  navigation,
  index,
  codeId,
  categoryId,
  headerName,
  editLabel,
  editSubtext,
}: any) => {
  const colorArray = [
    colors?.polishedPine,
    colors?.SaltBox,
    colors?.prussianBlue,
  ];

  const setScreen = async (data: any) => {
    navigation?.navigate(navigationString?.CategoryQuestionData, {
      data,
      codeId: codeId,
      categoryId: categoryId,
      headerName: headerName,
    });
  };

  return (
    <View
      style={[
        styles?.container,
        { marginBottom: editSubtext ? moderateScale(20) : 0 },
      ]}
    >
      <View style={styles?.mainContainer}>
        <Text style={styles?.titleStyle}>
          {editLabel || formatSentenceCase(item?.codeName)}
        </Text>
        <TouchableOpacity onPress={() => setScreen(item)}>
          <EditIconSalt
            height={`${moderateScale(20)}`}
            width={`${moderateScale(20)}`}
          />
        </TouchableOpacity>
      </View>
      {editSubtext && (
        <Text style={[styles?.titleStyle, { marginBottom: moderateScale(10) }]}>
          {editSubtext}
        </Text>
      )}
      <View
        style={[
          styles.containerBox,
          {
            backgroundColor: colorArray[index % colorArray?.length],
          },
        ]}
      >
        <SavedAnswerList data={item} />
      </View>
    </View>
  );
};

export default FormEditBar;

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
