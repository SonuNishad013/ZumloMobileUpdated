import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import WellnessPlanDetails from "../../../components/Cards/WellnessPlanDetails";
import { moderateScale } from "../../../constant/responsiveStyle";
import moment from "moment";
import colors from "../../../constant/colors";
import { capitalizeFirstLetter } from "../../../validations/capitalizeFirstLetter";
import { convertDaysToMonths } from "./helperFunctions";
import navigationString from "../../../navigation/navigationString";

interface Props {
  wellnessPlanList?: any;
  navigation?: any;
  onScroll?: () => void;
  onRegerateWellnessPlan?: (id: string) => void;
  getWellnessPlanDetails: () => void;
  setIsLoading: (val: boolean) => void;
  setToasterDetails: (val: boolean) => void;
}
const WellnessPlansList: React.FC<Props> = ({
  wellnessPlanList,
  navigation,
  onScroll,
  onRegerateWellnessPlan,
  getWellnessPlanDetails,
  setIsLoading,
  setToasterDetails,
}) => {
  const [goalsData, setGoalsData] = useState<any[]>([]);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    if (!wellnessPlanList) return;
    const initializedGoals = wellnessPlanList?.map((plan: any) => ({
      ...plan,
      isSelected: false,
    }));
    setGoalsData(initializedGoals);
  }, [wellnessPlanList]);

  return (
    <FlatList
      style={{
        marginVertical: moderateScale(20),
      }}
      keyExtractor={(item, index) => "key" + index}
      data={goalsData}
      scrollEnabled={false}
      onScroll={onScroll}
      renderItem={({ item, index }: any) => {
        return (
          <WellnessPlanDetails
            navigation={navigation}
            title={capitalizeFirstLetter(item?.title)}
            description={capitalizeFirstLetter(item?.description)}
            createdDate={moment(item?.createdDate).format("DD MMM, YYYY")}
            status={item?.status}
            durationOfPlan={item?.durationOfPlan}
            contentContainer={{
              backgroundColor: colors?.SaltBox,
              borderColor: colors?.SurfCrest,
            }}
            sectionTitle={{
              color: colors?.SurfCrest,
            }}
            wellnessData={item}
            showDetails={true}
            onRegerateWellnessPlan={
              onRegerateWellnessPlan
                ? () => onRegerateWellnessPlan(item.id)
                : undefined
            }
            getWellnessPlanDetails={getWellnessPlanDetails}
            setIsLoading={setIsLoading}
            setToasterDetails={(val: any) => setToasterDetails(val)}
            setIsSwiping={setIsSwiping}
          />
        );
      }}
    />
  );
};

export default WellnessPlansList;

const styles = StyleSheet.create({});
