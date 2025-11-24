import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";
import CommonHeader from "../../components/Header/commonHeader";
import ResourceLibraryCard from "../../components/OnBoardiingComponents/ResourceLibraryCard";
import { imagePath } from "../../assets/png/imagePath";
import navigationString from "../../navigation/navigationString";

const ResourceLibraryTemplate = ({ navigation, route }: any) => {
  const renderData = route && route?.params?.recommendationData[0]?.activities;
  const cardData = renderData[0]?.categories;
  const gentalYoga = cardData[0];
  const gentalYogaData = gentalYoga?.subCategory?.slice(0, 3);
  console.log("ResourceLibraryTemplate====>", cardData);
  console.log("ResourceLibraryTemplate====> gentalYoga", gentalYoga);
  console.log("ResourceLibraryTemplate====> gentalYogaData", gentalYogaData);

  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={{ flex: 1, paddingHorizontal: moderateScale(19) }}>
        <CommonHeader
          headerName={"Resource Library"}
          onBackPress={() => navigation?.goBack()}
          textStyle={{
            color: colors?.prussianBlue,
          }}
          mainContainer={{
            paddingTop: moderateScale(15),
            paddingBottom: moderateScale(15),
          }}
        />
        <FlatList
          data={gentalYogaData}
          keyExtractor={(item, index) => "key" + index}
          contentContainerStyle={{ gap: moderateScale(15) }}
          renderItem={({ item, index }: any) => {
            console.log(
              "ResourceLibraryTemplate====> gentalYogaData item",
              item
            );
            return (
              <ResourceLibraryCard
                jsonData={item}
                title={item?.subCategory ? item?.subCategory : "--"}
                description={
                  item?.resourceContent[0]?.category
                    ? item?.resourceContent[0]?.category
                    : "--"
                }
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
                  navigation?.navigate(
                    navigationString?.ResourceLibraryTempDetails,
                    {
                      data: item,
                    }
                  )
                }
                card={{
                  backgroundColor:
                    index % 2 == 0 ? colors.SaltBox : colors.polishedPine,
                }}
              />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ResourceLibraryTemplate;

const styles = StyleSheet.create({});
