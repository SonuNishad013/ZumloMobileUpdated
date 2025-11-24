import React, { ReactElement, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { CalendarIcon, LowerAngle, UpperAngle } from "../../../assets";
import { imagePath } from "../../../assets/png/imagePath";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { PLATEFORM } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  AppoinmentData?: any;
}
const Appoinment: React.FC<Props> = ({
  navigation,
  AppoinmentData,
}): ReactElement => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  if (Platform.OS === PLATEFORM?.android) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const handlePress = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const renderItem = (item: any, index: any) => {
    const isExpanded = index === expandedIndex;
    return (
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.innerContainer}>
            <View style={[styles.innerContainer, styles?.flexRow]}>
              <Image
                source={imagePath.DoctorImage}
                style={styles.imageContainer}
              />
              <View style={styles?.innerView}>
                <Text style={styles.textStyle}>{strings?.doctorName}</Text>
                <Text style={[styles.textStyle, styles?.textWeight]}>
                  {strings?.General_Doctor}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handlePress(index)}>
              {isExpanded ? <UpperAngle /> : <LowerAngle />}
            </TouchableOpacity>
          </View>
          <View style={styles.slotContainer}>
            <Text style={[styles.textStyle, styles?.slotText]}>
              {strings?.Recent_slot_available}
            </Text>
            <View style={styles.flexDirectionConstant}>
              <View style={styles?.rowCenter}>
                <CalendarIcon />
                <Text style={[styles.textStyle, styles?.textWeight]}>
                  {"Sunday,05 Jan"}
                </Text>
              </View>

              <View style={styles?.rowCenter}>
                <CalendarIcon />
                <Text style={[styles.textStyle, styles?.textWeight]}>
                  {"11:00 - 12:00 AM"}
                </Text>
              </View>
            </View>
          </View>
          {isExpanded && (
            <>
              <View style={styles.detailsButtonContainer}>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>
                    {strings?.Details_}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={AppoinmentData}
      keyExtractor={(item, index) => "key" + index}
      ListHeaderComponent={() => (
        <HeaderWithNameSeeAll
          name={strings?.Your_next_appointments}
          msg={strings?.seeAll}
        />
      )}
      renderItem={({ item, index }) => renderItem(item, index)}
      ListFooterComponent={() => {
        return (
          <TouchableOpacity style={styles.FooterContainer}>
            <View style={styles.FooterInnerContainer}>
              <Text style={styles.FooterPlusText}>+</Text>
              <Text style={styles.FooterAppointmentText}>
                {strings?.headerBookAppointment}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: colors.prussianBlue,
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10),
    justifyContent: "space-between",
    marginHorizontal: moderateScale(15),
  },
  planContent: {
    justifyContent: "space-between",
    marginHorizontal: moderateScale(15),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: moderateScale(10),
  },
  imageContainer: {
    borderRadius: moderateScale(48),
    height: moderateScale(48),
    width: moderateScale(48),
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  textContainer: {
    width: moderateScale(width - (width - 250)),
  },
  nameText: {
    color: colors.lightblue,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  occupationText: {
    color: colors.lightblue,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  horizontalLine: {
    marginTop: moderateScale(15),
    width: moderateScale(width - (width - 310)),
    height: 1,
    opacity: 0.4,
    backgroundColor: colors.lightblue,
  },
  dateContainer: {
    marginVertical: moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateTextContainer: {
    marginHorizontal: moderateScale(10),
  },
  dateText: {
    color: colors.lightblue,
    fontSize: textScale(12),
    fontWeight: "400",
  },
  detailsButtonContainer: {
    marginVertical: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButton: {
    borderRadius: moderateScale(23),
    backgroundColor: colors.polishedPine,
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(320),
    height: moderateScale(40),
  },
  detailsButtonText: {
    color: colors.lightblue,
    fontSize: textScale(12),
    fontWeight: "400",
  },
  FooterContainer: {
    justifyContent: "center",
    borderWidth: moderateScale(1),
    marginTop: moderateScale(10),
    borderColor: colors.royalOrange,
    borderStyle: "dotted",
    height: moderateScale(50),
    borderRadius: moderateScale(5),
  },
  FooterInnerContainer: {
    marginHorizontal: moderateScale(15),
    alignItems: "center",
    flexDirection: "row",
  },
  FooterPlusText: {
    fontSize: textScale(30),
    color: colors.royalOrange,
  },
  FooterAppointmentText: {
    fontSize: textScale(14),
    color: colors.royalOrange,
    marginHorizontal: moderateScale(15),
  },
  textStyle: {
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  mainContainer: {
    padding: 15,
    marginTop: moderateScale(10),
    backgroundColor: colors.backgroundTheme,
    borderRadius: moderateScale(12),
  },
  innerContainer: { flexDirection: "row", justifyContent: "space-between" },
  slotContainer: {
    borderTopColor: colors.SurfCrest,
    borderTopWidth: 1,
    marginTop: moderateScale(10),
  },
  flexDirectionConstant: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(10),
  },
  flexRow: {
    flexDirection: "row",
  },
  innerView: {
    marginHorizontal: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  textWeight: {
    fontWeight: "400",
  },
  slotText: {
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Appoinment;
