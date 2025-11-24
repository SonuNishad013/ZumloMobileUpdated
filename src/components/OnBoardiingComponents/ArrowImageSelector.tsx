import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale } from "../../constant/responsiveStyle";
import BoxButtonIcon from "./BoxButtonIcon";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  onChangeIndex?: any;
  items?: any;
}
const ArrowImageSelector: React.FC<Props> = ({ onChangeIndex, items }) => {
  const initialIndex = items
    ? items?.findIndex((itm: any) => itm?.isSelected)
    : 0;
  const [idx, setIdx] = useState(initialIndex);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (items == undefined) return;
    setData(items);
  }, [items]);

  const handleNavigation = (isNext: boolean) => {
    setIdx((prevIdx: any) => {
      const maxIndex = (data?.length ?? 0) - 1;
      if (isNext && prevIdx < maxIndex) {
        return prevIdx + 1;
      } else if (!isNext && prevIdx > 0) {
        return prevIdx - 1;
      }
      return prevIdx; // No change if out of bounds
    });
  };

  useEffect(() => {
    onChangeIndex(idx);
  }, [idx]);

  const renderButtons = () => {
    if (idx === 0) {
      return (
        <BoxButtonIcon
          onPress={() => handleNavigation(true)}
          source={imagePath?.RightArrow}
          image={styles.rightArrowIcon}
          button={styles.boxButton}
        />
      );
    } else if (idx === data.length - 1) {
      return (
        <BoxButtonIcon
          onPress={() => handleNavigation(false)}
          source={imagePath?.RightArrow}
          image={styles.leftArrowIcon}
          button={styles.boxButton}
        />
      );
    } else {
      return (
        <ImageBackground
          source={imagePath?.CurveRectangel}
          style={styles.imageContainerBG}
        >
          <BoxButtonIcon
            onPress={() => handleNavigation(false)}
            source={imagePath?.RightArrow}
            image={styles.leftArrowIcon}
            button={styles.boxButton}
          />
          <BoxButtonIcon
            onPress={() => handleNavigation(true)}
            source={imagePath?.RightArrow}
            image={styles.rightArrowIcon}
            button={styles.boxButton}
          />
        </ImageBackground>
      );
    }
  };

  console.log("first---Image->");

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: data[idx]?.logo }}
        />
      </View>
      <Text style={styles.title}>
        {formatSentenceCase(data[idx]?.optionValue)}
      </Text>
      <View style={styles.buttonContainer}>{renderButtons()}</View>
    </View>
  );
};

export default ArrowImageSelector;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(40),
  },
  imageContainer: {
    marginTop: moderateScale(40),
  },
  image: {
    height: moderateScale(252),
    width: moderateScale(252),
  },
  buttonContainer: {
    marginTop: moderateScale(50),
  },
  imageContainerBG: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: moderateScale(140),
  },
  boxButton: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors?.SurfCrest,
    marginHorizontal: moderateScale(-10),
  },
  leftArrowIcon: {
    tintColor: colors?.SaltBox,
    height: moderateScale(17),
    width: moderateScale(17),
    transform: [{ rotate: "180deg" }],
  },
  rightArrowIcon: {
    tintColor: colors?.SaltBox,
    height: moderateScale(17),
    width: moderateScale(17),
  },
});
