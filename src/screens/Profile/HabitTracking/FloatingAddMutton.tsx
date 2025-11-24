import { TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale } from "../../../constant/responsiveStyle";
import { PlusIconWhite } from "../../../assets";
import { styles } from "./styles";
interface FloatingAddMuttonProps {
  onPress?: () => void;
}
const FloatingAddMutton: React.FC<FloatingAddMuttonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles?.FloatingButtonContainer} onPress={onPress}>
      <PlusIconWhite width={moderateScale(25)} height={moderateScale(25)} />
    </TouchableOpacity>
  );
};

export default FloatingAddMutton;
