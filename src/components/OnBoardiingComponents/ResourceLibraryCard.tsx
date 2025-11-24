import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
  onPress?: any;

  source?: any;
  card?: ViewStyle;
  title?: any;
  description?: any;
  frequency?: any;
  items?: any;
  jsonData?: any;
}
const ResourceLibraryCard: React.FC<Props> = ({
  onPress,
  source,
  card,
  title,
  description,
  frequency,
  items,
  jsonData,
}) => {
  console.log("jsonData jsonData", jsonData);
  return (
    <TouchableOpacity
      style={[styles.card, card]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Image source={source} style={styles.icon} />
      {/* <Image source={imagePath?.ActivitesIcon} style={styles.icon} /> */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
            {/* Physical Activities */}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {description}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text></Text>
          <Text style={styles.detailsText}>{"View Details"}</Text>
          <Image style={styles.arrow} source={imagePath?.CirArrow} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResourceLibraryCard;

const styles = StyleSheet.create({
  card: {
    width: "auto",
    backgroundColor: colors?.SaltBox,
    padding: moderateScale(15),
    flexDirection: "row",
    borderRadius: moderateScale(15),
    gap: moderateScale(10),
    alignItems: "center",
  },
  icon: {
    width: moderateScale(99),
    height: moderateScale(99),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
  },
  infoContainer: {
    gap: moderateScale(25),
    flex: 1,
  },
  title: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
    width: moderateScale(200),
  },
  subtitle: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
    fontWeight: "400",
    width: moderateScale(200),
  },
  scheduleContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: moderateScale(20),
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleText: {
    color: "#fff",
    fontSize: textScale(10),
    fontWeight: "400",
    marginLeft: moderateScale(7),
  },
  separator: {
    fontSize: textScale(20),
    color: colors?.SurfCrest,
    width: moderateScale(2.5),
  },
  detailsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: moderateScale(30),
    borderRadius: moderateScale(20),
    padding: moderateScale(4),
  },
  detailsText: {
    color: "#fff",
    fontSize: textScale(10),
    fontWeight: "600",
  },
  arrow: {
    height: moderateScale(22),
    width: moderateScale(22),
  },
});
