import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import RoundButton from "../Buttons/roundButton";
import { imagePath } from "../../assets/png/imagePath";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import colors from "../../constant/colors";
import { formatSentenceCase } from "../../helper/sentenceCase";
import logger from "../../constant/logger";

interface Props {
  activityContainer?: ViewStyle;
  title?: any;
  durationMusic?: any;
  onPress?: () => void;
  isLatest?: boolean;
  item?: any;
  from?: any;
  activitiesTitle?: TextStyle;
  activitiesSubtitle?: TextStyle;
}
const MusicPlayButton: React.FC<Props> = ({
  activityContainer,
  title,
  durationMusic,
  onPress,
  isLatest,
  item,
  from,
  activitiesTitle,
  activitiesSubtitle,
}) => {
  logger("durationMusic_____", durationMusic);
  const renderData = () => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.activityContainer, activityContainer]}
        disabled={item?.link ? false : true}
      >
        <RoundButton
          onPress={onPress}
          mainContainer={styles.roundButtonContainer}
          PngIcon={true}
          iconShow={imagePath?.pause}
          iconStyle={styles.roundButtonIcon}
        />
        <View
          style={{
            marginLeft: moderateScale(20),
            gap: moderateScale(3),
          }}
        >
          <Text style={[styles.activitiesTitle, activitiesTitle]}>
            {formatSentenceCase(title)}
          </Text>
          <Text style={[styles.activitiesSubtitle, activitiesSubtitle]}>
            {/* {Number(Number(durationMusic) / 60).toFixed(1) + "hr"} */}
            {durationMusic}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {/* {
        isLatest && item?.isPressed == false ?
          <>
            {renderData()}
          </>
          :
          <>
            {
              !isLatest && item?.isPressed == true ?
                <> */}
      {renderData()}

      {/* </>
                :
                <>
                  {
                    from !== "Dashboard" &&
                    <>
                      {renderData()}
                    </>
                  }
                </>
            }
          </>
      } */}
      <>
        {/* {
          isLatest && item?.isPressed == true &&
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), width: width, height: moderateScale(100) }}>
            <NoDataIcon />
            <Text style={{ fontSize: textScale(14), fontWeight: '500', color: colors.darkPrussianBlue }}>
              {"No data."}
            </Text>
          </View>
        }
        {
           !isLatest && item?.isPressed == false &&
           <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), width: width, height: moderateScale(100) }}>
           <NoDataIcon />
           <Text style={{ fontSize: textScale(14), fontWeight: '500', color: colors.darkPrussianBlue }}>
             {"No data."}
           </Text>
         </View>
        } */}
      </>
    </>
  );
};

export default MusicPlayButton;

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: moderateScale(20),
    width: "80%",
  },
  activitiesTitle: {
    fontSize: textScale(14),
    fontWeight: "600",
    color: colors.prussianBlue,
  },
  activitiesSubtitle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors.prussianBlue,
  },
  roundButtonContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    backgroundColor: colors?.SaltBox,
    borderWidth: moderateScale(2),
    borderColor: colors?.SaltBox,
  },
  roundButtonIcon: {
    height: moderateScale(11),
    width: moderateScale(11),
    tintColor: colors?.white,
  },
});
