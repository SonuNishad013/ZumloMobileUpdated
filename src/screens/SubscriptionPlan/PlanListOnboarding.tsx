import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { StringSubscription } from "./StringSubscription";
import navigationString from "../../navigation/navigationString";
import { MEMBERSHIP_DURATION } from "../../constant/ENUM";
import { textLabelSize } from "../../utils/TextConfig";
let textColor: any = colors?.SurfCrest;
interface SubscriptionPlanProps {
  navigation: any;
  route: any;
}
const PlanListOnboarding: React.FC<SubscriptionPlanProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const renderItem = (items: { item: any; index: number }) => (
    <View style={styles.cardView}>
      <View style={{ flex: 1 }}>
        <Text style={styles?.fieldText}>{items.item?.name}</Text>
        <Text numberOfLines={2} style={styles?.subfieldText}>
          {items.item?.planDescription}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {items?.item?.duration == MEMBERSHIP_DURATION?.BASIC ? (
          <View style={styles?.planRecomendation}>
            <Text style={styles?.planRecomdenatation}>
              {StringSubscription?.Life_time_free}
            </Text>
          </View>
        ) : (
          <Text style={styles?.priceText}>
            {`${items.item?.planPrice?.currency} ${items.item?.planPrice?.price} / `}
            <Text style={styles?.durationStyle}>{items.item?.duration}</Text>
          </Text>
        )}
        <TouchableOpacity
          style={styles?.viewDetailBox}
          onPress={() => viewDetailClick(items?.item)}
        >
          <Text style={styles?.viewDetailText}>
            {StringSubscription?.View_Details}
          </Text>
          <Image source={imagePath?.right} style={styles?.rightArrow} />
        </TouchableOpacity>
      </View>
    </View>
  );
  const viewDetailClick = (item: any) => {
    if (route?.params?.planList?.length) {
      navigation?.navigate(navigationString.SubscriptionDetailForNew, {
        item: item,
      });
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View style={styles?.mainContainer}>
      <ImageBackground
        source={imagePath.top_header}
        style={styles?.topImage}
        resizeMode="stretch"
      >
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Image
            source={imagePath?.backIcon}
            style={[
              styles?.backIconStyle,
              { marginTop: insets.top + moderateScale(10) },
            ]}
          />
        </TouchableOpacity>
        <Text style={styles?.subtitle_text}>
          {/* {StringSubscription?.Explore_zumlo} */}
          {"Find your fit"}
        </Text>
        <Text style={styles?.title_text}>
          {/* {StringSubscription?.Subscription_Plans} */}
          {"Stick with free, or step into everything Premium."}
        </Text>
      </ImageBackground>

      <View style={styles?.middleView}>
        <FlatList
          data={route?.params?.planList}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
      </View>
    </View>
  );
};

export default PlanListOnboarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },

  subtitle_text: {
    fontSize: textLabelSize?.mainTitle,
    fontWeight: "600",
    color: colors?.SurfCrest,
    textAlign: "center",
    marginBottom: moderateScale(20),
  },
  title_text: {
    fontSize: textLabelSize?.titleFont,
    fontWeight: "400",
    color: colors?.SurfCrest,
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: moderateScale(20),
  },
  backIconStyle: {
    height: moderateScale(30),
    width: moderateScale(30),
    resizeMode: "contain",

    marginLeft: moderateScale(20),
  },
  fieldText: {
    fontSize: textLabelSize.titleFont,
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  topImage: {
    width: "100%",
    height: 300,
    resizeMode: "stretch",
  },
  subfieldText: {
    fontSize: textLabelSize.subtTitleFont,
    fontWeight: "500",
    color: colors?.SaltBox,
    marginTop: moderateScale(10),
  },
  priceText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: colors?.prussianBlue,
    textAlign: "right",
  },
  viewDetailText: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
    marginRight: moderateScale(5),
  },
  cardView: {
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: colors?.polishedPine,
    marginBottom: moderateScale(10),
    paddingLeft: moderateScale(15),
    paddingBottom: moderateScale(15),
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewDetailBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: moderateScale(10),
  },
  rightArrow: {
    height: moderateScale(28),
    width: moderateScale(28),
    resizeMode: "contain",
  },
  footerButton: {
    backgroundColor: colors?.activeStrock,
    marginHorizontal: moderateScale(20),

    paddingVertical: moderateScale(20),
    alignItems: "center",
    borderRadius: moderateScale(80),
    overflow: "hidden",
    marginTop: moderateScale(10),
  },
  buttonStyle: {
    fontSize: moderateScale(15),
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  planRecomendation: {
    alignSelf: "flex-end",
    backgroundColor: colors?.royalOrangeDark,
    borderTopRightRadius: moderateScale(12),
    borderBottomLeftRadius: moderateScale(12),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  planRecomdenatation: {
    color: colors?.prussianBlue,
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
  durationStyle: {
    fontWeight: "400",
  },
  middleView: {
    flex: 1,
    backgroundColor: colors?.activeStrock_1,
    marginTop: -10,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(40),
  },
  underlineStyle: {
    textDecorationLine: "underline",
  },
  viewPlansText: {
    marginBottom: moderateScale(50),
    textAlign: "center",
    fontSize: moderateScale(14),
    textDecorationLine: "underline",
    color: colors?.royalOrangeDark,
    fontWeight: "500",
  },

  /////
  backgroudImageStyle: {
    flex: 1,
    paddingTop: moderateScale(100),
    paddingHorizontal: moderateScale(20),
  },
  titleStyle: {
    fontSize: moderateScale(24),
    fontWeight: "700",
    color: textColor,
    textAlign: "center",
    marginTop: moderateScale(10),
  },
  subTitleStyle: {
    fontSize: moderateScale(16),
    fontWeight: "400",
    color: textColor,
    textAlign: "center",
    marginTop: moderateScale(15),
  },
  topStyle: {
    marginTop: moderateScale(50),
  },
  horizontalLine: {
    height: moderateScale(0.7),
    backgroundColor: colors?.polishedPine,
    marginVertical: moderateScale(20),
  },
  fieldStyle: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: textColor,
    textAlign: "center",
    marginTop: moderateScale(25),
  },
  detailStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(15),
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: textColor,
    marginRight: 15,
  },
  detailText: {
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: textColor,
  },
});
