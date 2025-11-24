import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import CommonHeader from "../../../components/Header/commonHeader";
import { strings } from "../../../constant/strings";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import { CrossIcon } from "../../../assets";
import CommonButton from "../../../components/Buttons/commonButton";
import CommonInput from "../../../components/Inputs/commonInput";
import navigationString from "../../../navigation/navigationString";
import OneSelect from "./OneSelect";
import Header from "../../UserGoals/zUserGoalscomponents/Header";

interface Props {
  navigation?: any;
}
const AssessmentScreen: React.FC<Props> = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <View style={style?.headerMainContainer}>
        <CommonHeader headerName={strings?.assessment} />
        {/* <Header
          headerContainer={{ backgroundColor: colors?.SaltBox }}
          iconContainer={{ backgroundColor: colors?.LividBrown }}
          navigation={navigation}
        /> */}
      </View>
    );
  };
  const renderTitle = () => {
    return (
      <View>
        <View style={style?.titleMainContainer}>
          <Text style={style?.titleTextStyle}>{strings?.assessmemtTitle}</Text>
          <TouchableOpacity>
            <CrossIcon
              height={`${moderateScale(12)}`}
              width={`${moderateScale(12)}`}
            />
          </TouchableOpacity>
        </View>
        <Text style={style?.titleWeekTxtStyle}>{strings?.weekly}</Text>
      </View>
    );
  };
  const data = [
    {
      id: 0,
      type: "single",
      question:
        "Are you able to effectively manage stress in your daily life? If not, what specific stressors are you facing?",
      options: [
        "Yes, I am able to manage stress effectively.",
        "No, I struggle to manage stress effectively.",
      ],
    },

    {
      id: 1,
      type: "single",
      question:
        "If you struggle to manage stress effectively, what specific stressors are you facing?",
      options: [
        "Yes, I am able to manage stress effectively.",
        "No, I struggle to manage stress effectively.",
      ],
    },
    {
      id: 2,
      type: "single",
      question: "How many glass of water do you intake daily.",
      options: [
        "Work-related stress",
        "Financial stress",
        "Relationship issues",
        "Family responsibilities",
      ],
    },
    {
      id: 3,
      type: "input",
      question: "How connected do you feel to others and your community?",
    },
    {
      id: 4,
      type: "single",
      question:
        "Are you able to effectively manage stress in your daily life? If not, what specific stressors are you facing?",
      options: [
        "Yes, I am able to manage stress effectively.",
        "No, I struggle to manage stress effectively.",
      ],
    },
    {
      id: 5,
      type: "single",
      question: "How connected do you feel to others and your community?",
      options: ["true", "false"],
    },
  ];
  const renderBar = () => {
    const barWidth = moderateScale(333);
    return (
      <View style={[style?.barMainContainer, { width: barWidth }]}>
        <FlatList
          keyExtractor={(item, index) => "key" + index}
          data={data}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  style?.flatListMainViewContainer,
                  { width: barWidth / data.length },
                ]}
              >
                <View
                  style={[
                    style?.flatListLineView,
                    { opacity: index > renderComponentIdx ? 0.3 : 1 },
                  ]}
                ></View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    getData(renderComponentIdx);
  }, []);
  const [showData, setShowData] = useState<any>([]);
  const [renderComponentIdx, setRenderComponentIdx] = useState<number>(0);

  const renderComponentPrevious = () => {
    setRenderComponentIdx(renderComponentIdx - 1);
    getData(renderComponentIdx - 1);
  };

  const [userAnswersArr, setUserAnswersArr] = useState<any>([]);

  const renderComponentNext = () => {
    userAnswersArr.push(selectedAnsVal);
    setSelectedAnsIdx(-1);
    setRenderComponentIdx(renderComponentIdx + 1);
    getData(renderComponentIdx + 1);
  };

  const getData = (currentIndex: any) => {
    if (currentIndex === data.length) {
      navigation.navigate(navigationString?.AssessmentResult);
    } else {
      const arrFilter = data.filter((item, index) => index === currentIndex);
      setShowData(arrFilter);
    }
  };

  const [selectedAnsVal, setSelectedAnsVal] = useState("");
  const [selectedAnsIdx, setSelectedAnsIdx] = useState(-1);

  const getSelectdAnser = (idx: any, item: any) => {
    setSelectedAnsIdx(idx);
    setSelectedAnsVal(item);
  };
  const renderData = () => {
    const renderUI = (item: any) => {
      switch (item?.type) {
        case "single":
          return (
            <FlatList
              keyExtractor={(item, index) => "key" + index}
              data={item?.options}
              renderItem={({ item, index }: any) => {
                return (
                  <OneSelect
                    onPress={() => getSelectdAnser(index, item)}
                    item={item}
                    mainContainer={{
                      backgroundColor:
                        index === selectedAnsIdx
                          ? colors?.polishedPine
                          : colors?.ShuttleGray,
                    }}
                  />
                );
              }}
            />
          );

        case "input":
          return (
            <CommonInput
              placeholder="Type your answer here"
              placeholderTextColor={colors?.white}
              textAlignVertical={"top"}
              multiline={true}
              mainContainer={style?.cmnInputMainContainer}
            />
          );

        default:
          break;
      }
    };
    return (
      <View style={style?.renderDataMainContainer}>
        {showData?.map((item: any) => {
          return (
            <View>
              <Text style={style?.questionTxtStyle}>{item?.question}</Text>
              <View style={style?.optionsMainContainer}>{renderUI(item)}</View>
            </View>
          );
        })}
      </View>
    );
  };
  const renderBtn = () => {
    return (
      <View style={style?.renderBtnMainContainer}>
        {renderComponentIdx !== 0 ? (
          <CommonButton
            onPress={() => renderComponentPrevious()}
            btnName={"Previous"}
            btnNameStyle={{
              color: colors?.SurfCrest,
            }}
            mainContainer={style?.cmnBtnMainContainerPre}
          />
        ) : null}
        <CommonButton
          onPress={() => renderComponentNext()}
          btnName={renderComponentIdx === data.length - 1 ? "SUBMIT" : "NEXT"}
          btnNameStyle={{
            color: colors?.Shark,
          }}
          mainContainer={style?.cmnBtnMainContainerNext}
        />
      </View>
    );
  };
  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      {renderHeader()}
      <View style={style?.dataMainContainer}>
        {renderTitle()}
        {renderBar()}
        {renderData()}
        {renderBtn()}
      </View>
    </ScreenWrapper>
  );
};

export default AssessmentScreen;

const style = StyleSheet.create({
  //  safeArea
  dataMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(50),
  },
  // renderHeader
  headerMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(10),
  },

  //   renderBar
  barMainContainer: {
    alignSelf: "center",
    marginTop: moderateScale(30),
  },
  flatListMainViewContainer: {
    paddingHorizontal: moderateScale(3),
  },
  flatListLineView: {
    height: moderateScale(3),
    borderColor: "black",
    borderRadius: moderateScale(100),
    backgroundColor: colors?.SurfCrest,
  },
  // renderTitle

  titleMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleTextStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  titleWeekTxtStyle: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },

  // renderData

  renderDataMainContainer: {
    marginTop: moderateScale(50),
  },
  questionTxtStyle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  optionsMainContainer: {
    marginTop: moderateScale(40),
  },

  // renderBtn

  renderBtnMainContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: moderateScale(30),
  },

  cmnBtnMainContainerPre: {
    backgroundColor: colors?.SaltBox,
    width: moderateScale(96),
    height: moderateScale(41),
  },

  cmnBtnMainContainerNext: {
    backgroundColor: colors?.SurfCrest,
    width: moderateScale(85),
    height: moderateScale(41),
  },
  cmnInputMainContainer: {
    height: moderateScale(162),
  },
});
