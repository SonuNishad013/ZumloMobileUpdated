import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import OtherActivityCard from "../../../components/Cards/OtherActivityCard";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import SeeAllHeaderWellness from "../Wellness/commonHeader";

interface Props {
  data?: any;
}
const OtherActivityList: React.FC<Props> = ({ data }) => {
  return (
    <>
      <SeeAllHeaderWellness
        name={"Other"}
        nameText={{ color: colors?.SurfCrest }}
      />
      <FlatList
        style={{ marginTop: moderateScale(5) }}
        keyExtractor={(item, index) => "key" + index}
        data={data}
        renderItem={({ item, index }) => {
          const cardBG = [
            colors?.polishedPine,
            colors?.pbLight,
            colors?.SaltBox,
            colors?.SurfCrest,
          ];
          const textColor = [
            colors?.lightprussianBlue,
            colors?.SurfCrest,
            colors?.royalOrange,
            colors?.prussianBlue,
          ];
          return (
            <>
              <OtherActivityCard
                title={item?.title}
                icon={item?.icon}
                container={{
                  backgroundColor: cardBG[index % cardBG.length],
                }}
                text={{
                  color: textColor[index % textColor.length],
                }}
                line={{
                  backgroundColor: textColor[index % textColor.length],
                }}
              />
            </>
          );
        }}
      />
    </>
  );
};

export default OtherActivityList;

const styles = StyleSheet.create({});
