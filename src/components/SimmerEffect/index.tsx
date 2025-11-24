import React, { FC } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { moderateScale } from "../../constant/responsiveStyle";

interface Props {
  height?: any;
  width?: any;
  borderRadius?: any;
  backgroundColor?: any;
}

const ShimmerPlaceHolder: FC<Props> = ({
  height = 20,
  width = 100,
  borderRadius = 5,
  backgroundColor = "#E1E9EE",
}) => {
  return (
    <SkeletonPlaceholder
      borderRadius={moderateScale(borderRadius)}
      backgroundColor={backgroundColor}
    >
      <SkeletonPlaceholder.Item
        height={moderateScale(height)}
        width={typeof width == "string" ? width : moderateScale(width)}
        borderRadius={moderateScale(borderRadius)}
      />
    </SkeletonPlaceholder>
  );
};

export default ShimmerPlaceHolder;
