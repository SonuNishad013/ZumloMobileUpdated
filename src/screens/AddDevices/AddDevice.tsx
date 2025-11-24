import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Button,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { RoundPlus } from "../../assets";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../navigation/navigationString";
import * as AsyncStorage from "../../utils/Storage/AsyncStorage";

interface Props {
  navigation?: any;
  route?: any;
}

interface Card {
  id: number;
  label: string;
}

const BackGroundColours = [
  colors.OceanGreen,
  colors.SaltBox,
  colors.prussianBlue,
]; // Define your array of colors

const AddDevice: React.FC<Props> = ({ navigation, route }): ReactElement => {
  const { from } = route?.params;
  const [initialCards, setinitialCards] = useState([
    { id: 1, label: "Apple" },
    { id: 2, label: "FitBit" },
  ]);
  const [initialAndroidCards, setinitialAndroidCards] = useState([
    { id: 1, label: "FitBit" },
    { id: 2, label: "Samsung" },
  ]);
  const [cards, setCards] = useState<Card[]>(
    Platform.OS === "android" ? initialAndroidCards : initialCards
  );
  const [userData, setuserData] = useState<any>();

  const animatedValues = useRef(
    initialCards.map(() => new Animated.Value(0))
  ).current;
  useEffect(() => {
    isUserLoginToken();
  }, []);
  const isUserLoginToken = async () => {
    let loginUserData = await AsyncStorage.getItem(
      AsyncStorage.LOGIN_USER_DATA
    );
    console.log("loginUserData", JSON.parse(loginUserData));
    if (loginUserData !== null) {
      setuserData(JSON.parse(loginUserData));
    }
  };
  useEffect(() => {
    // Animate cards on mount
    animateCards();
  }, []);
  const onSelectDevice = (name: any) => {
    console.log("onSelectDevice name", name);
    if (name !== "Samsung") {
      switch (name) {
        case "Apple":
          navigation.navigate(navigationString.ApplePaired, {
            user_details: userData,
          });
          break;
        case "FitBit":
          navigation.navigate(navigationString.FitbitPaired, {
            user_details: userData,
          });
          break;
        default:
          break;
      }
    } else {
      navigation.navigate(navigationString.PairDevice, {
        user_details: userData,
      });
    }
  };
  const animateCards = () => {
    // Create a sequence of animations for each card
    const animations = cards.map((_, index) => {
      return Animated.timing(animatedValues[index], {
        toValue: 1, // Final animated value
        duration: 500, // Animation duration
        useNativeDriver: true, // Use native driver for performance
        delay: index * 100, // Staggered delay for each card
      });
    });
    // Start the sequence
    Animated.sequence(animations).start();
  };
  const handleBackPress = () => {
    if (from === "SummaryTab") {
      navigation?.pop(1);
    } else {
      navigation.goBack();
    }
  };

  const Header = () => (
    <CommonHeader
      headerName={strings?.headerAddDevices}
      textStyle={{ color: colors?.prussianBlue }}
      iconContainer={{ backgroundColor: colors?.SaltBox }}
      onBackPress={handleBackPress}
      mainContainer={{ marginTop: moderateScale(15) }}
    />
  );

  const AddDevice = () => (
    <View style={styles.outerView}>
      <View style={styles.AddDeviceView}>
        <RoundPlus width={moderateScale(53.71)} height={moderateScale(53.71)} />
        <Text style={styles.tracAddDeviceText}>{strings?.trackAddDevice}</Text>
        <Text style={styles.selectDevicetext}>{strings?.selectDevice}</Text>
      </View>
    </View>
  );

  const getCardStyle = (index: number) => ({
    transform: [
      {
        translateY: animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [500, index * 70], // Start from 500px down, end at staggered heights
        }),
      },
    ],
  });

  const FlipCards = () => (
    <View style={styles.Flipcontainer}>
      {cards.map((card, index) => (
        <Animated.View
          key={card.id}
          style={[
            styles.card,
            getCardStyle(index),
            {
              backgroundColor:
                BackGroundColours[index % BackGroundColours.length],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.card]}
            onPress={() => onSelectDevice(card.label)}
          >
            <Text style={styles.cardlabelText}>{card.label}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <ScreenWrapper statusBarColor={colors?.SurfCrest}>
      <View style={styles.innerView}>
        {Header()}
        {AddDevice()}
      </View>
      {FlipCards()}
    </ScreenWrapper>
  );
};
export default AddDevice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    marginHorizontal: moderateScale(19),
  },
  outerView: {
    paddingTop: moderateScale(100),
  },
  AddDeviceView: {
    alignItems: "center",
  },
  tracAddDeviceText: {
    textAlign: "center",
    marginTop: moderateScale(10),
    fontWeight: "600",
    fontSize: textScale(14),
    color: colors?.prussianBlue,
  },
  selectDevicetext: {
    fontWeight: "400",
    fontSize: textScale(14),
    marginTop: moderateScale(50),
    color: colors?.prussianBlue,
  },
  Flipcontainer: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: moderateScale(200),
    // justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    borderTopColor: colors?.SurfCrest,
  },
  cardlabelText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(20),
    marginTop: moderateScale(10),
  },
});
