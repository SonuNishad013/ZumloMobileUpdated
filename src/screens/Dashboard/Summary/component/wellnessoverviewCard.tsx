import { FunctionComponent } from "react";
import { Alert, Text, View } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import MultiGoalProgress from "../../Wellness/Overview/MultiGoalProgress";
import { CupIcon, NoWellnessPlan } from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";
import { strings } from "../../../../constant/strings";
import { getPlan } from "./NodataView";
import WellnessHeader from "./WellnessHeader";
import logger from "../../../../constant/logger";
import { getProgressMessage } from "./WellnessNGoalProgressMsg";

interface WellnessOverviewCardProps {
  goalProgressData: {
    avgProgress: number;
    data: { progress: number; color: string }[];
    allProgressData: {
      title: string;
      description: string;
    };
  };
  isWellnessplan: boolean;
  onShowMore?: () => void;
  processWellnessPlan?: () => void;
  showOnStaging?: boolean;
}

const WellnessOverviewCard: FunctionComponent<WellnessOverviewCardProps> = ({
  goalProgressData,
  isWellnessplan,
  onShowMore,
  processWellnessPlan,
  showOnStaging,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {isWellnessplan ? (
        <>
          <WellnessHeader
            title={"Tracking your wellness journey"}
            subtitle={
              "Every step adds up. Progress isn’t about perfect days—it’s about showing up, even just a little."
            }
            subtitleStyle={{
              textAlign: "center",
            }}
          />
          <MultiGoalProgress
            progress={goalProgressData?.avgProgress}
            goals={goalProgressData?.data}
            from={"Summary"}
          />
          <View
            style={{
              marginVertical: moderateScale(30),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: moderateScale(30),
              }}
            >
              <CupIcon />
              <Text
                style={{
                  fontSize: textScale(14),
                  fontWeight: "600",
                  marginHorizontal: moderateScale(10),
                  color: colors.SurfCrest,
                }}
              >
                {getProgressMessage(goalProgressData?.avgProgress)?.title}
              </Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                color: colors.SurfCrest,
              }}
            >
              {getProgressMessage(goalProgressData?.avgProgress)?.message}
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CommonButton btnName={"See full progress"} onPress={onShowMore} />
          </View>
        </>
      ) : (
        <>
          <View>
            {getPlan(
              {
                title: "Let’s design your feel-good routine",
                subTitle:
                  "Craving more calm, better sleep, or just a little structure? I’ll help you build a plan that fits your flow—easy, intentional, and all yours.",
                btnName: "Create my plan",
                description: "",
                icon: NoWellnessPlan,
                isVitals: false,
                textColor: colors?.SurfCrest,
                backgroundColor: colors?.polishedPine,
              },
              processWellnessPlan
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default WellnessOverviewCard;
