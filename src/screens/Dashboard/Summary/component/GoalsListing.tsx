import { FunctionComponent } from "react";
import { View } from "react-native";
import { getPlan } from "./NodataView";
import { strings } from "../../../../constant/strings";
import { NoGoals, NoGoalsIcon, NoWellnessPlan } from "../../../../assets";
import GoalsCard from "./goalComponent";
import navigationString from "../../../../navigation/navigationString";
import colors from "../../../../constant/colors";
import WellnessHeader from "./WellnessHeader";

interface GoalsListingProps {
  GoalsListingData: any;
  navigation?: any;
  goalClick?: () => void;
  showOnStaging?: boolean;
}

const GoalsListing: FunctionComponent<GoalsListingProps> = ({
  GoalsListingData,
  navigation,
  goalClick,
  showOnStaging,
}) => {
  return (
    <View style={{}}>
      {GoalsListingData?.apiStatus ? (
        <>
          <WellnessHeader
            title={"Your wellness goals in motion"}
            subtitle={
              "Here’s how far you’ve come on the goals you set. Every bit of progress is a win—whether it’s a deep breath or a better night’s sleep."
            }
            subtitleStyle={{
              textAlign: "center",
            }}
          />
          <GoalsCard
            goalData={GoalsListingData?.data}
            onGoalCard={(id: any, goal: any) => {
              navigation.navigate(navigationString.Goaloverview, {
                id: id,
                data: goal?.activityProgressDetails,
              });
            }}
            isGoalsCard={true}
          />
        </>
      ) : (
        <>
          {getPlan(
            {
              title: "Let’s put a goal on the board!",
              subTitle:
                "Setting a goal is like saying “Hey, I got this.” Big or small, it’s your way of telling the world (and yourself) what matters.",
              btnName: "Add a goal ",
              description: "",
              icon: NoGoalsIcon,
              isVitals: false,
              textColor: colors?.prussianBlue,
              backgroundColor: colors?.royalOrangeDark,
            },
            goalClick
          )}
        </>
      )}
    </View>
  );
};

export default GoalsListing;
