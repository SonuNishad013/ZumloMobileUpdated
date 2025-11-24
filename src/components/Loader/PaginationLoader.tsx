import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  title: any;
  textColor: any;
}

const PaginationLoader = ({ title, textColor }: Props) => {
  const [dotCount, setDotCount] = useState(1);
  const maxDots = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= maxDots ? 1 : prev + 1));
    }, 500); // update every 500ms

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  return (
    <View>
      <Text
        style={{
          color: textColor,
          textAlign: "center",
          marginVertical: moderateScale(25),
          fontSize: moderateScale(14),
        }}
      >
        {`${title} ` + ".".repeat(dotCount)}
      </Text>
    </View>
  );
};

export default PaginationLoader;

const styles = StyleSheet.create({});
