import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import navigationString from "../../../../navigation/navigationString";
import { EditIconSalt } from "../../../../assets";
import colors from "../../../../constant/colors";
import MultiselectedUI from "../../Preferences/MultiselectedUI";
import { formatSentenceCase } from "../../../../helper/sentenceCase";
import { strings } from "../../../../constant/strings";
import { capitalizeFirstLetter } from "../../../../validations/capitalizeFirstLetter";
import { useFocusEffect } from "@react-navigation/native";
import logger from "../../../../constant/logger";
interface Props {
  item?: any;
  navigation?: any;
  index?: any;
  globalCodeIdCat?: any;
  headerName?: any;
  categoryDetails?: any;
  categoryIndex?: any;
}
export const cardHeaderNameAddOtherCTAButtonText = (stepName: string) => {
  //Name for each cards goes here and Add more CTA button
  switch (stepName) {
    //--------------Physical Health's Personal Section start--------------------//
    case "Medical Conditions":
      return { headerText: "Health history", AddMoreCTA: "Add history" };
    case "Allergies":
      return { headerText: "Allergy info", AddMoreCTA: "Add allergy" };
    case "Recent Medical Visits":
      return { headerText: "Doctor visits", AddMoreCTA: "Add Visit" };
    case "Past Hospitalizations":
      return { headerText: "", AddMoreCTA: "Add hospitalization" };
    case "Past Surgeries":
      return { headerText: "", AddMoreCTA: "Add surgery" };
    //--------------Physical Health's Personal Section end--------------------//
    //--------------Mental Health's Personal Mental Health Section start--------------------//

    case "Personal Mental Health History":
      return { headerText: "Your mental health background", AddMoreCTA: "" };
    case "Family Mental Health History":
      return { headerText: "Mental health in your family", AddMoreCTA: "" };
    //--------------Mental Health's Personal Mental Health Section end--------------------//
    case "Current Medications":
      return { headerText: "Your active medications", AddMoreCTA: "Add Meds" };
    case "Past Medications":
      return { headerText: "Past prescriptions", AddMoreCTA: "Add Past Meds" };
    case "Medication Allergies or Side Effects":
      return {
        headerText: "Allergies or side effects from medication",
        AddMoreCTA: "Add Reactions",
      };
    case "Current Counseling":
      return { headerText: "Your counseling details", AddMoreCTA: "" };
    case "Counseling History":
      return {
        headerText: "Counseling history",
        AddMoreCTA: "Add past therapy",
      };
    case "Personality Traits":
      return { headerText: "How you naturally show up", AddMoreCTA: "" };
    case "Behavioral Patterns":
      return { headerText: "Patterns in your daily behavior", AddMoreCTA: "" };
    case "Coping Mechanism":
      return { headerText: "How you tend to cope", AddMoreCTA: "" };
    case "Thought Processes":
      return { headerText: "How your mind processes things", AddMoreCTA: "" };
    case "Mood Patterns":
      return { headerText: "Mood ups and downs", AddMoreCTA: "" };
    case "Emotional Well-Being":
      return { headerText: "Your emotional strengths", AddMoreCTA: "" };
    case "Emotional Regulation":
      return {
        headerText: "How you tend to respond emotionally",
        AddMoreCTA: "",
      };
    case "Stressors and Triggers":
      return { headerText: "What tends to weigh on you", AddMoreCTA: "" };
    case "Stress Levels":
      return { headerText: "How stress shows up for you", AddMoreCTA: "" };
    case "Additional Associated Fields for Context":
      return { headerText: "Extra context that could help", AddMoreCTA: "" };

    case "":
      return { headerText: "", AddMoreCTA: "" };
    case "":
      return { headerText: "", AddMoreCTA: "" };
    case "":
      return { headerText: "", AddMoreCTA: "" };
    case "":
      return { headerText: "", AddMoreCTA: "" };
    case "":
      return { headerText: "", AddMoreCTA: "" };
    case "":
      return { headerText: "", AddMoreCTA: "" };
    case "":
      return { headerText: "", AddMoreCTA: "" };

    default:
      return { headerText: "", AddMoreCTA: "" };
  }
};
const EditBarMedicalHealth: React.FC<Props> = ({
  item,
  navigation,
  index,
  globalCodeIdCat,
  headerName,
  categoryDetails,
  categoryIndex,
}: any) => {
  const colorArray = [
    colors?.polishedPine,
    colors?.SaltBox,
    colors?.prussianBlue,
  ];
  const [globalCodeId, setGlobalCodeId] = useState(null);
  useEffect(() => {
    if (globalCodeIdCat == undefined) return;
    setGlobalCodeId(globalCodeIdCat);
  }, [globalCodeIdCat]);

  const setScreen = async (type: any, categoryId: any) => {
    navigation?.navigate(navigationString?.MedicalHistoryRenders, {
      uiType: type,
      categoryId,
      globalCodeId: globalCodeId,
      prevData: item?.subCategory,
      item: headerName,
      previousId: item?.groupOrderId,
    });
  };

  return (
    <View style={styles?.container}>
      <View style={styles?.mainContainer}>
        <Text style={styles?.titleStyle}>
          {cardHeaderNameAddOtherCTAButtonText(categoryDetails?.stepName) //Here IF inside the function for particular section if header is not set and its coming as empty string then we are showing the default text coming from the backend.
            ?.headerText ||
            capitalizeFirstLetter(categoryDetails?.stepName)}{" "}
          {categoryIndex > 0 && categoryIndex + 1}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setScreen(categoryDetails?.stepName, categoryDetails?.categoryId)
          }
        >
          <EditIconSalt
            height={`${moderateScale(20)}`}
            width={`${moderateScale(20)}`}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.containerBox,
          {
            backgroundColor: colorArray[index % colorArray?.length],
          },
        ]}
      >
        <MultiselectedUI data={item} where={strings?.MedicalHistory} />
      </View>
    </View>
  );
};

export default EditBarMedicalHealth;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(10),
  },
  titleStyle: {
    fontSize: textScale(14),
    color: colors?.prussianBlue,
    fontWeight: "600",
    marginRight: moderateScale(10),
  },
  containerBox: {
    width: "auto",
    backgroundColor: colors?.polishedPine,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  container: {
    marginTop: moderateScale(10),
  },
});
