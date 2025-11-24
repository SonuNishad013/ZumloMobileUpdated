import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../constant/colors";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import { moderateScale } from "../../constant/responsiveStyle";
import {
  AmazFit,
  Apple,
  Fitbit,
  Garmin,
  GoogleFit,
  Samsung,
} from "../../assets";

interface Props {
  navigation?: any;
}

type ItemData = {
  id: number;
  brandIcon: any;
};

const DATA: ItemData[] = [
  {
    id: 1,
    brandIcon: (
      <Samsung height={moderateScale(23.92)} width={moderateScale(90.05)} />
    ),
  },
  {
    id: 2,
    brandIcon: (
      <Apple height={moderateScale(45.11)} width={moderateScale(90.23)} />
    ),
  },
  {
    id: 3,
    brandIcon: (
      <Garmin height={moderateScale(35.03)} width={moderateScale(90.67)} />
    ),
  },
  {
    id: 4,
    brandIcon: (
      <Fitbit height={moderateScale(22.75)} width={moderateScale(90.01)} />
    ),
  },
  {
    id: 5,
    brandIcon: (
      <AmazFit height={moderateScale(50.62)} width={moderateScale(89.98)} />
    ),
  },
  {
    id: 6,
    brandIcon: (
      <GoogleFit height={moderateScale(37.83)} width={moderateScale(51.3)} />
    ),
  },
];
type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({
  item,
  index,
  onPress,
  backgroundColor,
  textColor,
}: ItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.item,
      { backgroundColor },
      index !== DATA.length - 1 && styles.itemSpacing,
    ]}
  >
    <View style={styles.WatchesView}>{item.brandIcon}</View>
  </TouchableOpacity>
);

const SmartWatch: React.FC<Props> = ({ navigation }): ReactElement => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item, index }: { item: ItemData }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const backgroundColor = colors?.white;
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const header = () => <CommonHeader headerName={strings?.headerSmartWatch} />;
  const Watches = () => (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => "key" + index}
      extraData={selectedId}
      numColumns={2}
      style={{ paddingTop: moderateScale(50) }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerView}>
        {header()}
        {Watches()}
      </View>
    </SafeAreaView>
  );
};
export default SmartWatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundTheme,
  },
  innerView: {
    width: moderateScale(334),
    alignSelf: "center",
  },
  item: {
    // marginLeft: 10,
    marginTop: 10,
    borderRadius: moderateScale(15),
  },
  WatchesView: {
    width: moderateScale(161),
    height: moderateScale(70),
    alignItems: "center",
    justifyContent: "center",
  },
  itemSpacing: {
    marginRight: 10, // Adjust this value to change the horizontal spacing between items
  },
});
