import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Modal,
} from "react-native";
import React, { ReactElement, useState } from "react";
import { imagePath } from "../../../../assets/png/imagePath";
import colors from "../../../../constant/colors";
import { moderateScale, textScale } from "../../../../constant/responsiveStyle";
import CommonHeader from "../../../../components/Header/commonHeader";
import { strings } from "../../../../constant/strings";
import {
  AlertCircle,
  CloseCircle,
  PlusIconWhite,
  ReadingButton,
  Stats,
  Trash,
} from "../../../../assets";
import CommonButton from "../../../../components/Buttons/commonButton";
import { APPLY_STATUS } from "../../../../constant/ENUM";

interface Props {
  navigation?: any;
}

const BackgroundWave = imagePath?.ReadingVitalWave;

const VitalReading: React.FC<Props> = ({ navigation }): ReactElement => {
  const [modalVisible, setModalVisible] = useState(false);

  const Header = () => (
    <View>
      <CommonHeader headerName={strings?.HeaderAddVital} />
    </View>
  );

  const DeviceStatus = () => (
    <View style={styles.OuterView}>
      <View style={styles.DeviceStatusView}>
        <View>
          <Text style={styles.Bptext}>{strings.Bp}</Text>
          <Text style={styles.DeviceStatustext}>{strings?.DeviceStatus}</Text>
        </View>
        <TouchableOpacity style={styles.addmanualButtonOuterView}>
          <Text>{strings?.Addmanual}</Text>
          <View style={{ paddingLeft: moderateScale(10) }}>
            <PlusIconWhite
              height={moderateScale(12)}
              width={moderateScale(12)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ImageStart = () => (
    <View style={styles.imageinnerView}>
      <View>
        <Text style={styles.countText}>
          {72}
          <Text style={styles.unitText}>{strings?.bpm}</Text>
        </Text>
        <Text style={styles.VitalText}>{strings?.heart_rate}</Text>
      </View>
      <View style={styles.alignment}>
        <Text style={styles.countText}>{80}</Text>
        <Text style={styles.VitalText}>{strings?.DIA_mm_hg}</Text>
      </View>
    </View>
  );

  const ImageEnd = () => (
    <View style={styles.imageinnerView}>
      <TouchableOpacity
        style={[styles.alignment, styles.Positioning]}
        onPress={() => setModalVisible(true)}
      >
        <Trash height={moderateScale(20)} width={moderateScale(14)} />
        <Text style={styles.text}>{strings?.Delete}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.readingButton}>
        <ReadingButton
          height={moderateScale(128.22)}
          width={moderateScale(128.22)}
        />
        <Text style={styles.text}>{strings?.startReading}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.alignment, styles.Positioning]}>
        <Stats height={moderateScale(20)} width={moderateScale(14)} />
        <Text style={styles.text}>{strings?.stats}</Text>
      </TouchableOpacity>
    </View>
  );

  const DeleteModal = () => (
    <View style={styles.modalContainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalInterContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconStyle}
              onPress={() => setModalVisible(false)}
            >
              <CloseCircle
                height={moderateScale(28)}
                width={moderateScale(28)}
              />
            </TouchableOpacity>
            <View style={styles.internalData}>
              <AlertCircle
                height={moderateScale(86.67)}
                width={moderateScale(86.67)}
              />
              <Text style={styles.suretext}>{strings?.sure}</Text>
              <Text style={styles.wantToDeleteText}>
                {strings?.wanttoDelete}
              </Text>
              <View style={styles.deleteButtonView}>
                <CommonButton
                  btnName={strings?.DeleteButton}
                  mainContainer={styles.DeleteButtonMain}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.background}>
        <View style={styles.innerView}>
          {DeleteModal()}
          {Header()}
          {DeviceStatus()}
        </View>
      </SafeAreaView>
      <ImageBackground
        source={BackgroundWave}
        style={styles.imageBackground}
        resizeMode={APPLY_STATUS?.cover}
      >
        <View style={styles.startView}>{ImageStart()}</View>
        <View style={styles.endView}>{ImageEnd()}</View>
      </ImageBackground>
    </View>
  );
};
export default VitalReading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: colors?.themeColor,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover", // To cover the entire container
    // justifyContent: "flex-start", // Center content vertically
    backgroundColor: colors?.themeColor, // Make background transparent to see the background color underneath
  },
  innerView: {
    width: moderateScale(350),
    alignSelf: "center",
  },
  OuterView: {
    paddingTop: moderateScale(20),
  },
  DeviceStatusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addmanualButtonOuterView: {
    flexDirection: "row",
    backgroundColor: colors?.SilverChalice,
    padding: moderateScale(10),
    alignItems: "center",
    borderRadius: moderateScale(20),
  },
  Bptext: {
    color: colors?.royalOrange,
    fontWeight: "600",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  DeviceStatustext: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  startView: {
    position: "absolute",
    top: 0,
    left: moderateScale(20),
    right: moderateScale(20),
    bottom: "50%", // Adjust the height of the start view
    justifyContent: "center", // Center content vertically
  },
  endView: {
    position: "absolute",
    top: "50%", // Adjust the position of the end view
    left: moderateScale(20),
    right: moderateScale(20),
    bottom: 0,
    justifyContent: "center", // Center content vertically
  },
  imageinnerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  countText: {
    color: colors?.SurfCrest,
    fontWeight: "600",
    fontSize: textScale(42),
    fontFamily: "Poppins-Regular",
  },
  unitText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(10),
    fontFamily: "Poppins-Regular",
  },
  VitalText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
    fontFamily: "Poppins-Regular",
  },
  alignment: {
    alignItems: "center",
  },
  text: {
    fontWeight: "400",
    color: colors?.lightGrey,
  },
  Positioning: {
    top: "20%",
  },
  readingButton: {
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
  },
  modalInterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: colors?.prussianBlue,
    height: moderateScale(328.34),
    width: moderateScale(343.41),
    borderRadius: 10,
    elevation: 5, // Shadow for Android
  },
  closeIconStyle: {
    alignItems: "flex-end",
    paddingTop: moderateScale(10),
    paddingRight: moderateScale(10),
  },
  internalData: {
    paddingTop: moderateScale(10),
    alignItems: "center",
  },
  suretext: {
    color: colors?.SurfCrest,
    fontWeight: "700",
    fontSize: textScale(24),
    marginTop: moderateScale(20),
  },
  wantToDeleteText: {
    color: colors?.SurfCrest,
    fontWeight: "400",
    fontSize: textScale(14),
  },
  deleteButtonView: {
    paddingTop: moderateScale(20),
  },
  DeleteButtonMain: {
    height: moderateScale(47),
    width: moderateScale(309),
  },
});
