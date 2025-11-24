import { View, Text } from "react-native";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import colors from "../../constant/colors";
import { moderateScale, textScale } from "../../constant/responsiveStyle";
import { styles } from "../../screens/Dashboard/Planner/style";
import { ClosingIconDark, OpeningIconDark } from "../../assets";
import { formatSentenceCase } from "../../helper/sentenceCase";
import { textLabelSize } from "../../utils/TextConfig";
import logger from "../../constant/logger";
import { useFocusEffect } from "@react-navigation/native";
import { strings } from "../../constant/strings";

interface GreetingMsgViewProps {
  QuatesData: {
    content: string;
  }[];
}

const Greetings: React.FC<GreetingMsgViewProps> = ({
  QuatesData,
}): ReactElement => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [qoutesData, setQoutesData] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      const filter: any = QuatesData.filter(
        (item: any) => item?.type == "Quote"
      );
      logger("filter______", { filter, qoutesData });
      setQoutesData(filter);
    }, [QuatesData])
  );

  return (
    <View
      style={{
        backgroundColor: colors.prussianBlue,
        borderRadius: moderateScale(15),
        paddingVertical: moderateScale(10),
      }}
    >
      <View style={styles?.animatedTextView}>
        <View
          style={{
            width: moderateScale(200),
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: textLabelSize?.titleFont,
              color: colors?.royalOrangeDark,
              fontWeight: "800",
              textAlign: "center",
              marginBottom: moderateScale(10),
            }}
          >
            {strings?.A_thought_for_today}
          </Text>

          <Text
            style={{
              color: colors.SurfCrest,
              fontSize: textLabelSize?.subtTitleFont,
              fontWeight: "600",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {qoutesData?.length
              ? qoutesData[0]?.content
              : "Exercise is a celebration of what your body can do, not a punishment for what you ate."}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Greetings;
