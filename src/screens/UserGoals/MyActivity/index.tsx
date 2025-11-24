import { FlatList, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import navigationString from "../../../navigation/navigationString";
import { strings } from "../../../constant/strings";
import StepsPlusBtn from "./StepsPlusBtn";
import NameWithTime from "./NameWithTime";
import DistCalPoint from "./DistCalPoint";
import ChatArea from "./ChatArea";
import BtmBtn from "../zUserGoalscomponents/BtmBtn";
import Header from "./Header";

interface Props {
  navigation?: any;
  route?: any;
}
const MyActivity: React.FC<Props> = ({ navigation, route }) => {
  const routeData = route?.params?.item;
  console.log("==>", routeData);

  return (
    <ScreenWrapper statusBarColor={colors?.prussianBlue}>
      <Header navigation={navigation} />
      <FlatList
        data={["1"]}
        keyExtractor={(item, index) => "key" + index}
        renderItem={() => {
          return (
            <View style={{ marginHorizontal: moderateScale(19) }}>
              <NameWithTime />
              <StepsPlusBtn navigation={navigation} />
              <DistCalPoint />
              <ChatArea />
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: moderateScale(100) }}
      />

      <BtmBtn
        onPress={() => navigation?.navigate(navigationString?.GoalsCreated)}
        btnName={strings?.goAhead}
      />
    </ScreenWrapper>
  );
};

export default MyActivity;
