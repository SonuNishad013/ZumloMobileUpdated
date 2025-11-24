import { Alert } from "react-native";
import { event } from "../../../navigation/emitter";
import * as AsyncStorageUtils from "../../../utils/Storage/AsyncStorage";
import { strings } from "../../../constant/strings";
import { SOCKET_FUN_NAME } from "../../../constant/APIsFunctionNames";
export const loginEmitter = () => {
  event.emit(SOCKET_FUN_NAME?.login);
  AsyncStorageUtils.storeItemKey(
    AsyncStorageUtils.ISPLANNER_USER,
    JSON.stringify({ isPlanner: false, isSelected: true })
  );
};
export const customAlert = (yesPress) => {
  Alert.alert(strings?.Success, strings?.You_have_successfully_set_your_goal, [
    {
      text: strings?.Yes,
      onPress: () => {
        yesPress();
      },
    },
    {
      text: strings?.goToDashboard,
      onPress: () => {
        loginEmitter();
      },
    },
  ]);
};
