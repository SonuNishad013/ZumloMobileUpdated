import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";

interface Props {
  navigation?: any;
  source?: any;
  Name?: string;
  Profession?: string;
  title?: string;
  longtext?: any;
}

const ProfileCard: React.FC<Props> = ({
  navigation,
  source,
  Name,
  Profession,
  title,
  longtext,
}): ReactElement => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerCardView}>
        <View style={styles.upperView}>
          <Image source={source} style={styles.image} />
          <View style={styles.InfoView}>
            <Text style={styles.NameText}>{Name}</Text>
            <View style={{ paddingTop: moderateScale(5) }} />
            <Text style={styles.ProfessionText}>{Profession}</Text>
          </View>
        </View>
        <View style={styles.horizontalLineView}>
          <View style={styles.horizontalLine} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={[styles.DescView, { backgroundColor: "red" }]}>
          <Text
            numberOfLines={showFullText ? undefined : 3}
            style={styles.DescText}
          >
            {longtext}
          </Text>
          {longtext.length > 100 && (
            <TouchableOpacity onPress={toggleText}>
              <Text style={{ color: colors.OceanGreen }}>
                {showFullText ? "Read Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundTheme,
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    width: moderateScale(335),
  },
  innerCardView: {
    paddingHorizontal: moderateScale(20),
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  upperView: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  InfoView: {
    paddingHorizontal: moderateScale(10),
    // alignItems:'center'
  },
  NameText: {
    fontWeight: "600",
    color: colors.SurfCrest,
    fontSize: 14,
  },
  ProfessionText: {
    fontWeight: "400",
    color: colors.SurfCrest,
    fontSize: 14,
  },
  horizontalLine: {
    borderBottomColor: colors.SurfCrest,
    borderBottomWidth: 1,
  },
  horizontalLineView: {
    paddingVertical: moderateScale(10),
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.SurfCrest,
  },
  DescView: {
    paddingTop: moderateScale(10),
  },
  DescText: {
    fontWeight: "400",
    color: colors.SurfCrest,
    fontSize: 10,
  },
});
