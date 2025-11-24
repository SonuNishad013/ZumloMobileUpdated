import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { BookMarkAdded, BookMarkIcon, StarIcon } from "../../../assets";

interface Props {
  title?: string;
  rating?: any;
  description?: any;
  icon?: any;
  onPress?: () => void;
  bookmark?: boolean;
  onPressBookmark?: () => void;
}
const SnacksDetailsCmnCom: React.FC<Props> = ({
  title,
  rating,
  description,
  icon,
  onPress,
  bookmark,
  onPressBookmark,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <StarIcon
              width={`${moderateScale(11)}`}
              height={`${moderateScale(11)}`}
            />
            <Text style={styles.rating}>{rating}</Text>
            <TouchableOpacity onPress={onPressBookmark}>
              {bookmark ? (
                <BookMarkAdded
                  width={`${moderateScale(14)}`}
                  height={`${moderateScale(14)}`}
                />
              ) : (
                <BookMarkIcon
                  width={`${moderateScale(14)}`}
                  height={`${moderateScale(14)}`}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.description}>{description}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: moderateScale(20),
  },
  iconContainer: {
    width: moderateScale(50),
    // alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.prussianBlue,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: moderateScale(55),
    justifyContent: "space-between",
  },
  rating: {
    fontSize: textScale(12),
    fontWeight: "500",
    color: colors?.prussianBlue,
  },
  description: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    marginTop: moderateScale(6),
  },
});

export default SnacksDetailsCmnCom;
//  use like

{
  /* <SnacksDetailsCmnCom
title="Half Boiled Eggs"
description={
  "Once the eggs are in the water, set a timer and let them cook for about 5-6 minutes for a perfect half-boiled consistency."
}
icon={imagePath?.EggIcon}
rating={"4.5"}
bookmark={true}
/> */
}
