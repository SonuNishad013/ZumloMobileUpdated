import React, { ReactElement, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import { ForwordBackArrowIcon } from "../../../assets";
import colors from "../../../constant/colors";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  FormCommuityData?: any;
}
const FormCommuity: React.FC<Props> = ({
  navigation,
  FormCommuityData,
}): ReactElement => {
  const renderFormCommunity = (item: any, index: number, from: any) => {
    // Define an array of background colors
    const backgroundColors = [
      from == 1 ? colors.backgroundTheme : colors.prussianBlue,
      from == 1 ? colors.prussianBlue : colors.OceanGreen,
      from == 1 ? colors.OceanGreen : colors.rgbaBackgroundTheme,
      from == 1 ? colors.rgbaBackgroundTheme : colors.backgroundTheme,
    ];
    // Get the background color based on the index
    const backgroundColor = backgroundColors[index % backgroundColors.length];
    return (
      <View>
        <View style={[styles.mainContainer, { backgroundColor }]}>
          <View style={styles?.setMargin}>
            {item?.type && <Text style={styles?.typeText}>{item?.type}</Text>}
            {item?.heading && (
              <Text style={styles?.headingText}>{item?.heading}</Text>
            )}
            {item?.description && (
              <Text style={styles?.descText}>{item?.description}</Text>
            )}
            <View style={styles?.alignmentCenterView}>
              <Text style={styles?.timeView}>
                {item?.timePeriod + strings?.minutes}
              </Text>
              <View style={styles.iconContainer}>
                <ForwordBackArrowIcon />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <HeaderWithNameSeeAll
        name={strings?.Form_Community}
        container={styles?.marginLeftRight}
      />
      <View style={styles?.flexRowView}>
        <FlatList
          data={FormCommuityData.filter(
            (item: any, index: number) => index % 2 !== 0
          )}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) =>
            renderFormCommunity(item, index, "1")
          }
        />
        <FlatList
          data={FormCommuityData.filter(
            (item: any, index: number) => index % 2 == 0
          )}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) =>
            renderFormCommunity(item, index, "2")
          }
        />
      </View>
    </View>
  );
};

export default FormCommuity;
const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: moderateScale(10),
    width: width / 2.4,
    marginTop: moderateScale(5),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(8),
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40),
    backgroundColor: colors.SurfCrest,
  },
  setMargin: {
    margin: moderateScale(15),
  },
  typeText: {
    color: colors.lightblue,
    fontSize: textScale(10),
    fontWeight: "300",
  },
  headingText: {
    color: colors.lightblue,
    fontSize: textScale(14),
    fontWeight: "600",
    marginVertical: moderateScale(10),
  },
  descText: {
    color: colors.lightblue,
    fontSize: textScale(13),
    fontWeight: "400",
    marginVertical: moderateScale(10),
  },
  alignmentCenterView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeView: {
    color: colors.lightblue,
    fontSize: textScale(12),
    fontWeight: "400",
  },
  marginLeftRight: {
    marginHorizontal: moderateScale(19),
  },
  flexRowView: {
    flexDirection: "row",
  },
});
