import { View, ScrollView } from "react-native";
import React from "react";
import CommonFlexButton from "../../../../components/Buttons/CommonFlexButton";
import { styles } from "./styles";

interface Props {
  data?: any[];
  selectedTab?: number;
  setSelectedTab?: any;
}

const ToggleBar: React.FC<Props> = ({ data, selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.tabContainerWrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {data?.map((item: any, index: number) => (
          <CommonFlexButton
            key={item?.id ?? index}
            onPress={() => setSelectedTab(index)}
            btnName={item?.title}
            buttonContainer={[
              styles.buttonContainer,
              index === selectedTab
                ? styles.selectedButton
                : styles.unselectedButton,
            ]}
            buttonText={[
              styles.buttonText,
              index === selectedTab
                ? styles.selectedButtonText
                : styles.unselectedButtonText,
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ToggleBar;
