import { View, FlatList, StyleSheet } from "react-native";
import React, { ReactElement } from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import RecommendationCard from "../../../components/Cards/RecommendationCard";
import { imagePath } from "../../../assets/png/imagePath";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  dailyRecomData?: any;
}
const DailyRecommendations: React.FC<Props> = ({
  navigation,
  dailyRecomData,
}): ReactElement => {
  return (
    <>
      <HeaderWithNameSeeAll
        name={strings?.Daily_Recommendations}
        msg={strings?.seeAll}
      />
      <View style={styles?.mainContainer}>
        <FlatList
          data={dailyRecomData}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => (
            <View style={styles?.ComponentM}>
              <RecommendationCard
                image={imagePath?.recommendation}
                title={item.title}
                type={item.type}
                time={item.duration}
              />
            </View>
          )}
          horizontal
        />
      </View>
    </>
  );
};
export default DailyRecommendations;
const styles = StyleSheet.create({
  mainContainer: { marginTop: moderateScale(10) },
  ComponentM: { marginRight: moderateScale(15) },
});
