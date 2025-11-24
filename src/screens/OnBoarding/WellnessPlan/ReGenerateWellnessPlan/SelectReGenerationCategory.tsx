import { ReactElement, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../../components/Header/commonHeader";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { ForwordGrayIcon } from "../../../../assets";
import navigationString from "../../../../navigation/navigationString";
import { imagePath } from "../../../../assets/png/imagePath";
import allActions from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import CommonLoader from "../../../../components/Loader";
import { formatSentenceCase } from "../../../../helper/sentenceCase";

const SelectReGenerationCategory: React.FC<{
  navigation?: any;
  route: any;
}> = ({ navigation, route }): ReactElement => {
  console.log(
    "route SelectReGenerationCategory fromWellnessOverView",
    route?.params
  );

  const dispatch = useDispatch();
  const [desc, setdesc] = useState(
    "If you are not satisfied with the current plan, we would like to understand your preferences better. Can you share more about what didn't work for you or give us your recommendations"
  );
  const [CategoryData, setCategoryData] = useState<any>();
  const [isLoading, setisLoading] = useState(false);
  const [feedBackData, setfeedBackData] = useState<any>([]);
  const [recommendationData, setrecommendationData] = useState<any>([]);
  useEffect(() => {
    GetGlobalCodesByCategoryName();
    GetRegenereateWellnessPlanSteps();
  }, []);
  // const GetRegenereateWellnessPlanSteps = async () => {
  //   try {
  //     setisLoading(true);
  //     let requestbody = {};
  //     await allActions.OnBoarding.GetRegenerateOnboardingDetails(
  //       dispatch,
  //       requestbody,
  //       "GetGlobalCodesByCategoryName",
  //       216
  //       // `${route?.params?.RegenerationCategoryData?.[0]?.globalCodeId}`
  //     )
  //       .then((res) => {
  //         console.log("res for get all qyestion==>", res);

  //         let feedBackData = res.data.filter(
  //           (res: any) => res.regenerationStepTypeId == 214
  //         );
  //         let recommendationData = res.data.filter(
  //           (res: any) => res.regenerationStepTypeId == 215
  //         );
  //         setfeedBackData(feedBackData);
  //         setrecommendationData(recommendationData);
  //         setisLoading(false);
  //       })
  //       .catch((err) => {
  //         setisLoading(false);
  //       });
  //   } catch (error) {
  //     setisLoading(false);
  //   }
  // };
  const GetRegenereateWellnessPlanSteps = async () => {
    try {
      setisLoading(true);
      let requestbody = {};
      await allActions.OnBoarding.GetRegenerateOnboardingDetails(
        dispatch,
        requestbody,
        "GetGlobalCodesByCategoryName",
        216
      )
        .then((res) => {
          console.log("res for get all questions==>", res);

          // Filter data for feedback and recommendations
          let feedBackData = res.data.filter(
            (res: any) => res.regenerationStepTypeId == 214
          );
          let recommendationData = res.data.filter(
            (res: any) => res.regenerationStepTypeId == 215
          );

          // Update state
          setfeedBackData(feedBackData);
          setrecommendationData(recommendationData);

          // Show alert if both are empty
          if (!feedBackData.length && !recommendationData.length) {
            alert("No data available for feedback and recommendations.");
          }

          setisLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setisLoading(false);
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      setisLoading(false);
    }
  };

  const GetGlobalCodesByCategoryName = async () => {
    try {
      // setisLoading(true);
      let requestbody = {};
      await allActions.GlobalCodesCategoryAction.GetGlobalCodesByCategoryName(
        dispatch,
        requestbody,
        "GetGlobalCodesByCategoryName",
        "RegenerationStepType"
      )
        .then((res) => {
          console.log("res for GetGlobalCodesByCategoryName=>", res);
          // setisLoading(false);
          setCategoryData(res.data);
        })
        .catch((err) => {
          setisLoading(false);
        });
    } catch (error) {
      // setisLoading(false);
    }
  };
  const onNav = (index: any) => {
    // var a = {
    //   data: index == 0 ? feedBackData : recommendationData,
    //   from: route?.params?.from,
    //   headerName: index == 0 ? "Give feedback" : "Give recommendations",
    // };
    console.log("-=-=>onNav", index == 0 ? feedBackData : recommendationData);
    // return;
    navigation.navigate(navigationString.GiveFeedback, {
      data: index == 0 ? feedBackData : recommendationData,
      from: route?.params?.from,
      headerName: index == 0 ? "Give feedback" : "Give recommendations",
      newString: route?.params?.newString,
      selectedIndex: 0,
    });
    // setisLoading(true);
    // setTimeout(() => {
    //   setisLoading(false);
    //   navigation.navigate(navigationString.GiveFeedback, {
    //     data: index == 0 ? feedBackData : recommendationData,
    //     from: route?.params?.from,
    //     headerName: index == 0 ? "Give feedback" : "Give recommendations",
    //   });
    // }, 5000);
  };
  const renderName_Desc = () => {
    return (
      <View>
        <Text
          style={{
            color: colors.SurfCrest,
            fontSize: textScale(25),
            fontWeight: "700",
            fontFamily: "Poppins",
          }}
        >
          {"Select category"}
        </Text>
        <Text
          style={{
            color: colors.SurfCrest,
            fontSize: textScale(14),
            marginTop: moderateScale(10),
          }}
        >
          {desc}
        </Text>
      </View>
    );
  };
  const CommonButtonWithIcon = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={{
          borderRadius: moderateScale(22),
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:
            index == 0 ? colors.SurfCrest : colors.backgroundTheme,
          flexDirection: "row",
          width: moderateScale(286),
          height: moderateScale(40),
        }}
        onPress={() => onNav(index)}
      >
        <View></View>
        <View
          style={{
            // width: moderateScale(180),
            marginHorizontal: moderateScale(5),
            height: moderateScale(30),
            justifyContent: "center",
            alignItems: "center",
            // alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: index == 0 ? colors.prussianBlue : colors.SurfCrest,
              fontSize: textScale(14),
              fontWeight: "600",
            }}
          >
            {formatSentenceCase(item?.codeName)}
          </Text>
        </View>
        <View
          style={{
            // width: moderateScale(50),
            justifyContent: "flex-end",
            flexDirection: "row",
            marginRight: moderateScale(10),
            // marginHorizontal: moderateScale(10),
          }}
        >
          <ForwordGrayIcon />
        </View>
      </TouchableOpacity>
    );
  };
  const renderCategories = ({ item, index }: any) => {
    return (
      <ImageBackground
        source={
          index == 0 ? imagePath.GiveFeedback : imagePath.RecommendationIcon
        }
        resizeMode={"contain"}
        style={{
          marginTop: moderateScale(10),
          justifyContent: "flex-end",
          alignItems: "center",
          width: moderateScale(336),
          height: moderateScale(253),
          borderRadius: moderateScale(22),
        }}
      >
        <View
          style={{
            height: 253 / 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {CommonButtonWithIcon(item, index)}
        </View>
      </ImageBackground>
    );
  };
  return (
    console.log(
      "feedBackData and recommendationData",
      feedBackData,
      recommendationData
    ),
    (
      <ScreenWrapper statusBarColor={colors.lightTheme2}>
        <CommonHeader
          onBackPress={() => navigation.goBack()}
          headerName={""}
          iconContainer={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
          textStyle={{
            color: colors?.SurfCrest,
          }}
          mainContainer={{
            paddingBottom: moderateScale(15),
            paddingTop: moderateScale(10),
            marginHorizontal: moderateScale(15),
          }}
        />
        <ScrollView style={{ marginHorizontal: moderateScale(15) }}>
          {renderName_Desc()}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: moderateScale(10),
            }}
          >
            <FlatList
              data={CategoryData || []}
              keyExtractor={(item, index) => "key" + index}
              renderItem={renderCategories}
              contentContainerStyle={{ paddingBottom: moderateScale(50) }}
            />
          </View>
        </ScrollView>
        {isLoading && <CommonLoader />}
      </ScreenWrapper>
    )
  );
};
export default SelectReGenerationCategory;
