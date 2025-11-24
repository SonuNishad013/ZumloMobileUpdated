import { FlatList, StyleSheet } from "react-native";
import React from "react";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { moderateScale, width } from "../../../constant/responsiveStyle";
import { imagePath } from "../../../assets/png/imagePath";
import navigationString from "../../../navigation/navigationString";
import colors from "../../../constant/colors";
import ShimmerPlaceHolder from "../../../components/SimmerEffect";
import ResourceLibraryCard from "../../../components/OnBoardiingComponents/ResourceLibraryCard";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  recommendationData?: any;
  isLoading?: boolean;
  resourceLibrary?: boolean;
}
const ResourceLibraryList: React.FC<Props> = ({
  navigation,
  recommendationData,
  isLoading,
}) => {
  const renderData = recommendationData.slice(0, 1);
  const renderCardData =
    renderData[0]?.activities[0]?.categories[0]?.subCategory?.slice(0, 1);
  return (
    <>
      {
        <>
          {isLoading ? (
            <ShimmerPlaceHolder
              width={width - moderateScale(50)}
              height={moderateScale(110)}
              backgroundColor={colors.darkthemeColor}
            ></ShimmerPlaceHolder>
          ) : (
            <>
              {renderData?.length > 0 && (
                <HeaderWithNameSeeAll
                  name={strings?.resourceLibrary}
                  msg={strings?.seeAll}
                  onPress={() => {
                    navigation?.navigate(
                      navigationString?.ResourceLibraryTemplate,
                      {
                        recommendationData: recommendationData,
                      }
                    );
                  }}
                  container={styles?.marginverticalet}
                />
              )}

              <FlatList
                data={renderCardData}
                keyExtractor={(item, index) => "key" + index}
                renderItem={({ item, index }: any) => (
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
                )}
              />
            </>
          )}
        </>
      }
    </>
  );
};

export default ResourceLibraryList;

const styles = StyleSheet.create({
  marginverticalet: {
    marginVertical: moderateScale(-5),
  },
});
