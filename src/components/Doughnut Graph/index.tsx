import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { moderateScale } from "../../constant/responsiveStyle";
import { IndicatorIcon } from "../../assets";

export interface Props {
  degreeRotaion?: any;
}

const CommonDoughnutGraph: React.FC<Props> = ({ degreeRotaion }) => {
  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <View style={{ height: moderateScale(110), width: moderateScale(150) }}>
          <Image
            source={require("../../assets/common/graph/SpeedChart.png")}
            style={{
              height: null,
              width: null,
              flex: 1,
            }}
            resizeMode={"contain"}
          />
        </View>

        <View style={style.meterOverlay}>
          <View style={style.meterArrow}>
            <View
              style={[
                style.arrowStick,
                {
                  transform: [{ rotate: `${degreeRotaion}deg` }],
                },
              ]}
            >
              <IndicatorIcon
                width={`${moderateScale(25)}`}
                height={`${moderateScale(25)}`}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CommonDoughnutGraph;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    // backgroundColor:'red'
  },
  subContainer: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: moderateScale(24),
    // backgroundColor: 'red',
    padding: moderateScale(24),
  },
  meterOverlay: {
    bottom: "45%",
    alignItems: "center",
    position: "absolute",
  },
  meterArrow: {
    alignItems: "center",
    height: moderateScale(86),
    left: moderateScale(-4.4),
  },
  arrowStick: {
    height: moderateScale(135),
    width: moderateScale(30),
    zIndex: 1000,
  },
  arrowImage: {
    height: null,
    width: null,
    flex: 1,
    resizeMode: "contain",
    top: moderateScale(12.5),
    // transform: [{ rotate: '180deg' }]
  },
  arrowRotationPosition: {
    height: moderateScale(24),
    width: moderateScale(24),
    backgroundColor: "black",
    position: "absolute",
    bottom: moderateScale(6.2),
    borderRadius: 100,
  },
  title: {
    color: "#000000",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(17.07),
    marginTop: moderateScale(28),
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: moderateScale(20),
    paddingBottom: moderateScale(25),

    justifyContent: "center",
  },
  percentageText: {
    color: "#242424",
    fontSize: moderateScale(16),
  },
});
