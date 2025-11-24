import { FlatList } from "react-native";
import React from "react";
import WellnessEnrollCard from "../../../components/Cards/WellnessEnrollCard";
import HeaderWithNameSeeAll from "../../../components/Header/HeaderWithNameSeeAll";
import { strings } from "../../../constant/strings";
interface Props {
  data?: any;
}
const WellnessEnrollList: React.FC<Props> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => "key" + index}
      ListHeaderComponent={() => (
        <HeaderWithNameSeeAll
          name={strings?.WellnessHeader}
          msg={strings?.seeAll}
        />
      )}
      renderItem={({ item, index }) => {
        return (
          <WellnessEnrollCard
            title={item?.title}
            type={item?.type}
            generated={item?.generated}
            btnName={item?.btnName}
          />
        );
      }}
    />
  );
};

export default WellnessEnrollList;
