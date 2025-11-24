import React, { ReactElement } from "react";
import { Text, View, Image, SafeAreaView, FlatList } from "react-native";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import RecommendationCard from "./RecommendationCard";
import CommonButton from "../../components/Buttons/commonButton";

interface Props {
  navigation?: any;
}
const RecommendationDetails: React.FC<Props> = ({
  navigation,
}): ReactElement => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.prussianBlue,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.prussianBlue,
          paddingHorizontal: moderateScale(20),
        }}
      >
        <CommonHeader
          onBackPress={() => {
            navigation?.goBack();
          }}
          iconContainer={{ backgroundColor: "#00000033" }}
          headerName={"Activity and Recommendation"}
        />

        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item, index) => "key" + index}
          ListHeaderComponent={
            <View
              style={{
                marginVertical: moderateScale(20),
                gap: moderateScale(5),
              }}
            >
              <Text
                style={{
                  fontSize: textScale(24),
                  fontWeight: "700",
                  color: colors?.SurfCrest,
                }}
              >
                Hi, Selena
              </Text>
              <Text
                style={{
                  fontSize: textScale(14),
                  fontWeight: "400",
                  color: colors?.SurfCrest,
                }}
              >
                Here are your Health Goals
              </Text>
            </View>
          }
          ListFooterComponentStyle={{ marginTop: moderateScale(40) }}
          ListFooterComponent={
            <>
              <CommonButton
                btnName={"Start now"}
                mainContainer={{
                  backgroundColor: colors?.SaltBox,
                  marginVertical: moderateScale(20),
                }}
              />
              <CommonButton
                btnName={"Re-generate noW"}
                mainContainer={{
                  backgroundColor: colors?.prussianBlue,
                  borderWidth: 1,
                  borderColor: colors?.SurfCrest,
                }}
              />
            </>
          }
          renderItem={({ item }) => {
            return <RecommendationCard />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default RecommendationDetails;
