import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { imagePath } from "../../../../../../assets/png/imagePath";
import CommonInput from "../../../../../../components/Inputs/commonInput";
import colors from "../../../../../../constant/colors";
import {
  moderateScale,
  textScale,
} from "../../../../../../constant/responsiveStyle";
import { strings } from "../../../../../../constant/strings";
import { styles } from "./styles";

interface Props {
  onChangeText?: any;
  value?: any;
  isError?: any;
  errorMsg?: any;
  allData?:any
}

const NameSection: React.FC<Props> = ({
  onChangeText,
  value,
  isError,
  errorMsg,
  allData
}) => {
  const renderQuestion = () => {
    return (
      <View style={styles.questionContainer}>
        <View style={{flexDirection:"row"}}>
        <Text style={styles.questionText}>
          {"1."}
        </Text>
        <View>
        <Text style={styles.questionText}>{getTitle(allData?.stepDescription)}</Text>
        {/* <Text style={styles.questionText}>{"how can I call you?"}</Text> */}
        <Text style={styles.nameText}>{strings.GoodName}</Text>
        </View>
        </View>
        <CommonInput
          placeholder="Enter Your Name"
          placeholderTextColor={colors.SurfCrest}
          mainContainer={styles.inputContainer}
          value={value}
          isError={isError}
          errorMsg={errorMsg}
          onChangeText={onChangeText}
          backGroundColor={colors.SaltBox}
          borderColor={colors.royalOrange}
          inputText={styles.inputText}
          isWidth={false}
        />
      </View>
    );
  };

  return (
    <View style={styles?.container}>
      {/* <KeyboardAvoidingView 
             behavior="padding"
             > */}
      <Image source={imagePath.ExplorerCircle} style={styles.imageView} />
      {renderQuestion()}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};
export default NameSection;


const getTitle=(value:any)=>{
  if(!value) return ""
let string =   value?.split(',')
return `${string[0]}, \n${string[1]? string[1]?.trim():''}`
}