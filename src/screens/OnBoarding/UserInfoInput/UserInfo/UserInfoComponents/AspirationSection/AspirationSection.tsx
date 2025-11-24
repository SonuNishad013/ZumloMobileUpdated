import { Text, Dimensions } from "react-native";
import React, { ReactElement, useRef } from "react";
import Carousel from "react-native-snap-carousel";
import AspirationsCard from "../../../../../../components/Cards/AspirationsCard";
import { styles } from "./styles";

interface Props {
  navigation?: any;
  AspirationSectionData?: any;
  allData?: any;
}

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7); // 70% of the screen width

const AspirationSection: React.FC<Props> = ({
  navigation,
  AspirationSectionData,
  allData,
}) => {
  const carouselRef = useRef(null);
  const renderItem = ({ item, index }: any) => {
    return (
      <AspirationsCard
        title={item?.title}
        description={item?.description}
        image={item?.imageUrl}
      />
    );
  };

  return (
    <>
      <Text style={styles.Text}>{allData?.stepDescription}</Text>
      <Carousel
        ref={carouselRef}
        containerCustomStyle={styles?.flatContainer}
        data={AspirationSectionData}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </>
  );
};
export default AspirationSection;
