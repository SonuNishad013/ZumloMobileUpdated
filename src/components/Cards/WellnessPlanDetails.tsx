import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { CalendarIconBlue } from "../../assets";
import { strings } from "../../constant/strings";
import ForDetailsWellnessPlan from "../../screens/Dashboard/Wellness/ForDetailsWellnessPlan";
import { convertDaysToMonths } from "../../screens/Dashboard/Wellness/helperFunctions";
import CommonButton from "../Buttons/commonButton";

interface Props {
  title?: any;
  description?: any;
  createdDate?: any;
  status?: any;
  contentContainer?: ViewStyle;
  sectionTitle?: TextStyle;
  onPress?: () => void;
  wellnessData?: any;
  showDetails?: any;
  navigation?: any;
  durationOfPlan?: any;
  onRegerateWellnessPlan?: () => void;
  getWellnessPlanDetails: () => void;
  setIsLoading: (value: boolean) => void;
  setToasterDetails: (val: any) => void;
  setIsSwiping?: (val: boolean) => void;
}

const WellnessPlanDetails: React.FC<Props> = ({
  title,
  description,
  createdDate,
  status,
  contentContainer,
  sectionTitle,
  onPress,
  wellnessData,
  showDetails,
  navigation,
  durationOfPlan,
  onRegerateWellnessPlan,
  getWellnessPlanDetails,
  setIsLoading,
  setToasterDetails,
  setIsSwiping,
}) => {
  return (
    <View
      style={[
        styles.wrapper,
        showDetails ? styles.showDetailsWrapper : styles.noDetailsWrapper,
      ]}
    >
      <View style={[styles.contentContainer, contentContainer]}>
        <View style={styles.content}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.sectionTitle, sectionTitle]}>{title}</Text>
          </View>
          <Text style={styles.textContent}>{description}</Text>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.dateWrapper}>
            <View style={styles.dateDetails}>
              <CalendarIconBlue
                height={moderateScale(20)}
                width={moderateScale(20)}
              />
              <Text style={styles.dateText}>
                {strings?.createdOn}
                <Text style={styles.boldText}>{createdDate}</Text>
              </Text>
            </View>
            <View style={styles.statusWrapper}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>
        </View>
        {durationOfPlan && (
          <View
            style={[
              styles.dateDetails,
              {
                marginTop: moderateScale(10),
                backgroundColor: colors?.polishedPine,
                marginLeft: moderateScale(19),
                paddingVertical: moderateScale(5),
                // width: moderateScale(160),
              },
            ]}
          >
            <Text style={styles.dateText}>
              {"Duration : "}
              <Text style={styles.boldText}>
                {convertDaysToMonths(durationOfPlan)}
              </Text>
            </Text>
          </View>
        )}
      </View>
      {/* re-generate wellness plan from wellbeing */}
      <CommonButton
        mainContainer={{
          alignSelf: "center",
          height: moderateScale(40),
          marginVertical: moderateScale(10),
        }}
        btnName="Regenerate Plan"
        onPress={onRegerateWellnessPlan}
      />

      {showDetails && (
        <View style={styles.detailsContainer}>
          <ForDetailsWellnessPlan
            wellnessData={wellnessData}
            navigation={navigation}
            getWellnessPlanDetails={getWellnessPlanDetails}
            setIsLoading={setIsLoading}
            setToasterDetails={(val: any) => setToasterDetails(val)}
            setIsSwiping={(val: boolean) => setIsSwiping && setIsSwiping(val)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: colors?.SurfCrest,
    borderRadius: moderateScale(16),
    marginTop: moderateScale(20),
  },
  showDetailsWrapper: {
    padding: moderateScale(3),
    borderWidth: moderateScale(1),
  },
  noDetailsWrapper: {
    padding: moderateScale(0),
    borderWidth: moderateScale(0),
  },
  contentContainer: {
    backgroundColor: colors.prussianBlue,
    flex: 1,
    borderRadius: moderateScale(15),
    paddingBottom: moderateScale(13),
  },
  content: {
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    overflow: "visible",
  },
  sectionTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.royalOrange,
    marginTop: moderateScale(25),
    // width: moderateScale(200),
  },
  textContent: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.SurfCrest,
    marginTop: moderateScale(10),
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(15),
  },
  dateWrapper: {
    width: moderateScale(200),
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateDetails: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors?.SurfCrest,
    width: moderateScale(190),
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(2),
  },
  dateText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.prussianBlue,
    marginLeft: moderateScale(7),
    flex: 1,
  },
  boldText: {
    fontWeight: "600",
  },
  statusWrapper: {
    alignItems: "center",
    backgroundColor: colors?.SurfCrest,
    borderTopLeftRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(2),
  },
  statusText: {
    paddingHorizontal: moderateScale(10),
    color: colors?.prussianBlue,
  },
  detailsContainer: {
    backgroundColor: colors?.prussianBlue,
    marginTop: moderateScale(15),
    borderRadius: moderateScale(15),
    paddingBottom: moderateScale(15),
  },
});

export default WellnessPlanDetails;
