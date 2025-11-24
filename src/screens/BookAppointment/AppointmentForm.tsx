import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { ReactElement, useState } from "react";
import ScreenWrapper from "../../components/SafeArea/SafeAreaWrapper";
import colors from "../../constant/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonHeader from "../../components/Header/commonHeader";
import { strings } from "../../constant/strings";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { Phone, Video } from "../../assets";
import CommonInput from "../../components/Inputs/commonInput";
import CommonButton from "../../components/Buttons/commonButton";
import CommonDropDown from "../../components/DropDown/CommonDropdown";

type ItemData = {
  id: number;
  image: any;
  type: string;
  detail: string;
};

const phoneIcon = <Phone width={15} height={15} />;
const VideoIcon = <Video width={15} height={15} />;

const DATA: ItemData[] = [
  {
    id: 1,
    image: phoneIcon,
    type: strings?.call,
    detail: strings?.callDetail,
  },
  {
    id: 2,
    image: VideoIcon,
    type: strings?.video,
    detail: strings?.videoDetail,
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  imageBackgroundColor: string;
  borderColor: string;
  detailColor: string;
};

interface Props {
  navigation?: any;
}

const Item = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  imageBackgroundColor,
  borderColor,
  detailColor,
}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.consultTypeView}>
    <View
      style={[
        styles.item,
        { backgroundColor, borderColor: borderColor, borderWidth: 1 },
      ]}
    >
      <View
        style={[styles.imageBack, { backgroundColor: imageBackgroundColor }]}
      >
        {item.image}
      </View>
      <View style={styles.textView}>
        <Text style={[styles.typeText, { color: textColor }]}>{item.type}</Text>
        <View style={styles.detailtextView}>
          <Text style={[styles.DetailText, { color: detailColor }]}>
            {item.detail}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const AppointForm: React.FC<Props> = ({ navigation }): ReactElement => {
  const [selectedId, setSelectedId] = useState<string>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor =
      item.id === selectedId ? colors?.prussianBlue : "transparent";
    const color =
      item.id === selectedId ? colors?.SurfCrest : colors?.prussianBlue;
    const imageBackgroundColor =
      item.id === selectedId ? colors?.OceanGreen : colors?.royalOrange;
    const borderColor =
      item.id === selectedId ? colors?.prussianBlue : colors?.OceanGreen;
    const detailColor =
      item.id === selectedId ? colors?.whitee : colors?.SilverChalice;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
        imageBackgroundColor={imageBackgroundColor}
        borderColor={borderColor}
        detailColor={detailColor}
      />
    );
  };

  const Header = () => (
    <View style={styles.header}>
      <CommonHeader headerName={strings?.AppointmantFormHeader} />
    </View>
  );

  const MainHeaderLine = () => (
    <View style={styles.MainHeaderLineView}>
      <Text style={styles.mainheaderLineText}>{strings.mainHeaderLine}</Text>
    </View>
  );

  const callOption = () => (
    <View style={{ width: moderateScale(350), alignSelf: "center" }}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
        extraData={selectedId}
        numColumns={2}
      />
    </View>
  );

  const PurposeAppointment = () => (
    <View style={styles.dropDownView}>
      <CommonDropDown
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={strings?.dropdownPlaceholder}
      />
    </View>
  );

  const ProblemDesc = () => (
    <View style={styles.inputView}>
      <CommonInput
        multiline={true}
        placeholder={strings.problemDescription}
        maxWords={"150"}
        mainContainer={{
          height: moderateScale(152),
          width: moderateScale(345),
          borderColor: colors?.polishedPine,
          marginTop: moderateScale(15),
          backgroundColor: colors?.ShadowGreen,
          // alignSelf:'center'
        }}
        placeholderTextColor={colors?.prussianBlue}
      />
    </View>
  );

  const Button = () => (
    <View style={styles.SubmitButton}>
      <CommonButton btnName={"Submit"} />
    </View>
  );

  return (
    <View style={styles.container}>
      {Header()}
      <View style={styles.innerView}>
        {MainHeaderLine()}
        {callOption()}
        {PurposeAppointment()}
        {ProblemDesc()}
      </View>

      {Button()}
    </View>
  );
};
export default AppointForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors?.SurfCrest,
  },
  header: {
    backgroundColor: colors?.prussianBlue,
    paddingVertical: moderateScale(40),
    paddingLeft: moderateScale(20),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
  },
  MainHeaderLineView: {
    paddingTop: moderateScale(10),
    //  paddingLeft: moderateScale(15),
    width: moderateScale(350),
    alignSelf: "center",
  },
  innerView: {
    flex: 1,
  },
  mainheaderLineText: {
    fontFamily: "poppins-regular",
    fontSize: textScale(14),
    fontWeight: "600",
  },
  item: {
    marginRight: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingLeft: moderateScale(10),
    borderRadius: moderateScale(10),
    height: moderateScale(109),
    width: "100%",
  },
  consultTypeView: {
    paddingTop: moderateScale(10),
    flex: 1,
    marginHorizontal: 5,
  },
  imageBack: {
    width: "18%",
    padding: 5,
  },
  textView: {
    paddingTop: moderateScale(10),
  },
  typeText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "600",
    fontSize: 14,
  },
  detailtextView: {
    paddingTop: moderateScale(10),
  },
  DetailText: {
    fontFamily: "Poppins-Regular",
    fontWeight: "500",
    fontSize: 12,
  },
  inputView: {
    paddingTop: moderateScale(15),
    alignSelf: "center",
  },
  dropDownView: {
    paddingTop: moderateScale(15),
    zIndex: 1000,
    alignSelf: "center",
  },
  SubmitButton: {
    alignSelf: "center",
    marginBottom: moderateScale(20),
  },
});
