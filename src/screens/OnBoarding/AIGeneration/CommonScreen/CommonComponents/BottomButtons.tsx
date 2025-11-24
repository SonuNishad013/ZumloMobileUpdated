import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../constant/responsiveStyle";
import CommonButton from "../../../../../components/Buttons/commonButton";
import { strings } from "../../../../../constant/strings";
import { NoDataIcon } from "../../../../../assets";

interface Props {
  data?: any;
  on_StartNow?: () => void;
  on_RegenerateQuestions?: () => void;
  on_RegenerateBlank?: () => void;
  onSkipPress?: () => void;
  onDiscardClick?: () => void;
  onEditRegenerateClick?: () => void;
  isSkip?: boolean;
  aiSuggestion?: string;
  isEditingEnable?: boolean;
  buttonText1?: string;
  buttonText2?: string;
}
const BottomButtons: React.FC<Props> = ({
  data,
  on_StartNow,
  on_RegenerateQuestions,
  on_RegenerateBlank,
  onSkipPress,
  isSkip,
  aiSuggestion,
  isEditingEnable,
  onDiscardClick,
  onEditRegenerateClick,
  buttonText2,
  buttonText1,
}) => {
  const [arriveData, setArriveData] = useState(data);
  useEffect(() => {
    setArriveData(data);
  }, [data]);
  const label =
    buttonText2 ||
    (!isEditingEnable ? strings?.regenerateCap_ : strings?.discard);
  return (
    <View style={styles?.btnContainer}>
      {!arriveData || arriveData.length <= 0 ? (
        <>
          <NoDataIcon />
          <CommonButton
            btnName={strings?.regenerateCap_}
            mainContainer={styles?.btn3}
            onPress={() => on_RegenerateBlank && on_RegenerateBlank()}
          />
        </>
      ) : (
        <>
          <CommonButton
            btnName={
              !isEditingEnable
                ? buttonText1
                  ? buttonText1
                  : "Start now"
                : "Replace"
            }
            mainContainer={styles?.btn1}
            onPress={!isEditingEnable ? on_StartNow : onEditRegenerateClick}
          />

          <CommonButton
            btnName={label}
            mainContainer={styles?.btn2}
            onPress={!isEditingEnable ? on_RegenerateQuestions : onDiscardClick}
          />
          {isSkip && (
            <View
              style={{
                gap: moderateScale(10),
                marginTop: moderateScale(20),
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={onSkipPress}>
                <Text
                  style={[
                    {
                      color: colors?.royalOrangeDark,
                      fontSize: textScale(14),
                      fontWeight: "400",
                      padding: moderateScale(10),
                    },
                  ]}
                >
                  {"Maybe later"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default BottomButtons;

const styles = StyleSheet.create({
  btnContainer: {
    gap: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(50),
  },
  btn1: {
    backgroundColor: colors?.backgroundTheme,
    width: "auto",
  },
  btn2: {
    backgroundColor: "transparent",
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    width: "auto",
  },
  btn3: {
    backgroundColor: "transparent",
    borderWidth: moderateScale(1),
    borderColor: colors?.polishedPine,
    width: "auto",
  },
});
