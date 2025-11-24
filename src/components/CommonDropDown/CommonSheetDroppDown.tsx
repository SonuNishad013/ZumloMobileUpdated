import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import Dropdown from "../DropDown";
import { Enum_DropdownSheet } from "../../constant/ENUM";
import logger from "../../constant/logger";

const CommonSheetDroppDown = ({
  mainContainerStyle,
  dropDownListData,
  value,
  selectedItemData,
  placeholder,
  multiSelected,
  containerStyle,
  itemTextStyle,
  activeColor,
  selectedTextStyle,
  iconColor,
  placeholderStyle,
  isLabelName = true,
  dropdownPosition = Enum_DropdownSheet?.AUTO,
  invertColor = false,
}: any) => {
  logger("invertColor____", invertColor);
  const [dropDownList, setDropDownList] = useState(dropDownListData);
  useEffect(() => {
    setDropdownData();
  }, [dropDownListData]);

  const setDropdownData = () => {
    let data = [];
    for (let elem of dropDownListData) {
      data.push({
        ...elem,
        label: elem.title,
        value: elem.title,
      });
    }
    setDropDownList(data);
  };
  return (
    <Dropdown
      style={[styles?.mainContainer, mainContainerStyle]}
      containerStyle={[styles?.containerStyle, containerStyle]}
      placeholderStyle={[
        {
          fontSize: moderateScale(14),
          color: invertColor ? colors?.prussianBlue : colors?.SurfCrest,
        },
        placeholderStyle,
      ]}
      selectedTextStyle={[styles?.selectedTextStyle, selectedTextStyle]}
      iconStyle={styles?.iconStyle}
      data={dropDownList}
      itemTextStyle={[styles?.itemTextStyle, itemTextStyle]}
      activeColor={activeColor || colors?.prussianBlue}
      maxHeight={300}
      labelField={"label"}
      valueField={"value"}
      multiSelected={multiSelected}
      placeholder={placeholder}
      value={value}
      onChange={selectedItemData}
      mode={Enum_DropdownSheet?.AUTO}
      iconColor={iconColor || colors?.prussianBlue}
      showsVerticalScrollIndicator={false}
      LabelName={
        !isLabelName ? isLabelName : value?.length == 0 ? "" : placeholder
      }
      dropdownPosition={dropdownPosition ?? Enum_DropdownSheet?.AUTO}
    />
  );
};

export default CommonSheetDroppDown;

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: moderateScale(1),
    height: moderateScale(56),
    justifyContent: "center",
    borderColor: colors?.polishedPine,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(9),
    marginVertical: moderateScale(5),
    backgroundColor: colors.lightSurfCrest,
    width: "100%",
  },
  containerStyle: {
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(15),
    borderColor: colors?.SurfCrest,
    overflow: "hidden",
  },
  selectedTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: colors?.prussianBlue,
    fontSize: textScale(14),
  },
  iconStyle: {
    width: moderateScale(30),
    height: moderateScale(25),
  },
  itemTextStyle: {
    color: colors?.SurfCrest,
  },
});
