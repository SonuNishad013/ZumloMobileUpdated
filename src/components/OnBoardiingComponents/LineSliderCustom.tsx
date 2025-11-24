import React, { useEffect, useState } from "react";
import colors from "../../constant/colors";
import CommonVerticalSlider from "../CommonVerticalSlider/CommonVerticalSlider";
import { LayoutAnimation, View } from "react-native";
interface Props {
  items?: any;
  onchangeOptionsValue?: any;
  itemIdx?: number;
}
const LineSliderCustom: React.FC<Props> = ({
  items,
  onchangeOptionsValue,
  itemIdx,
}) => {
  const [data, setData] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState(0);
  const [showSlider, setShowSlider] = useState(true);

  useEffect(() => {
    setShowSlider(false);
    let index = items?.findIndex((itm: any) => itm?.isSelected);

    setSelectedValue(index != -1 ? index : 0);
    setTimeout(() => {
      setShowSlider(true);
      LayoutAnimation.spring();
    }, 20);
  }, [itemIdx]);

  useEffect(() => {
    if (items == undefined) return;
    setData(items);
  }, [items]);
  const handleSliderChange = (value: number) => {
    setSelectedValue(Math.round(value));
  };
  useEffect(() => {
    onchangeOptionsValue(selectedValue);
  }, [selectedValue]);

  console.log("itemIdx ------selectedValue->", itemIdx);
  console.log("first------selectedValue->", selectedValue);
  return (
    <View style={{ height: 460 }}>
      {showSlider && data?.length > 0 && (
        <CommonVerticalSlider
          value={selectedValue}
          min={0}
          max={data?.length - 1}
          step={1}
          onChange={handleSliderChange}
          labels={data}
          trackColor={colors?.lightSurfCrest34}
          containerStyle={{ marginTop: 20, alignSelf: "center" }}
          sliderStyle={{ backgroundColor: colors?.transparent }}
          scaleHeight={400}
          scaleWidth={90}
          indicatorStyle={{
            top: data?.length - 1 == selectedValue ? -70 : -35,
          }}
        />
      )}
    </View>
  );
};

export default LineSliderCustom;
