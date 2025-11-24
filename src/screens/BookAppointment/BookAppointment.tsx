import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import { moderateScale } from "../../constant/responsiveStyle";
import ProfileCard from "../../components/Cards/profileCard";
import { imagePath } from "../../assets/png/imagePath";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import CommonButton from "../../components/Buttons/commonButton";
import { Calendar } from "react-native-calendars";
import { BlurView } from "@react-native-community/blur";
import { CalenderDown } from "../../assets";

type ItemData = {
  id: number;
  Date: any;
  Day: any;
};

type TimeData = {
  id: number;
  Time: any;
};

const DATATIMEAVAILABLESLOTS: TimeData[] = [
  {
    id: 1,
    Time: "09:30 AM",
  },
  {
    id: 2,
    Time: "10:00 AM",
  },
  {
    id: 3,
    Time: "10:30 PM",
  },
  {
    id: 4,
    Time: "11:00 AM",
  },
  {
    id: 5,
    Time: "11:30 AM",
  },
  {
    id: 6,
    Time: "12:00 PM",
  },
  {
    id: 7,
    Time: "12:30 PM",
  },
  {
    id: 8,
    Time: "01:00 AM",
  },
];

const DATA: ItemData[] = [
  {
    id: 1,
    Date: 12,
    Day: "Tue",
  },
  {
    id: 2,
    Date: 13,
    Day: "Wed",
  },
  {
    id: 3,
    Date: 14,
    Day: "Thu",
  },
  {
    id: 4,
    Date: 15,
    Day: "Fri",
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

type TimeProps = {
  item: TimeData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.DateOuterView}>
    <View style={[styles.DateView, { backgroundColor }]}>
      <Text style={[styles.DateText, { color: textColor }]}>{item.Date}</Text>
      <Text style={[styles.DayText, { color: textColor }]}>{item.Day}</Text>
    </View>
  </TouchableOpacity>
);

const TimeSlotsItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
}: TimeProps) => (
  <TouchableOpacity onPress={onPress} style={styles.TimeOuterView}>
    <View style={[styles.TimeView, { backgroundColor }]}>
      <Text>{item.Time}</Text>
    </View>
  </TouchableOpacity>
);

const profileIcon = imagePath.ProfileIcon;

interface Props {
  navigation?: any;
  isModalVisible?: boolean;
}

const BookAppointment: React.FC<Props> = ({ navigation }): ReactElement => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor =
      item.id === selectedId ? colors?.OceanGreen : colors?.SurfCrest;
    const color = item.id === selectedId ? colors?.SurfCrest : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const TimerenderItem = ({ item }: { item: TimeData }) => {
    const backgroundColor =
      item.id === selectedTimeSlot ? colors?.OceanGreen : colors?.SurfCrest;
    const color = item.id === selectedTimeSlot ? colors?.SurfCrest : "black";

    return (
      <TimeSlotsItem
        item={item}
        onPress={() => setSelectedTimeSlot(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const Header = () => (
    <View style={styles.headerBackGround}>
      <CommonHeader headerName={strings.headerBookAppointment} />
    </View>
  );

  const longText =
    "TESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEWTESTNEWNEWNEWNEW";

  const ProfileCard1 = () => (
    <ProfileCard
      source={profileIcon}
      Name={"Dr.Imran Syahir"}
      Profession={"General Doctor"}
      title={strings.cardTitle}
      longtext={longText}
    />
  );

  const customizedCalender = () => {
    return (
      <>
        {/* customized calender starts here */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalView}>
              <Calendar
                onDayPress={(day) => {
                  console.log("selected day", day);
                  toggleModal(); // Close the modal after a day is selected
                }}
                hideExtraDays={true}
                style={styles.calender}
                theme={styles.calenderTheme}
                // Add any other props for customization
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* Customized calender ends here */}
      </>
    );
  };

  const DayDate = () => (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => "key" + index}
      extraData={selectedId}
      numColumns={4}
    />
  );

  const TimeSlotsAvailable = () => (
    <FlatList
      data={DATATIMEAVAILABLESLOTS}
      renderItem={TimerenderItem}
      keyExtractor={(item, index) => "key" + index}
      extraData={selectedTimeSlot}
      numColumns={3}
    />
  );

  const TimeSlots = () => (
    <View style={styles.SlotOuterView}>
      <View style={styles.SlotView}>
        <Text style={styles.checkAvailText}>{strings?.checkAvailability}</Text>
        <TouchableOpacity
          onPress={toggleModal}
          style={styles.dateSelectionView}
        >
          <Text style={styles.dateSelectiontext}>{"January, 2024"}</Text>
          <View style={{ paddingHorizontal: moderateScale(5) }} />
          <CalenderDown width={10} height={10} color={colors?.SurfCrest} />
        </TouchableOpacity>
        {customizedCalender()}
        {DayDate()}
        <View style={styles.timeSlotsView}>
          <Text style={styles.checkAvailText}>
            {strings?.AvailableTimeSlots}
          </Text>
        </View>
        <View>{TimeSlotsAvailable()}</View>
      </View>
    </View>
  );

  const BookAppointmentButton = () => (
    <View style={styles.ButtonView}>
      <CommonButton
        mainContainer={{ width: moderateScale(331), alignSelf: "center" }}
        btnName={strings?.BookAppointmentButton}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        {Header()}
        <View style={styles.innerView}>
          {ProfileCard1()}
          {TimeSlots()}
          {BookAppointmentButton()}
          {isModalVisible && (
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
              onPress={toggleModal}
            />
          )}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};
export default BookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SurfCrest,
  },
  headerBackGround: {
    backgroundColor: colors.prussianBlue,
    paddingVertical: moderateScale(50),
    paddingHorizontal: moderateScale(15),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  innerView: {
    padding: moderateScale(10),
    // alignSelf:'center',
    position: "relative",
    bottom: moderateScale(30),
  },
  SlotView: {
    backgroundColor: colors.prussianBlue,
    paddingLeft: moderateScale(15),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(40),
    borderRadius: 10,
    width: moderateScale(335),
    alignSelf: "center",
  },
  SlotOuterView: {
    alignSelf: "center",
    padding: moderateScale(10),
    // paddingVertical:moderateScale(10),
    width: "100%",
  },
  checkAvailText: {
    color: colors.SurfCrest,
    fontWeight: "600",
    fontSize: 14,
  },
  modalView: {
    margin: "50%",
    backgroundColor: "transparent",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // Set the modal size and center align it
    // width: moderateScale(335),
    // height: moderateScale(337),
    justifyContent: "center",
    alignSelf: "center",
  },
  calender: {
    // backgroundColor: colors?.backgroundTheme,
    // borderRadius: 10,
    margin: "70%",
    // padding: 35,
    shadowColor: "#000",
    width: moderateScale(335),
    // height: moderateScale(345),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    // alignSelf: 'center',
  },
  calenderTheme: {
    // Customize header color here
    "stylesheet.calendar.header": {
      header: {
        backgroundColor: colors?.darkGreen,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        // borderTopEndRadius: 10,
        // borderTopStartRadius:10,
      },
    },
    "stylesheet.day.basic": {
      // Example: Reduce padding or font size
      base: {
        width: 32,
        height: 32, // Smaller height per day
        alignItems: "center",
      },
    },
    backgroundColor: "green", // Change this to the color you desire
    calendarBackground: colors?.backgroundTheme,
    textSectionTitleColor: "#b6c1cd",
    textSectionTitleDisabledColor: "#d9e1e8",
    selectedDayBackgroundColor: colors.OceanGreen,
    selectedDayTextColor: "#ffffff",
    todayTextColor: "#00adf5",
    dayTextColor: colors?.SurfCrest,
    textDisabledColor: "#d9e1e8",
    dotColor: "#00adf5",
    selectedDotColor: "#ffffff",
    arrowColor: colors?.SurfCrest,
    disabledArrowColor: "#d9e1e8",
    monthTextColor: colors?.SurfCrest, // Change this to the color you desire
    indicatorColor: "green", // Change this to the color you desire
    textDayFontFamily: "monospace",
    textMonthFontFamily: "monospace",
    textDayHeaderFontFamily: "monospace",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "300",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dateSelectionView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dateSelectiontext: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: 14,
  },
  DateOuterView: {
    marginTop: moderateScale(20),
    marginRight: moderateScale(20),
  },
  DateView: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: "center",
    // paddingTop: moderateScale(20),
  },
  DateText: {
    fontWeight: "500",
    fontSize: 25,
    fontFamily: "Poppins-Regular",
  },
  DayText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Poppins-Regular",
  },
  timeSlotsView: {
    paddingTop: moderateScale(20),
  },
  TimeOuterView: {
    marginRight: moderateScale(10),
    marginTop: moderateScale(10),
  },
  TimeView: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(10),
  },
  ButtonView: {
    paddingTop: moderateScale(30),
  },
});
