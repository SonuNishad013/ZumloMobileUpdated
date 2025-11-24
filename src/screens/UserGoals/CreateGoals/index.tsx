import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CommonButton from "../../../components/Buttons/commonButton";
import colors from "../../../constant/colors";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import CommonHeader from "../../../components/Header/commonHeader";
import CommonSearchBar from "../../../components/SearchBar/commonSearchBar";
import RadioButtonCreateGoals from "../zUserGoalscomponents/radioButtonCreateGoals";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import BtmBtn from "../zUserGoalscomponents/BtmBtn";
import Header from "../zUserGoalscomponents/Header";

interface Props {
  navigation?: any;
}

const CreateGoal: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    searchFilterFunction(search);
  }, []);

  const [filterData, setFilterData] = useState<any>({});
  const [search, setSearch] = useState<string>("");

  const [data, setData] = useState<any>([
    {
      medium: "Running",
    },
    {
      medium: "Cardio",
    },
    {
      medium: "Gym",
    },
    {
      medium: "Dancing",
    },
    {
      medium: "Meditation",
    },
    {
      medium: "Running",
    },
    {
      medium: "Gym",
    },
    {
      medium: "Dancing",
    },
    {
      medium: "Meditation",
    },
  ]);
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = data.filter((item: any) => {
        const itemData = item.medium
          ? item.medium.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(data);
      setSearch(text);
    }
  };

  const renderSrhText = () => {
    return (
      <View style={style?.srhTextMainContainer}>
        <CommonSearchBar
          onChangeText={(val: any) => searchFilterFunction(val)}
          value={search}
          placeholder={strings?.search}
        />
        <Text style={style?.mainTxtStyle}>{strings?.setYourGoals}.</Text>
      </View>
    );
  };

  const [mediumIndex, setMediumIndex] = useState<number>(-1);
  const [mediumData, setMediumData] = useState<any>({});

  const goalMedium = (index: number, item: any) => {
    setMediumIndex(index);
    setMediumData(item);
  };
  const renderList = () => {
    return (
      <View style={style?.listMaincontainer}>
        {filterData.length !== 0 ? (
          <FlatList
            data={filterData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => "key" + index}
            ItemSeparatorComponent={() => (
              <View style={{ marginTop: moderateScale(10) }} />
            )}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <RadioButtonCreateGoals
                    onPress={() => goalMedium(index, item)}
                    mediumtype={item?.medium}
                    index={index}
                    radioView={{
                      backgroundColor:
                        index === mediumIndex
                          ? colors?.prussianBlue
                          : colors?.SurfCrest,
                    }}
                  />
                </View>
              );
            }}
            contentContainerStyle={{ paddingBottom: moderateScale(100) }}
          />
        ) : (
          <View>
            <Text>{strings?.noData}</Text>
          </View>
        )}
      </View>
    );
  };

  const validation = () => {
    if (!mediumData?.medium) {
      Alert.alert("Error", "Please Set Your Goals, Achieve Success");
      return;
    } else {
      navigation.navigate(navigationString?.GoalDuration);
    }
  };
  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <View style={{ backgroundColor: colors?.SurfCrest, flex: 1 }}>
        <Header headerName={"Create Goal"} navigation={navigation} />
        <FlatList
          data={["1"]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "key" + index}
          renderItem={() => {
            return (
              <View style={{ marginHorizontal: moderateScale(19) }}>
                {renderSrhText()}
                <View style={{ flex: 1 }}>{renderList()}</View>
              </View>
            );
          }}
          contentContainerStyle={{
            paddingBottom: moderateScale(100),
          }}
        />

        <BtmBtn btnName={strings?.save} onPress={validation} />
      </View>
    </ScreenWrapper>
  );
};

export default CreateGoal;

const style = StyleSheet.create({
  srhTextMainContainer: {
    marginTop: moderateScale(20),
  },
  mainTxtStyle: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors?.prussianBlue,
    marginTop: moderateScale(25),
  },
  listMaincontainer: {
    marginTop: moderateScale(30),
    flex: 1,
  },
});
