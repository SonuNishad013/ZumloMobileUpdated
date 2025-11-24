import { Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../constant/colors";
import { styles } from "./style";
import { strings } from "../../../constant/strings";

interface IconContainerProps {
  icon: React.ReactNode;
  notificationCount?: number;
  type?: string;
  onPress?: () => void;
}
const IconContainer: React.FC<IconContainerProps> = ({
  icon,
  notificationCount,
  type,
  onPress,
}: IconContainerProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              type == strings?.notification
                ? colors.SurfCrest
                : colors.royalOrange,
          },
        ]}
      >
        {icon}
        {type == strings?.notification && (
          <>
            {!!notificationCount && (
              <TouchableOpacity
                style={[styles.notificationCountContainer, styles?.padding_]}
              >
                <Text style={styles.notificationCountText}>
                  {notificationCount}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default IconContainer;
