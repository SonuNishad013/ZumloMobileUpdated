import { View, StyleSheet, FlatList, Text, TextInput } from "react-native";
import React, { ReactElement, useState } from "react";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import CommonHeader from "../../../../components/Header/commonHeader";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import colors from "../../../../constant/colors";
import CommonButton from "../../../../components/Buttons/commonButton";
import ItemSelectedLine from "../../../../components/OnBoardiingComponents/ItemSelectedLine";
import AddButton from "../ReGenerateWellnessPlan/AddButton";
import navigationString from "../../../../navigation/navigationString";

interface Props {
  navigation?: any;
}
const PhysicalHealthWellness: React.FC<Props> = ({
  navigation,
}): ReactElement => {
  const [isAddOther, setIsAddOther] = useState(false);
  const isOtherShow = () => {
    console.log("first");
    setIsAddOther(true);
  };

  return (
    <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
      <View style={styles.container}>
        <CommonHeader
          headerName={"Physical Health"}
          onBackPress={() => navigation?.goBack()}
          mainContainer={styles.headerMainContainer}
          iconContainer={styles.headerIconContainer}
        />
        <FlatList
          data={["1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2"]}
          keyExtractor={(item, index) => "key" + index}
          ListHeaderComponent={() => {
            return (
              <>
                <Text style={styles.title}>Medical conditions</Text>
                <View style={styles.headerRow}>
                  <View>
                    <Text style={styles.subTitle}>Chronic Conditions</Text>
                  </View>
                  <View style={styles.headerLine} />
                </View>
              </>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeparator} />;
          }}
          renderItem={({ item, index }: any) => {
            const isSelected = index == 2 || index == 5;
            return (
              <ItemSelectedLine
                title={"Boost confidence"}
                isSelected={isSelected}
                testID={`physical_health_item_${index}`}
                imageStyle={{
                  tintColor: isSelected
                    ? colors?.royalOrange
                    : colors?.SurfCrest,
                }}
                titleStyle={{
                  color: isSelected ? colors?.royalOrange : colors?.SurfCrest,
                }}
              />
            );
          }}
          ListFooterComponent={() => (
            <>
              {isAddOther ? (
                <TextInput
                  style={styles.newSpecInput}
                  placeholder="Other"
                  placeholderTextColor={colors.SurfCrest}
                />
              ) : (
                <AddButton
                  containerStyle={styles.addButtonContainer}
                  txt={"Other"}
                  onPress={isOtherShow}
                />
              )}
            </>
          )}
        />
        <CommonButton
          btnName={"NEXT"}
          testID="physical_health_next_btn"
          mainContainer={styles.commonButtonContainer}
          onPress={() =>
            navigation?.navigate(navigationString?.StressorsAndTriggers)
          }
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerMainContainer: {
    marginTop: moderateScale(15),
    paddingBottom: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
  headerIconContainer: {
    backgroundColor: colors?.saltDark,
  },
  title: {
    fontSize: textScale(25),
    fontWeight: "500",
    color: colors?.SurfCrest,
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(19),
  },
  subTitle: {
    fontSize: textScale(14),
    fontWeight: "400",
    color: colors?.SurfCrest,
    marginLeft: moderateScale(19),
    marginRight: moderateScale(5),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(25),
  },
  headerLine: {
    height: moderateScale(0.5),
    backgroundColor: colors?.SurfCrest,
    flex: 1,
  },
  itemSeparator: {
    flex: 1,
    height: moderateScale(0.9),
    backgroundColor: colors?.surfCrustOp,
  },
  newSpecInput: {
    height: moderateScale(60),
    width: "auto",
    fontSize: textScale(14),
    fontWeight: "600",
    borderWidth: moderateScale(1),
    marginHorizontal: moderateScale(19),
    color: colors.SurfCrest,
    borderColor: colors.SurfCrest,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  addButtonContainer: {
    marginVertical: moderateScale(20),
    marginHorizontal: moderateScale(19),
    width: "auto",
  },
  commonButtonContainer: {
    width: "auto",
    marginBottom: moderateScale(30),
    marginHorizontal: moderateScale(19),
  },
});

export default PhysicalHealthWellness;

// import { View, StyleSheet, FlatList, Text, TextInput } from "react-native";
// import React, { ReactElement, useState } from "react";
// import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
// import CommonHeader from "../../../../components/Header/commonHeader";
// import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
// import colors from "../../../../constant/colors";
// import CommonButton from "../../../../components/Buttons/commonButton";
// import ItemSelectedLine from "../../../../components/OnBoardiingComponents/ItemSelectedLine";
// import AddButton from "../ReGenerateWellnessPlan/AddButton";

// interface Props {
//   navigation?: any;
// }
// const PhysicalHealthWellness: React.FC<Props> = ({
//   navigation,
// }): ReactElement => {
//   const [isAddOther, setIsAddOther] = useState(false);
//   const isOtherShow = () => {
//     console.log("first");
//     setIsAddOther(true);
//   };

//   return (
//     <ScreenWrapper statusBarColor={colors?.backgroundTheme}>
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <CommonHeader
//           headerName={"Physical Health"}
//           onBackPress={() => navigation?.goBack()}
//           mainContainer={{
//             marginTop: moderateScale(15),
//             paddingBottom: moderateScale(15),
//             marginHorizontal: moderateScale(19),
//           }}
//           iconContainer={{ backgroundColor: colors?.saltDark }}
//         />
//         <FlatList
//           data={["1", "2", "1", "2", "1", "2", "1", "2", "1", "2", "1", "2"]}
//           ListHeaderComponent={() => {
//             return (
//               <>
//                 <Text style={styles.title}>Medical Conditions</Text>
//                 <View
//                   style={{
//                     flex: 1,
//                     flexDirection: "row",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     marginTop: moderateScale(25),
//                   }}
//                 >
//                   <View>
//                     <Text style={styles.subTitle}>Chronic Conditions</Text>
//                   </View>
//                   <View
//                     style={{
//                       height: moderateScale(0.5),
//                       backgroundColor: colors?.SurfCrest,
//                       flex: 1,
//                     }}
//                   />
//                 </View>
//               </>
//             );
//           }}
//           ItemSeparatorComponent={() => {
//             return (
//               <View
//                 style={{
//                   flex: 1,
//                   height: moderateScale(0.9),
//                   backgroundColor: colors?.surfCrustOp,
//                 }}
//               />
//             );
//           }}
//           renderItem={({ item, index }: any) => {
//             return (
//               <ItemSelectedLine
//                 title={"Boost confidence"}
//                 isSelected={index == 2 || index == 5 ? true : false}
//                 imageStyle={{
//                   tintColor:
//                     index == 2 || index == 5
//                       ? colors?.royalOrange
//                       : colors?.SurfCrest,
//                 }}
//                 titleStyle={{
//                   color:
//                     index == 2 || index == 5
//                       ? colors?.royalOrange
//                       : colors?.SurfCrest,
//                 }}
//               />
//             );
//           }}
//           ListFooterComponent={() => (
//             <>
//               {isAddOther ? (
//                 <TextInput
//                   style={styles.newSpecInput}
//                   placeholder="Other"
//                   placeholderTextColor={colors.SurfCrest}
//                 />
//               ) : (
//                 <AddButton
//                   containerStyle={{
//                     marginVertical: moderateScale(20),
//                     marginHorizontal: moderateScale(19),
//                     width: "auto",
//                   }}
//                   txt={"Other"}
//                   onPress={isOtherShow}
//                 />
//               )}
//             </>
//           )}
//         />

//         <CommonButton
//           //   onPress={() => nextFunction()}
//           btnName={"NEXT"}
//           mainContainer={{
//             width: "auto",
//             marginBottom: moderateScale(30),
//             marginHorizontal: moderateScale(19),
//           }}
//         />
//       </View>
//     </ScreenWrapper>
//   );
// };
// const styles = StyleSheet.create({
//   buttonView: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: moderateScale(19),
//     marginBottom: moderateScale(20),
//     paddingTop: moderateScale(10),
//   },
//   subContainer: {
//     flex: 1,
//   },
//   title: {
//     fontSize: textScale(25),
//     fontWeight: "500",
//     color: colors?.SurfCrest,
//     marginTop: moderateScale(15),
//     marginHorizontal: moderateScale(19),
//   },
//   subTitle: {
//     fontSize: textScale(14),
//     fontWeight: "400",
//     color: colors?.SurfCrest,
//     marginLeft: moderateScale(19),
//     marginRight: moderateScale(5),
//   },
//   newSpecInput: {
//     height: moderateScale(60),
//     width: "auto",
//     fontSize: textScale(14),
//     fontWeight: "600",
//     borderWidth: moderateScale(1),
//     marginHorizontal: moderateScale(19),
//     color: colors.SurfCrest,
//     borderColor: colors.SurfCrest,
//     borderRadius: moderateScale(10),
//     paddingHorizontal: moderateScale(10),
//     marginTop: moderateScale(20),
//     marginBottom: moderateScale(10),
//   },
// });
// export default PhysicalHealthWellness;
