import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import NoRecordTxtComponent from "../../../components/noDataContainer";
import ResourceLibraryCard from "../../../components/OnBoardiingComponents/ResourceLibraryCard";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  route?: any;
}
const AllResourceLibrary: React.FC<Props> = ({ route, navigation }) => {
  const { allRecommendations } = route?.params;
  const [recommendationListing, setRecommendationListing] = useState<any>([]);
  useEffect(() => {
    if (!allRecommendations) return;
    setRecommendationListing(allRecommendations);
  }, [allRecommendations]);
  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={styles?.mainView}>
        <CommonHeader
          headerName={strings?.resourceLibrary}
          onBackPress={() => navigation?.goBack()}
          textStyle={styles?.headerText}
          mainContainer={styles?.container}
        />
        <FlatList
          data={recommendationListing}
          keyExtractor={(item, index) => "key" + index}
          style={styles?.gapView}
          renderItem={({ item, index }) => (
            <ResourceLibraryCard
              card={styles?.cardView}
              title={item?.title ? item?.title : "--"}
              description={item?.description ? item?.description : "--"}
              frequency={item?.frequency ? item?.frequency : "--"}
              items={
                item?.items?.length > 0 || item?.items
                  ? item?.items?.length
                  : "--"
              }
              source={
                item?.logo ? { uri: item?.logo } : imagePath?.BGMeditation
              }
              onPress={() =>
                navigation?.navigate(navigationString?.RecommendationList, {
                  data: item,
                })
              }
            />
          )}
          ListEmptyComponent={() => {
            return (
              <View>
                <NoRecordTxtComponent txtColor={colors.darkPrussianBlue} />
              </View>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AllResourceLibrary;

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: moderateScale(19),
    flex: 1,
  },
  headerText: {
    color: colors?.prussianBlue,
  },
  container: {
    paddingTop: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
  gapView: {
    gap: moderateScale(15),
  },
  cardView: {
    marginVertical: moderateScale(8),
    backgroundColor: colors?.prussianBlue,
  },
});
