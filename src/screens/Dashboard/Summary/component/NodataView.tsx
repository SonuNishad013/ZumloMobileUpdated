import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  moderateScale,
  textScale,
  width,
} from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import { textLabelSize } from "../../../../utils/TextConfig";

export const getPlan = (
  data: any,
  onProceed?: () => void,
  onAddDevice?: () => void,
  onManually?: () => void
) => {
  let Icon = data?.icon;
  const AddOptions = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardLeft} onPress={onAddDevice}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.label}>Connect device</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardRight} onPress={onManually}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.label}>Add manually</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.titleText}>{data?.title}</Text>
        <Text style={styles.subtitleText}>{data?.subTitle}</Text>
      </View>
      <View style={styles.iconStyle}>
        <Icon />
      </View>
      <Text style={styles.descriptionStyle}>{data?.description}</Text>
      <View>
        {!data?.isVitals ? (
          <>
            {/* {data.btnName === "Add Journal" && ( //Add journal */}
            <CommonButton
              btnName={data.btnName}
              mainContainer={{
                marginTop: moderateScale(15),
                backgroundColor: data?.backgroundColor,
              }}
              btnNameStyle={{
                color: data?.textColor,
              }}
              onPress={onProceed}
              TextFormatDisable
            />
            {/* )} */}
          </>
        ) : (
          <View style={{ marginTop: moderateScale(-20) }}>{AddOptions()}</View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(50),
    paddingBottom: moderateScale(100),
  },
  header: {
    minHeight: moderateScale(120),
  },
  titleText: {
    fontSize: textLabelSize?.mainTitle,
    color: colors.royalOrange,
    fontWeight: "500",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: textLabelSize?.subHeaderTextSize,
    color: colors.SurfCrest,
    fontWeight: "500",
    marginTop: moderateScale(25),
    textAlign: "center",
  },
  iconStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    height: moderateScale(250),
  },
  descriptionStyle: {
    fontSize: textScale(12),
    color: colors.SurfCrest,
    fontWeight: "500",
    textAlign: "center",
    marginTop: moderateScale(50),
    lineHeight: moderateScale(17),
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    width: "100%",
  },
  cardLeft: {
    width: moderateScale(150),
    height: moderateScale(90),
    borderWidth: 1.5,
    borderColor: "#D8EFE5",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginRight: moderateScale(10),
  },
  cardRight: {
    width: moderateScale(150),
    height: moderateScale(90),
    borderWidth: 1.5,
    borderColor: "#D8EFE5",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginLeft: moderateScale(10),
  },
  plus: {
    fontSize: 28,
    color: "#D8EFE5",
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "#D8EFE5",
  },
});
