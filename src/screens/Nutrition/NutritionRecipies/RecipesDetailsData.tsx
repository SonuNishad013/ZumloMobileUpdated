import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RecipesCardDetails from "./RecipesCardDetails";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { BookMarkIcon, CircleGray, StarIcon } from "../../../assets";

interface Props {
  navigation?: any;
  itm?: any;
}
const RecipesDetailsData: React.FC<Props> = ({ itm }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{itm.name}</Text>
          <BookMarkIcon width={moderateScale(25)} height={moderateScale(25)} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <StarIcon />
            <Text>{itm?.rating}</Text>
            <CircleGray />
          </View>
          <Text style={styles.cuisine}>{itm?.type}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{itm?.description}</Text>
        </View>
        <View style={styles.cardDetailsContainer}>
          <RecipesCardDetails data={itm} />
        </View>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsTitle}>{"Ingredients"}</Text>
          <View style={styles.ingredientsList}>
            {itm?.ingredients?.map((itm: any) => (
              <View style={{ marginVertical: moderateScale(2) }}>
                <Text style={styles?.allTextStyle}>{itm?.title}</Text>
                {itm?.steps?.map((itm: any) => (
                  <View>
                    <Text style={styles?.allTextStyle}>- {itm}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.ingredientsTitle}>{"Process"}</Text>
          <View style={styles.ingredientsList}>
            {itm?.process?.map((itm: any) => (
              <View style={{ marginVertical: moderateScale(2) }}>
                <Text style={styles?.allTextStyle}>{itm?.tProcess}</Text>
                <Text style={styles?.allTextStyle}>{itm?.work}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: moderateScale(19),
  },
  cardContainer: {
    backgroundColor: colors?.SurfCrest,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: moderateScale(50),
    justifyContent: "space-between",
  },
  cuisine: {
    marginLeft: moderateScale(15),
  },
  descriptionContainer: {
    marginTop: moderateScale(10),
  },
  description: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
  },
  cardDetailsContainer: {
    marginTop: moderateScale(20),
  },
  ingredientsContainer: {
    marginTop: moderateScale(20),
  },
  ingredientsTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.orgDark,
  },
  ingredientsList: {
    marginTop: moderateScale(6),
  },
  allTextStyle: {
    fontWeight: "400",
    fontSize: textScale(10),
    color: colors?.prussianBlue,
  },
});

export default RecipesDetailsData;
