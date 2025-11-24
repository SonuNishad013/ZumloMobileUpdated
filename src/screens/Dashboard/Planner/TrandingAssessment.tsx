import React, { ReactElement } from "react";
import { FlatList } from "react-native";
import colors from "../../../constant/colors";
import AssessmentsDetalis from "../../Assessment/AssessmentList/AssessmentsDetalis";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { statusENUM } from "../../../constant/ENUM";
import { strings } from "../../../constant/strings";
interface Props {
  navigation?: any;
  TrandingAssessmentData?: any;
}
const TrandingAssessment: React.FC<Props> = ({
  navigation,
  TrandingAssessmentData,
}): ReactElement => {
  const renderColorBg = (itm: any) => {
    switch (itm?.status) {
      case statusENUM?.Completed:
        return colors?.sutfCrestOp;
      case statusENUM?.In_progress:
        return colors?.grayOp;
      case statusENUM?.To_be_started:
        return colors?.orangeOp;
      case statusENUM?.Assigned:
        return colors?.sutfCrestOp;
      default:
    }
  };
  const renderColorScolingBg = (itm: any) => {
    switch (itm?.status) {
      case statusENUM?.Completed:
        return colors?.polishedPine;
      case statusENUM?.In_progress:
        return colors?.grey;
      case statusENUM?.To_be_started:
        return colors?.royalOrange;
      case statusENUM?.Assigned:
        return colors?.polishedPine;
      default:
    }
  };

  const renderItem = (item: any, index: any) => {
    return (
      <AssessmentsDetalis
        type={item?.type}
        suggestion={item?.suggestion}
        questionCoutn={item?.questionCoutn}
        status={item?.status}
        planContainer={{
          backgroundColor: renderColorBg(item),
        }}
        typeContainer={{
          backgroundColor: renderColorScolingBg(item),
        }}
        statusContainer={{
          backgroundColor: renderColorScolingBg(item),
        }}
      />
    );
  };
  return (
    <>
      <HeaderWithNameSeeAll
        name={strings?.Tranding_Assessment}
        msg={strings?.seeAll}
      />
      <FlatList
        data={TrandingAssessmentData}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </>
  );
};

export default TrandingAssessment;
