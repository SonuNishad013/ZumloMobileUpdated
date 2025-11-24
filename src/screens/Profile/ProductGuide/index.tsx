import { Alert, BackHandler, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ProductGuide from "./ProductGuide";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import allActions from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { strings } from "../../../constant/strings";
import {
  API_FUN_NAMES,
  SOCKET_FUN_NAME,
} from "../../../constant/APIsFunctionNames";
import { STATUS_CODES } from "../../../constant/appConstant";

interface Props {
  navigation?: any;
  route?: any;
}
const ProductGuideMain: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<any>();
  const [userToken, setUserToken] = useState<string>("");
  const getSeekerPersonalInfo = async () => {
    const userToken = await AsyncStorageUtils.getItem(
      AsyncStorageUtils.ACCESS_TOKEN
    );
    let userId = 0;
    let requestbody = {};
    allActions.seekerDetails
      .GetSeekerPersonalInfo(
        dispatch,
        requestbody,
        API_FUN_NAMES?.getSeekerPersonalInfo,
        userId
      )
      .then((response: any) => {
        if (response.statusCode == STATUS_CODES?.RESPONSE_OK) {
          setUserData(response.data);
          setUserToken(userToken);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getSeekerPersonalInfo();
    const backHandler = BackHandler.addEventListener(
      strings?.hardwareBackPress,
      () => {
        return true;
      }
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <ProductGuide
        navigation={navigation}
        onBackPress={() => {
          if (
            [strings?.AIGeneratedSkipped, strings?.fromExplorer].includes(
              route?.params?.from
            )
          ) {
            const isPlanner =
              route?.params?.from === strings?.AIGeneratedSkipped;
            event.emit(SOCKET_FUN_NAME?.login);
            AsyncStorageUtils.storeItemKey(
              AsyncStorageUtils.ISPLANNER_USER,
              JSON.stringify({
                isPlanner: isPlanner,
                isSelected: true,
              })
            );
          } else navigation?.goBack();
        }}
        routeData={route}
        userData={userData}
        userTokenn={userToken}
      />
    </View>
  );
};

export default ProductGuideMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
