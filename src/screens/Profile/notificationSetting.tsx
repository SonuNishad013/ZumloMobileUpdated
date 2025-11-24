import React, { ReactElement, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NotificationIcon2, ForwordArrow } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import ToggleSwitch from "toggle-switch-react-native";
import SeeAllHeaderWellness from "../Dashboard/Wellness/commonHeader";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  navigation?: any;
  NotificationSettingData?: any;
}

const NotificationSetting: React.FC<Props> = ({
  navigation,
  NotificationSettingData,
}): ReactElement => {
  const [isToggleon, setisToggleon] = useState(
    NotificationSettingData?.[0]?.isEnable
  );
  const onToggleChange = () => {
    setisToggleon(!isToggleon);
  };
  const renderNotificationSettingItem = (item: any) => (
    <View
      style={styles.notificationSettingItem}
      // onPress={() => navigation.navigate(item?.nav)}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.notificationIconContainer}>
          <NotificationIcon2 />
        </View>
        <Text style={styles.notificationText}>
          {formatSentenceCase(item?.name)}
        </Text>
      </View>
      <View style={styles.forwardArrowContainer}>
        <ToggleSwitch
          isOn={isToggleon}
          onColor={colors.SurfCrest}
          offColor={colors.prussianBlue}
          circleColor={colors.SaltBox}
          //   label="Example label"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="small"
          onToggle={onToggleChange}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SeeAllHeaderWellness
        name={"Notification settings"}
        container={{ marginHorizontal: moderateScale(1) }}
        nameText={{ color: colors?.SurfCrest }}
      />
      {renderNotificationSettingItem(NotificationSettingData?.[0])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(15),
    backgroundColor: colors.polishedPine,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
  },
  notificationSettingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: moderateScale(5),
    alignItems: "center",
  },
  notificationIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(22),
    width: moderateScale(22),
    backgroundColor: colors.lightOceanGreen,
    borderRadius: moderateScale(4),
  },
  notificationText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginHorizontal: moderateScale(10),
  },
  forwardArrowContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NotificationSetting;
