import React, { ReactElement } from "react";
import { Text, View, FlatList, StyleSheet, ViewStyle } from "react-native";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { ForwordBackArrowIcon } from "../../../assets";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  UpcommingSessionsData?: any;
  container?: ViewStyle;
}
const UpcommingSessions: React.FC<Props> = ({
  navigation,
  UpcommingSessionsData,
  container,
}): ReactElement => {
  const renderUpcommingSessions = (item: any, index: any) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.sessionInfo}>
          <View style={styles.sessionNoContainer}>
            <Text style={styles.sessionNo}>
              {item?.sessionNo}
              <Text style={styles.sessionText}>{strings?.sessions_}</Text>
            </Text>
            <View style={{ width: 5 }} />
          </View>
          <View>
            <Text style={styles.sessionName}>{item.name}</Text>
            <Text style={styles.sessionDescription}>{item.description}</Text>
          </View>
          <View style={styles.sessionDuration}>
            <Text style={styles.durationText}>{strings?.timing_mins}</Text>
            <View style={styles.iconContainer}>
              <ForwordBackArrowIcon />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <HeaderWithNameSeeAll
        name={strings?.Upcoming_sessions}
        msg={strings?.seeAll}
        container={container}
      />
      <FlatList
        data={UpcommingSessionsData}
        renderItem={({ item, index }) => renderUpcommingSessions(item, index)}
        horizontal
        keyExtractor={(item, index) => "key" + index}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default UpcommingSessions;
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.polishedPine,
    height: moderateScale(180),
    width: moderateScale(240),
    marginRight: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  sessionInfo: {
    justifyContent: "space-between",
    flexDirection: "column",
    height: moderateScale(150),
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(10),
  },
  sessionNoContainer: {
    borderWidth: 1,
    borderColor: colors.SilverChalice,
    borderRadius: moderateScale(35),
    maxWidth: moderateScale(80),
    height: moderateScale(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SurfCrest,
  },
  sessionNo: {
    marginHorizontal: moderateScale(10),
    fontSize: textScale(10),
    fontWeight: "700",
    color: colors.darkBlack,
  },
  sessionText: {
    fontSize: textScale(10),
    fontWeight: "600",
    color: colors.SaltBox,
  },
  sessionName: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.SurfCrest,
  },
  sessionDescription: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  sessionDuration: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  durationText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.SurfCrest,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(40),
    backgroundColor: colors.prussianBlue,
  },
});
