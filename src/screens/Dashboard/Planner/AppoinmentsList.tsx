import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import YourAppoinmentCard from "../../../components/Cards/YourAppoinmentCard";
import { moderateScale } from "../../../constant/responsiveStyle";
import SeeAllHeaderWellness from "../Wellness/commonHeader";
import colors from "../../../constant/colors";
import AddMoreWithPlusDotted from "../../../components/Buttons/AddMoreWithPlusDotted";
import { strings } from "../../../constant/strings";

interface Props {
  data?: any;
}
const AppointmentsList: React.FC<Props> = ({ data }) => {
  return (
    <>
      <SeeAllHeaderWellness
        name={strings?.Your_appointment}
        msg={strings?.seeAll}
      />
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => (
          <YourAppoinmentCard
            date={item?.date}
            time={item?.time}
            status={item?.status}
          />
        )}
        ListFooterComponent={() => (
          <AddMoreWithPlusDotted
            mainContainer={styles.goalButtonContainer}
            iconStyle={styles.goalButtonIcon}
            title={strings?.headerBookAppointment}
            titleStyle={styles.goalButtonTitle}
          />
        )}
      />
    </>
  );
};

export default AppointmentsList;

const styles = StyleSheet.create({
  flatList: {
    gap: moderateScale(10),
  },
  goalButtonContainer: {
    borderColor: colors?.orgDark,
    borderWidth: moderateScale(1),
  },
  goalButtonIcon: {
    tintColor: colors?.orgDark,
  },
  goalButtonTitle: {
    color: colors?.orgDark,
  },
});
