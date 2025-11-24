import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import { CrossIcon } from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";
import Global from "../../../../global";
import { fieldType } from "../../../../constant/AllGlobalNameConstant";
import navigationString from "../../../../navigation/navigationString";

interface Props {
  navigation?: any;
}

const QuizQuestions: React.FC<Props> = ({ navigation }) => {
  const [indexCom, setIndexCom] = useState(0);
  const [responseMap, setResponseMap] = useState([]);

  const [questionData, setQuestionData] = useState([
    {
      id: 0,
      fieldType: "SingleSelect",
      sub: "How about setting a small goal for today and noting your progress in the journal?",
      question:
        "Are you able to effectively manage stress in your daily life? If not, what specific stressors are you facing?",
      options: [
        "Yes, I am able to manage stress effectively.",
        "No, I struggle to manage stress effectively.",
      ],
    },
    {
      id: 1,
      fieldType: "SingleSelect",
      sub: "How about setting a small goal for today and noting your progress in the journal?",
      question:
        "If you struggle to manage stress effectively, what specific stressors are you facing?",
      options: [
        "Yes, I am able to manage stress effectively.",
        "No, I struggle to manage stress effectively.",
      ],
    },
    {
      id: 2,
      fieldType: "SingleSelect",
      sub: "How about setting a small goal for today and noting your progress in the journal?",
      question: "How many glasses of water do you intake daily?",
      options: [
        "Work-related stress",
        "Financial stress",
        "Relationship issues",
        "Family responsibilities",
      ],
    },
    {
      id: 4,
      fieldType: "SingleSelect",
      sub: "How about setting a small goal for today and noting your progress in the journal?",
      question:
        "Are you able to effectively manage stress in your daily life? If not, what specific stressors are you facing?",
      options: [
        "Yes, I am able to manage stress effectively.",
        "No, I struggle to manage stress effectively.",
      ],
    },
  ]);

  const resultPush = (data: any) => {
    let listData: any = [...responseMap];
    listData[data?.indexId] = data?.answer;
    setResponseMap(listData);
  };

  const backFunction = () => {
    if (indexCom > 0) {
      setIndexCom(indexCom - 1);
      Global.GlobalIndex = indexCom - 1;
    } else navigation?.goBack();
  };

  const onPressNext = () => {
    if (indexCom === questionData?.length - 1) {
      console.log("Quiz completed");
      navigation?.navigate(navigationString?.QuizResult);
    } else {
      setIndexCom(indexCom + 1);
      Global.GlobalIndex = indexCom + 1;
    }
  };

  const renderTitle = () => {
    return (
      <View style={styles.titleMainContainer}>
        <Text style={styles.titleTextStyle}>{questionData[indexCom]?.sub}</Text>
        <TouchableOpacity>
          <CrossIcon
            height={`${moderateScale(12)}`}
            width={`${moderateScale(12)}`}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBar = () => {
    const barWidth = moderateScale(333);
    return (
      <View style={[styles.barMainContainer, { width: barWidth }]}>
        <FlatList
          data={questionData}
          horizontal
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.flatListMainViewContainer,
                  { width: barWidth / questionData.length },
                ]}
              >
                <View
                  style={[
                    styles.flatListLineView,
                    { opacity: index > indexCom ? 0.3 : 1 },
                  ]}
                />
              </View>
            );
          }}
        />
      </View>
    );
  };

  const renderQuestionfieldType = (idx: any) => {
    const uiShow = questionData[idx]?.fieldType;
    switch (uiShow) {
      case fieldType?.multiSelect:
        return (
          // <LineSelection
          //   questionValue={questionData[idx]}
          //   answerIndex={idx}
          //   answerData={(data: any) => resultPush(data)}
          // />
          <View>
            <Text>multiSelect</Text>
          </View>
        );
      case fieldType?.textArea:
        return (
          // <TextAreaInput
          //   questionValue={questionData[idx]}
          //   answerIndex={idx}
          //   answerData={(data: any) => resultPush(data)}
          // />
          <View>
            <Text>textArea</Text>
          </View>
        );
      case fieldType?.singleSelect:
        return (
          // <CircleSelection
          //   questionValue={questionData[idx]}
          //   answerIndex={idx}
          //   answerData={(data: any) => resultPush(data)}
          // />
          <View>
            <Text>singleSelect</Text>
          </View>
        );
      default:
        return (
          <View>
            <Text
              style={{
                fontSize: textScale(24),
                alignSelf: "center",
                fontWeight: "600",
                color: colors?.polishedPine,
              }}
            >
              Not UI supportable
            </Text>
          </View>
        );
    }
  };

  return (
    <ScreenWrapper statusBarColor={colors?.SaltBox}>
      <CommonHeader
        onBackPress={backFunction}
        headerName="Quiz"
        mainContainer={styles.headerContainer}
      />
      <View style={styles.dataMainContainer}>
        {renderTitle()}
        {renderBar()}
        <Text style={styles.questionText}>
          {questionData[indexCom]?.question}
        </Text>
        <View>{renderQuestionfieldType(indexCom)}</View>
      </View>
      <CommonButton
        btnName={"Next"}
        onPress={onPressNext}
        mainContainer={styles.commonButtonContainer}
        btnNameStyle={styles.commonButtonText}
      />
    </ScreenWrapper>
  );
};

export default QuizQuestions;

const styles = StyleSheet.create({
  dataMainContainer: {
    marginHorizontal: moderateScale(19.5),
    marginTop: moderateScale(50),
  },
  barMainContainer: {
    alignSelf: "center",
    marginTop: moderateScale(15),
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
  headerContainer: {
    marginHorizontal: moderateScale(19),
    paddingBottom: moderateScale(10),
    paddingTop: moderateScale(15),
  },
  questionText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    marginTop: moderateScale(30),
  },
  commonButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: moderateScale(85),
    height: moderateScale(41),
    backgroundColor: colors?.SurfCrest,
  },
  commonButtonText: {
    color: colors?.prussianBlue,
  },
});
