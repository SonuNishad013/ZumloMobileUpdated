import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import AddButton from "../Profile/GoalsAndAspiration/AddButton";
import { event } from "../../navigation/emitter";
import * as AsyncStorageUtils from "../../utils/Storage/AsyncStorage";
import { strings } from "../../constant/strings";
import styles from "./Style";
import allActions from "../../redux/actions";
import { useDispatch } from "react-redux";
import appConstant from "../../constant/appConstant";
import navigationString from "../../navigation/navigationString";

const ConvoTemplate = ({
  onPress,
  onCustomPress,
  from,
  navigation,
  reqData,
}: any) => {
  const [userData, setuserData] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    isUserLoginToken();
    getLoginUserTyep();
  }, []);
  const [UserType, setUserType] = useState<any>();
  const getLoginUserTyep = async () => {
    let loginType = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.ISPLANNER_USER
    );
    setUserType(JSON.parse(loginType));
    // let parsedLoginType = JSON.parse(loginType);
  };
  console.log("UserType====>>>", UserType);

  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.LOGIN_USER_DATA
    );
    console.log("loginUserData", JSON.parse(loginUserData));
    if (loginUserData !== null) {
      setuserData(JSON.parse(loginUserData));
    }
  };
  const [isLoading, setisLoading] = useState(false);
  const data = [
    {
      title: "Share your thoughts; I'm here to listen and support",
      color: colors?.prussianBlue,
    },
    {
      title: "Quick mindfulness exercises at your fingertips.",
      color: colors?.SurfCrest,
    },
    {
      title: "Set goals, and I'll be your virtual cheerleader.",
      color: colors?.SurfCrest,
    },
    {
      title: "Boost your spirits with daily affirmations.",
      color: colors?.polishedPine,
    },
    { title: "You want to edit your goals?", color: colors?.prussianBlue },
    {
      title: "Is there anything you'd like to talk about?",
      color: colors?.SurfCrest,
    },
  ];
  const onGoToDashboard = () => {
    if (from == "dashboard") {
      navigation.goBack();
    } else {
      onSelectExplorer();
    }
  };
  const onSelectExplorer = () => {
    let req = {
      userId: userData?.id !== undefined ? userData?.userId : 0,
      strategyTypeId: appConstant.explorer_planner_type.planner,
    };

    setisLoading(true);

    allActions.OnBoarding.SaveSeekerPlannerExplorerId(
      dispatch,
      req,
      "saveQuestion"
    )
      .then((response: any) => {
        setisLoading(false);

        event.emit(strings.login_);

        AsyncStorageUtils.storeItemKey(
          AsyncStorageUtils.ISPLANNER_USER,
          JSON.stringify({
            isPlanner: UserType?.isPlanner ? true : false,
            isSelected: true,
          })
        );
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <ChatHeader />
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={data}
          keyExtractor={(item, index) => "key" + index}
          numColumns={2}
          columnWrapperStyle={{ gap: moderateScale(15) }}
          contentContainerStyle={styles.flatlistContentStyle}
          ListFooterComponent={
            <>
              <AddButton
                btnName={strings.customChat_}
                textColor={colors?.SurfCrest}
                containerStyle={{
                  borderRadius: moderateScale(50),
                  paddingStart: moderateScale(0),
                }}
                onPress={onCustomPress}
                isPlusIcon={false}
              />
              <>
                <TouchableOpacity
                  style={styles.gotoDahbaordView}
                  onPress={() => onGoToDashboard()}
                >
                  <Text style={styles.goToDashbaordText}>
                    {strings.goToDashboard}
                  </Text>
                </TouchableOpacity>
                {from == "AIGenerated" && (
                  <View
                    style={{
                      gap: moderateScale(10),
                      marginTop: moderateScale(20),
                      alignItems: "center",
                    }}
                  >
                    {/* <Text
                  style={{
                    fontSize: textScale(14),
                    fontWeight: "400",
                    color: colors?.SurfCrest,
                  }}
                >
                  If you are not interested in suggestion
                </Text> */}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(navigationString.SelectActivity, {
                          from: "AIGenerated",
                          reqData: reqData,
                        })
                      }
                    >
                      <Text
                        style={[
                          {
                            color: colors?.royalOrangeDark,
                            fontSize: textScale(14),
                            fontWeight: "400",
                            padding: moderateScale(10),
                          },
                        ]}
                      >
                        Skip for now
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            </>
          }
          ListFooterComponentStyle={{
            marginTop: moderateScale(20),
          }}
          renderItem={({ item }) => {
            return (
              // <TouchableOpacity
              //   onPress={() => onPress(item)}
              //   style={[
              //     styles.titleContainer,
              //     {
              //       backgroundColor: item?.color,
              //     },
              //   ]}
              // >
              //   <Text
              //     style={[
              //       styles.titleStyle,
              //       {
              //         color:
              //           item?.color === colors?.SurfCrest
              //             ? colors?.prussianBlue
              //             : colors?.SurfCrest,
              //       },
              //     ]}
              //   >
              //     {item?.title}
              //   </Text>
              // </TouchableOpacity>
              <></>
            );
          }}
        />
      </View>
    </View>
  );
};
export default ConvoTemplate;
