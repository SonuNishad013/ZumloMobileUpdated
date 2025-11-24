import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import { strings } from "../../../../../../constant/strings";
import Picker from "react-native-animated-wheel-picker";
import { styles } from "./styles";

interface Props {
  allData?: any;
}
const AgeSection: React.FC<Props> = ({ allData }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <Text style={styles.headingText}>{allData?.stepDescription}</Text>
      <View style={styles.pickerContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{strings?.years}</Text>
        </View>
        <Picker
          pickerData={allData?.stepFields[0].stepFieldOptions}
          itemHeight={moderateScale(65)}
          textStyle={styles.pickerText}
          onSelected={(item: any) => {
            setSelectedItem(item);
          }}
          visible={7}
        />
      </View>
    </>
  );
};

export default AgeSection;
