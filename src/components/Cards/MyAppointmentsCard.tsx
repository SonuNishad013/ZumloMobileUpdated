import React from "react";
import { Image, Text, View } from "react-native";
import { CalendarIcon, VerticalLine } from "../../assets";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {}
const MyAppointmentsCard: React.FC<Props> = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: colors?.polishedPine,
          paddingLeft: moderateScale(5),

          borderRadius: moderateScale(8),
          overflow: "hidden",
        }}
      >
        <View
          style={{ backgroundColor: colors?.SaltBox, flexDirection: "row" }}
        >
          <View
            style={{
              flex: 1,
              paddingTop: moderateScale(15),
              paddingLeft: moderateScale(15),
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: textScale(14),
                  color: colors?.SurfCrest,
                }}
              >
                Dr. Imran Syahir
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: moderateScale(4),
                }}
              >
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: textScale(10),
                    color: colors?.SurfCrest,
                    marginRight: moderateScale(5),
                  }}
                >
                  Pediatrician, Montreal
                </Text>
                <VerticalLine />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: textScale(10),
                    color: colors?.polishedPine,
                    marginRight: moderateScale(5),
                  }}
                >
                  Anxiety
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: moderateScale(15),
                  paddingBottom: moderateScale(15),
                }}
              >
                <CalendarIcon
                  height={`${moderateScale(12)}`}
                  width={`${moderateScale(12)}`}
                />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: textScale(10),
                    color: colors?.SurfCrest,
                    marginRight: moderateScale(5),
                    marginLeft: moderateScale(5),
                  }}
                >
                  10-12 PM, Tomorrow
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              // backgroundColor: colors?.grey,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                height: moderateScale(50),
                width: moderateScale(50),
                borderRadius: moderateScale(25),
                overflow: "hidden",
                marginBottom: moderateScale(5),
                alignSelf: "flex-end",
                marginRight: moderateScale(20),
              }}
            >
              <Image
                source={{ uri: "https://picsum.photos/id/237/200/300" }}
                style={{ height: moderateScale(50), width: moderateScale(50) }}
                resizeMode="stretch"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors?.lightSurfCrest02,
                width: moderateScale(125),
                borderBottomLeftRadius: moderateScale(8),
                borderTopLeftRadius: moderateScale(8),
                paddingVertical: moderateScale(6),
              }}
            >
              <View style={{ marginLeft: moderateScale(10) }}>
                <CalendarIcon
                  height={`${moderateScale(12)}`}
                  width={`${moderateScale(12)}`}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: textScale(10),
                  color: colors?.royalOrange,
                  alignSelf: "center",
                  marginLeft: moderateScale(20),
                }}
              >
                Upcoming
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyAppointmentsCard;
