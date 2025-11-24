import React, { useEffect, useState } from "react";
import { Alert, Image, ImageStyle, View, ViewStyle } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import { SvgUri, SvgXml } from "react-native-svg";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from "../../constant/colors";
import { Enum_ComponentUsedInForCustomImage } from "../../constant/ENUM";
import FastImage from "react-native-fast-image";
import logger from "../../constant/logger";
var imageArray: any = [];
interface CustomImageProps {
  source: { uri: string };
  style?: ImageStyle;
  width?: number;
  height?: number;
  tintColor?: string;
  mainContainer?: ViewStyle;
  isTintColor?: boolean;
  isShimmer?: boolean;
  SkeletonPlaceholderH?: any;
  SkeletonPlaceholderW?: any;
  SkeletonPlaceholdeborderRadius?: any;
  componentUsedIn?: string;
}
interface SvgObject {
  uri: string;
  svg: string;
}
const CustomImage: React.FC<CustomImageProps> = ({
  source,
  style,
  width = moderateScale(22),
  height = moderateScale(22),
  tintColor,
  mainContainer,
  isTintColor = true,
  isShimmer = false,
  SkeletonPlaceholderH,
  SkeletonPlaceholderW,
  SkeletonPlaceholdeborderRadius,
  componentUsedIn,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [showSvg, setShowSvg] = useState(false);

  const isSvg = (uri: string) => uri?.toLowerCase().endsWith(".svg");

  useEffect(() => {
    const fetchSvg = async () => {
      if (!isSvg(source.uri)) return;

      setShowSvg(true);
      try {
        const response = await fetch(source.uri);
        const rawSvg = await response.text();

        const newSvgObject: SvgObject = {
          uri: source.uri,
          svg: rawSvg,
        };
        imageArray = [...imageArray, newSvgObject];
        setSvgContent(rawSvg);
      } catch (error) {
        console.error("Failed to fetch SVG:", error);
      } finally {
        setShowSvg(false);
      }
    };

    const existingSvg = applyFilter(source.uri)
      ? imageArray.find((item: any) => item.uri === source.uri)
      : null;

    if (existingSvg) {
      setSvgContent(existingSvg.svg);
    } else {
      fetchSvg();
    }
  }, [source.uri]);

  const applyFilter = (uri: any) => {
    const exists = imageArray.some((existing: any) => existing.uri === uri);
    return exists;
  };

  const renderSvg = () =>
    componentUsedIn === Enum_ComponentUsedInForCustomImage?.OnboardingFlow ? (
      <SvgUri uri={source.uri} width={width} height={height} />
    ) : (
      <SvgXml
        xml={
          isTintColor && svgContent
            ? svgContent.replace(/fill=".*?"/g, `fill="${tintColor}"`)
            : svgContent
        }
        width={width}
        height={height}
      />
    );

  const renderShimmer = () => {
    return (
      <SkeletonPlaceholder
        borderRadius={SkeletonPlaceholdeborderRadius || moderateScale(500)}
        backgroundColor={colors.SaltBox}
      >
        <SkeletonPlaceholder.Item
          height={SkeletonPlaceholderH || moderateScale(500)}
          width={SkeletonPlaceholderW || moderateScale(500)}
          borderRadius={SkeletonPlaceholdeborderRadius || moderateScale(500)}
        />
      </SkeletonPlaceholder>
    );
  };

  return (
    <View style={[mainContainer]}>
      {isSvg(source.uri) && svgContent ? (
        isShimmer && showSvg ? (
          renderShimmer()
        ) : (
          renderSvg()
        )
      ) : componentUsedIn ===
        Enum_ComponentUsedInForCustomImage?.OnboardingFlow ? (
        <FastImage
          source={
            typeof source === "string"
              ? { uri: source, priority: FastImage.priority.high }
              : source
          }
          style={[
            style,
            {
              width: width || style?.width,
              height: height || style?.height,
              tintColor: tintColor,
            },
          ]}
          resizeMode={FastImage?.resizeMode?.stretch}
        />
      ) : (
        <Image
          source={source}
          style={[
            style,
            {
              width: width || style?.width,
              height: height || style?.height,
              tintColor: tintColor,
            },
          ]}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default CustomImage;
