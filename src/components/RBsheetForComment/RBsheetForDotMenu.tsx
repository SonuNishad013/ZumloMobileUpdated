import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";

interface Props {
  rbSheetRef?: any;
  onPressMenu?: any;
  menuData?: any;
}

const RBsheetForDotMenu: React.FC<Props> = ({
  rbSheetRef,
  onPressMenu,
  menuData,
}) => {
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateHeight = () => setScreenHeight(Dimensions.get("window").height);
    const subscription = Dimensions.addEventListener("change", updateHeight);
    return () => subscription.remove();
  }, []);

  const getHeight = () => {
    switch (menuData?.length) {
      case 1:
        return 0.2;
      case 2:
        return 0.3;
      case 3:
        return 0.3;
      case 4:
        return 0.4;
      case 5:
        return 0.4;
      case 6:
        return 0.6;
      default:
        return 0.6;
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
        <View style={styles.header}>
          <Text style={styles.headerText}>{"Menu"}</Text>
        </View>

        <FlatList
          data={menuData}
          style={{
            paddingTop: moderateScale(20),
          }}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }: any) => {
            return (
              <RenderItemButton
                SvgIcon={item?.icon}
                title={item?.title}
                onPress={() => onPressMenu(item?.title)}
              />
            );
          }}
        />
      </RBSheet>
    </View>
  );
};

const RenderItemButton = ({ SvgIcon, title, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.header}>
      <SvgIcon hight={moderateScale(20)} width={moderateScale(20)} />
      <Text style={styles.headerText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RBsheetForDotMenu;

const styles = StyleSheet.create({
  container: { flex: 1 },
  sheetContainer: {
    backgroundColor: colors?.SurfCrest,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  flexContainer: { flex: 1 },
  header: {
    borderBottomWidth: moderateScale(1),
    borderBottomColor: colors?.SaltBoxOp,
    paddingVertical: moderateScale(15),
    marginLeft: moderateScale(19),
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  headerText: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  commentSection: {
    flexGrow: 1,
    padding: moderateScale(10),
  },
  commentItem: {
    flexDirection: "row",
    gap: moderateScale(10),
    marginBottom: moderateScale(8),
    marginTop: moderateScale(15),
  },
  username: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  usernameReply: {
    fontSize: textScale(13),
    color: colors?.prussianBlue,
    fontWeight: "600",
  },
  commentText: {
    fontSize: textScale(10),
    color: colors?.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(5),
  },
  commentTextReply: {
    fontSize: textScale(9),
    color: colors?.prussianBlue,
    fontWeight: "400",
    marginTop: moderateScale(3),
  },
  replyText: {
    fontSize: textScale(10),
    color: colors?.saltDark,
    fontWeight: "600",
    marginTop: moderateScale(5),
  },
  inputContainer: {
    padding: moderateScale(10),
    borderTopWidth: moderateScale(1),
    borderTopColor: colors?.SaltBoxOp,
    backgroundColor: colors?.SurfCrest,
  },
  inputWrapper: {
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(10),
  },
  imageContainer: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors?.surfCrustOp2,
    borderWidth: moderateScale(1),
  },
  imageContainerReply: {
    height: moderateScale(44),
    width: moderateScale(44),
    borderRadius: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors?.surfCrustOp2,
    borderWidth: moderateScale(1),
  },
  image: {
    height: moderateScale(48),
    width: moderateScale(48),
    borderRadius: moderateScale(24),
  },
  imageReply: {
    height: moderateScale(42),
    width: moderateScale(42),
    borderRadius: moderateScale(24),
  },
  textInput: {
    flex: 1,
    paddingVertical: moderateScale(10),
    fontWeight: "400",
    color: colors?.prussianBlue,
    fontSize: textScale(14),
  },
  viewRepliesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  separator: {
    width: moderateScale(40),
    backgroundColor: colors?.saltDark,
    height: moderateScale(0.5),
    marginTop: moderateScale(10),
  },
  viewRepliesButton: {
    backgroundColor: colors?.SurfCrest,
  },
});
