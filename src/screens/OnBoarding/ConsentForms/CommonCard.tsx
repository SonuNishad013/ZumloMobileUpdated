import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { moderateScale, textScale } from "../../../constant/responsiveStyle";
import colors from "../../../constant/colors";
import { RightIcon } from "../../../assets";
import CommonButton from "../../../components/Buttons/commonButton";

interface Props {
  title?: string;
  content?: string;
  onItemChecked?: () => void;
  addIcon?: any;
  index?: any;
}

const CommonCard: React.FC<Props> = ({
  title,
  content,
  onItemChecked,
  addIcon,
  index,
}) => {
  const [showFullData, setShowFullData] = useState(false);

  const getShowFullData = () => {
    setShowFullData(!showFullData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onItemChecked}>
          <View style={styles.iconContainer}>
            {addIcon ? <RightIcon /> : null}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text
          style={styles.content}
          numberOfLines={showFullData ? undefined : 4}
        >
          {content}
        </Text>
        <TouchableOpacity onPress={getShowFullData}>
          <Text style={styles.readMore}>
            {showFullData ? "Read less" : "Read More"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <CommonButton
          btnName={"General"}
          mainContainer={styles.generalButton1}
          btnNameStyle={styles.generalButtonText}
        />
        <CommonButton
          btnName={addIcon ? "Confirmed" : "Not Confirmed"}
          mainContainer={styles.generalButton2}
          btnNameStyle={styles.generalButtonText2}
        />
      </View>
    </View>
  );
};

export default CommonCard;

const styles = StyleSheet.create({
  container: {
    width: moderateScale(334),
    backgroundColor: colors?.SaltBox,
    borderRadius: moderateScale(15),
    padding: moderateScale(13),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors?.lightblue,
    fontSize: textScale(14),
    fontWeight: "600",
  },
  iconContainer: {
    height: moderateScale(13),
    width: moderateScale(13),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: colors?.lightblue,
    alignItems: "center",
    padding: 1.5,
  },
  contentContainer: {
    marginTop: moderateScale(8),
  },
  content: {
    color: colors?.lightblue,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  readMore: {
    fontSize: textScale(13),
    color: colors?.lightblue,
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: moderateScale(15),
  },
  generalButton1: {
    height: moderateScale(27),
    width: moderateScale(74),
    backgroundColor: colors?.SurfCrest,
  },
  generalButton2: {
    height: moderateScale(27),
    width: moderateScale(127),
    backgroundColor: colors?.royalOrange,
    marginLeft: moderateScale(15),
  },
  generalButtonText: {
    color: colors?.prussianBlue,
    fontSize: textScale(10),
    fontWeight: "400",
  },
  generalButtonText2: {
    color: colors?.lightblue,
    fontSize: textScale(10),
    fontWeight: "400",
  },
});
