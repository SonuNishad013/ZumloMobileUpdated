import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { ReactElement } from "react";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  CalenderBoy,
  CloseIcon,
  OrangeWhiteTick,
  RemindersCalender,
} from "../../../assets";
import { styles } from "./style";
import { data } from "./Dummy";
import { notificationENUM } from "../../../constant/ENUM";
interface Props {
  navigation?: any;
}
const Notifications: React.FC<Props> = ({ navigation }): ReactElement => {
  const Header = () => (
    <CommonHeader
      headerName={strings.HeaderNotif}
      textStyle={styles?.headerTextColor}
      mainContainer={styles?.bottom_pass}
    />
  );
  interface ReminderProps {
    title: string;
    Desc: string;
  }
  const Reminder: React.FC<ReminderProps> = ({ title, Desc }) => (
    <View style={styles.OuterView}>
      <View style={styles.ReminderView}>
        <TouchableOpacity style={styles.closeIconContainer}>
          <CloseIcon height={moderateScale(16)} width={moderateScale(16)} />
        </TouchableOpacity>
        <View style={styles.ReminderTextView}>
          <RemindersCalender
            height={moderateScale(60)}
            width={moderateScale(60)}
          />
          <View style={styles.textView}>
            <Text style={styles.reminderTitleText}>{title}</Text>
            <Text style={styles.reminderDesctext}>{Desc}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const Progress = () => (
    <View style={styles.OuterView}>
      <View style={styles.ProgressView}>
        <View style={styles.innerProgressViews}>
          <View style={styles.leftProgressView}>
            <Text style={styles.ProgressDataText}>{strings?.progressData}</Text>
            <View style={styles.OuterView}>
              <TouchableOpacity style={styles.learnButton}>
                <Text style={styles.learnButtonText}>{strings?.learnMore}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <CalenderBoy />
          </View>
        </View>
      </View>
    </View>
  );

  const CompleteProfile = () => (
    <View style={styles.OuterView}>
      <View style={styles.completeProfileView}>
        <Text style={styles.CompleteProfileText}>
          {strings?.completeProfile}
        </Text>
        <TouchableOpacity style={styles.completeButtonView}>
          <Text style={styles.completeText}>{strings?.complete}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Goals = () => (
    <View style={styles.OuterView}>
      <View style={styles.GoalsView}>
        <View style={styles.GoalsTextView}>
          <Text style={styles.goalsText}>{strings?.goals}</Text>
          <Text style={styles.receiveMailText}>{strings?.receiveMail}</Text>
        </View>
      </View>
    </View>
  );

  const GoalsAchieved = () => (
    <View style={styles.OuterView}>
      <View style={styles.GoalsAchievedView}>
        <View style={styles.innerGoalsView}>
          <View>
            <Text style={styles.GoalAchieveText}>{strings?.Goal_Achieved}</Text>
            <Text style={styles.achieveGoalTitleText}>
              {strings?.achievedGoalTitle}
            </Text>
          </View>
          <View>
            <OrangeWhiteTick
              height={moderateScale(40)}
              width={moderateScale(40)}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem: React.FC<any> = ({ item }) => {
    switch (item.type) {
      case notificationENUM?.Reminder:
        return <Reminder title={item.title} Desc={item.Desc} />;
      case notificationENUM?.Progress:
        return <Progress />;
      case notificationENUM?.Complete_Profile:
        return <CompleteProfile />;
      case notificationENUM?.Goals:
        return <Goals />;
      case notificationENUM?.Goals_Achieved:
        return <GoalsAchieved />;
    }
  };

  const NotificationList = () => (
    <GestureHandlerRootView>
      <FlatList
        data={data}
        keyExtractor={(item, index) => "key" + index}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerView}>
        {Header()}
        {NotificationList()}
      </View>
    </SafeAreaView>
  );
};
export default Notifications;
