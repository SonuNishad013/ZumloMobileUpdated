import React, { FunctionComponent } from "react";
import {
  Platform,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import CommonButton from "../../../components/Buttons/commonButton";
import { strings } from "../../../constant/strings";
import CommonHeader from "../../../components/Header/commonHeader";
import { dynamicDataType } from "../../../constant/appConstant";
import colors from "../../../constant/colors";

interface BottomButtonProps {
  onSave?: () => void;
  btnName?: string;
}

export const BottomButton: FunctionComponent<BottomButtonProps> = ({
  onSave,
  btnName,
}) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: moderateScale(50),
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CommonButton
        mainContainer={{
          marginHorizontal: moderateScale(15),
          justifyContent: "center",
          alignItems: "center",
        }}
        btnName={btnName}
        onPress={onSave}
      />
    </View>
  );
};

interface headerViewProps {
  data?: any;
  onBack?: () => void;
  textStyle?: TextStyle;
}

export const HeaderView: FunctionComponent<headerViewProps> = ({
  data,
  onBack,
  textStyle,
}) => {
  return (
    <CommonHeader
      headerName={data?.header.replace(/([a-z])([A-Z])/g, "$1 $2")}
      onBackPress={onBack}
      textStyle={{
        color:
          data?.inputType == dynamicDataType.Single_Select
            ? colors.darkPrussianBlue
            : colors.SurfCrest,
      }}
    />
  );
};
interface RenderoptionsProps {
  item?: any;
  index?: number;
  selectType?: any;
  onItemPress?: any;
}

export const Renderoptions: FunctionComponent<RenderoptionsProps> = ({
  item,
  index,
  selectType,
  onItemPress,
}) => {
  return (
    console.log("Item Selected", item),
    (
      <View style={{ marginTop: moderateScale(15) }}>
        <TouchableOpacity
          onPress={() => onItemPress(item, selectType)}
          style={{
            height:
              selectType == dynamicDataType.MultiSelect ||
              selectType == dynamicDataType.Dropdown
                ? "auto"
                : selectType == dynamicDataType.CircleSelect
                ? moderateScale(150)
                : moderateScale(56),
            width:
              selectType == dynamicDataType.MultiSelect ||
              selectType == dynamicDataType.Dropdown
                ? Platform.OS == "ios"
                  ? moderateScale(150)
                  : moderateScale(width / 2.7)
                : selectType == dynamicDataType.CircleSelect
                ? moderateScale(150)
                : "auto",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: item.isSelected
              ? colors.SurfCrest
              : `rgba(255, 255, 255, 0.1)`,
            borderRadius:
              selectType == dynamicDataType.CircleSelect
                ? moderateScale(75)
                : moderateScale(20),
            marginTop: moderateScale(5),
            marginHorizontal:
              selectType === "MultiSelect" ? moderateScale(5) : "auto",
            paddingVertical: moderateScale(20),
          }}
        >
          <Text
            style={{
              marginHorizontal: moderateScale(15),
              color: item.isSelected
                ? colors.darkPrussianBlue
                : colors.SurfCrest,
              fontSize: item.isSelected ? textScale(12) : textScale(10),
              textAlign: "center",
              fontWeight: item.isSelected ? "600" : "400",
            }}
          >
            {item?.optionValue}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default Renderoptions;
