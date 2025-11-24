import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import CommonButton from "../../../../../components/Buttons/commonButton";
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
import CustomGraph from "../CustomGraph";
import CustomImage from "../../../../../components/ImageRender";

const Severity = ({
  refRBSheet,
  tapOnNext,
  frequencyData,
  ServerityAndFrequencyData,
  getSelectedData,
  selectedItem,
  getSelectedFreq,
  isCounsellingSheet,
  isSelected,
  onClose,
}: any) => {
  const isFocus = useIsFocused();
  const [count, setCount] = useState(0);
  const [serverityData, setserverityData] = useState();
  const [frequency, setFrequency] = useState(
    getSelectedFreq !== undefined
      ? frequencyData?.[0]?.stepFields?.[0]?.stepFieldOptions.map((item: any) =>
          item.optionID === getSelectedFreq.optionID ? getSelectedFreq : item
        )
      : frequencyData?.[0]?.stepFields?.[0]?.stepFieldOptions
  );

  useEffect(() => {
    setFrequency(
      getSelectedFreq !== undefined
        ? frequencyData?.[0]?.stepFields?.[0]?.stepFieldOptions.map(
            (item: any) =>
              item.optionID === getSelectedFreq.optionID
                ? getSelectedFreq
                : item
          )
        : frequencyData?.[0]?.stepFields?.[0]?.stepFieldOptions
    );
  }, [getSelectedFreq]);
  useEffect(() => {
    setFrequency(frequencyData?.[0]?.stepFields?.[0]?.stepFieldOptions);
  }, [frequencyData?.[0]?.stepFields?.[0]?.stepFieldOptions]);

  // Reset frequency selections if `isSelected` is null or undefined
  useEffect(() => {
    if (isSelected === null || isSelected === undefined) {
      if (frequency)
        setFrequency((prevFreq: any) =>
          prevFreq.map((item: any) => ({ ...item, isSelected: false }))
        );
    }
  }, [isSelected]);

  const onFrequencySelection = (index: number) => {
    let newData = [...frequency];
    for (let i in newData) {
      newData[i].isSelected = false;
    }
    newData[index].isSelected = true;
    setFrequency(newData);
  };

  const clearState = () => {
    setCount(0);
    let data = [...frequency];
    for (let index in data) {
      data[index].isSelected = false;
    }
    setFrequency(data);
  };
  const data_ = ServerityAndFrequencyData.filter((item: any) => {
    if (item.stepName == "Effectiveness" || item.stepName == "Severity")
      return item;
  });
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      onClose={onClose}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.prussianBlue,
          height: moderateScale(640),
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
      animationType={"slide"}
    >
      <ScrollView>
        <View style={styles.innerBottomSheetView}>
          <Text style={styles.mainText}>
            {isCounsellingSheet
              ? "How has it helped? "
              : "How intense has this felt for you?"}
          </Text>
          {isCounsellingSheet ? (
            <Text style={styles.text}>
              {"Rate how well it worked for you."}
            </Text>
          ) : (
            <Text style={styles.text}>
              {"Use the dial to show what it's been like."}
            </Text>
          )}
          <CustomGraph
            level={(val: any) => setCount(val)}
            getSelectedData={getSelectedData}
          />
          <View style={{ marginBottom: moderateScale(10) }}>
            <Text style={styles.mainText}>
              {isCounsellingSheet ? "" : "How often does it show up?"}
            </Text>

            {isCounsellingSheet ? (
              <Text style={styles.text}>{"How often did you use it?"}</Text>
            ) : (
              <Text style={styles.text}>
                {"Choose the option that fits best."}
              </Text>
            )}
          </View>
          <View
            style={{
              maxHeight: moderateScale(350),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FlatList
              numColumns={2}
              data={frequency}
              keyExtractor={(item, index) => "key" + index}
              contentContainerStyle={{
                marginBottom: moderateScale(20),
              }}
              renderItem={({ item, index }: any) => {
                console.log("item-=-==->=-=-=->", item.logo);

                return (
                  <TouchableOpacity
                    onPress={() => onFrequencySelection(index)}
                    style={{
                      borderWidth: 1,
                      borderRadius: moderateScale(25),
                      alignItems: "center",
                      paddingVertical: moderateScale(12.5),
                      margin: 5,
                      paddingHorizontal: moderateScale(20),
                      minWidth: moderateScale(130),
                      maxWidth: moderateScale(240),
                      borderColor: colors?.SurfCrest,
                      backgroundColor: item?.isSelected
                        ? colors?.royalOrange
                        : "transparent",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <View
                      style={{
                        height: moderateScale(30),
                        width: moderateScale(30),
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <CustomImage
                        source={{ uri: item?.logo }}
                        width={moderateScale(25)}
                        height={moderateScale(25)}
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          marginVertical: moderateScale(10),
                        }}
                        tintColor={
                          item?.isSelected
                            ? colors.prussianBlue
                            : colors.SurfCrest
                        }
                        isTintColor={false}
                      />
                    </View>
                    <Text
                      style={{
                        color: item?.isSelected
                          ? colors?.prussianBlue
                          : colors?.SurfCrest,
                        fontSize: textScale(14),
                        fontWeight: "400",
                      }}
                    >
                      {item?.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CommonButton
              mainContainer={{ marginBottom: moderateScale(10) }}
              onPress={() => {
                let selectedData = frequency.filter(
                  (elem: any) => elem.isSelected
                );
                {
                  console.log(selectedData, "selectedData");
                }
                if (count != 0) {
                  console.log("count=-=-=>", count);
                  if (count == undefined) {
                    selectedData.push({
                      title:
                        ServerityAndFrequencyData?.[0]?.stepName == "Severity"
                          ? "Severity level: " + 1
                          : ":" + 1,
                      type: "slider",
                    });
                  } else {
                    selectedData.push({
                      title:
                        ServerityAndFrequencyData?.[0]?.stepName == "Severity"
                          ? "Severity level: " + count
                          : ":" + count,
                      type: "slider",
                    });
                  }
                }

                tapOnNext(selectedData);
                clearState();
              }}
              btnName={"Next"}
            />
          </View>
        </View>
      </ScrollView>
    </RBSheet>
  );
};

export default Severity;
