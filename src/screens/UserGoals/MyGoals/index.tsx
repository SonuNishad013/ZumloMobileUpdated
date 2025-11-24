import { FlatList, View } from "react-native";
import React, { useMemo, useState } from "react";
import colors from "../../../constant/colors";
import { imagePath } from "../../../assets/png/imagePath";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import TitleTextButton from "./TitleTextButton";
import GoalsList from "./GoalsList";
import BtmBtn from "../zUserGoalscomponents/BtmBtn";
import Header from "../zUserGoalscomponents/Header";
import { style } from "./style";

interface Props {
  navigation?: any;
}
const MyGoals: React.FC<Props> = ({ navigation }) => {
  const [listData, setListData] = useState<any>([
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
    {
      title: "I wanna improve my mental health",
      description: "Lorem Ipsum, sometimes referred to as lipsum",
      image: imagePath?.object,
    },
  ]);

  const renderItems = () => (
    <>
      <TitleTextButton
        onPress={() =>
          navigation?.navigate(navigationString?.SetIntensityInput)
        }
      />
      <GoalsList listData={listData} />
    </>
  );
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={style?.container}>
        <Header navigation={navigation} headerName={"My Goals"} />
        <FlatList
          data={["1"]}
          keyExtractor={(item, index) => "key" + index}
          showsVerticalScrollIndicator={false}
          style={style?.flatListStyle}
          renderItem={renderItems}
          contentContainerStyle={style?.flatListContent}
        />
      </View>
      <BtmBtn
        btnName={strings?.save}
        onPress={() => navigation?.navigate(navigationString?.CreateGoal)}
      />
    </ScreenWrapper>
  );
};

export default MyGoals;
