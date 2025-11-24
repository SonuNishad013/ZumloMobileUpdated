import { ImageBackground, Text, View } from "react-native";
import ScreenWrapper from "../../../../components/SafeArea/SafeAreaWrapper";
import colors from "../../../../constant/colors";
import { moderateScale, width } from "../../../../constant/responsiveStyle";
import { imagePath } from "../../../../assets/png/imagePath";
import { Plancreated } from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";

const PlanCreated = ({ navigation }: any) => {
  return (
    <ScreenWrapper statusBarColor={colors.darkthemColor}>
      <ImageBackground
        source={imagePath.PlanCreatedBackground}
        style={{
          flex: 1,
          width: width,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginHorizontal: moderateScale(15),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Plancreated />
          <View
            style={{
              marginTop: moderateScale(20),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                width: moderateScale(150),
                textAlign: "center",
                color: colors.SurfCrest,
              }}
            >
              {"Thanks for your cooperation!"}
            </Text>
            <Text
              style={{
                width: moderateScale(250),
                marginTop: moderateScale(10),
                textAlign: "center",
                color: colors.royalOrange,
              }}
            >
              {
                "Here's your personalized plan for mental well-being. Discover tailored strategies to support your mental health journey."
              }
            </Text>
          </View>
          <CommonButton
            btnName={"View Wellness Plan"}
            mainContainer={{
              marginTop: moderateScale(40),
            }}
          />
        </View>
      </ImageBackground>
    </ScreenWrapper>
  );
};
export default PlanCreated;
