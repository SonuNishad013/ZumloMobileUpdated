import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { imagePath } from "../../assets/png/imagePath";

const RecommendationCard = () => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors?.SaltBox,
        padding: moderateScale(10),
        flexDirection: "row",
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        gap: moderateScale(10),
        alignItems: "center",
      }}
    >
      <Image
        source={imagePath?.Chakras}
        style={{ width: moderateScale(95), height: moderateScale(99) }}
      />
      <View style={{ gap: moderateScale(10) }}>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: textScale(14),
              fontWeight: "600",
            }}
          >
            Practice guided meditation
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: textScale(10),
              fontWeight: "400",
            }}
          >
            Improve overall mental well-being
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            gap: moderateScale(20),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: moderateScale(10),
            }}
          >
            <Image source={imagePath?.Calander} />
            <Text
              style={{
                color: "#fff",
                fontSize: textScale(10),
                fontWeight: "400",
              }}
            >
              Daily
            </Text>
          </View>
          <Image source={imagePath?.Line} />
          <View
            style={{
              flexDirection: "row",
              gap: moderateScale(10),
            }}
          >
            <Image source={imagePath?.Clock} />
            <Text
              style={{
                color: "#fff",
                fontSize: textScale(10),
                fontWeight: "400",
              }}
            >
              20 items
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: moderateScale(30),
            borderRadius: moderateScale(20),
            padding: moderateScale(3),
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: textScale(10),
              fontWeight: "600",
            }}
          >
            View Details
          </Text>
          <Image source={imagePath?.CircleArrow} />
        </View>
      </View>
    </View>
  );
};

export default RecommendationCard;

const styles = StyleSheet.create({});
