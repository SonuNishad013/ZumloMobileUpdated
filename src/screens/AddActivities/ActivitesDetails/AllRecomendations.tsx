import { FunctionComponent } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import navigationString from "../../../navigation/navigationString";
import { imagePath } from "../../../assets/png/imagePath";
import { ClockSmallIcon, NoDataIcon } from "../../../assets";
import { height, moderateScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import styles from "./styles";

interface AllRecommendationsProps {
  activitesData?: any;
  route?: any;
}

const RecomendationListing: FunctionComponent<AllRecommendationsProps> = ({
  //Not sure about the usage of this screen
  route,
  navigation,
}: any) => {
  const { data } = route?.params;
  console.log(
    "    data !== undefined || data?.length > 0",
    data !== undefined,
    data?.length > 0
  );

  return (
    <ScreenWrapper statusBarColor={colors.themeColor}>
      <View style={{ marginHorizontal: moderateScale(15) }}>
        <CommonHeader
          headerName={"References"}
          onBackPress={() => navigation.goBack()}
          mainContainer={{ marginTop: moderateScale(10) }}
        />
        {data !== undefined && data?.length > 0 ? (
          <>
            {data?.map((item: any, index: any) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.recommendationsContainer,
                    { marginTop: moderateScale(15) },
                  ]}
                  onPress={() =>
                    navigation.navigate(navigationString?.RecommendationList, {
                      data: item,
                    })
                  }
                >
                  <Image
                    source={imagePath?.BGMeditation}
                    style={styles.recommendationsImage}
                  />
                  <View style={styles.recommendationsTextContainer}>
                    <Text style={styles.recommendationsTitle}>
                      {item?.title}
                    </Text>
                    <Text style={styles.recommendationsSubtitle}>
                      {item?.description}
                    </Text>
                    <IconText
                      SvgIcon={ClockSmallIcon}
                      title={item?.frequency}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <NoDataIcon
              width={`${moderateScale(200)}`}
              height={`${moderateScale(200)}`}
            />
            <Text style={{ color: colors.SurfCrest }}>{"No data found."}</Text>
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default RecomendationListing; //Not sure about the usage of this screen

const IconText = ({ SvgIcon, title }: any) => {
  return (
    <View style={styles.iconTextContainer}>
      <SvgIcon height={moderateScale(20)} width={moderateScale(20)} />
      <Text style={styles.iconText}>{title ? title : ""}</Text>
    </View>
  );
};
