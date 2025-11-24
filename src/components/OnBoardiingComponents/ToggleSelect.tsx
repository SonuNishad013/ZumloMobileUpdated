import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import BoxButtonIcon from "./BoxButtonIcon";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";
import CustomToggle from "../CustomToggle/CustomToggle";

interface Props {}
const ToggleSelect: React.FC<Props> = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: moderateScale(19),
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: moderateScale(10),
        }}
      >
        <BoxButtonIcon
          isIcon={true}
          source={
            //   itemsData?.logo
            //     ? { uri: itemsData?.logo }
            // :
            imagePath?.PlusIcon
          }
          button={{
            height: moderateScale(22),
            width: moderateScale(22),
            borderRadius: moderateScale(5),
            backgroundColor: colors?.SurfCrest,
          }}
          image={{
            height: moderateScale(14),
            width: moderateScale(14),
            tintColor: colors?.SaltBox,
          }}
        />
        <Text
          style={{
            fontSize: textScale(14),
            fontWeight: "600",
            color: colors?.SurfCrest,
          }}
        >
          {"itemsData?.stepDescription"}
        </Text>
      </View>
      <CustomToggle options={"options"} />
    </View>
  );
};

export default ToggleSelect;

const styles = StyleSheet.create({});
