import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SeeAllHeaderWellness from "./commonHeader";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import RoundButton from "../../../components/Buttons/roundButton";
import { BackIcon, NextArrow } from "../../../assets";

interface Props {
  navigation?: any;
  featuredData?: any;
}

const Featured: React.FC<Props> = ({ navigation, featuredData }) => {
  const renderFeaturedData = (item: any, index: number) => {
    return (
      <View style={styles.featuredItemContainer}>
        <View style={styles.imageContainer}>
          <Image source={imagePath?.HeartImage} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{item?.title}</Text>
          <Text style={styles.categoryText}>{item?.type}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.durationText}>{item?.time}</Text>
            <View>
              <RoundButton
                mainContainer={styles.buttonContainer}
                SvgIcon={NextArrow}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SeeAllHeaderWellness
        name={"Featured"}
        msg={"See All"}
        container={{ marginHorizontal: moderateScale(0) }}
      />
      <FlatList
        data={featuredData}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => renderFeaturedData(item, index)}
      />
    </View>
  );
};

export default Featured;

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
  },
  featuredItemContainer: {
    height: moderateScale(204),
    width: moderateScale(150),
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(15),
    // marginRight: moderateScale(20),
  },
  imageContainer: {
    height: moderateScale(95),
    alignSelf: "flex-end",
  },
  contentContainer: {
    marginHorizontal: moderateScale(10),
    flex: 1,
  },
  titleText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.white,
  },
  categoryText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.white,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: moderateScale(20),
  },
  durationText: {
    fontSize: moderateScale(10),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  buttonContainer: {
    height: moderateScale(34),
    width: moderateScale(34),
  },
  separator: {
    marginLeft: moderateScale(20),
  },
});
