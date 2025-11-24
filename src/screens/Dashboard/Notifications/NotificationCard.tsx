import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../../constant/colors";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import {
  CrossXIcon,
  MoodIconNotifications,
  RemindersIcon,
  TipsIconsNotification,
} from "../../../assets";
import moment from "moment";
interface NotificationCardProps {
  navigation?: any;
  data?: any;
  item?: any;
  onPress?: any;
  type?: any;
  onDeletePress: any;
}
const NotificationCard: React.FC<NotificationCardProps> = ({
  navigation,
  data,
  item,
  onPress,
  type,
  onDeletePress,
}: any) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor:
            type === 4 ? colors?.backgroundTheme : colors?.prussianBlue,
          width: "100%",
          flexDirection: "row",
          padding: moderateScale(15),
          borderRadius: moderateScale(15),
          gap: moderateScale(10),
          alignItems: "center",
        }}
      >
        {!item?.imageUrl && (
          <View>
            {type == 4 && <RemindersIcon />}
            {type === 7 && (
              <View
                style={{
                  shadowColor: "#FFD268",
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.88,
                  shadowRadius: 10.0,
                  elevation: 2,
                }}
              >
                <TipsIconsNotification width={40} height={40} />
              </View>
            )}
            {type === 6 && (
              <View
                style={{
                  backgroundColor: colors?.SurfCrest,
                  padding: moderateScale(10),
                  borderRadius: moderateScale(100),
                }}
              >
                <MoodIconNotifications width={40} height={40} />
              </View>
            )}
          </View>
        )}
        {item?.imageUrl && (
          <Image
            source={{ uri: item?.imageUrl }}
            resizeMode="contain"
            style={{
              // backgroundColor: "red",
              height: moderateScale(50),
              width: moderateScale(50),
              borderRadius: moderateScale(25),
              borderWidth: 1,
              borderColor: colors?.SurfCrest,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            padding: moderateScale(5),
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: colors?.SurfCrest,
              fontSize: textScale(14),
              fontWeight: "400",
            }}
          >
            {item?.title
              ? item?.title
              : item === 4
              ? "Reminder!"
              : item === 7
              ? "Tips"
              : "Alert!"}
          </Text>
          <Text
            style={{
              color: colors?.white,
              fontSize: textScale(14),
              fontWeight: item?.notificationState === 1 ? "600" : "300",
            }}
            numberOfLines={3}
          >
            {item?.description
              ? item?.description
              : item === 4
              ? "Did you complete the activity?"
              : item === 7
              ? "Check out the health tips  for you!"
              : "Instant mood tracking!"}
          </Text>
          {type === 6 && (
            <TouchableOpacity
              onPress={() => Alert.alert("Navigate to Mood journaling")}
              style={{
                backgroundColor: colors?.royalOrangeDarkOP2,
                marginTop: 10,
                width: moderateScale(85),
                borderRadius: moderateScale(15),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors?.royalOrangeDark,
                  fontSize: textScale(14),
                  fontWeight: "500",
                  paddingVertical: moderateScale(5),
                }}
              >
                {"Track now"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => onDeletePress()}
          style={{
            borderRadius: 10,
            position: "absolute",
            right: 5,
            top: 5,
            backgroundColor:
              type === 4 ? colors?.backgroundTheme : colors?.transparent,
          }}
        >
          <CrossXIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 15,
            bottom: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text style={{ color: colors?.SurfCrest, fontSize: textScale(10) }}>
            {item?.notificationState === 1 ? "Unread" : " read"}
          </Text>
          <Text style={{ color: colors?.SurfCrest, fontSize: textScale(10) }}>
            {moment(
              item?.createdDate
                ? item?.createdDate
                : "2024-11-12T15:54:56+05:30"
            ).fromNow()}
          </Text>
        </TouchableOpacity>
      </Pressable>
    </>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});
