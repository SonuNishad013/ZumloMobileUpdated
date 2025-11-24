import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { switchCodes } from "../../constant/CommunityConstant";
import { imagePath } from "../../assets/png/imagePath";
import { strings } from "../../constant/strings";

const RBsheetForShare = ({
  rbSheetRef,
  onPressMenu,
  menuData = [],
  groupList = [],
  onPressGroupShareFeed,
  memberListData = [],
  onPressConnectionShareFeed,
}: any) => {
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateHeight = () => setScreenHeight(Dimensions.get("window").height);
    const subscription = Dimensions.addEventListener("change", updateHeight);
    return () => subscription.remove();
  }, []);

  const getHeight = () => {
    const heightMap: any = { 1: 0.2, 2: 0.4, 3: 0.5, 4: 0.4, 5: 0.4, 6: 0.6 };
    // return heightMap[menuData?.length] || 0.6;
    if (menuData?.length) {
      if (groupList?.length > 0 && memberListData?.length > 0) {
        return heightMap[menuData?.length] || 0.6;
      } else if (groupList?.length > 0 || memberListData?.length > 0) {
        return heightMap[2];
      } else {
        return heightMap[1];
      }
    }
  };

  return (
    <View style={styles.container}>
      <RBSheet
        ref={rbSheetRef}
        height={screenHeight * getHeight()}
        openDuration={250}
        customStyles={{ container: styles.sheetContainer }}
      >
        <View style={[styles.header, styles?.separatorView]}>
          <Text style={styles.headerText}>Share feed</Text>
        </View>

        <FlatList
          keyExtractor={(item, index) => "key" + index}
          data={menuData}
          style={styles.flatListStyle}
          renderItem={({ item }) => (
            <RenderItemButton
              SvgIcon={item?.icon}
              title={item?.title}
              onPress={() => onPressMenu(item?.title)}
              groupList={groupList}
              onPressGroupShareFeed={onPressGroupShareFeed}
              memberListData={memberListData}
              onPressConnectionShareFeed={onPressConnectionShareFeed}
            />
          )}
        />
      </RBSheet>
    </View>
  );
};

const RenderItemButton = ({
  SvgIcon,
  title,
  onPress,
  groupList,
  onPressGroupShareFeed,
  memberListData = [],
  onPressConnectionShareFeed,
}: any) => {
  const renderUI = () => {
    switch (title) {
      case switchCodes?.group:
        if (groupList?.length > 0) {
          return (
            <>
              <View style={styles.header}>
                <SvgIcon height={moderateScale(25)} width={moderateScale(25)} />
                <Text style={styles.headerText}>{title}</Text>
              </View>
              <FlatList
                keyExtractor={(item, index) => "key" + index}
                data={groupList}
                horizontal
                ListEmptyComponent={
                  <Text style={styles?.noDataStyle}>
                    {strings?.notAnyGroups}
                  </Text>
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.groupItemContainer}
                    onPress={() => onPressGroupShareFeed(item)}
                  >
                    <View style={styles.groupImageContainerShare}>
                      <Image
                        source={
                          item?.profilePicture
                            ? { uri: item.profilePicture }
                            : imagePath.Chakras
                        }
                        style={styles.groupImageShare}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.groupText}>{item?.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <View
                style={[styles.separatorView, { marginTop: moderateScale(15) }]}
              />
            </>
          );
        } else {
          return null;
        }
      case switchCodes?.connection:
        if (memberListData?.length > 0) {
          return (
            <>
              <View style={styles.header}>
                <SvgIcon height={moderateScale(25)} width={moderateScale(25)} />
                <Text style={styles.headerText}>{title}</Text>
              </View>
              <FlatList
                keyExtractor={(item, index) => "key" + index}
                data={memberListData}
                horizontal
                ListEmptyComponent={
                  <Text style={styles?.noDataStyle}>
                    {strings?.notAnyConnection}
                  </Text>
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.groupItemContainer}
                    onPress={() => onPressConnectionShareFeed(item)}
                  >
                    <View style={styles.groupImageContainerShare}>
                      <Image
                        source={
                          item?.aliasProfilePicture
                            ? { uri: item?.aliasProfilePicture }
                            : imagePath?.Chakras
                        }
                        style={styles.groupImageShare}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={styles.groupText}>{item?.aliasName}</Text>
                  </TouchableOpacity>
                )}
              />
              <View
                style={[styles.separatorView, { marginTop: moderateScale(15) }]}
              />
            </>
          );
        } else {
          return null;
        }

      default:
        return (
          <TouchableOpacity
            onPress={onPress}
            style={[styles.header, styles.separatorView]}
          >
            <SvgIcon height={moderateScale(23)} width={moderateScale(23)} />
            <Text style={styles.headerText}>{title}</Text>
          </TouchableOpacity>
        );
    }
  };

  return <View>{renderUI()}</View>;
};

export default RBsheetForShare;

const styles = StyleSheet.create({
  container: { flex: 1 },
  sheetContainer: {
    backgroundColor: colors.SurfCrest,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  flatListStyle: { paddingTop: moderateScale(20) },
  header: {
    paddingVertical: moderateScale(15),
    marginLeft: moderateScale(19),
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  headerText: {
    fontSize: textScale(14),
    color: colors.prussianBlue,
    fontWeight: "600",
  },
  groupItemContainer: {
    alignItems: "center",
    marginLeft: moderateScale(19),
  },
  groupImageContainerShare: {
    height: moderateScale(44),
    width: moderateScale(44),
    borderRadius: moderateScale(44),
    backgroundColor: colors.SaltBox,
    alignItems: "center",
    justifyContent: "center",
  },
  groupImageShare: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(42),
  },
  groupText: {
    fontSize: textScale(10),
    color: colors.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(5),
  },
  separatorView: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors.SaltBoxOp,
    marginLeft: moderateScale(19),
  },
  noDataStyle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.prussianBlue,
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
});
