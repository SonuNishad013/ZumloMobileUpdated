import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { imagePath } from "../../../assets/png/imagePath";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CustomImage from "../../../components/ImageRender";
import { Enum_ComponentUsedInForCustomImage } from "../../../constant/ENUM";

interface Props {
  allValue?: any;
  answerData?: any;
  sendAnser?: any;
}
const PlannerActivity: React.FC<Props> = ({
  allValue,
  answerData,
  sendAnser,
}) => {
  const [idx, setIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    setCurrentImage(allValue?.stepFields[0]?.stepFieldOptions[idx]?.logo);
  }, [idx]);
  useEffect(() => {
    previosSelected();
  }, []);
  console.log("first---idx->", idx);
  console.log("first---selectedItem->", selectedItem);
  const previosSelected = () => {
    setIsLoading(true);
    let stepFieldOptions = allValue?.stepFields[0]?.stepFieldOptions;
    let index = stepFieldOptions?.findIndex(
      (elem: any) => elem.optionID == sendAnser?.optionId
    );
    if (index != -1) {
      setIdx(index ? index : 0);
      setSelectedItem(index ? index : 0);
      setIsLoading(false);
    }
  };

  const handleButtonClick = (isIncrement: boolean) => {
    setIsLoading(true);
    if (isIncrement) {
      setIdx((prevIndex) => prevIndex + 1);
      setSelectedItem((prevIndex) => prevIndex + 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      setIdx((prevIndex) => prevIndex - 1);
      setSelectedItem((prevIndex) => prevIndex - 1);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (allValue !== undefined) {
      answerData({
        indexId: 0,
        answer: {
          stepId: allValue?.stepID,
          optionId:
            allValue?.stepFields[0]?.stepFieldOptions[selectedItem]?.optionID,
        },
      });
    }
  }, [allValue, selectedItem]);
  const imageComponent = () => {
    return (
      <View style={styles?.iconMainContainer}>
        <View style={styles?.lessIconContainer}>
          {idx == 0 ? null : (
            <TouchableOpacity onPress={() => handleButtonClick(false)}>
              <Image
                style={[
                  styles?.iconStyle,
                  { transform: [{ rotate: "180deg" }] },
                ]}
                source={imagePath?.GreaterNext}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(idx);
          }}
          style={{
            width: moderateScale(200),
            height: moderateScale(200),
            justifyContent: "center",
            borderRadius: moderateScale(100),
            borderColor: colors?.polishedPine,
            borderWidth:
              selectedItem == idx ? moderateScale(2) : moderateScale(0),
          }}
        >
          <View style={styles?.imageContainer}>
            {console.log(
              "allValue?.stepFields[0]?.stepFieldOptions[idx]?.logo",
              allValue?.stepFields[0]?.stepFieldOptions[idx]?.logo
            )}

            {console.log("allValue", allValue?.stepFields[0])}
            {isLoading ? null : (
              <CustomImage
                // source={{
                //   uri: allValue?.stepFields[0]?.stepFieldOptions[idx]?.logo,
                // }}
                // source={{ uri: currentImage }}
                key={idx}
                source={{
                  uri: allValue?.stepFields[0]?.stepFieldOptions[idx]?.logo,
                  // cache: "reload", // Or 'force-cache' depending on the library
                }}
                width={
                  idx == 0 || idx == 2 ? moderateScale(130) : moderateScale(192)
                }
                height={
                  idx == 0 || idx == 2 ? moderateScale(130) : moderateScale(192)
                }
                isTintColor={false}
                isShimmer={true}
                componentUsedIn={
                  Enum_ComponentUsedInForCustomImage?.OnboardingFlow
                }
              />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles?.greaterIconContainer}>
          {idx ==
          allValue?.stepFields[0]?.stepFieldOptions.length - 1 ? null : (
            <TouchableOpacity onPress={() => handleButtonClick(true)}>
              <Image
                style={[styles?.iconStyle]}
                source={imagePath?.GreaterNext}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  return (
    <>
      <Text style={styles?.questionTexr}>
        {allValue?.stepFields[0]?.fieldName}
      </Text>
      <Text style={styles?.subTitle}>{"I want to"}</Text>
      {imageComponent()}
      <Text style={styles?.answerTextStyle}>
        {allValue?.stepFields[0]?.stepFieldOptions[idx]?.title}
      </Text>
    </>
  );
};

export default PlannerActivity;

const styles = StyleSheet.create({
  iconMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lessIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-start",
  },
  greaterIconContainer: {
    width: moderateScale(25),
    alignItems: "flex-end",
  },
  iconStyle: {
    // transform: [{ rotate: "180deg" }],
    height: moderateScale(24),
    width: moderateScale(20),
    tintColor: colors?.SurfCrest,
  },
  imageContainer: {
    backgroundColor: colors?.SurfCrest,
    height: moderateScale(192),
    width: moderateScale(192),
    borderRadius: moderateScale(96),
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: moderateScale(192),
    width: moderateScale(192),
    // borderRadius: moderateScale(96),
  },
  questionTexr: {
    fontWeight: "500",
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    textAlign: "center",
    alignSelf: "center",
    width: "87%",
  },
  subTitle: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors?.SurfCrest,
    alignSelf: "center",
    marginTop: moderateScale(75),
    marginBottom: moderateScale(10),
  },
  answerTextStyle: {
    fontWeight: "700",
    fontSize: textScale(24),
    color: colors?.royalOrangeDark,
    alignSelf: "center",
    textAlign: "center",
    marginTop: moderateScale(40),
  },
});
