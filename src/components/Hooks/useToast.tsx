import Toast from "react-native-toast-message";

const ToastMsg = (type: any, text1: any, text2: any) => {
  return Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
}
export default ToastMsg;