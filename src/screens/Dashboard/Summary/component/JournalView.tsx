import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import {
  height,
  moderateScale,
  textScale,
} from "../../../../constant/responsiveStyle";
import moment from "moment";

import { strings } from "../../../../constant/strings";
import CommonHeaderJournal from "../../../../components/Header/commonHeaderJournal";
interface JournalViewProps {
  navigation?: any;
  route?: any;
}
const JournalView: React.FC<JournalViewProps> = ({ navigation, route }) => {
  const { journalData, selectedStartDate } = route?.params;

  const rawDate = moment(selectedStartDate).format("MMM DD, YYYY");
  const fixedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ flex: 1 }}>
        <View style={styles?.backButtonHeaderContainer}>
          <CommonHeaderJournal
            headerName={`${strings?.Journal} on ${fixedDate}`}
            onBackPress={() => navigation.goBack()}
            iconContainer={styles?.iconContainer}
          />
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(19),
            gap: moderateScale(10),
            marginTop: moderateScale(19),
          }}
        >
          <View
            style={[
              styles?.containersStyle,
              { maxHeight: moderateScale(height * 0.15), borderWidth: 0 },
            ]}
          >
            <Text
              style={[
                styles?.textStyle,
                {
                  fontWeight: "600",
                  textAlign: "center",
                  marginBottom: moderateScale(10),
                },
              ]}
            >
              {"Your journal for the day "}
            </Text>
            <Text style={[styles?.textStyle, { fontWeight: "600" }]}>
              {journalData?.title}
            </Text>
          </View>
          <View
            style={[
              styles?.containersStyle,
              { minHeight: moderateScale(height * 0.25) },
            ]}
          >
            <Text style={styles?.textStyle}>{journalData?.description}</Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default JournalView;

const styles = StyleSheet.create({
  backButtonHeaderContainer: {
    paddingHorizontal: moderateScale(19),
    marginBottom: moderateScale(9),
  },
  iconContainer: { backgroundColor: "#00000033" },
  textStyle: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  containersStyle: {
    borderWidth: 1,
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
    paddingHorizontal: moderateScale(15),
  },
});
