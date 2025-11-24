import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import colors from "../../constant/colors";
import { moderateScale, textScale, width } from "../../constant/responsiveStyle";
import moment from "moment";
import { useState } from "react";
const Linegraph = (data) => {
    const [maxvalue, setmaxvalue] = useState<any>()
    let chartData = [...data.data];
    const maxValue = Math.max(...chartData.map(item => item.value));

    console.log("===>chartData", maxValue);
    if (chartData.length === 1) {
        const singlePoint = chartData[0];
        chartData.push({
            ...singlePoint,
            date: moment(singlePoint.date).add(1, 'day').format("DD MMM YYYY"),
            label: moment(singlePoint.date).add(1, 'day').format("ddd")
        });
    }

    return (
        <View
            style={{
                width: width - moderateScale(30),
                backgroundColor: colors.lightprussianBlue,
            }}>
            <LineChart
                areaChart
                data={chartData} // Use modified chart data
                width={width - moderateScale(100)}
                hideDataPoints
                spacing={70}
                color={colors.OceanGreen}
                thickness={2}
                startFillColor={colors.orangeOp}
                endFillColor={colors.royalOrangeDarkOP2}
                startOpacity={0.9}
                endOpacity={0.2}
                initialSpacing={0}
                noOfSections={4}
                maxValue={maxValue + 100}
                yAxisColor="white"
                yAxisThickness={0.5}
                rulesType="solid"
                rulesColor="gray"
                yAxisTextStyle={{ color: colors.SurfCrest }}
                xAxisColor="lightgray"
                xAxisLabelTextStyle={{
                    color: colors.SurfCrest,
                    marginLeft: 30,
                    fontSize: textScale(7)
                }}
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    // pointerLabelWidth: 100,
                    // pointerLabelHeight: 100,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        setmaxvalue(items[0].value)
                        return (
                            <View
                                style={{
                                    height: 90,
                                    width: 100,
                                    justifyContent: 'center',
                                    marginTop: -30,
                                    marginLeft: -40,
                                }}>
                                <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: colors.SurfCrest }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        {(items[0].value).toFixed() + '.0'}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    );
}
export default Linegraph;
