import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { View, StyleSheet, Image } from "react-native";

const SvgIconFromUri = ({ uri, width, height, color }: any) => {
  const [svgContent, setSvgContent] = useState<any>(null);
  const [isSvg, setIsSvg] = useState<boolean | null>(null);

  useEffect(() => {
    const isSvgFile = uri.endsWith(".svg");
    setIsSvg(isSvgFile);

    if (isSvgFile) {
      const fetchSvg = async () => {
        try {
          const response = await fetch(uri);
          const svgText = await response.text();
          const coloredSvgText = svgText.replace(
            /fill=".*?"/g,
            `fill="${color}"`
          );
          setSvgContent(coloredSvgText);
        } catch (error) {
          console.error("Error fetching the SVG:", error);
        }
      };

      fetchSvg();
    }
  }, [uri, color]);

  if (isSvg === null) {
    return null;
  }

  if (isSvg) {
    if (!svgContent) {
      return null; // You can show a loader here while the SVG is being fetched
    }

    return (
      <View style={[styles.container, { width, height }]}>
        <SvgXml xml={svgContent} width={width} height={height} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={{ uri }}
        style={[{ width, height, tintColor: color }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SvgIconFromUri;

// Example usage:
// <SvgIconFromUri
//   uri="https://example.com/icon.png" // Or a .svg file
//   width={50}
//   height={50}
//   color="blue" // Dynamically change the color for both SVG and PNG
// />
