import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import RoundButton from "../Buttons/roundButton";
import { imagePath } from "../../assets/png/imagePath";
import {
  moderateScale,
  textScale,
  width,
} from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { Calender } from "../../assets";
import { DiseaseBox } from "./DiseaseBox";
import { formatSentenceCase } from "../../helper/sentenceCase";

interface Props {
  mainTitle?: any;
  date?: any;
  timeSystem?: any;
  preferred?: any;
  description?: string;
  container?: ViewStyle;
  duration?: any;
  item?: any;
}
const DetailsBox: React.FC<Props> = ({
  mainTitle,
  date,
  timeSystem,
  preferred,
  description,
  container,
  duration,
  item,
}) => {
  return (
    <View style={[styles.container, container, { gap: moderateScale(10) }]}>
      <View style={styles.header}>
        <RoundButton
          mainContainer={styles.roundButtonContainer}
          PngIcon={true}
          iconShow={imagePath?.SleepIcon}
          iconStyle={styles.roundButtonIcon}
          isImageUrl={true}
          url={item?.logo}
        />
        <Text style={styles.headerText}>{formatSentenceCase(mainTitle)}</Text>
      </View>
      <Text style={styles.descriptionText}>
        {formatSentenceCase(description)}
      </Text>
      <View style={styles.diseaseContainer}>
        <View style={styles.diseaseRow}>
          <View
            style={{
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            {duration !== null && (
              <DiseaseBox
                mainContainer={styles.diseaseBox1}
                iconShowSvg={true}
                SvgIcon={Calender}
                mainText={styles.diseaseBoxText}
                data={`${
                  duration?.months < 1 ? "" : duration?.months + " months"
                } ${
                  duration?.days < 1
                    ? ""
                    : duration?.day || duration?.days + " days"
                }`}
              />
            )}
          </View>

          <View
            style={{
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <DiseaseBox
              mainContainer={styles.diseaseBox3}
              mainText={styles.diseaseBoxText}
              data={formatSentenceCase(preferred)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors?.SaltBox,
    padding: moderateScale(17),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1.5),
    borderColor: colors?.SurfCrest,
    width: width / 1.21,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundButtonContainer: {
    borderColor: colors?.SurfCrest,
    backgroundColor: colors?.royalOrange,
    borderWidth: moderateScale(2),
    height: moderateScale(26),
    width: moderateScale(26),
  },
  roundButtonIcon: {
    tintColor: colors?.prussianBlue,
    height: moderateScale(11),
    width: moderateScale(11),
  },
  headerText: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(20),
  },
  diseaseContainer: {
    alignItems: "flex-start",
  },
  diseaseRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  diseaseBox1: {
    backgroundColor: colors?.SurfCrest,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(6),
    height: moderateScale(19),
  },
  diseaseBox2: {
    backgroundColor: colors?.royalOrange,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(6),
    height: moderateScale(19),
  },
  diseaseBox3: {
    backgroundColor: colors?.polishedPine,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(6),
    height: moderateScale(19),
  },
  diseaseBoxText: {
    fontSize: textScale(10),
    color: colors?.prussianBlue,
    paddingLeft: moderateScale(2),
  },
  descriptionTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors?.SurfCrest,
  },
  descriptionText: {
    fontSize: textScale(10),
    fontWeight: "400",
    color: colors?.SurfCrest,
  },
});
