import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import RoundButton from "../../components/Buttons/roundButton";
import { BackClose, BackOpen } from "../../assets";
import PrimaryGoalsCard from "../../components/WellnessPlanCard/PrimaryGoalsCard";
import SecondaryGoalsCard from "../../components/WellnessPlanCard/SecondaryGoalsCard";
import { strings } from "../../constant/strings";
import ActivitiesCard from "../../components/WellnessPlanCard/ActivitiesCard";
interface Props {
  activitiesData?: any;
  primaryGoalsData?: any;
  secondaryGoalsData?: any;
}

const WellnessOverviewCard: React.FC<Props> = ({
  activitiesData,
  primaryGoalsData,
  secondaryGoalsData,
}) => {
  const [optionsData, setOptionsData] = useState([
    {
      title: strings?.primaryGoals,
      description: strings?.primaryGoalsDes,
      data: primaryGoalsData,
      isActive: false,
    },
    {
      title: strings?.secondaryGoals,
      description: strings?.secondaryGoalsDes,
      data: secondaryGoalsData,
      isActive: false,
    },
    {
      title: strings?.activities,
      description: strings?.secondaryGoalsDes,
      data: activitiesData,
      isActive: false,
    },
  ]);
  const onPressHeader = (index: number) => {
    let data = [...optionsData];
    optionsData[index].isActive = !optionsData[index].isActive;
    setOptionsData(data);
  };

  return (
    console.log("optionsDacta", optionsData),
    (
      <View style={styles.cardContainer}>
        <View style={styles?.textDesContainer}>
          {optionsData.map((elem, index) => {
            return (
              <>
                <HeaderView
                  title={elem?.title}
                  onPress={() => onPressHeader(index)}
                  isActive={elem.isActive}
                  description={elem?.description}
                />
                {!elem.isActive && optionsData.length - 1 != index && (
                  <View style={styles.sectionSeparator} />
                )}
                {elem.isActive && (
                  <FlatList
                    data={elem.data}
                    keyExtractor={(item, index) => "key" + index}
                    showsVerticalScrollIndicator={false}
                    style={styles?.gap}
                    renderItem={({ item, index }) => (
                      <ItemWellnessCard
                        item={item}
                        index={index}
                        type={elem?.title}
                        data={elem.data}
                      />
                    )}
                  />
                )}
              </>
            );
          })}
        </View>
      </View>
    )
  );
};

export default WellnessOverviewCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.SurfCrest,
    paddingHorizontal: moderateScale(17),
    paddingBottom: moderateScale(10),
    borderRadius: moderateScale(12),
    paddingTop: moderateScale(10),
    marginTop: moderateScale(20),
  },
  sectionSeparator: {
    flex: 1,
    height: moderateScale(1),
    backgroundColor: "#BBD1C1",
    marginBottom: moderateScale(10),
  },
  sectionHeader: {
    fontSize: textScale(24),
    fontWeight: "700",
    color: colors.prussianBlue,
  },
  sectionText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors.prussianBlue,
    width: "80%",
    paddingBottom: moderateScale(20),
  },
  textDesContainer: {
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(5),
  },
  textCircleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gap: { gap: moderateScale(10) },
  iconContainer: {
    width: moderateScale(34),
    height: moderateScale(34),
  },
});

const HeaderView = ({ title, description, isActive, onPress }: any) => {
  return (
    <>
      <View style={styles?.textCircleContainer}>
        <Text style={styles.sectionHeader}>{title}</Text>
        <RoundButton
          mainContainer={styles?.iconContainer}
          onPress={onPress}
          SvgIcon={isActive ? BackClose : BackOpen}
        />
      </View>
      <Text style={styles.sectionText}>{description}</Text>
    </>
  );
};

const ItemWellnessCard = ({ item, index, type, data }: any) => {
  console.log("item title --> ", item.title);

  switch (type) {
    case strings?.primaryGoals:
      return (
        <PrimaryGoalsCard
          iconShow={item?.pictureUrl}
          title={item?.goalsText}
          // description={"item?.description"}
          description={
            "Losing weight can offer numerous benefits for the body such as Cardiovascular Health, Joint Health, Improved Sleep and more.."
          }
          meter={item?.lbsText}
          // value={"item?.value"}
          time={item?.durationText}
          card={{
            backgroundColor: pGoalsBG[index % pGoalsBG.length],
            marginBottom: moderateScale(10),
          }}
          roundMainContainer={{
            backgroundColor: pGoalsIconBG[index % pGoalsIconBG.length],
          }}
          iconStyle={{ tintColor: pGoalsBG[index % pGoalsBG.length] }}
        />
      );
    case strings?.secondaryGoals:
      return (
        <SecondaryGoalsCard
          icon={item.pictureUrl}
          title={item?.goalsText}
          quantity={item?.lbsText}
          duration={item?.durationText}
          roundButtonContainer={{
            backgroundColor: psGoalsIconBG[index % psGoalsIconBG.length],
          }}
          container={{
            backgroundColor: psGoalsBG[index % psGoalsBG.length],
          }}
          roundButtonIcon={{
            tintColor: psGoalsBG[index % psGoalsBG.length],
          }}
        />
      );
    case strings?.activities:
      return (
        <ActivitiesCard
          icon={item?.pictureUrl}
          title={item?.typeOfActivityText}
          quantity={item?.durationText}
          duration={item?.frequencyText}
          separatorLineTop={{ opacity: index == 0 ? 0 : 1 }}
          separatorLineBottom={{
            opacity: index + 1 !== data.length ? 1 : 0,
          }}
          iconContainer={{
            backgroundColor: activitiesBG[index % activitiesBG?.length],
          }}
        />
      );
  }
};

const pGoalsBG = [colors.prussianBlue, colors.OceanGreen, colors.SaltBox];
const psGoalsBG = [colors.royalOrangeDark, colors.polishedPine, colors.SaltBox];
const pGoalsIconBG = [colors.lightPrussian, colors.Bermuda, colors.trendyPink];
const psGoalsIconBG = [colors.Wheat, colors.Bermuda, colors.trendyPink];
const activitiesBG = [
  colors.polishedPine,
  colors.SaltBox,
  colors.royalOrangeDark,
  colors?.grey,
];
