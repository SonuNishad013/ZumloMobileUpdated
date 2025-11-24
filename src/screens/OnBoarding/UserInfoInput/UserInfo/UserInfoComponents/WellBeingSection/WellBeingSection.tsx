import { FlatList, Text, View } from "react-native";
import React from "react";
import colors from "../../../../../../constant/colors";
import InfoCard from "../../../../../UserGoals/zUserGoalscomponents/infoCard";
import { imagePath } from "../../../../../../assets/png/imagePath";
import OwnButton from "../../../../../../components/Buttons/ownButton";
import { styles } from "./styles";
import navigationString from "../../../../../../navigation/navigationString";

interface Props {
  wellBeingSection?: any;
  navigation?: any;
  allData?: any;
}
const WellBeingSection: React.FC<Props> = ({
  wellBeingSection,
  navigation,
  allData,
}) => {
  const ownButton = () => {
    return (
      <OwnButton
        mainContainer={styles?.ownBtnContainer}
        title={"Create your own"}
        titleStyle={{ color: colors.royalOrange }}
        iconStyle={{ color: colors.royalOrange }}
        onPress={() => {
          navigation.navigate(navigationString.GoalDetailsSection);
        }}
      />
    );
  };
  const bgImage = [
    imagePath?.InfoCardBG3,
    imagePath?.InfoCardBG2,
    imagePath?.InfoCardBG1,
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{getTop(allData?.stepDescription)}</Text>
      <FlatList
        data={wellBeingSection}
        ListHeaderComponent={ownButton}
        style={styles.flatList}
        keyExtractor={(item, index) => "key" + index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <InfoCard
              title={item.title}
              description={item.description}
              mainContainer={styles.infoCardContainer}
              image={"https://picsum.photos/200/300"}
              source={bgImage[index % bgImage.length]}
            />
          );
        }}
      />
    </View>
  );
};

export default WellBeingSection;

const getTop = (value: any) => {
  if (!value) return "";
  let string = value?.split(":");
  return `${string[0]} : \n${string[1] ? string[1]?.trim() : ""}`;
};
