import CommonHeader from "../../../components/Header/commonHeader";
import { moderateScale } from "../../../constant/responsiveStyle";
import { strings } from "../../../constant/strings";
import VitalSummaryStyles from "../styles";
import CommonButton from "../../../components/Buttons/commonButton";
import { vitalSummaryStatStrings } from "../HistoryVitalConstants";
import { Text, View } from "react-native";
import { FitBitIcon2, FitbitWatchIcon } from "../../../assets";
import colors from "../../../constant/colors";

export const AddDeviceHeader = (navigation: any) => (
  <CommonHeader
    headerName={strings?.headerDeviceConnecting}
    mainContainer={{
      marginTop: moderateScale(15),
    }}
    onBackPress={() => navigation.goBack()}
  />
);

export const View_AddVitalsButton = (
  onViewVitalPress: any,
  onAddManualyPress: any
) => (
  <View style={VitalSummaryStyles.ButtonsView}>
    <CommonButton
      btnName={vitalSummaryStatStrings?.view_Vital}
      onPress={onViewVitalPress}
    />
    <View style={VitalSummaryStyles.backToDashboard}>
      <Text
        style={VitalSummaryStyles.backToDashboardText}
        onPress={onAddManualyPress}
      >
        {vitalSummaryStatStrings?.add_Manually}
      </Text>
    </View>
  </View>
);
export const DevicePairedView = (isQuery: any, isLoading: boolean) => (
  <View style={VitalSummaryStyles.pairDeviceOuterView}>
    <View style={VitalSummaryStyles.pairDeviceView}>
      <FitbitWatchIcon
        width={moderateScale(141.56)}
        height={moderateScale(198.18)}
      />
      <View
        style={{
          paddingBottom: moderateScale(10),
          alignSelf: "center",
          width: "100%",
          alignItems: "center",
          height: moderateScale(25),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            bottom: moderateScale(-1.5),
            position: "absolute",
          }}
        >
          <FitBitIcon2 height={moderateScale(20)} width={moderateScale(80)} />
        </View>
      </View>
    </View>
    <View style={VitalSummaryStyles.line} />
    <View style={VitalSummaryStyles.PairDeviceTextView}>
      <Text style={VitalSummaryStyles.DevicePairedText}>
        {isQuery.length > 0 ? strings.DevicePaired : strings?.SyncingFitbitData}
      </Text>
      <Text style={VitalSummaryStyles.nextToViewText}>
        {isQuery.length > 0 ? strings?.PairNext : strings?.NoDeviceConnect}
      </Text>
    </View>
  </View>
);
