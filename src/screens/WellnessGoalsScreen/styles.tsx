import { StyleSheet } from "react-native";
import colors from "../../constant/colors";
import { moderateScale } from "../../constant/responsiveStyle";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.prussianBlue,
      marginHorizontal: moderateScale(19),
      marginTop: moderateScale(15),
    },
    contentContainerStyle: {
      paddingBottom: moderateScale(30),
    },
  });

  
  export default styles;