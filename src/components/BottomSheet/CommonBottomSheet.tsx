import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextProps,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
} from "react-native";

import colors from "../../constant/colors";
import BottomSheetContainer from "./bottomSheetContaner";
import {
  moderateScale,
  width,
  height,
  textScale,
} from "../../constant/responsiveStyle";
import {
  DownArrow,
  GreenSelectedCircle,
  OrgDown,
  UnselectedCircleIcon,
} from "../../assets";

interface BottomDropDownProps extends TextProps {
  renderItemComponent?: React.FunctionComponent<any>;
  dropDownListData: any[];
  inputLabel: string;
  value: string;
  toSetState?: any;
  keyToSelect: string;
  mainContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  inputLabelStyle?: TextStyle;
  errMsg?: string;
  errorContainer?: ViewStyle;
  setCodeForSelectedItem?: React.Dispatch<React.SetStateAction<string>>;
  keyForSelectedItem?: string;
  SelectedTextViewStyle?: ViewStyle;
  isError?: boolean;
  disable?: boolean;
  selectedItemData?: any;
  handleOnChangeEnable?: any;
  handleDropdownSelectionMainScreen?: any;
  isPopupTextNeed?: boolean;
  innerContainerStyle?: ViewStyle;
  textContainer?: ViewStyle;
  DropdownIconStyle?: ViewStyle;
  isScrollable?: boolean;
  isNFOTag?: boolean;
  isName?: boolean;
  valueKey?: string;
  isDiffrenderItemComponent?: any;
  onChange?: any;
  isWidth?: boolean;
  isOtherIcon?: boolean;
}

function BottomDropDown(props: Readonly<BottomDropDownProps>) {
  const {
    isWidth = true,
    inputLabel,
    dropDownListData,
    toSetState,
    mainContainerStyle,
    innerContainerStyle,
    selectedItemData,
    SelectedTextViewStyle,
    inputLabelStyle,
    textStyle,
    value,
    keyToSelect,
    onChange,
    errMsg,
    errorContainer,
    setCodeForSelectedItem,
    keyForSelectedItem,
    isError = false,
    disable = false,
    handleOnChangeEnable,
    handleDropdownSelectionMainScreen,
    textContainer,
    isPopupTextNeed = true,
    isScrollable = false,
    DropdownIconStyle,
    isNFOTag = false,
    isName = false,
    valueKey = "",
    isDiffrenderItemComponent,
    isOtherIcon = false,
  } = props;
  const ItemComponent = props.renderItemComponent;

  const [showDropdown, setShowDropdown] = useState(false);

  const [dropDownList, setDropDownList] = useState(dropDownListData);
  const [hasError, setHasError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [errorMsg, setErrorMsg] = useState(errMsg);
  useEffect(() => {
    setDropDownList(dropDownListData);
  }, [dropDownListData]);

  const keyExtractor = (item: any, index: number) => `ID-${index}`;
  const toggleDropdownList = () => {
    setShowDropdown(!showDropdown);
    setDropDownList(dropDownListData);
  };
  const handleDropdownSelection = (
    selectedItem: any,
    selectedIndex: number
  ) => {
    const reqData = dropDownList?.map((item: any, index: number) => {
      if (index == selectedIndex) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });
    setDropDownList(reqData);
    toSetState(selectedItem[keyToSelect]);
    if (selectedItemData) {
      selectedItemData(selectedItem);
    }
    keyForSelectedItem &&
      setCodeForSelectedItem &&
      setCodeForSelectedItem(selectedItem[keyForSelectedItem]);

    if (onChange) {
      onChange(selectedIndex, selectedItem);
    }
  };

  function listItem({ item, index }: any): JSX.Element {
    const handleItemOnPress = () => {
      handleOnChangeEnable
        ? handleDropdownSelectionMainScreen(item, index)
        : handleDropdownSelection(item, index);
      toggleDropdownList();
    };
    const LinkText = () => {
      return (
        <View style={{ backgroundColor: "#7460FA", borderRadius: 2 }}>
          <Text style={{ color: "white", fontSize: textScale(12) }}>
            &nbsp; - &nbsp;
          </Text>
        </View>
      );
    };
    return (
      <TouchableOpacity
        style={listItemStyles.renderItemContainer}
        onPress={handleItemOnPress}
      >
        <View style={{ width: "90%", flexDirection: "row" }}>
          {isDiffrenderItemComponent ? (
            <ItemComponent itemData={item} />
          ) : (
            <Text
              style={
                item?.[keyToSelect] == value
                  ? listItemStyles.selectedMainText
                  : listItemStyles.notSelectedFolioTxt
              }
            >
              {item?.IsNFO && isNFOTag ? <>{LinkText()}&nbsp;</> : null}
              {item?.[keyToSelect]} {isName ? `- ${item?.[valueKey]}` : null}
            </Text>
          )}
        </View>
        <View>
          {item?.[keyToSelect] == value ? (
            <GreenSelectedCircle
              width={`${moderateScale(20)}`}
              height={`${moderateScale(20)}`}
            />
          ) : (
            <UnselectedCircleIcon
              width={`${moderateScale(20)}`}
              height={`${moderateScale(20)}`}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    setErrorMsg(errMsg);
  }, [errMsg]);
  console.log({ errorMsg });
  useEffect(() => {
    if (errorMsg == "") {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [errorMsg]);

  useEffect(() => {
    if (value == "") {
      setIsSelected(false);
    } else {
      setIsSelected(true);
      setErrorMsg("");
    }
  }, [value]);

  return (
    <>
      <View style={{}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={toggleDropdownList}
          disabled={disable}
          style={[
            styles.mainContainer,
            {
              width: isWidth ? moderateScale(331) : "auto",
              backgroundColor:
                hasError || isError ? colors.errorColor : colors.lightSurfCrest,
              borderColor:
                hasError || isError
                  ? colors.royalOrange
                  : colors.lightSurfCrest2,
              ...mainContainerStyle,
            },
          ]}
        >
          <View style={{ ...innerContainerStyle }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ ...textContainer, width: "90%" }}>
                {isSelected ? (
                  <View>
                    {isPopupTextNeed ? (
                      <View style={{ height: moderateScale(20) }}>
                        <Text
                          style={{
                            color: "grey",
                            fontSize: textScale(12),
                            ...inputLabelStyle,
                          }}
                        >
                          {inputLabel}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                <View style={{ ...SelectedTextViewStyle }}>
                  {isScrollable ? (
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      scrollEnabled={isScrollable}
                      bounces={false}
                    >
                      <Text
                        style={[
                          {
                            fontSize: textScale(16),
                            ...textStyle, //for text view style
                          },
                        ]}
                      >
                        {isSelected ? value : inputLabel}
                      </Text>
                    </ScrollView>
                  ) : (
                    <View style={{ width: "99%" }}>
                      <Text
                        style={[
                          {
                            fontSize: textScale(16),
                            ...textStyle, //for text view style
                          },
                        ]}
                      >
                        {isSelected ? value : inputLabel}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {!disable ? (
                <View style={{ ...DropdownIconStyle }}>
                  {isOtherIcon ? (
                    <OrgDown
                      width={`${moderateScale(15)}`}
                      height={`${moderateScale(15)}`}
                    />
                  ) : (
                    <DownArrow
                      width={`${moderateScale(15)}`}
                      height={`${moderateScale(15)}`}
                    />
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
        {hasError || isError ? (
          <View style={{ ...errorContainer, marginTop: 5 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Text
                  style={{
                    color: colors.royalOrange,
                    paddingLeft: moderateScale(8),
                    fontSize: textScale(13),
                  }}
                >
                  {errorMsg ?? errMsg}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>

      <BottomSheetContainer
        visibility={showDropdown}
        handleModalVisibility={toggleDropdownList}
      >
        <View style={{ padding: moderateScale(20) }}>
          <View style={{ height: moderateScale(20) }}>
            <Text
              style={{
                color: colors.SaltBox,
                fontSize: textScale(14),
                fontWeight: "600",
              }}
            >
              {inputLabel}
            </Text>
          </View>
          <FlatList
            data={dropDownList}
            keyExtractor={keyExtractor}
            renderItem={listItem}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListEmptyComponent={
              <Text style={styles.textstyle}>Data Not Found</Text>
            }
          />
        </View>
      </BottomSheetContainer>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderWidth: 1,
    height: moderateScale(56),
    justifyContent: "center",
    borderColor: colors?.polishedPine,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(9),
    marginVertical: moderateScale(5),
  },
  textstyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: "#666666",
    lineHeight: moderateScale(15),
    padding: moderateScale(20),
    textAlign: "center",
  },
  errorIcon: {
    width: width / 22,
    height: height / 45,
    tintColor: "#d32f2f",
    marginHorizontal: 5,
  },
});

const listItemStyles = StyleSheet.create({
  renderItemContainer: {
    paddingVertical: moderateScale(18),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notSelectedFolioTxt: {
    fontSize: textScale(12),
    color: colors.OceanGreen,
  },
  selectedMainText: {
    fontSize: textScale(12),
    fontWeight: "600",
    color: colors.ShuttleGray,
  },
});
export default BottomDropDown;
