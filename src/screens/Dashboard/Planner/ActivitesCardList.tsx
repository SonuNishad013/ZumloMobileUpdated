import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import ActivitesCard from "../../../components/Cards/ActivitesCard";
import Carousel from "react-native-snap-carousel";
import { moderateScale } from "../../../constant/responsiveStyle";
interface Props {
  data?: any;
}
const SLIDER_WIDTH = Dimensions.get("screen").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.72);
const ActivitesCardList: React.FC<Props> = ({ data }) => {
  const carouselRef = useRef(null);
  const renderItem = ({ item, index }: any) => {
    return (
      <ActivitesCard
        btnTitle={item?.title}
        description={item?.description}
        image={item?.imagePath}
      />
    );
  };

  return (
    <View style={style?.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};

export default ActivitesCardList;

const style = StyleSheet.create({
  container: { marginTop: moderateScale(30) },
});
