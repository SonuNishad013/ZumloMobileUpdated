import { FunctionComponent } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getPlan } from "./NodataView";
import { strings } from "../../../../constant/strings";
import { NoActivity, NoGoals, NoWellnessPlan } from "../../../../assets";
import navigationString from "../../../../navigation/navigationString";
import MeditationCard from "./MeditationCard";
import colors from "../../../../constant/colors";
import WellnessHeader from "./WellnessHeader";
import { moderateScale } from "../../../../constant/responsiveStyle";
import logger from "../../../../constant/logger";

interface ActivityListingProps {
  ActivityListingData: any;
  navigation?: any;
  activityClick?: () => void;
  showOnStaging?: boolean;
}

const ActivityListing: FunctionComponent<ActivityListingProps> = ({
  ActivityListingData,
  navigation,
  activityClick,
  showOnStaging,
}) => {
  const itemClick = (item: any) => {
    logger("item_in_ActivityCards", item);
    navigation.navigate(navigationString.ActivityGoalOverview, {
      data: item.item,
    });
  };
  const renderItem = (item: any) => {
    return (
      <TouchableOpacity onPress={() => itemClick(item)}>
        <MeditationCard item={item.item} index={item.index} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{}}>
      {ActivityListingData?.length ? (
        <>
          <WellnessHeader
            title={"Your chosen activities"}
            subtitle={`These are the practices you picked to support your well-being. They're flexible, intentional, and made to fit into your life—one step at a time`}
            subtitleStyle={{
              textAlign: "center",
            }}
          />
          <FlatList
            data={ActivityListingData}
            keyExtractor={(item, index) => "key" + index}
            renderItem={renderItem}
            style={styles?.flatlistContainer}
          />
        </>
      ) : (
        <>
          {getPlan(
            {
              title: "Your activity list is feeling lonely",
              subTitle:
                "Want to stretch, breathe, journal, or dance it out? Tap in and I’ll help you find a few things you’ll actually want to do.",
              btnName: "Browse activities",
              description: "",
              icon: NoActivity,
              isVitals: false,
              textColor: colors?.SurfCrest,
              backgroundColor: colors?.themeColor,
            },
            activityClick
          )}
        </>
      )}
    </View>
  );
};

export default ActivityListing;

const styles = StyleSheet.create({
  flatlistContainer: { paddingBottom: moderateScale(100) },
});
