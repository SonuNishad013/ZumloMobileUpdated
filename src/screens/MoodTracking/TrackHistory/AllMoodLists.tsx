import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { moderateScale } from "../../../constant/responsiveStyle";
import { ArrowCircleDown } from "../../../assets";
import MoodMeter from "./MoodMeter";
import MoodDetailsData from "./MoodDetailsData";
import moment from "moment";
import { imagePath } from "../../../assets/png/imagePath";
import { capitalizeFirstLetter } from "../../../constant/CustomHook/CommonFunctions";
import { strings } from "../../../constant/strings";
import { Enum_moodType } from "../../../constant/ENUM";
import { styles } from "./TrackHistoryStyles";

interface Props {
  moodData?: any;
  type?: any;
}
export const graphValue = (value: any) => {
  switch (value) {
    case Enum_moodType?.Feeling_down:
      return moderateScale(40);
    case Enum_moodType?.Feeling_low:
      return moderateScale(80);
    case Enum_moodType?.Neutral:
      return moderateScale(120);
    case Enum_moodType?.Feeling_happy:
      return moderateScale(160);
    case Enum_moodType?.Feeling_extremely_joyful:
      return moderateScale(200);
    default:
      return moderateScale(0);
  }
};
const AllMoodLists: React.FC<Props> = ({ moodData, type }) => {
  const [isGraph, setIsGraph] = useState(true);

  return (
    <View style={{ marginHorizontal: moderateScale(19) }}>
      {moodData && (
        <>
          {type == strings?.moodTracking_ && (
            <>
              <View style={styles.header}>
                <Text style={styles.headerText}>{"Today's mood"}</Text>
                <TouchableOpacity onPress={() => setIsGraph(!isGraph)}>
                  <View
                    style={{
                      transform: [{ rotate: isGraph ? "0deg" : "180deg" }],
                    }}
                  >
                    <ArrowCircleDown />
                  </View>
                </TouchableOpacity>
              </View>
              {isGraph && (
                <View style={styles.card}>
                  <FlatList
                    data={moodData.reverse()}
                    style={styles.flatList}
                    keyExtractor={(item, index) => `key_${index}`}
                    horizontal
                    renderItem={({ item, index }) => (
                      <MoodMeter
                        time={moment(
                          moment(item?.createdDate + "Z").toLocaleString()
                        ).format("hh:mm a")}
                        source={
                          item?.logo ? { uri: item?.logo } : imagePath?.SadIcon
                        }
                        meterFill={{
                          height: graphValue(item?.moodType),
                        }}
                        container={{
                          marginRight:
                            index == moodData.length - 1
                              ? moderateScale(20)
                              : moderateScale(0),
                        }}
                      />
                    )}
                  />
                </View>
              )}
            </>
          )}

          <FlatList
            data={moodData}
            style={{ gap: 40 }}
            keyExtractor={(index) => "key" + index}
            contentContainerStyle={{
              paddingBottom: moderateScale(30),
            }}
            renderItem={({ item, index }) => {
              const isFade = index % 2 === 0;
              return (
                <MoodDetailsData
                  isFade={isFade}
                  item={item}
                  moodType={capitalizeFirstLetter(
                    type === strings?.moodTracking_
                      ? item?.moodType
                      : item?.title
                  )}
                  createdDate={item?.createdDate}
                  description={
                    capitalizeFirstLetter(item?.descrption) || item?.descrption
                  }
                  aiTipsList={item?.tips}
                  type={type}
                />
              );
            }}
          />
        </>
      )}
    </View>
  );
};

export default AllMoodLists;
