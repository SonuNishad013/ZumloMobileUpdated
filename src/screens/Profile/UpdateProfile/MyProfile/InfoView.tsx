import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import { EditIconSalt } from "../../../../assets";
import { formatSentenceCase } from "../../../../helper/sentenceCase";

interface Props {
  data?: any;
  containerStyle?: any;
  title?: any;
  onPressEdit?: any;
}
export const InfoView: React.FC<Props> = ({
  data,
  containerStyle,
  title,
  onPressEdit,
}) => {
  return (
    <>
      <View style={styles?.mainContainer}>
        <Text style={styles?.titleStyle}>{formatSentenceCase(title)}</Text>
        <TouchableOpacity onPress={() => onPressEdit()}>
          <EditIconSalt
            height={`${moderateScale(20)}`}
            width={`${moderateScale(20)}`}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.basicInfoContainer, containerStyle]}>
        {data.map((item: any, index: number) => {
          return (
            <View style={[styles.infoRow]} key={index}>
              <Text style={styles.infoLabel} numberOfLines={2}>
                {formatSentenceCase(item.title)}
              </Text>
              <Text style={styles.infoText} numberOfLines={2}>
                {getValue(item)}
              </Text>
            </View>
          );
        })}
      </View>
    </>
  );
};

const getValue = (item: any) => {
  console.log("item getValue getValue ->  ", item.value, JSON.stringify(item));
  if (item?.key == "age") return `${!item.value ? "NA" : `${item.value}yrs`}`;
  else if (item?.key?.toLowerCase() == "ethnicity") {
    return item?.value == "" ? "NA" : item?.value?.toString();
  } else return item?.value ? item?.value : "NA";
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  titleStyle: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginRight: moderateScale(10),
  },
  basicInfoContainer: {
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(6),
    marginTop: moderateScale(10),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(5),
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  infoLabel: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    flex: 1,
  },
  infoText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    maxWidth: moderateScale(200),
    textAlign: "right",
  },
});
