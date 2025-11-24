import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../../../constant/colors";
import CommonHeader from "../../../../components/Header/commonHeader";
import { strings } from "../../../../constant/strings";
import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Line,
} from "react-native-responsive-linechart";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import {
  CounterPlus,
  GreenArrow,
  Orangedrop,
  RedArrow,
} from "../../../../assets";
import { TabBar, TabView } from "react-native-tab-view";

interface Props {
  navigation?: any;
}

const VitalsSummary: React.FC<Props> = ({ navigation }): ReactElement => {
  const Red_arrow = (
    <RedArrow height={moderateScale(17.66)} width={moderateScale(13.31)} />
  );
  const Green_Arrow = (
    <GreenArrow height={moderateScale(17.66)} width={moderateScale(13.31)} />
  );

  const RecentData: RecentData[] = [
    {
      id: 1,
      type: "day",
      date: "28",
      month: "jan",
      time: "2:30 PM",
      graph: [
        { x: 1, y: 2 },
        { x: -1, y: 0 },
        { x: 4, y: 10 },
        { x: 3, y: 6 },
        { x: 4, y: 12 },
      ],
      quantity: "110",
      unit: "mmhg",
      icon: Red_arrow,
    },
    {
      id: 2,
      type: "day",
      date: "29",
      month: "jan",
      time: "12:45 PM",
      graph: [
        { x: 2, y: 4 },
        { x: -2, y: 3 },
        { x: 4, y: 5 },
        { x: 2, y: 8 },
        { x: 1, y: 7 },
      ],
      quantity: "141",
      unit: "mmhg",
      icon: Green_Arrow,
    },
    {
      id: 3,
      type: "day",
      date: "30",
      month: "jan",
      time: "5:30 PM",
      graph: [
        { x: 3, y: 6 },
        { x: -3, y: 6 },
        { x: 4, y: 10 },
        { x: 3, y: 6 },
        { x: 2, y: 5 },
      ],
      quantity: "108",
      unit: "mmhg",
      icon: Red_arrow,
    },
    {
      id: 4,
      type: "day",
      date: "31",
      month: "jan",
      time: "6:30 PM",
      graph: [
        { x: 3, y: 6 },
        { x: -3, y: 6 },
        { x: 2, y: 10 },
        { x: 3, y: 6 },
        { x: 2, y: 5 },
      ],
      quantity: "108",
      unit: "mmhg",
      icon: Red_arrow,
    },
  ];

  const [index, setIndex] = useState(0);

  const [routesForAll, setroutesForAll] = useState([
    { key: "first", title: "Day" },
    { key: "second", title: "Week" },
    { key: "third", title: "Month" },
  ]);
  const [routes] = useState(routesForAll);

  const layout = useWindowDimensions();
  const initialLayout = { width: moderateScale(layout.width) };
  const initialHeight = moderateScale(layout.height);

  const data1 = [
    { x: -2, y: 1 },
    { x: -1, y: 0 },
    { x: 8, y: 13 },
    { x: 9, y: 11.5 },
    { x: 10, y: 12 },
  ];

  const LabelText = ({ route, focused }: any) => {
    return (
      <View
        style={{
          marginHorizontal: focused ? moderateScale(-2) : moderateScale(0),
        }}
      >
        <Text style={focused ? styles.focusedText : styles.unFocusedTxt}>
          {route?.title}
        </Text>
      </View>
    );
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles?.tabMainView}
      style={styles?.tabbarViewe}
      tabStyle={{ width: moderateScale(120) }}
      scrollEnabled={true}
      renderLabel={LabelText}
    ></TabBar>
  );

  const renderLazyPlaceholder = () => {
    return <View style={styles.placeHolder} />;
  };

  const renderItem = ({ item }: { item: RecentData }) => (
    <View style={styles.OuterView}>
      <View style={styles.recentActivityView}>
        <View style={styles.dateView}>
          <Text style={styles.Datetext}>{item?.date}</Text>
          <Text style={styles.monthtext}>{item?.month}</Text>
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
        <Chart
          style={styles?.chatBox}
          xDomain={{ min: -2, max: 10 }}
          yDomain={{ min: -2, max: 20 }}
          padding={styles?.paddingStyle}
        >
          <VerticalAxis />
          <HorizontalAxis />
          <Line
            data={item?.graph}
            smoothing={strings?.none_}
            theme={{ stroke: { color: colors?.royalOrange, width: 1 } }}
          />
        </Chart>
        <Text style={styles.quantityText}>
          {item?.quantity}
          <Text style={styles.quantityText}>{item?.unit}</Text>
        </Text>
        {item?.icon}
      </View>
    </View>
  );

  const Day = () => (
    <View style={[styles.OuterView, styles?.dayView]}>
      <View style={styles.valueStyle}>
        <Orangedrop width={moderateScale(24)} height={moderateScale(24)} />
        <Text style={styles.ValueText}>
          {strings?.reading}
          <Text style={styles.unitText}>{strings?.mmhg}</Text>
        </Text>
      </View>
      <View style={styles?.setLeft}>
        <Text style={styles.AverageBpText}>{strings?.averageBp}</Text>
      </View>

      <Chart
        style={styles?.chatView}
        xDomain={{ min: -2, max: 10 }}
        yDomain={{ min: -2, max: 20 }}
        padding={styles?.paddingView}
      >
        <VerticalAxis />
        <HorizontalAxis />
        <Line
          data={data1}
          smoothing={strings?.none_}
          theme={{ stroke: { color: colors?.royalOrange, width: 1 } }}
        />
      </Chart>
      {reacentActivities()}
    </View>
  );

  const reacentActivities = () => (
    <View style={[styles.OuterView, styles?.alignmentCenter]}>
      <View style={styles?.centerView}>
        <View>
          <Text style={styles.recentActivityText}>
            {strings?.recentActivities}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
      <View>
        <FlatList
          data={RecentData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles?.paddingBottom}
        />
      </View>
    </View>
  );

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case strings?.first:
        return Day();
      case strings?.second:
        return (
          <>
            <View>
              <Text>{strings?.Second}</Text>
            </View>
          </>
        );
      case strings?.third:
        return (
          <>
            <View>
              <Text>{strings?.Third}</Text>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  const Header = () => (
    <View>
      <CommonHeader headerName={strings?.headerAddVitalSummaary} />
    </View>
  );

  const VitalName = () => (
    <View style={styles.OuterView}>
      <View style={styles.UpperView}>
        <Text style={styles.BpText}>{strings?.BpVital}</Text>
        <TouchableOpacity>
          <CounterPlus height={moderateScale(34)} width={moderateScale(34)} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Tabs = () => (
    <View style={styles.OuterView}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{ height: initialHeight, flexGrow: 1 }}
        renderTabBar={renderTabBar}
        lazy={true}
        renderLazyPlaceholder={renderLazyPlaceholder}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={strings?.mainView}>
        {Header()}
        {VitalName()}
        {Tabs()}
      </View>
    </ScrollView>
  );
};
export default VitalsSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.prussianBlue,
  },
  mainView: {
    alignSelf: "center",
  },
  OuterView: {
    paddingTop: moderateScale(20),
  },
  dayView: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
  },
  paddingBottom: {
    paddingBottom: 50,
  },
  alignmentCenter: {
    alignItems: "center",
  },
  BpText: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    fontFamily: "Poppins-Regular",
  },
  UpperView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  focusedText: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
  },
  unFocusedTxt: {
    color: colors?.SurfCrest,
    fontSize: textScale(12),
  },
  chatView: {
    height: 200,
    width: "100%",
    backgroundColor: colors?.prussianBlue,
  },
  placeHolder: {
    flex: 1,
    // backgroundColor: colors?.white,
  },
  valueStyle: {
    flexDirection: "row",
  },
  centerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ValueText: {
    fontSize: textScale(62),
    lineHeight: 65,
    fontWeight: "700",
    color: colors?.royalOrange,
  },
  tabMainView: {
    backgroundColor: colors.SurfCrest,
    width: "30%",
  },
  unitText: {
    fontSize: textScale(25),
    color: colors?.SurfCrest,
    fontWeight: "500",
  },
  AverageBpText: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
  setLeft: {
    marginLeft: moderateScale(18),
  },
  paddingView: {
    left: 20,
    top: 10,
    bottom: 10,
    right: 10,
  },
  line: {
    width: 2, // Width of the line
    // height: "100%", // Make line height match the container
    backgroundColor: "blue", // Color of the line
    marginRight: 10, // Space between line and text
  },
  text: {
    fontSize: 16, // Text size
    // Additional text styling
  },
  recentActivityText: {
    width: "100%",
    textAlign: "center",
    color: colors?.SurfCrest,
    fontWeight: "600",
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors?.white,
    marginLeft: moderateScale(10),
  },
  recentActivityView: {
    backgroundColor: colors?.lightPrussian,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    height: moderateScale(68),
    borderRadius: moderateScale(10),
  },
  dateView: {
    height: moderateScale(55),
    width: moderateScale(54),
    borderRadius: 10,
    borderColor: colors.lightgreen,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Datetext: {
    color: colors?.SurfCrest,
    fontSize: textScale(25),
    fontWeight: "500",
    fontFamily: "Poopins-Regular",
  },
  monthtext: {
    color: colors?.SurfCrest,
    fontSize: textScale(10),
    fontWeight: "400",
    fontFamily: "Poopins-Regular",
  },
  timeText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
    fontFamily: "Poopins-Regular",
  },
  tabbarViewe: {
    backgroundColor: colors?.prussianBlue,
    width: moderateScale(343),
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  quantityText: {
    color: colors?.SurfCrest,
    fontSize: textScale(14),
    fontWeight: "400",
  },
  paddingStyle: {
    left: 20,
    top: 10,
    bottom: 10,
    right: 10,
  },
  chatBox: {
    height: moderateScale(39),
    width: moderateScale(71.43),
    backgroundColor: "transparent",
  },
});
