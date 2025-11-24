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
import { CalendarIcon, Clock, Like } from "../../assets";

interface Props {
  onPress?: any;
  source?: any;
  card?: ViewStyle;
  title?: any;
  description?: any;
  frequency?: any;
  items?: any;
  author?: string;
  summary?: string;
}
const RecommendationCardForBooks: React.FC<Props> = ({
  onPress,
  source,
  card,
  title,
  description,
  frequency,
  items,
  author,
  summary,
}) => {
  return (
    <TouchableOpacity style={[styles.card, card]} onPress={onPress}>
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={1}>
                {author}
              </Text>
            </View>
            <View style={styles.scheduleItem}>
              <Like
                height={`${moderateScale(18)}`}
                width={`${moderateScale(18)}`}
              />
              <Text style={styles.scheduleText} numberOfLines={2}>
                {summary}
              </Text>
            </View>
          </View>

          <Image source={source} style={styles.icon} resizeMode="stretch" />
        </View>

        <View style={styles.detailsContainer}>
          <Text></Text>
          <Text style={styles.detailsText}>{"Read more"}</Text>
          <Image style={styles.arrow} source={imagePath?.CirArrow} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendationCardForBooks;

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
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
  },
  infoContainer: {
    gap: moderateScale(8),
    flex: 1,
  },
  title: {
    color: colors?.royalOrangeDark,
    fontSize: textScale(14),
    fontWeight: "600",
    width: moderateScale(200),
  },
  subtitle: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
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
    maxWidth: moderateScale(240),
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
