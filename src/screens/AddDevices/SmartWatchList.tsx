import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { ReactElement, useState } from "react";
import colors from "../../constant/colors";
import { strings } from "../../constant/strings";
import CommonHeader from "../../components/Header/commonHeader";
import { moderateScale } from "../../constant/responsiveStyle";
import { Samsung, Watch } from "../../assets";

interface Props {
  navigation?: any;
}

interface Item {
  id: string;
  Device: any;
  logo: any;
  special: boolean;
}

interface SubItem {
  id: string;
  Device: any;
  logo: any;
  special: boolean;
}

interface RowItem {
  id: string;
  items: SubItem[];
}

const WatchImage = (
  <Watch width={moderateScale(68.35)} height={moderateScale(95.68)} />
);

const Logo = (
  <Samsung height={moderateScale(31.21)} width={moderateScale(117.49)} />
);

const data: RowItem[] = [
  {
    id: "row1",
    items: [
      { id: "1", Device: WatchImage, logo: Logo, special: false },
      { id: "2", Device: WatchImage, logo: Logo, special: false },
      ,
    ],
  },
  {
    id: "row2",
    items: [{ id: "3", Device: WatchImage, logo: Logo, special: true }],
  },
  {
    id: "row3",
    items: [
      { id: "4", Device: WatchImage, logo: Logo, special: false },
      { id: "5", Device: WatchImage, logo: Logo, special: false },
    ],
  },
];

const SmartWatchList: React.FC<Props> = ({ navigation }): ReactElement => {
  const renderItem = ({ item }: { item: RowItem }) => (
    <View style={styles.row}>
      {item.items.map((subItem) => (
        <>
          {subItem?.special ? (
            <TouchableOpacity key={subItem.id} style={styles.item1}>
              {subItem.logo}
              {subItem.Device}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={subItem.id} style={styles.item}>
              {subItem.Device}
              {subItem.logo}
            </TouchableOpacity>
          )}
        </>
      ))}
    </View>
  );
  const Header = () => (
    <CommonHeader
      headerName={strings?.headerSmartWatch}
      // textStyle={{ color: colors?.prussianBlue }}
    />
  );

  const DevicesList = () => (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => "key" + index}
      contentContainerStyle={{ paddingTop: moderateScale(30) }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        {Header()}
        {DevicesList()}
      </View>
    </View>
  );
};
export default SmartWatchList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.backgroundTheme,
  },
  innerView: {
    // width: moderateScale(334),
    alignSelf: "center",
  },
  specialItemView: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "transparent",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: moderateScale(10),
    borderColor: colors?.OceanGreen,
    borderWidth: 1, // Example of different style for special item
    width: moderateScale(326),
    height: moderateScale(123.05),
  },
  row: {
    flexDirection: "row",
    padding: 10,
    // Additional row styling
  },
  item: {
    backgroundColor: "transparent",
    margin: 5,
    alignItems: "center",
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: colors?.OceanGreen,
    width: moderateScale(153.92),
    height: moderateScale(191.07),
    justifyContent: "center",
    // Additional item styling
  },
  item1: {
    backgroundColor: "transparent",
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: colors?.OceanGreen,
    width: moderateScale(326),
    height: moderateScale(123.05),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
