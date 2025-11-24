import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import HeaderNutrition from "../NutritionDetails/HeaderNutrition";
import { moderateScale } from "../../../constant/responsiveStyle";
import RecipesDetailsData from "./RecipesDetailsData";
import LinearGradient from "react-native-linear-gradient";
import { style } from "./style";

interface Props {
  navigation?: any;
  route?: any;
}
const NutritionRecipies: React.FC<Props> = ({ navigation, route }) => {
  const data = route?.params?.itm;
  const renderItems = () => {
    return (
      <View style={{ marginTop: moderateScale(10) }}>
        <RecipesDetailsData itm={data} />
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarColor={colors?.screenWrapperColorNutrition}>
      <LinearGradient
        colors={colors?.backgroundColorNutrition}
        style={{ flex: 1 }}
      >
        <View style={style?.mainView}>
          <HeaderNutrition
            headerName={"Easy Fish Tacos Recipes"}
            navigation={navigation}
          />
          <FlatList
            data={["1"]}
            keyExtractor={(item, index) => "key" + index}
            renderItem={renderItems}
            contentContainerStyle={style?.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default NutritionRecipies;
