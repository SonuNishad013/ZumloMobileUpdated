import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextStyle, View } from "react-native";
import Modal from "react-native-modal";

import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import CommonButton from "../Buttons/commonButton";
import { ClockSmallIcon, LockIcon } from "../../assets";
import logger from "../../constant/logger";
import { useFocusEffect } from "@react-navigation/native";

export interface Props {
  isVisible?: any;
  hideAlert?: any;
  onYes?: () => void;
  onNo?: () => void;
  title?: string;
  description?: string;
  textStyle?: TextStyle;
  buttonTexts?: string[];
  bookedSlotsData?: string[][];
}

const BookedSlotsModal: React.FC<Props> = ({
  isVisible,
  hideAlert,
  onYes,
  onNo,
  title,
  description,
  textStyle,
  buttonTexts,
  bookedSlotsData,
}) => {
  logger("bookedSlotsData______", bookedSlotsData);
  // helper: convert "HH:MM AM/PM" -> minutes since midnight
  const toMinutes = (timeStr: string): number => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  // helper: convert minutes -> "HH:MM AM/PM"
  const toTimeString = (totalMinutes: number): string => {
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    const modifier = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 0 -> 12
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${modifier}`;
  };

  const mergeTimeRanges = (ranges: string[][]): string[][] => {
    logger("mergeTimeRanges_____", ranges);
    // Convert to minutes
    const intervals = ranges?.map(([start, end]) => [
      toMinutes(start),
      toMinutes(end),
    ]);

    // Sort by start time
    intervals?.sort((a, b) => a[0] - b[0]);

    const merged: [number, number][] = [];
    for (const [start, end] of intervals) {
      if (!merged.length || merged[merged.length - 1][1] < start) {
        // no overlap
        merged.push([start, end]);
      } else {
        // overlap or touching → extend end
        merged[merged.length - 1][1] = Math.max(
          merged[merged.length - 1][1],
          end
        );
      }
    }

    // Convert back to strings
    return merged.map(([s, e]) => [toTimeString(s), toTimeString(e)]);
  };
  const [slotsList, setSlotsList] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const slots = mergeTimeRanges(bookedSlotsData || []);
      setSlotsList(slots);
    }, [bookedSlotsData])
  );

  return (
    <>
      {isVisible ? (
        <View>
          <Modal
            isVisible={isVisible}
            onBackdropPress={hideAlert}
            onBackButtonPress={hideAlert}
            animationIn={"fadeIn"}
          >
            <View style={styles.modelSubContainer}>
              <View style={{ padding: moderateScale(20) }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  <ClockSmallIcon
                    height={moderateScale(25)}
                    width={moderateScale(25)}
                  />
                  <Text
                    style={{
                      fontSize: textScale(18),
                      fontWeight: "600",
                      color: colors.SurfCrest,
                      textAlign: "center",
                    }}
                  >
                    {title !== "" ? title : "Are you sure, you want to logout?"}
                  </Text>
                </View>

                <View
                  style={{
                    height: moderateScale(1),
                    backgroundColor: colors.white,
                    opacity: 0.1,
                    marginVertical: moderateScale(20),
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: textScale(14),
                      fontWeight: "600",
                      color: colors.SurfCrest,
                      //   textAlign: "center",
                    },
                    textStyle,
                  ]}
                >
                  {description !== ""
                    ? description
                    : "Once you logged out, you need to login again with your credentials."}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: textScale(12),
                      fontWeight: "400",
                      color: colors.SurfCrest,
                      //   textAlign: "center",
                    },
                    textStyle,
                  ]}
                >
                  Start time and End time
                </Text>

                <View
                  style={{
                    // backgroundColor: "green",
                    height: moderateScale(300),
                    marginTop: moderateScale(15),
                  }}
                >
                  <FlatList
                    data={slotsList}
                    contentContainerStyle={{ gap: 10 }}
                    style={{ height: moderateScale(100) }}
                    keyExtractor={(item, index) => "key" + index}
                    renderItem={({ item, index }) => {
                      return (
                        <View
                          style={{
                            padding: moderateScale(10),
                            // borderWidth: 0.5,
                            borderColor:
                              //   index % 2 == 0
                              //     ? colors?.polishedPine
                              //     :
                              colors.royalOrangeDark,
                            backgroundColor:
                              //   index % 2 == 0
                              //     ? colors?.polishedPineOP3
                              //     :
                              colors.royalOrangeDarkOP2,
                            borderRadius: moderateScale(15),
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 10,
                          }}
                        >
                          <LockIcon
                            width={moderateScale(18)}
                            height={moderateScale(18)}
                          />
                          <Text
                            style={{
                              color:
                                // index % 2 == 0
                                //   ? colors?.prussianBlue
                                //   :
                                colors.SurfCrest,
                            }}
                          >
                            {item[0]} - {item[1]}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: moderateScale(20),
                    flexDirection: "row",
                    justifyContent:
                      buttonTexts?.length === 2 ? "space-between" : "center",
                  }}
                >
                  {buttonTexts?.length === 2 && (
                    <CommonButton
                      btnName={
                        buttonTexts
                          ? buttonTexts[0]
                          : !title
                          ? "No, I don't"
                          : "No"
                      }
                      mainContainer={{
                        height: moderateScale(34),
                        width: moderateScale(100),
                        borderColor: "#FF9D48",
                        borderWidth: moderateScale(1),
                        backgroundColor: "#6D597A",
                      }}
                      btnNameStyle={{
                        fontSize: textScale(14),
                        fontWeight: "600",
                        color: colors.royalOrange,
                        textAlign: "center",
                      }}
                      onPress={onNo}
                    />
                  )}
                  {buttonTexts?.length === 2 && (
                    <CommonButton
                      btnName={
                        buttonTexts
                          ? buttonTexts[1]
                          : !title
                          ? "Yes, log out"
                          : "Yes"
                      }
                      mainContainer={{
                        height: moderateScale(34),
                        width: moderateScale(100),
                        backgroundColor: "#DB4343",
                      }}
                      btnNameStyle={{
                        fontSize: textScale(14),
                        fontWeight: "600",
                        color: colors.SurfCrest,
                        textAlign: "center",
                      }}
                      onPress={onYes}
                    />
                  )}
                  {buttonTexts?.length === 1 && (
                    <CommonButton
                      btnName={
                        buttonTexts
                          ? buttonTexts[0]
                          : !title
                          ? "No, I don't"
                          : "No"
                      }
                      mainContainer={{
                        height: moderateScale(34),
                        width: moderateScale(100),
                        borderColor: "#FF9D48",
                        borderWidth: moderateScale(1),
                        backgroundColor: "#6D597A",
                      }}
                      btnNameStyle={{
                        fontSize: textScale(14),
                        fontWeight: "600",
                        color: colors.royalOrange,
                        textAlign: "center",
                      }}
                      onPress={onNo}
                    />
                  )}
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  InvestBtnBorderStyles: {
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(4),
    backgroundColor: colors?.white,
    borderWidth: moderateScale(1),
    borderColor: colors?.themeColor,
    marginTop: moderateScale(10),
  },
  InvestBtnStyles: {
    fontSize: textScale(12),
    color: colors?.themeColor,
    lineHeight: textScale(19),
    fontWeight: "500",
    textAlign: "center",
  },
  AlertMessageStyle: {
    fontSize: textScale(14),
    color: "#000",
    // lineHeight: textScale(19),
    fontWeight: "500",
  },
  modelSubContainer: {
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6D597A",
    borderRadius: 10,
    paddingHorizontal: moderateScale(10),
  },
  buttonContainer: {
    marginBottom: moderateScale(20),
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
});
export default BookedSlotsModal;
