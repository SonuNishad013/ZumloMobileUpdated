import React, { ReactElement, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";

interface Props {
  navigation?: any;
  FAQScreenData?: any;
}

const FAQScreen: React.FC<Props> = ({
  navigation,
  FAQScreenData,
}): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const onSearchTextChange = (text: string) => {
    setSearchQuery(text);
  };
  const [faqData, setfaqData] = useState([
    {
      id: 1,
      name: strings?.FAQ_DATA_1_title,
      description: strings?.FAQ_DATA_1_desc,
    },
    {
      id: 2,
      name: strings?.FAQ_DATA_1_title,
      description: strings?.FAQ_DATA_1_desc,
    },
    {
      id: 3,
      name: strings?.FAQ_DATA_1_title,
      description: strings?.FAQ_DATA_1_desc,
    },
    {
      id: 4,
      name: strings?.FAQ_DATA_1_title,
      description: strings?.FAQ_DATA_1_desc,
    },
    {
      id: 5,
      name: strings?.FAQ_DATA_1_title,
      description: strings?.FAQ_DATA_1_desc,
    },
  ]);
  const headerReturn = () => {
    return (
      <View style={styles?.container}>
        <View style={styles?.passHorizontalMargin}>
          <View style={styles.headerContainer}>
            <CommonHeader
              headerName={strings?.My_Profile}
              mainContainer={styles.headerMainContainer}
              iconContainer={{ backgroundColor: colors.darkPrussianBlue }}
              onBackPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles?.passVerticalMargin}>
            <View style={styles?.passHorizontalMargin}>
              <CommonSearchBar
                mainContainer={styles?.commonSearchStyle}
                isiconSize={true}
                iconSize={moderateScale(22)}
                placeholder={strings?.search}
                onChangeText={onSearchTextChange}
                value={searchQuery}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderListing = (item: any, index: any) => {
    return (
      <View style={styles?.passHorizontalMargin}>
        <View>
          <View style={styles?.centerView}>
            <Text style={styles?.idText}>{item?.id}</Text>
            <View style={styles?.lineStyle} />
          </View>
          <View style={styles?.flexRow}>
            <View style={styles?.smallView} />
            <View style={styles?.passHorizontalMargin}>
              <Text style={styles?.nameStyle}>{item?.name}</Text>
              <Text style={styles?.descStyle}>{item?.description}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={styles?.mainContainerView}>
        {headerReturn()}
        <View style={styles?.passMarginTop}>
          <FlatList
            data={faqData}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item, index }) => renderListing(item, index)}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};
export default FAQScreen;
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.prussianBlue,
    borderBottomEndRadius: moderateScale(25),
    borderBottomStartRadius: moderateScale(25),
  },
  headerMainContainer: {
    backgroundColor: colors.prussianBlue,
    marginHorizontal: moderateScale(15),
  },
  container: {
    backgroundColor: colors.prussianBlue,
    borderBottomEndRadius: moderateScale(25),
    borderBottomStartRadius: moderateScale(25),
  },
  passHorizontalMargin: {
    marginHorizontal: moderateScale(15),
  },
  passVerticalMargin: {
    marginVertical: moderateScale(15),
  },
  commonSearchStyle: {
    borderRadius: moderateScale(22),
    height: moderateScale(45),
    backgroundColor: colors.lightSurfCrest,
  },
  centerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  idText: {
    color: colors.darkPrussianBlue,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  lineStyle: {
    marginHorizontal: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    height: 1,
    backgroundColor: colors.borderColor,
    width: width - moderateScale(50),
  },
  flexRow: {
    flexDirection: "row",
  },
  smallView: {
    width: 1,
    backgroundColor: colors.borderColor,
  },
  nameStyle: {
    color: colors.darkPrussianBlue,
    fontSize: textScale(14),
    fontWeight: "700",
  },
  descStyle: {
    marginVertical: moderateScale(10),
    color: colors.darkPrussianBlue,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  passMarginTop: {
    marginTop: moderateScale(30),
  },
  mainContainerView: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
});
