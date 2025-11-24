import React, { ReactElement } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
} from "react-native";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import LinearGradient from "react-native-linear-gradient";
import { imagePath } from "../../assets/png/imagePath";

interface Props {
  navigation?: any;
  Data?: any;
  SleepRelaxIcon?: any;
  exerciseData?: any;
  SleepRelaxIconWidth?: any;
  headerName?: string;
  lineargrediantColor?: any;
  lowerImageBackgroundColor?: any;
  textColor?: any;
  loginUser?: any;
  logeduserDescription?: any;
}

const RenderHeader = (
  loginUser: string,
  logeduserDescription: string,
  textColor: string
) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.heyTextStyle, { color: textColor }]}>
        {"Hi,"}
        <Text style={[styles.userNameStyle, { color: textColor }]}>
          {loginUser}
        </Text>
      </Text>
      <Text style={[styles.textDesciption, { color: textColor }]}>
        {logeduserDescription}
      </Text>
    </View>
  );
};
const gradientColor = (index: number) => {
  if (index === 0) {
    return ["#E2D7EA", "#3C839D"];
  } else if (index === 1) {
    return ["#C1A8D0", "#6D597A"];
  } else {
    return ["#FF9D48", "#B85B05"];
  }
};
const CommonSleepingComp: React.FC<Props> = ({
  navigation,
  Data,
  SleepRelaxIcon,
  exerciseData,
  SleepRelaxIconWidth,
  headerName,
  lineargrediantColor,
  lowerImageBackgroundColor,
  textColor,
  loginUser,
  logeduserDescription,
}): ReactElement => {
  const renderitem = (item: any, index: any) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={[styles.innerItemContainer, { backgroundColor: textColor }]}
        />
        <Text style={[styles.NameContainer, { color: textColor }]}>
          {item?.name}
        </Text>
      </View>
    );
  };

  const renderExercise = (item: any, index: any) => {
    return (
      <View style={styles.exerciseContainer}>
        <LinearGradient
          colors={gradientColor(index)}
          style={{ borderRadius: moderateScale(10) }}
        >
          <View style={styles.iconStyle}>
            <item.icon />
          </View>
        </LinearGradient>
        <Text style={styles.exerciseName}>{item?.name}</Text>
      </View>
    );
  };
  const rendrData = (item: any, index: any) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.lineargreadieantContainer}>
          <CommonHeader
            headerName={headerName}
            textStyle={{ color: textColor }}
            iconContainer={{ backgroundColor: lowerImageBackgroundColor }}
          />
          <View>
            {RenderHeader(loginUser, logeduserDescription, textColor)}
          </View>
          <View style={{}}>
            <FlatList
              data={Data}
              renderItem={({ item, index }) => renderitem(item, index)}
              contentContainerStyle={{
                paddingBottom: moderateScale(50),
                marginTop: moderateScale(5),
              }}
              keyExtractor={(item, index) => "key" + index}
            />
          </View>
          <View style={{}}>
            <ImageBackground
              source={imagePath.Ellipse}
              style={styles.centerImageContainer}
              resizeMode="contain"
            >
              <SleepRelaxIcon
                width={
                  SleepRelaxIconWidth !== undefined
                    ? SleepRelaxIconWidth
                    : `${moderateScale(300)}`
                }
              />
            </ImageBackground>
          </View>
        </View>
        <ImageBackground
          source={imagePath.Ellipse2}
          style={styles.lowerImageContainer}
          tintColor={lowerImageBackgroundColor}
        >
          <FlatList
            data={exerciseData}
            renderItem={({ item, index }) => renderExercise(item, index)}
            horizontal
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
            keyExtractor={(item, index) => "key" + index}
          />
        </ImageBackground>
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={lineargrediantColor?.[0]}>
      <LinearGradient colors={lineargrediantColor} style={{ flex: 1 }}>
        <FlatList
          data={[1]}
          renderItem={({ item, index }) => rendrData(item, index)}
          keyExtractor={(item, index) => "key" + index}
        />
      </LinearGradient>
    </ScreenWrapper>
  );
};
export default CommonSleepingComp;
const styles = StyleSheet.create({
  lineargreadieantContainer: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(5),
  },
  centerImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(200),
  },
  lowerImageContainer: {
    height: moderateScale(300),
    width: width,
    justifyContent: "center",
    alignItems: "center",
    // position: 'absolute', bottom: 1
  },
  headerContainer: {
    justifyContent: "center",
    marginVertical: moderateScale(15),
  },
  heyTextStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  userNameStyle: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors.prussianBlue,
  },
  textDesciption: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.prussianBlue,
  },
  exerciseContainer: {
    marginHorizontal: moderateScale(5),
    width: moderateScale(92),
  },
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(86),
    width: moderateScale(92),
  },
  exerciseName: {
    textAlign: "center",
    color: colors.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    marginTop: moderateScale(10),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(3),
  },
  innerItemContainer: {
    height: moderateScale(4),
    width: moderateScale(4),
    borderRadius: moderateScale(4),
    backgroundColor: colors.prussianBlue,
  },
  NameContainer: {
    marginHorizontal: moderateScale(10),
    color: colors.prussianBlue,
    fontSize: textScale(14),
    fontWeight: "400",
  },
});
