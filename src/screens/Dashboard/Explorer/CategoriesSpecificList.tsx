import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoriesSpecificCard from "../../../components/Cards/CategoriesSpecificCard";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";

interface Props {
  data?: any;
}
const CategoriesSpecificList: React.FC<Props> = ({ data }) => {
  return (
    <>
      <HeaderWithNameSeeAll
        name={"Categories specific"}
        nameText={{ color: colors?.SurfCrest }}
      />
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => {
          return (
            <CategoriesSpecificCard
              title={item?.title}
              btnName={item?.btnName}
              icon={item?.icon}
            />
          );
        }}
      />
    </>
  );
};
export default CategoriesSpecificList;
