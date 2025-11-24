import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React from "react";
import AnswerTitle from "./AnswerTitle";
import { styles } from "./styles";
import ProficiencyLevelList from "./ProficiencyLevelList";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonButton from "../../../../components/Buttons/commonButton";
import colors from "../../../../constant/colors";
import { imagePath } from "../../../../assets/png/imagePath";

const QueWithInput = ({ title, onPress }: any) => {
    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <Text style={styles.titleHeader}>{title}</Text>
            <TextInput
                multiline
                style={{
                    height: moderateScale(150),
                    width: "100%",
                    fontSize: textScale(14),
                    fontWeight: "400",
                    borderWidth: 1,
                    padding: moderateScale(20),
                    color: colors?.SurfCrest,
                    borderColor: colors?.SurfCrest,
                    borderRadius: moderateScale(10),
                    paddingTop: 20,
                    textAlignVertical: "top",
                }}
                placeholder="Describe here"
                placeholderTextColor={colors?.SurfCrest}

            />
            <View
                style={{
                    flexDirection: "row",
                    gap: 10,
                    marginTop: moderateScale(15),
                    // alignItems: "flex-start",
                    alignItems:'center'
                }}
            >
                <Image
                    source={imagePath?.infoCircle}
                    style={{ width: moderateScale(15), height: moderateScale(15) }}
                />
                <Text
                    style={{
                        fontSize: textScale(10),
                        fontWeight: "400",
                        color: colors?.royalOrangeDark,width:moderateScale(314)
                    }}
                >
                    Specify any additional customization that would make the plan more
                    suitable for you.
                </Text>
            </View>
            <View style={{ marginBottom: moderateScale(10) }}>
                <CommonButton
                    btnName={"NEXT"}
                    mainContainer={styles.buttonContainer}
                    onPress={() => {
                        onPress();
                    }}
                />
            </View>
        </View>
    );
};

export default QueWithInput;
