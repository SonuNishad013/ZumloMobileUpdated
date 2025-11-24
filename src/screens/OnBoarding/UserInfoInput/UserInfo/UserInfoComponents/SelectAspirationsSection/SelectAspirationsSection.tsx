import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { ReactElement, useState, memo } from "react";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import colors from "../../../../../../constant/colors";
import { strings } from "../../../../../../constant/strings";
import { styles } from "./styles";

const SelectAspirationSection: React.FC<any> = ({
  intersetsList,
  allData,
}: any) => {
  // const data1 = [
  //   {
  //     id: 1,
  //     type: "input",
  //     name: "+ Add your own",
  //   },
  //   {
  //     id: 2,
  //     type: "string",
  //     name: "Music",
  //   },
  //   {
  //     id: 3,
  //     type: "string",
  //     name: "Meditation",
  //   },
  //   {
  //     id: 4,
  //     type: "string",
  //     name: "BackPacking",
  //   },
  //   {
  //     id: 5,
  //     type: "string",
  //     name: "Tennis",
  //   },
  //   {
  //     id: 6,
  //     type: "string",
  //     name: "Outdoor",
  //   },
  //   {
  //     id: 7,
  //     type: "string",
  //     name: "Shopping",
  //   },
  //   {
  //     id: 8,
  //     type: "string",
  //     name: "Learning",
  //   },
  // ];

  // {
  //   "interestID": 3,
  //   "organizationID": 1,
  //   "interest": "Football",
  //   "description": "Football is passion.",
  //   "isActive": true,
  //   "createdDate": "2024-05-09T09:25:12.1746808",
  //   "isDeleted": false
  // },

  const [data, setData] = useState(intersetsList);
  const [inputValue, setInputValue] = useState<any>("");
  const [selectedIds, setSelectedIds] = useState<any>(new Set());

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setData((prevData: any) => [
        ...prevData,
        { id: Date.now(), interest: inputValue },
      ]);
      setInputValue("");
    }
    // Alert.alert('Add');
  };

  const toggleSelection = (id: any) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  const renderItem = ({ item, index }: any) => {
    const isSelected = selectedIds.has(item.interest);
    return (
      <View style={styles?.fLitContainer}>
        {index == 0 && (
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={"+ Add your own"}
            placeholderTextColor={colors?.white}
            style={styles.addGoal}
            returnKeyType="done"
            onSubmitEditing={handleAddItem}
            maxLength={20}
          />
        )}
        <TouchableOpacity
          style={[
            styles.RenderItem,
            {
              backgroundColor: isSelected
                ? colors?.OceanGreen
                : colors.SurfCrest,
            },
          ]}
          onPress={() => toggleSelection(item.interest)}
        >
          <Text
            style={{
              color: colors.lightBlack,
              fontSize: textScale(14),
              fontWeight: "400",
            }}
          >
            {item.interest}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      ListHeaderComponent={() => (
        <Text style={styles.Text}>{allData?.stepDescription}</Text>
      )}
      keyExtractor={(item, index) => "key" + index}
      renderItem={renderItem}
      numColumns={3}
      style={styles.flatListDesign}
      extraData={selectedIds}
    />
  );
};
export default SelectAspirationSection;
