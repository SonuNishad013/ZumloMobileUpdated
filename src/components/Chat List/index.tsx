import React, { ReactElement } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import moment from "moment";
import { DD_MMM_YY } from "../../constant/dateFormatConstants";
import colors from "../../constant/colors";

interface Props {
  navigation?: any;
  item: any;
}
const ChatList: React.FC<Props> = ({ navigation, item }): ReactElement => {
  let size = 60;
  const rendrTwoView = (item: any) => {
    return (
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: "blue",
          borderRadius: moderateScale(30),
          overflow: "hidden",
          flexDirection: "row",
        }}
      >
        <Image
          style={{
            flexGrow: 1,
            // backgroundColor: 'red',
          }}
          source={{ uri: item.image }}
        />
        <Image
          style={{
            flexGrow: 1,
            backgroundColor: "red",
          }}
          source={{ uri: item.image }}
        />
      </View>
    );
  };
  const rendrThreeView = (item: any) => {
    return (
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: "blue",
          borderRadius: moderateScale(30),
          overflow: "hidden",
          transform: [{ rotateZ: "-90deg" }],
        }}
      >
        <Image
          style={{
            flexGrow: 1,
            backgroundColor: "red",
          }}
          source={{ uri: item.image }}
        />
        <View
          style={{
            flexGrow: 1,
            backgroundColor: "red",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              flexGrow: 1,
              backgroundColor: "red",
              transform: [{ rotateZ: "90deg" }],
            }}
            source={{ uri: item.image }}
            resizeMode={"contain"}
          />
          <Image
            style={{
              flexGrow: 1,
              backgroundColor: "red",
              transform: [{ rotateZ: "90deg" }],
            }}
            source={{ uri: item.image }}
            resizeMode={"contain"}
          />
        </View>
      </View>
    );
  };
  return (
    console.log("item?.groupMember?.length", item?.groupMember?.length),
    (
      <View style={styles.mainContaier}>
        <View style={{ width: width / 6 }}>
          <View style={styles.imageContainer}>
            {item?.isGroup ? (
              <>
                {item?.groupMember?.length == 2
                  ? rendrTwoView(item)
                  : rendrThreeView(item)}
              </>
            ) : (
              <Image
                source={{ uri: item.image }}
                style={styles.imageContainer}
              />
            )}
            {item?.isActive && <View style={styles.activeContainer} />}
          </View>
        </View>
        <View style={styles.lowerConatiner}>
          <View style={styles.lowerInnerContainer}>
            <Text style={styles.nameStyle}>{item.name.substring(0, 25)}</Text>
            <Text style={styles.text2}>
              {moment(item.time).format(DD_MMM_YY)}
            </Text>
          </View>
          <View style={styles.lowerInnerContainer}>
            <Text style={styles.text2}>{item.msgHistory?.[0]?.message}</Text>
            <View style={styles.unreadMsgView}>
              <Text
                style={{
                  fontSize: textScale(10),
                  fontWeight: "600",
                  color: colors.polishedPine,
                }}
              >
                {item.msgHistory?.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  );
};
export default ChatList;
const styles = StyleSheet.create({
  mainContaier: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: moderateScale(60),
    marginVertical: moderateScale(15),
  },
  imageContainer: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
  },
  activeContainer: {
    backgroundColor: "#0FE16D",
    height: moderateScale(10),
    width: moderateScale(10),
    position: "absolute",
    bottom: 5,
    right: 5,
    borderRadius: moderateScale(5),
  },
  lowerConatiner: {
    height: moderateScale(40),
    width: width / 1.4,
    justifyContent: "space-between",
  },
  lowerInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.extraLightSurfCrest,
  },
  text2: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.extraLightSurfCrest,
  },
  unreadMsgView: {
    backgroundColor: colors.extraLightSurfCrest,
    height: moderateScale(16),
    width: moderateScale(16),
    borderRadius: moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
  },
});
