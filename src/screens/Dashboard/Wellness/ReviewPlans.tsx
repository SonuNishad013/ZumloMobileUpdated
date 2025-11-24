import { FlatList, StyleSheet, Text, TextStyle, View } from "react-native";
import React, { useEffect, useState } from "react";
import WellnessPlan from "../../../components/Cards/WellnessPlan";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";

interface Props {
  wellnessPlan?: any;
  currentIndex?: any;
  currentPlanIndex?: any;
  titleStyle?: TextStyle;
}

const ReviewPlans: React.FC<Props> = ({
  wellnessPlan,
  currentIndex,
  currentPlanIndex,
  titleStyle,
}) => {
  const [idx, setIdx] = useState(currentPlanIndex);
  useEffect(() => {
    currentIndex(idx);
  }, [idx]);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleStyle]}>{"Review"}</Text>
      <View style={styles.planList}>
        {wellnessPlan?.map((itm: any, index: any) => {
          const isSelected = index === idx;
          return (
            <WellnessPlan
              icon={itm?.icon}
              title={itm?.title}
              onPress={() => setIdx(index)}
              isSelected={isSelected}
              planContainer={[
                styles.planContainer,
                isSelected
                  ? styles.selectedPlanContainer
                  : styles.unselectedPlanContainer,
              ]}
              text={[
                styles.text,
                isSelected ? styles.selectedText : styles.unselectedText,
              ]}
              image={{
                tintColor: isSelected
                  ? colors?.SurfCrest
                  : colors?.prussianBlue,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ReviewPlans;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(140),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
  },
  title: {
    fontWeight: "600",
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    paddingLeft: moderateScale(19),
  },
  planList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: moderateScale(7),
  },
  planContainer: {
    borderWidth: moderateScale(1),
  },
  selectedPlanContainer: {
    backgroundColor: colors?.SaltBox,
    borderWidth: moderateScale(0),
  },
  unselectedPlanContainer: {
    backgroundColor: colors?.SurfCrest,
  },
  text: {},
  selectedText: {
    color: colors?.SurfCrest,
  },
  unselectedText: {
    color: colors?.prussianBlue,
  },
});
